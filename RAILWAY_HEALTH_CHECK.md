# 🔧 Solución: "Application failed to respond" en Railway

## El Problema
El build se completó exitosamente, pero Railway no puede conectarse a la aplicación porque:
- Railway espera que el servidor escuche en `process.env.PORT` (puerto que Railway asigna)
- El servidor Express estaba escuchando en `API_PORT` (3002) que Railway no conoce

## Solución Aplicada

He actualizado `server.js` para que:
1. El servidor Express escuche en `process.env.PORT` (puerto de Railway)
2. Si no hay `PORT`, usa `API_PORT` o 3002 como fallback
3. El servidor Slack (Socket Mode) no necesita puerto HTTP

## Verificar en Railway

### 1. Verificar Variables de Entorno

En Railway, asegúrate de tener:
- `SLACK_BOT_TOKEN`
- `SLACK_SIGNING_SECRET`
- `SLACK_APP_TOKEN`
- **NO necesitas** `PORT` ni `API_PORT` (Railway los asigna automáticamente)

### 2. Verificar Start Command

En Railway → Settings → Deploy:
- **Start Command**: `node server.js` (o déjalo vacío, Railway lo detectará del Procfile)

### 3. Verificar Logs

Después del redeploy, en los logs deberías ver:
- ✅ "✅ API server running on port XXXX" (donde XXXX es el puerto que Railway asignó)
- ✅ "⚡️ Slack bot is running!"
- ✅ "📋 Commands available"

### 4. Probar Health Check

Railway debería poder hacer health checks a:
- `https://tu-app.railway.app/health`

Debería responder con:
```json
{"status":"ok","timestamp":"..."}
```

## Si Sigue Sin Funcionar

### Verificar Logs de Railway

1. Ve a **Deployments** → Click en el último deployment
2. Ve a **Logs**
3. Busca errores como:
   - "EADDRINUSE" (puerto ya en uso)
   - "Cannot find module"
   - Errores de conexión a Slack

### Verificar que el Servidor Esté Escuchando

En los logs deberías ver:
```
✅ API server running on port [número]
```

Si no ves esto, el servidor no se está iniciando correctamente.

### Verificar Variables de Entorno

Asegúrate de que todas las variables estén configuradas:
- `SLACK_BOT_TOKEN` = xoxb-...
- `SLACK_SIGNING_SECRET` = ...
- `SLACK_APP_TOKEN` = xapp-...

### Probar Localmente

Para verificar que funciona:
```bash
# En tu máquina local
PORT=3000 node server.js
```

Deberías ver:
- "✅ API server running on port 3000"
- "⚡️ Slack bot is running!"

Y `http://localhost:3000/health` debería responder.

## Nota Importante

Railway asigna un puerto dinámicamente a través de `process.env.PORT`. El servidor ahora usa este puerto automáticamente, así que no necesitas configurarlo manualmente.

