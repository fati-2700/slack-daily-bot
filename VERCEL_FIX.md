# 🔧 Solución: "No Next.js version detected"

## El Problema
Vercel no encuentra el `package.json` de Next.js porque está en la carpeta `web/`, no en la raíz.

## Solución Aplicada

He actualizado el `vercel.json` para incluir `"rootDirectory": "web"`.

## Pasos en Vercel

### Opción 1: Usar vercel.json (Recomendado)

1. **En Vercel Dashboard**, ve a tu proyecto
2. Ve a **Settings** → **General**
3. En **Build & Development Settings**:
   - **Root Directory**: Deja vacío o pon `web` (el vercel.json lo manejará)
   - **Framework Preset**: Next.js
4. **Guarda** los cambios
5. Haz **Redeploy**

### Opción 2: Configurar Root Directory Manualmente

Si el vercel.json no funciona:

1. Ve a **Settings** → **General**
2. En **Root Directory**, escribe: `web`
3. **Framework Preset**: Selecciona "Next.js"
4. **Build Command**: Déjalo vacío (Next.js lo detecta automáticamente)
5. **Output Directory**: Déjalo vacío (Next.js usa `.next`)
6. **Install Command**: Déjalo vacío
7. **Guarda** y haz **Redeploy**

### Opción 3: Usar Monorepo Configuration

Si ninguna de las anteriores funciona:

1. Ve a **Settings** → **General**
2. **Root Directory**: `web`
3. Marca **"This is a monorepo"** (si aparece la opción)
4. **Framework Preset**: Next.js
5. **Guarda** y **Redeploy**

## Verificar que Funciona

Después del deploy, verifica en los logs:
- ✅ Debería decir "Installing dependencies from web/package.json"
- ✅ Debería detectar Next.js automáticamente
- ✅ El build debería completarse exitosamente

## Si Sigue Sin Funcionar

1. **Elimina el proyecto** en Vercel
2. **Vuelve a importar** el repositorio
3. **Antes de hacer deploy**, ve a Settings y configura:
   - **Root Directory**: `web`
   - **Framework Preset**: Next.js
4. **Agrega las variables de entorno**
5. **Haz deploy**

---

## Estructura Correcta

Tu proyecto debería verse así:
```
slack-bot/
├── vercel.json          ← Configuración de Vercel
├── server.js            ← Bot server (va a Railway)
├── package.json         ← Dependencias del servidor
└── web/
    ├── package.json     ← Dependencias de Next.js (aquí está el problema)
    ├── next.config.js
    └── ...
```

Vercel necesita saber que el `package.json` de Next.js está en `web/`.

