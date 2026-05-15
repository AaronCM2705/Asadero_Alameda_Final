/* Telegram webhook handler - Advanced Version */
import type { Order } from '../src/types';
import { supabase } from '../src/lib/supabase';

interface TelegramUser {
  id: number;
  is_bot: boolean;
  first_name: string;
  username?: string;
}

interface TelegramChat {
  id: number;
  type: string;
}

interface TelegramMessage {
  message_id: number;
  from: TelegramUser;
  chat: TelegramChat;
  text?: string;
}

interface TelegramCallbackQuery {
  id: string;
  from: TelegramUser;
  message?: TelegramMessage;
  data?: string;
}

interface WebhookBody {
  message?: TelegramMessage;
  callback_query?: TelegramCallbackQuery;
}

interface WebhookRequest {
  method: string;
  body: WebhookBody;
}

interface WebhookResponse {
  status: (code: number) => WebhookResponse;
  json: (data: Record<string, unknown>) => void;
  end: () => void;
}

// @ts-ignore
const TELEGRAM_TOKEN = (globalThis as typeof globalThis & { process: any }).process?.env?.VITE_TELEGRAM_BOT_TOKEN || import.meta.env?.VITE_TELEGRAM_BOT_TOKEN;

export default async function handler(req: WebhookRequest, res: WebhookResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { message, callback_query } = req.body;

  // --- MANEJO DE BOTONES (CALLBACK QUERIES) ---
  if (callback_query && callback_query.data && callback_query.message) {
    const [action, orderId] = callback_query.data.split(':');
    const chatId = callback_query.message.chat.id;
    const messageId = callback_query.message.message_id;

    let newStatus: Order['status'] | null = null;
    let statusText = '';

    if (action === 'aceptar') {
      newStatus = 'preparing';
      statusText = '👨‍🍳 *En Cocina*';
    } else if (action === 'listo') {
      newStatus = 'ready';
      statusText = '✅ *Listo para Recoger*';
    } else if (action === 'cancelar') {
      newStatus = 'cancelled';
      statusText = '❌ *Cancelado*';
    }

    if (newStatus && orderId) {
      const { error } = await supabase.from('orders').update({ status: newStatus }).eq('id', orderId);
      
      if (!error) {
        // Actualizar el mensaje original quitando botones o cambiándolos
        const updatedText = callback_query.message.text + `\n\nEstado: ${statusText}`;
        
        // Inline keyboard dinámico según el nuevo estado
        let inlineKeyboard = undefined;
        if (newStatus === 'preparing') {
          inlineKeyboard = {
            inline_keyboard: [[
              { text: "✅ Marcar Listo", callback_data: `listo:${orderId}` },
              { text: "❌ Cancelar", callback_data: `cancelar:${orderId}` }
            ]]
          };
        }

        await editTelegramMessage(chatId, messageId, updatedText, inlineKeyboard);
      }
    }
    return res.status(200).end();
  }

  // --- MANEJO DE COMANDOS DE TEXTO ---
  const text = message?.text;
  const chatId = message?.chat.id;

  if (!text || !chatId) return res.status(200).end();

  // COMANDO: /pedidos
  if (text.startsWith('/pedidos')) {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('status', 'pending')
      .order('created_at', { ascending: true });

    if (error) {
      await sendTelegramMessage(chatId, "❌ Error al conectar con la base de datos.");
    } else if (data && data.length > 0) {
      for (const order of data as Order[]) {
        const date = new Date(order.created_at).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
        let msg = `📦 *PEDIDO PENDIENTE*\n`;
        msg += `👤 *Cliente:* ${order.customer_name}\n`;
        msg += `📞 *Tel:* ${order.user_phone}\n`;
        msg += `🕒 *Hora:* ${date}\n`;
        msg += `💰 *Total:* ${order.total.toFixed(2)}€\n\n`;
        msg += `*PRODUCTOS:*\n`;
        order.items.forEach(item => {
          msg += `• ${item.quantity}x ${item.name} ${item.variant_name ? `(${item.variant_name})` : ''}\n`;
        });

        const inlineKeyboard = {
          inline_keyboard: [[
            { text: "👨‍🍳 Aceptar", callback_data: `aceptar:${order.id}` },
            { text: "❌ Cancelar", callback_data: `cancelar:${order.id}` }
          ]]
        };

        await sendTelegramMessage(chatId, msg, inlineKeyboard);
      }
    } else {
      await sendTelegramMessage(chatId, "✅ *¡Todo al día!* No hay pedidos pendientes.");
    }
    return res.status(200).end();
  }

  // COMANDO: /aviso [texto]
  if (text.startsWith('/aviso')) {
    const announcementText = text.replace('/aviso', '').trim();
    if (!announcementText) {
      await sendTelegramMessage(chatId, "⚠️ Uso: `/aviso Nuevo mensaje del restaurante`.");
    } else {
      const { error } = await supabase
        .from('announcements')
        .update({ message: announcementText, is_active: true })
        .eq('is_active', true); // Actualizamos el activo actual

      if (error) {
        await sendTelegramMessage(chatId, "❌ Error al actualizar el aviso.");
      } else {
        await sendTelegramMessage(chatId, "📢 *Aviso actualizado en la web:* \n" + announcementText);
      }
    }
    return res.status(200).end();
  }

  // COMANDO: /start o /ayuda
  if (text.startsWith('/start') || text.startsWith('/ayuda')) {
    const help = `🍗 *BOT ASADERO ALAMEDA* 🍗\n\n` +
      `/pedidos - Ver pedidos pendientes y gestionarlos con botones.\n` +
      `/aviso [texto] - Cambiar el aviso emergente de la web.\n` +
      `/ayuda - Ver este mensaje.\n\n` +
      `_Gestión rápida para la jefa._`;
    await sendTelegramMessage(chatId, help);
    return res.status(200).end();
  }

  res.status(200).end();
}

async function sendTelegramMessage(chatId: number, text: string, replyMarkup?: Record<string, unknown>) {
  const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;
  try {
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: 'Markdown',
        reply_markup: replyMarkup
      }),
    });
  } catch (e) {
    console.error("Error sending to Telegram:", e);
  }
}

async function editTelegramMessage(chatId: number, messageId: number, text: string, replyMarkup?: Record<string, unknown>) {
  const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/editMessageText`;
  try {
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        message_id: messageId,
        text: text,
        parse_mode: 'Markdown',
        reply_markup: replyMarkup
      }),
    });
  } catch (e) {
    console.error("Error editing Telegram message:", e);
  }
}
