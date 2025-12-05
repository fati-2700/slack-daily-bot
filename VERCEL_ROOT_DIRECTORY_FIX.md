# 🔧 Solución Definitiva: Root Directory en Vercel

## El Problema
Vercel está ejecutando comandos en la raíz del proyecto, no en `web/` donde está Next.js.

## Solución: Configurar Root Directory en Vercel

### Paso 1: Ve a Settings

1. En Vercel Dashboard, ve a tu proyecto
2. Click en **"Settings"** (arriba)
3. Click en **"General"** (menú lateral izquierdo)

### Paso 2: Configurar Root Directory

1. Desplázate hasta **"Build & Development Settings"**
2. Busca **"Root Directory"**
3. **ESCRIBE**: `web` (sin comillas, solo la palabra web)
4. **NO dejes vacío**, debe decir exactamente `web`

### Paso 3: Configurar Framework

1. En **"Framework Preset"**, selecciona: **"Next.js"**
2. Esto es importante para que Vercel detecte Next.js

### Paso 4: Dejar Comandos Vacíos

1. **Build Command**: Déjalo **VACÍO** (Next.js lo detecta automáticamente)
2. **Output Directory**: Déjalo **VACÍO** (Next.js usa `.next`)
3. **Install Command**: Déjalo **VACÍO** (Next.js lo detecta automáticamente)

### Paso 5: Guardar y Redeploy

1. Click en **"Save"** (abajo)
2. Ve a **"Deployments"**
3. Click en los **3 puntos** del último deployment
4. Click en **"Redeploy"**

## Verificación

Después del redeploy, en los logs deberías ver:
- ✅ "Installing dependencies" (desde web/package.json)
- ✅ "Detected Next.js version 14.0.4"
- ✅ Build completado exitosamente

## Si No Ves la Opción "Root Directory"

### Opción A: Eliminar y Recrear

1. **Elimina el proyecto** en Vercel
2. **Importa de nuevo** el repositorio
3. **Durante la importación**, en "Configure Project":
   - Busca **"Root Directory"** o **"Project Root"**
   - Escribe: `web`
   - Framework: Next.js
4. Agrega variables de entorno
5. Deploy

### Opción B: Usar Vercel CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Desde la carpeta web
cd web
vercel

# Cuando pregunte:
# - Root Directory: . (punto)
# - Framework: Next.js
```

## Estructura Correcta

Vercel debe ver esto:
```
web/                    ← Root Directory configurado aquí
├── package.json        ← Next.js package.json (aquí está "next")
├── next.config.js
└── ...
```

NO esto:
```
slack-bot/             ← Si Root Directory está aquí (incorrecto)
├── package.json        ← Este es del servidor, NO tiene "next"
└── web/
    ├── package.json   ← Este SÍ tiene "next" pero Vercel no lo ve
```

## Checklist Final

- [ ] Root Directory = `web` (en Settings → General)
- [ ] Framework Preset = `Next.js`
- [ ] Build Command = (vacío)
- [ ] Output Directory = (vacío)
- [ ] Install Command = (vacío)
- [ ] Variables de entorno agregadas
- [ ] Redeploy realizado

---

**IMPORTANTE**: El Root Directory DEBE estar configurado en la interfaz de Vercel, NO en vercel.json.

