# 🔧 Configurar API_URL en Vercel

## El Problema
La interfaz web en Vercel no puede conectarse a Railway porque falta la variable de entorno `API_URL`.

## Solución: Agregar API_URL en Vercel

### Paso 1: Obtener URL de Railway

1. Ve a tu proyecto en Railway
2. Ve a **Settings** → **Networking**
3. Copia la URL pública (algo como `https://tu-app.railway.app`)
4. O simplemente copia la URL que aparece en la parte superior de Railway

### Paso 2: Agregar Variable en Vercel

1. Ve a tu proyecto en Vercel
2. Ve a **Settings** → **Environment Variables**
3. Haz clic en **"Add New"**
4. Agrega:
   - **Name**: `API_URL`
   - **Value**: `https://tu-app.railway.app` (tu URL de Railway)
   - **Environment**: Selecciona **"Production"** (y "Preview" si quieres)
5. Haz clic en **"Save"**

### Paso 3: Redeploy

1. Ve a **Deployments**
2. Haz clic en los **3 puntos** del último deployment
3. Selecciona **"Redeploy"**
4. Espera a que termine

## Verificar que Funciona

Después del redeploy:

1. Abre tu app en Vercel
2. Intenta guardar la configuración
3. Debería funcionar sin errores

## Ejemplo de Configuración

En Vercel Environment Variables deberías tener:

```
SLACK_BOT_TOKEN = xoxb-...
SLACK_SIGNING_SECRET = ...
SLACK_APP_TOKEN = xapp-...
NODE_ENV = production
API_URL = https://tu-app.railway.app  ← ESTA ES LA IMPORTANTE
```

## Si Sigue Sin Funcionar

1. Verifica que la URL de Railway sea correcta (debe empezar con `https://`)
2. Verifica que Railway esté funcionando (abre la URL en el navegador)
3. Verifica que no haya espacios extra en la variable `API_URL`
4. Revisa los logs de Vercel para ver errores específicos

## Probar la Conexión

Puedes probar manualmente que Railway responde:

```bash
# En tu terminal
curl https://tu-app.railway.app/health
```

Debería responder:
```json
{"status":"ok","timestamp":"..."}
```

Si esto funciona, Railway está bien y solo necesitas configurar `API_URL` en Vercel.
