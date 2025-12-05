# 🔧 Solución: "Invalid characters in name"

## El Problema
Vercel está rechazando un nombre porque contiene caracteres inválidos (espacios, guiones, caracteres especiales).

## Soluciones

### 1. Nombre del Proyecto en Vercel

Cuando Vercel te pide el nombre del proyecto:

❌ **NO uses:**
- `slack-daily-bot` (guiones)
- `slack daily bot` (espacios)
- `slack_daily_bot` (guiones bajos - a veces funciona, a veces no)

✅ **USA:**
- `slackdailybot` (sin espacios ni guiones)
- `slackDailyBot` (camelCase)
- `SlackDailyBot` (PascalCase)

### 2. Variables de Entorno

Si el error es en las variables de entorno, verifica que los nombres sean:
- Solo letras, números y guiones bajos
- No empiecen con número

✅ **Correcto:**
- `SLACK_BOT_TOKEN`
- `SLACK_SIGNING_SECRET`
- `SLACK_APP_TOKEN`
- `NODE_ENV`
- `API_URL`

❌ **Incorrecto:**
- `SLACK-BOT-TOKEN` (guiones)
- `2SLACK_TOKEN` (empieza con número)
- `SLACK TOKEN` (espacios)

### 3. Nombre del Repositorio

Si el problema es el nombre del repositorio en GitHub, puedes:
- Renombrar el repositorio en GitHub a algo sin guiones
- O simplemente usar un nombre diferente en Vercel

## Pasos para Corregir

### Si es el Nombre del Proyecto:

1. En Vercel, cuando te pida el nombre del proyecto
2. Escribe: `slackdailybot` (sin guiones ni espacios)
3. O cualquier nombre que prefieras, solo con letras y números

### Si es una Variable de Entorno:

1. Ve a **Settings** → **Environment Variables**
2. Verifica que los nombres sean correctos:
   - `SLACK_BOT_TOKEN` ✅
   - `SLACK_SIGNING_SECRET` ✅
   - `SLACK_APP_TOKEN` ✅
   - `NODE_ENV` ✅
3. Si alguna tiene guiones o espacios, elimínala y créala de nuevo con el nombre correcto

## Ejemplo Correcto

**Nombre del Proyecto en Vercel:**
```
slackdailybot
```

**Variables de Entorno:**
```
SLACK_BOT_TOKEN = xoxb-...
SLACK_SIGNING_SECRET = ...
SLACK_APP_TOKEN = xapp-...
NODE_ENV = production
```

---

## Si el Error Persiste

1. **Elimina el proyecto** en Vercel
2. **Crea uno nuevo** con un nombre simple: `slackdailybot`
3. **Importa el repositorio** de nuevo
4. **Configura todo** desde cero

