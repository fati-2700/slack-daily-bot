# ⚡ Inicio Rápido

## 5 Minutos para Tenerlo Funcionando

### 1. Instalar Dependencias (2 min)

```bash
npm install
cd web && npm install && cd ..
```

### 2. Configurar Slack App (2 min)

1. Ve a [api.slack.com/apps](https://api.slack.com/apps) → Create New App
2. Activa **Socket Mode** → Genera App Token
   - Selecciona el scope: `connections:write` (es el único necesario)
3. Ve a **OAuth & Permissions** → Agrega scopes: `chat:write`, `commands`
4. Instala en tu workspace → Copia Bot Token
5. Copia **Signing Secret** desde Basic Information

### 3. Configurar Variables (1 min)

Crea `.env`:

```env
SLACK_BOT_TOKEN=xoxb-tu-token
SLACK_SIGNING_SECRET=tu-secret
SLACK_APP_TOKEN=xapp-tu-token
```

### 4. Ejecutar

```bash
npm run dev
```

### 5. Probar

1. Abre `http://localhost:3000`
2. Conecta Slack
3. Configura canal y hora
4. En Slack, escribe `/daily`

¡Listo! 🎉

---

**¿Problemas?** Revisa [SETUP.md](./SETUP.md) para más detalles.

