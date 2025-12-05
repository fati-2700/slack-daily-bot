# 🔧 Variables de Entorno en Vercel - Configuración Completa

## Variables Requeridas

En Vercel → Settings → Environment Variables, agrega estas variables:

### 1. Slack Tokens
```
SLACK_BOT_TOKEN = xoxb-tu-bot-token-aqui
SLACK_SIGNING_SECRET = tu-signing-secret-aqui
SLACK_APP_TOKEN = xapp-tu-app-token-aqui
```

### 2. Configuración de Entorno
```
NODE_ENV = production
```

### 3. URL de Railway (IMPORTANTE)
```
API_URL = https://web-production-82e32f.up.railway.app
```

**⚠️ IMPORTANTE**: 
- Debe empezar con `https://`
- No debe terminar con `/`
- Debe ser la URL completa de Railway

## Cómo Agregar en Vercel

1. Ve a **Settings** → **Environment Variables**
2. Para cada variable:
   - Click en **"Add New"**
   - **Name**: El nombre de la variable (ej: `API_URL`)
   - **Value**: El valor (ej: `https://web-production-82e32f.up.railway.app`)
   - **Environment**: Selecciona **"Production"** (y "Preview" si quieres)
3. Click en **"Save"**

## Después de Agregar Variables

1. Ve a **Deployments**
2. Haz **Redeploy** del último deployment
3. Esto aplicará las nuevas variables de entorno

## Verificar que Funciona

Después del redeploy:
1. Abre tu app en Vercel
2. Intenta guardar la configuración
3. Debería funcionar sin el error "fetch failed"

## Probar la Conexión

Puedes probar que Railway responde:

Abre en tu navegador:
```
https://web-production-82e32f.up.railway.app/health
```

Deberías ver:
```json
{"status":"ok","timestamp":"..."}
```

Si esto funciona, Railway está bien y solo necesitas configurar `API_URL` en Vercel.

