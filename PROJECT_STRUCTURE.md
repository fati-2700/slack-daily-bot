# 📁 Estructura del Proyecto

```
slack-bot/
│
├── 📄 server.js                 # Servidor principal del bot Slack
│   ├── Configuración de Bolt
│   ├── Comando /daily
│   ├── Cron job diario
│   └── API REST para la web
│
├── 📁 web/                      # Aplicación Next.js
│   ├── app/
│   │   ├── page.js             # Página principal (interfaz de configuración)
│   │   ├── layout.js           # Layout base
│   │   ├── globals.css          # Estilos globales (Tailwind)
│   │   └── api/
│   │       ├── config/
│   │       │   └── route.js    # API route para configuración
│   │       └── slack/
│   │           └── events/
│   │               └── route.js # Webhook para eventos de Slack
│   ├── package.json
│   ├── next.config.js
│   ├── tailwind.config.js      # Configuración de Tailwind (modo oscuro)
│   └── postcss.config.js
│
├── 📄 package.json              # Dependencias del servidor
├── 📄 vercel.json               # Configuración de deploy en Vercel
├── 📄 .gitignore
│
└── 📚 Documentación
    ├── README.md                # Documentación principal
    ├── QUICKSTART.md            # Inicio rápido
    ├── SETUP.md                 # Guía de configuración
    ├── DEPLOY.md                # Guía de deploy
    ├── EXAMPLES.md              # Ejemplos visuales
    ├── PROJECT_STRUCTURE.md     # Este archivo
    ├── LICENSE                  # Licencia MIT
    └── env.example              # Ejemplo de variables de entorno
```

## Flujo de Datos

```
Usuario en Slack
    ↓
/daily command
    ↓
server.js (Bolt)
    ↓
Guarda configuración en memoria
    ↓
Cron job verifica cada minuto
    ↓
Si es la hora configurada → Envía mensaje

Usuario en Web
    ↓
http://localhost:3000
    ↓
Conecta Slack (simulado)
    ↓
Selecciona canal y hora
    ↓
POST /api/config
    ↓
server.js guarda configuración
    ↓
Cron job usa esta configuración
```

## Archivos Clave

### `server.js`
- Maneja la conexión con Slack via Bolt
- Procesa el comando `/daily`
- Ejecuta el cron job diario
- Expone API REST para la web

### `web/app/page.js`
- Interfaz React con Tailwind
- Maneja la conexión con Slack
- Formulario de configuración
- Botón de deploy a Vercel

### `web/app/api/config/route.js`
- API route de Next.js
- Proxy al servidor backend
- Maneja GET y POST de configuración

## Tecnologías por Capa

**Backend:**
- Node.js
- @slack/bolt
- Express
- node-cron

**Frontend:**
- Next.js 14
- React 18
- Tailwind CSS

**Infraestructura:**
- Vercel (deploy)
- Socket Mode (Slack)

