# 🚀 Guía de Deploy a Vercel

## Pasos para Deploy

### 1. Preparar el Repositorio

Asegúrate de que tu código esté en GitHub, GitLab o Bitbucket.

### 2. Crear App en Vercel

1. Ve a [vercel.com](https://vercel.com)
2. Inicia sesión con tu cuenta de GitHub
3. Haz clic en "New Project"
4. Importa tu repositorio

### 3. Configurar Variables de Entorno

En la configuración del proyecto, agrega estas variables:

```
SLACK_BOT_TOKEN=xoxb-tu-token-aqui
SLACK_SIGNING_SECRET=tu-signing-secret-aqui
SLACK_APP_TOKEN=xapp-tu-app-token-aqui
```

### 4. Configurar Build Settings

Vercel detectará automáticamente Next.js, pero asegúrate de:

- **Framework Preset**: Next.js
- **Root Directory**: `./web` (o deja vacío si la estructura es diferente)
- **Build Command**: `cd web && npm run build`
- **Output Directory**: `.next`

### 5. Deploy

Haz clic en "Deploy" y espera a que termine el proceso.

### 6. Configurar Slack App

Una vez deployado, actualiza tu Slack App:

1. Ve a [api.slack.com/apps](https://api.slack.com/apps)
2. Selecciona tu app
3. En "Socket Mode", asegúrate de que esté activado
4. En "Event Subscriptions", agrega la URL de tu webhook (si usas eventos)
5. En "Slash Commands", configura `/daily` apuntando a tu URL de Vercel

### 7. Probar

1. Invita el bot a tu workspace
2. Ejecuta `/daily` en cualquier canal
3. Verifica que la configuración se guarde

## Troubleshooting

### El bot no responde

- Verifica que las variables de entorno estén correctas
- Revisa los logs en Vercel
- Asegúrate de que Socket Mode esté activado

### Error de CORS

- Verifica que las URLs en `vercel.json` estén correctas
- Asegúrate de que la API esté accesible

### El cron no funciona

- Vercel tiene limitaciones con cron jobs. Considera usar:
  - Vercel Cron Jobs (funciones serverless)
  - Un servicio externo como cron-job.org
  - Vercel Pro con cron jobs nativos

## Alternativa: Usar Vercel Cron

Para usar cron jobs nativos de Vercel, crea `vercel.json` con:

```json
{
  "crons": [{
    "path": "/api/cron",
    "schedule": "0 9 * * *"
  }]
}
```

Y crea `api/cron.js` que ejecute la lógica del mensaje diario.

