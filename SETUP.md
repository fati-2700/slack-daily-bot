# ⚙️ Guía de Configuración Inicial

## 1. Crear una Slack App

### Paso 1: Crear la App
1. Ve a [https://api.slack.com/apps](https://api.slack.com/apps)
2. Haz clic en "Create New App"
3. Selecciona "From scratch"
4. Nombra tu app (ej: "Daily Bot")
5. Selecciona tu workspace

### Paso 2: Activar Socket Mode
1. En el menú lateral, ve a "Socket Mode"
2. Activa "Enable Socket Mode"
3. Haz clic en "Generate Token"
4. En el modal que aparece:
   - **Token Name**: Ponle un nombre (ej: "daily-bot-token")
   - **Scopes**: En el dropdown "Add permission by Scope or API method...", selecciona:
     - ✅ `connections:write` - Este es el único scope necesario para Socket Mode
   - Haz clic en "Generate"
5. Copia el **App-Level Token** (empieza con `xapp-`)
6. Guarda este token como `SLACK_APP_TOKEN`

> **Nota**: Solo necesitas el scope `connections:write` para Socket Mode. Los otros scopes (`authorizations:read`, `app_configurations:write`) no son necesarios para este bot.

### Paso 3: Crear Bot Token
1. Ve a "OAuth & Permissions"
2. En "Scopes" > "Bot Token Scopes", agrega:
   - `chat:write` - Para enviar mensajes
   - `commands` - Para usar comandos slash
   - `channels:read` - Para listar canales (opcional)
3. Desplázate hacia arriba y haz clic en "Install to Workspace"
4. Autoriza la app
5. Copia el **Bot User OAuth Token** (empieza con `xoxb-`)
6. Guarda este token como `SLACK_BOT_TOKEN`

### Paso 4: Obtener Signing Secret
1. Ve a "Basic Information"
2. En "App Credentials", copia el **Signing Secret**
3. Guarda este valor como `SLACK_SIGNING_SECRET`

### Paso 5: Crear Comando Slash
1. Ve a "Slash Commands"
2. Haz clic en "Create New Command"
3. Configura:
   - **Command**: `/daily`
   - **Request URL**: ⚠️ **DEJA ESTO VACÍO** - Con Socket Mode no necesitas URL
   - **Short Description**: "Configura el bot de mensajes diarios"
   - **Usage Hint**: (opcional, ej: "Configura mensajes diarios")
4. Guarda los cambios

> **Importante**: Con Socket Mode activado, NO necesitas configurar una Request URL. El comando se entregará automáticamente a través de la conexión WebSocket.

## 2. Configurar Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
SLACK_BOT_TOKEN=xoxb-tu-bot-token-aqui
SLACK_SIGNING_SECRET=tu-signing-secret-aqui
SLACK_APP_TOKEN=xapp-tu-app-token-aqui
PORT=3001
API_PORT=3002
```

## 3. Instalar Dependencias

```bash
# Instalar dependencias del servidor
npm install

# Instalar dependencias de la web
cd web
npm install
cd ..
```

## 4. Ejecutar en Desarrollo

```bash
# Desde la raíz del proyecto
npm run dev
```

Esto iniciará:
- Servidor del bot en `http://localhost:3001`
- API en `http://localhost:3002`
- Interfaz web en `http://localhost:3000`

## 5. Probar el Bot

1. Abre Slack
2. Ve a cualquier canal
3. Escribe `/daily`
4. Deberías ver una confirmación del bot

## 6. Configurar desde la Web

1. Abre `http://localhost:3000`
2. Haz clic en "Conectar con Slack"
3. Selecciona un canal
4. Configura la hora
5. Guarda la configuración

## Troubleshooting

### "Socket mode connection failed"
- Verifica que `SLACK_APP_TOKEN` esté correcto
- Asegúrate de que Socket Mode esté activado en la app

### "The bot user is missing"
- Ve a "OAuth & Permissions" e instala la app en tu workspace

### "Invalid token"
- Verifica que todos los tokens estén correctos
- Asegúrate de copiar los tokens completos sin espacios

### El comando `/daily` no aparece
- Espera unos minutos después de crear el comando
- Recarga Slack
- Verifica que el comando esté guardado en la configuración de la app

