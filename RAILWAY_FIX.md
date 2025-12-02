# 🔧 Solución: Railway Build Error

## El Problema
Railway está ejecutando `npm run build` pero no instala las dependencias de `web/` antes de hacer build.

Error: `sh: 1: next: not found`

## Solución Aplicada

He actualizado el script `build` en `package.json` para que instale dependencias de `web/` antes de hacer build:

```json
"build": "cd web && npm install && npm run build"
```

## Configuración en Railway

### Opción 1: Usar el Script de Build (Recomendado)

1. En Railway, ve a tu servicio
2. Ve a **Settings** → **Build**
3. **Build Command**: Déjalo vacío o pon `npm run build`
4. Railway usará el script del `package.json`

### Opción 2: Configurar Build Manualmente

1. En Railway, ve a **Settings** → **Build**
2. **Build Command**: `cd web && npm install && npm run build`
3. **Start Command**: `node server.js`

### Opción 3: Usar Nixpacks con Configuración

Railway está usando Nixpacks que detecta automáticamente. El problema es que necesita instalar dependencias de `web/`.

Crea un archivo `nixpacks.toml` en la raíz:

```toml
[phases.setup]
nixPkgs = ["nodejs_18", "npm-9_x"]

[phases.install]
cmds = [
  "npm ci",
  "cd web && npm ci"
]

[phases.build]
cmds = [
  "cd web && npm run build"
]

[start]
cmd = "node server.js"
```

## Verificar

Después del deploy, deberías ver en los logs:
- ✅ "Installing dependencies" (en raíz)
- ✅ "Installing dependencies" (en web/)
- ✅ "Building Next.js"
- ✅ Build completado

## Alternativa: Separar Servicios

Si sigue dando problemas, considera:
- **Servicio 1**: Bot server (server.js) - sin build
- **Servicio 2**: Web app (web/) - solo Next.js

Pero con el fix aplicado debería funcionar.

