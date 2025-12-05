# 🌐 Explicación: URLs de Railway vs Vercel

## Arquitectura de tu Aplicación

Tu aplicación tiene **DOS partes** deployadas en lugares diferentes:

### 1. Railway - Servidor del Bot (Backend API)
- **URL**: `https://tu-app.railway.app`
- **Qué es**: Solo el servidor del bot (API)
- **Qué muestra**: Información de la API (JSON)
- **Para qué sirve**: 
  - Health checks
  - API endpoints (`/api/config`, `/api/tasks`)
  - El bot de Slack se conecta aquí

### 2. Vercel - Interfaz Web (Frontend)
- **URL**: `https://tu-app.vercel.app`
- **Qué es**: La interfaz web (Next.js)
- **Qué muestra**: La página web con formularios
- **Para qué sirve**:
  - Configurar el bot
  - Gestionar tareas desde la web
  - Interfaz visual para usuarios

## Qué Verás en Cada URL

### En Railway (`https://tu-app.railway.app`)

Ahora verás un JSON con información:
```json
{
  "service": "Slack Daily Bot API",
  "status": "running",
  "version": "1.0.0",
  "endpoints": {
    "health": "/health",
    "config": "/api/config/:userId",
    "tasks": "/api/tasks/:userId"
  },
  "webInterface": "https://tu-app.vercel.app",
  "timestamp": "..."
}
```

**Esto es correcto** - Railway solo es la API, no la interfaz web.

### En Vercel (`https://tu-app.vercel.app`)

Verás la interfaz web completa:
- Botón "Connect with Slack"
- Formulario de configuración
- Gestión de tareas
- Todo el diseño bonito

## Cómo Funciona

```
Usuario → Vercel (Interfaz Web)
           ↓
           Hace peticiones a → Railway (API)
           ↓
           Railway → Slack Bot
```

## URLs Importantes

1. **Railway**: `https://tu-app.railway.app`
   - API del bot
   - Health check: `https://tu-app.railway.app/health`

2. **Vercel**: `https://tu-app.vercel.app`
   - Interfaz web para usuarios

3. **Slack**: Tu workspace
   - Comandos: `/daily`, `/add-task`, etc.

## Configuración

En Vercel, asegúrate de tener la variable de entorno:
- `API_URL` = `https://tu-app.railway.app`

Esto permite que la interfaz web (Vercel) se comunique con la API (Railway).

---

**Resumen**: Railway muestra JSON (API), Vercel muestra la interfaz web. Ambos son necesarios.

