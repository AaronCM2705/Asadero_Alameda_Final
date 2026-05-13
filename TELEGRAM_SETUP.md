# 🤖 Guía de Configuración: Bot de Telegram - Asadero Alameda

Esta guía explica paso a paso cómo crear el bot, obtener las credenciales y vincularlo con la página web para recibir notificaciones y gestionar pedidos.

---

## 1. Crear el Bot en Telegram
1. Abre Telegram y busca a **@BotFather**.
2. Envía el comando `/newbot`.
3. Sigue las instrucciones:
   - **Nombre del bot**: Ej. `Asadero Alameda Bot`.
   - **Username**: Debe terminar en `bot` (ej. `asadero_alameda_bot`).
4. **IMPORTANTE**: BotFather te dará un **Token de API**. Guárdalo bien. Será algo como `123456789:ABCDefgh...`.

## 2. Obtener tu ID de Chat
Para que el bot sepa a quién enviarle los mensajes, necesitas tu ID de chat personal o el del grupo.
1. Busca el bot **@userinfobot** en Telegram e inícialo.
2. Te responderá con tu `Id`. Es un número (ej. `987654321`).

## 3. Configurar las Variables de Entorno (Vercel/Local)
Para que la web pueda comunicarse con Telegram, debes configurar estas variables:

| Variable | Valor |
| :--- | :--- |
| `VITE_TELEGRAM_BOT_TOKEN` | El Token que te dio BotFather |
| `VITE_TELEGRAM_CHAT_ID` | Tu ID de chat (el número obtenido en el paso 2) |

### En Vercel:
1. Ve al panel de tu proyecto en Vercel.
2. **Settings** -> **Environment Variables**.
3. Añade ambas variables con sus respectivos valores.
4. Redespliega el proyecto.

## 4. Vincular el Webhook (Comandos del Bot)
Para que el bot responda a comandos como `/pedidos`, debes decirle a Telegram a dónde enviar los mensajes.
1. Abre tu navegador o usa una herramienta como `curl`.
2. Escribe la siguiente URL reemplazando los datos:
   `https://api.telegram.org/bot<TU_TOKEN_BOT>/setWebhook?url=https://<TU_DOMINIO_VERCEL>/api/telegramWebhook`
   
   *Ejemplo real:*
   `https://api.telegram.org/bot12345:ABC/setWebhook?url=https://asadero-alameda.vercel.app/api/telegramWebhook`

3. Si recibes un mensaje que dice `{"ok":true,"result":true,"description":"Webhook was set"}`, ¡ya está vinculado!

---

## 5. Comandos Disponibles
Una vez configurado, puedes escribirle al bot:
- `/pedidos`: Muestra todos los pedidos que están en estado "Pendiente".
- `/ayuda`: Muestra los comandos disponibles.

---

## Solución de Problemas
- **No recibo notificaciones**: Verifica que `VITE_TELEGRAM_CHAT_ID` sea correcto y que hayas iniciado el bot con `/start`.
- **El comando /pedidos no responde**: Asegúrate de haber configurado el Webhook correctamente (Paso 4) y que la URL de Vercel sea la correcta.
