# 🔧 Troubleshooting

## Error "dispatch_failed" con /daily

Este error significa que Slack no puede entregar el comando al bot. Sigue estos pasos:

### 1. Verificar que el servidor esté corriendo

```bash
# Deberías ver estos mensajes en la consola:
⚡️ Slack bot is running!
📋 Comando /daily disponible
✅ API server running on port 3002
```

Si no ves estos mensajes, el servidor no está corriendo. Ejecuta:

```bash
npm run dev
```

### 2. Verificar Socket Mode

1. Ve a [api.slack.com/apps](https://api.slack.com/apps)
2. Selecciona tu app
3. Ve a "Socket Mode"
4. Asegúrate de que esté **activado**
5. Verifica que tengas un App-Level Token con scope `connections:write`

### 3. Verificar el comando /daily en Slack

1. Ve a "Slash Commands" en tu app de Slack
2. Verifica que el comando `/daily` esté creado
3. **IMPORTANTE**: Con Socket Mode, NO necesitas configurar una URL de Request URL
4. El comando debe estar sin Request URL o con una URL vacía

### 4. Verificar variables de entorno

Asegúrate de que tu archivo `.env` tenga:

```env
SLACK_BOT_TOKEN=xoxb-tu-token-aqui
SLACK_SIGNING_SECRET=tu-signing-secret-aqui
SLACK_APP_TOKEN=xapp-tu-app-token-aqui
```

### 5. Reiniciar el servidor

Después de hacer cambios:

1. Detén el servidor (Ctrl+C)
2. Vuelve a ejecutar `npm run dev`
3. Espera a ver los mensajes de confirmación

## Error al guardar configuración en la web

### 1. Verificar que el servidor API esté corriendo

Abre en tu navegador:
```
http://localhost:3002/health
```

Deberías ver:
```json
{"status":"ok","timestamp":"..."}
```

Si no funciona, el servidor no está corriendo en el puerto 3002.

### 2. Verificar la consola del navegador

Abre las herramientas de desarrollador (F12) y revisa:
- Errores en la consola
- Errores de red en la pestaña Network

### 3. Verificar logs del servidor

En la terminal donde corre el servidor, deberías ver:
```
📥 POST /api/config recibido: { userId: '...', channelId: '...', hour: 9 }
✅ Configuración guardada: { ... }
```

Si no ves estos logs, la petición no está llegando al servidor.

### 4. Verificar CORS

Si ves errores de CORS, asegúrate de que el middleware esté configurado correctamente (ya está en el código).

## El bot no envía mensajes diarios

### 1. Verificar que la configuración esté guardada

Ejecuta `/daily` en Slack o guarda la configuración desde la web.

### 2. Verificar la hora

El bot envía mensajes solo cuando:
- Es la hora exacta configurada (ej: 9:00)
- No se ha enviado ya hoy

### 3. Probar manualmente

Puedes modificar temporalmente el cron para que se ejecute cada minuto y verificar que funciona.

## El bot no se conecta a Slack

### 1. Verificar tokens

Asegúrate de que:
- `SLACK_BOT_TOKEN` empiece con `xoxb-`
- `SLACK_APP_TOKEN` empiece con `xapp-`
- `SLACK_SIGNING_SECRET` sea una cadena de caracteres

### 2. Verificar permisos

En "OAuth & Permissions" de tu app:
- `chat:write` debe estar en Bot Token Scopes
- `commands` debe estar en Bot Token Scopes

### 3. Reinstalar la app

1. Ve a "OAuth & Permissions"
2. Haz clic en "Reinstall to Workspace"
3. Autoriza de nuevo
4. Copia el nuevo Bot Token si cambió

## Logs útiles

El servidor ahora muestra logs detallados. Busca:

- `✅` = Operación exitosa
- `❌` = Error
- `📝` = Comando recibido
- `📥` = Petición API recibida
- `🔗` = Información de conexión

## Contacto

Si nada funciona, verifica:
1. Que Node.js esté actualizado (`node --version` debe ser 16+)
2. Que todas las dependencias estén instaladas (`npm install`)
3. Que no haya otros procesos usando los puertos 3000, 3001 o 3002

