import type { Order } from '../types';

const BOT_TOKEN = import.meta.env?.VITE_TELEGRAM_BOT_TOKEN || (globalThis as any).process?.env?.VITE_TELEGRAM_BOT_TOKEN;
const CHAT_ID = import.meta.env?.VITE_TELEGRAM_CHAT_ID || (globalThis as any).process?.env?.VITE_TELEGRAM_CHAT_ID;

export const sendOrderNotification = async (order: Order) => {
  if (!BOT_TOKEN || !CHAT_ID) {
    console.warn('⚠️ Telegram Bot Token o Chat ID no configurados');
    return;
  }

  const itemsList = order.items
    .map(item => `🔥 ${item.quantity}x ${item.name} ${item.variant_name ? `(${item.variant_name})` : ''}`)
    .join('\n');

  const message = `
🔔 *NUEVO PEDIDO RECIBIDO* 🔔
---------------------------
👤 *Cliente:* ${order.customer_name}
📞 *Teléfono:* ${order.user_phone}
📍 *Tipo:* Recogida en Local
---------------------------
*PEDIDO:*
${itemsList}
---------------------------
💰 *TOTAL:* ${order.total.toFixed(2)}€
📝 *Notas:* ${order.notes || 'Sin notas'}
---------------------------
✅ _Gestiona este pedido en el Panel Admin_
`;

  try {
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: 'Markdown',
        reply_markup: {
          inline_keyboard: [[
            { text: "👨‍🍳 Aceptar", callback_data: `aceptar:${order.id}` },
            { text: "❌ Cancelar", callback_data: `cancelar:${order.id}` }
          ]]
        }
      })
    });

    return response.ok;
  } catch (error) {
    console.error('Error enviando notificación a Telegram:', error);
    return false;
  }
};
