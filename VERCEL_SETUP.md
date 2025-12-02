# ⚙️ Configuración de Vercel - Solución

## El Problema
Vercel no permite cambiar el "Root Directory" fácilmente en la interfaz web.

## Solución: Usar vercel.json en la Raíz

He creado un `vercel.json` en la raíz del proyecto que configura todo automáticamente.

### Pasos en Vercel:

1. **Importa tu repositorio** normalmente
2. **NO cambies el Root Directory** - déjalo vacío o como está
3. **Vercel detectará automáticamente** el `vercel.json` en la raíz
4. El `vercel.json` ya está configurado para:
   - Instalar dependencias en `web/`
   - Hacer build desde `web/`
   - Usar el output de `web/.next`

### Configuración Automática

El `vercel.json` en la raíz contiene:
```json
{
  "buildCommand": "cd web && npm install && npm run build",
  "outputDirectory": "web/.next",
  "installCommand": "cd web && npm install",
  "framework": "nextjs"
}
```

Esto le dice a Vercel que:
- ✅ Instale dependencias en la carpeta `web`
- ✅ Haga build desde `web`
- ✅ Use `.next` como output

### Variables de Entorno

Asegúrate de agregar estas variables en Vercel:
- `SLACK_BOT_TOKEN`
- `SLACK_SIGNING_SECRET`
- `SLACK_APP_TOKEN`
- `NODE_ENV=production`
- `API_URL` (URL de tu bot server en Railway/Render)

### Si Aún No Funciona

Si Vercel sigue sin detectar Next.js:

1. Ve a **Settings** → **General**
2. En **Build & Development Settings**:
   - **Framework Preset**: Selecciona "Next.js" manualmente
   - **Root Directory**: Déjalo vacío (o pon `.` si es obligatorio)
   - **Build Command**: Déjalo como está (el vercel.json lo sobrescribe)
   - **Output Directory**: Déjalo como está

3. Guarda y haz **Redeploy**

---

## Alternativa: Monorepo Setup

Si Vercel sigue dando problemas, puedes configurarlo como monorepo:

1. En Vercel, ve a **Settings** → **General**
2. **Root Directory**: `web`
3. Esto debería funcionar ahora

---

## Verificar que Funciona

Después del deploy, verifica:
- ✅ La web carga sin errores
- ✅ No hay errores en los logs de Vercel
- ✅ El build se completa exitosamente

