# 📋 Slack Daily Bot

An ultra-simple Slack bot that sends a daily message with tasks to a specified channel.

## 🚀 Features

- ✅ `/daily` command in Slack to configure the bot
- ⏰ Automatic daily messages at the configured time
- 🎨 Minimalist and modern web interface (dark mode)
- 🔗 Slack connection via OAuth
- 📱 Responsive and optimized

## 📦 Installation

### 1. Clone the repository

```bash
git clone <your-repository>
cd slack-bot
```

### 2. Install dependencies

```bash
# Install server dependencies
npm install

# Install web dependencies
cd web
npm install
cd ..
```

### 3. Configure environment variables

Copy `.env.example` to `.env` and fill in the values:

```bash
cp .env.example .env
```

Get your Slack credentials from [https://api.slack.com/apps](https://api.slack.com/apps):

1. Create a new app
2. Enable Socket Mode
3. Generate an App-Level Token with `connections:write` scope
4. Install the app to your workspace
5. Copy the Bot Token and Signing Secret

### 4. Run in development

```bash
npm run dev
```

This will start:
- Bot server on `http://localhost:3001`
- API on `http://localhost:3002`
- Web interface on `http://localhost:3000`

## 🎯 Usage

### In Slack

1. Invite the bot to your workspace
2. In any channel, type `/daily`
3. The bot will confirm the configuration

### On the Web

1. Open `http://localhost:3000`
2. Connect your Slack
3. Select the channel
4. Configure the daily message time
5. Save the configuration

## 🚢 Deploy to Vercel

### Option 1: Deploy Button

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=<your-repository>)

### Option 2: Vercel CLI

```bash
npm i -g vercel
vercel
```

### Environment Variables in Vercel

Make sure to configure these variables in the Vercel dashboard:

- `SLACK_BOT_TOKEN`
- `SLACK_SIGNING_SECRET`
- `SLACK_APP_TOKEN`

## 📁 Estructura del Proyecto

```
slack-bot/
├── server.js              # Servidor principal del bot
├── web/                   # Aplicación Next.js
│   ├── app/
│   │   ├── page.js        # Página principal
│   │   ├── layout.js      # Layout
│   │   └── globals.css    # Estilos globales
│   ├── package.json
│   └── tailwind.config.js
├── package.json
├── vercel.json            # Configuración de Vercel
└── README.md
```

## 🔧 Advanced Configuration

### Change the daily message

Edit the `sendDailyMessage` function in `server.js`:

```javascript
const message = "Your custom message here";
```

### Change the frequency

Modify the cron job in `server.js`. For example, to send every 12 hours:

```javascript
cron.schedule('0 */12 * * *', async () => {
  // ...
});
```

## 🛠️ Tecnologías

- **Node.js** - Runtime
- **@slack/bolt** - Framework de Slack
- **Next.js** - Framework web
- **Tailwind CSS** - Estilos
- **node-cron** - Tareas programadas
- **Vercel** - Hosting

## 🔍 Verify Configuration

Before running, verify that everything is configured:

```bash
npm run check
```

This script verifies that all environment variables are correct.

## 📚 Additional Documentation

- **[QUICKSTART.md](./QUICKSTART.md)** - ⚡ Quick start in 5 minutes
- **[SETUP.md](./SETUP.md)** - Detailed initial setup guide
- **[DEPLOY.md](./DEPLOY.md)** - Complete Vercel deployment instructions
- **[EXAMPLES.md](./EXAMPLES.md)** - Visual examples and use cases
- **[TROUBLESHOOTING.md](./TROUBLESHOOTING.md)** - 🔧 Common problem solutions

## 📝 Notes

- Current storage is in-memory. For production, consider using a database (PostgreSQL, MongoDB, etc.)
- OAuth authentication is simplified. For production, implement the full Slack OAuth flow
- The bot requires `chat:write` permissions in Slack
- For production, consider using Vercel Cron Jobs or an external service for cron jobs

## 🐛 Troubleshooting

If you encounter problems, check:
1. That all environment variables are configured correctly
2. That Socket Mode is enabled in your Slack App
3. That the bot has the necessary permissions
4. Server logs for specific errors

## 📄 License

MIT - See [LICENSE](./LICENSE) for more details

## 🤝 Contributing

Contributions are welcome. Please open an issue or PR.

---

Made with ❤️ for fast and simple micro-SaaS

