# 🔧 Fix: Canales de Slack No Aparecen

## Problema
Los canales de Slack no aparecen en la interfaz web después de hacer clic en "Connect to Slack".

## Solución: Agregar Permisos al Bot

El bot necesita permisos específicos para listar los canales de Slack.

### Paso 1: Ir a Configuración de Slack App

1. Ve a [https://api.slack.com/apps](https://api.slack.com/apps)
2. Selecciona tu app

### Paso 2: Agregar Permisos

1. Ve a **"OAuth & Permissions"** en el menú lateral
2. Desplázate hasta **"Scopes"** > **"Bot Token Scopes"**
3. Haz clic en **"Add an OAuth Scope"**
4. Agrega estos scopes:
   - ✅ `channels:read` - Para leer canales públicos
   - ✅ `groups:read` - Para leer canales privados
   - O alternativamente: `conversations.list` - Para listar todas las conversaciones

### Paso 3: Reinstalar la App

1. Desplázate hacia arriba en la página
2. Verás un botón **"Reinstall to Workspace"** o **"Reinstall App"**
3. Haz clic en él
4. Autoriza la app de nuevo

### Paso 4: Actualizar Variables de Entorno (si es necesario)

Si el bot token cambió después de reinstalar:

1. Copia el nuevo **Bot User OAuth Token** (empieza con `xoxb-`)
2. Actualiza `SLACK_BOT_TOKEN` en Railway:
   - Ve a Railway → Tu proyecto → Variables
   - Actualiza `SLACK_BOT_TOKEN` con el nuevo valor
   - Railway se reiniciará automáticamente

### Paso 5: Probar de Nuevo

1. Espera 1-2 minutos para que Railway se reinicie
2. Abre tu app en Vercel
3. Haz clic en "Connect to Slack"
4. Deberías ver tus canales reales

## Verificar que Funciona

Después de agregar los permisos, puedes verificar:

1. **En Railway logs**: Deberías ver `✅ Found X channels` cuando se llame a `/api/channels`
2. **En la web**: Los canales deberían aparecer en el dropdown
3. **En Slack**: El bot debería poder ver los canales del workspace

## Permisos Requeridos

Para que el bot funcione completamente, necesita estos scopes:

### Bot Token Scopes:
- ✅ `chat:write` - Para enviar mensajes
- ✅ `commands` - Para usar comandos slash
- ✅ `channels:read` - Para leer canales públicos
- ✅ `groups:read` - Para leer canales privados
- ✅ `channels:history` - Para leer historial (opcional, para futuras features)

### App-Level Token Scopes (Socket Mode):
- ✅ `connections:write` - Para Socket Mode

## Si Sigue Sin Funcionar

1. **Verifica los logs de Railway**: Busca errores relacionados con `conversations.list` o `missing_scope`
2. **Verifica que el bot esté en canales**: El bot debe ser miembro de al menos un canal para que aparezca en la lista
3. **Verifica el token**: Asegúrate de que `SLACK_BOT_TOKEN` en Railway sea el token correcto (debe empezar con `xoxb-`)
4. **Revisa la consola del navegador**: Abre F12 y mira si hay errores en la pestaña Console o Network

## Nota Importante

Si el bot no es miembro de ningún canal, la lista estará vacía. Para agregar el bot a un canal:

1. En Slack, ve al canal
2. Escribe `/invite @nombre-del-bot`
3. O ve a la configuración del canal → Integrations → Add apps

