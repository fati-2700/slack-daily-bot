# 🚀 Complete Deployment Guide

## 📋 Pre-Deployment Checklist

Before deploying, make sure you have:

- [ ] Code pushed to GitHub/GitLab/Bitbucket
- [ ] Slack App created at [api.slack.com/apps](https://api.slack.com/apps)
- [ ] Socket Mode enabled in Slack App
- [ ] All 4 slash commands created in Slack:
  - `/daily`
  - `/add-task`
  - `/my-tasks`
  - `/complete-task`
- [ ] Bot Token (starts with `xoxb-`)
- [ ] App Token (starts with `xapp-`)
- [ ] Signing Secret
- [ ] Vercel account (free tier works)

---

## 🎯 Step-by-Step Deployment

### Step 1: Prepare Your Repository

1. **Initialize Git** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Slack Daily Bot"
   ```

2. **Push to GitHub**:
   ```bash
   # Create a new repository on GitHub first
   git remote add origin https://github.com/YOUR_USERNAME/slack-daily-bot.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Deploy to Vercel

#### Option A: Using Vercel Dashboard (Recommended)

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click **"Add New..."** → **"Project"**
4. Import your repository
5. Configure the project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `web` (IMPORTANT!)
   - **Build Command**: `npm run build` (leave default)
   - **Output Directory**: `.next` (leave default)
   - **Install Command**: `npm install` (leave default)

6. **Add Environment Variables** (click "Environment Variables"):
   ```
   SLACK_BOT_TOKEN = xoxb-your-bot-token-here
   SLACK_SIGNING_SECRET = your-signing-secret-here
   SLACK_APP_TOKEN = xapp-your-app-token-here
   NODE_ENV = production
   ```

7. Click **"Deploy"**

#### Option B: Using Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
cd web
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? (select your account)
# - Link to existing project? No
# - Project name? slack-daily-bot (or your choice)
# - Directory? ./
# - Override settings? No

# Add environment variables
vercel env add SLACK_BOT_TOKEN
vercel env add SLACK_SIGNING_SECRET
vercel env add SLACK_APP_TOKEN
vercel env add NODE_ENV production
```

### Step 3: Deploy the Bot Server Separately

**Important**: Vercel is optimized for Next.js, but your bot server needs to run continuously. You have two options:

#### Option A: Use a Separate Hosting Service (Recommended)

Deploy `server.js` to a service that supports long-running processes:

**Recommended Services:**
- **Railway** (railway.app) - Free tier available
- **Render** (render.com) - Free tier available
- **Fly.io** (fly.io) - Free tier available
- **Heroku** (heroku.com) - Paid plans
- **DigitalOcean App Platform** - Paid plans

**Example: Railway Deployment**

1. Go to [railway.app](https://railway.app)
2. Sign in with GitHub
3. Click **"New Project"** → **"Deploy from GitHub repo"**
4. Select your repository
5. Railway will auto-detect Node.js
6. Add environment variables:
   - `SLACK_BOT_TOKEN`
   - `SLACK_SIGNING_SECRET`
   - `SLACK_APP_TOKEN`
   - `PORT` (optional, Railway assigns automatically)
   - `API_PORT` (optional, set to 3002)
7. Deploy!

**Update vercel.json** to point to your Railway URL:
```json
{
  "env": {
    "API_URL": "https://your-railway-app.railway.app"
  }
}
```

#### Option B: Use Vercel Serverless Functions

Convert your Express server to Vercel serverless functions. This is more complex but keeps everything in one place.

### Step 4: Update Slack App Configuration

1. Go to [api.slack.com/apps](https://api.slack.com/apps)
2. Select your app
3. **Verify Socket Mode is enabled** (it should be)
4. **Verify all slash commands exist**:
   - `/daily` - No Request URL needed (Socket Mode)
   - `/add-task` - No Request URL needed
   - `/my-tasks` - No Request URL needed
   - `/complete-task` - No Request URL needed

### Step 5: Test Your Deployment

1. **Test the Web Interface**:
   - Visit your Vercel URL: `https://your-app.vercel.app`
   - Connect Slack (simulated)
   - Configure channel and time
   - Save configuration

2. **Test Slack Commands**:
   - In Slack, type `/daily` in any channel
   - Type `/add-task Buy groceries`
   - Type `/my-tasks` to see your tasks
   - Type `/complete-task 1` to complete the first task

3. **Test Daily Message**:
   - Set the time to a few minutes from now
   - Wait and verify the message arrives

---

## 🔧 Configuration Files

### vercel.json (for Next.js web app)
```json
{
  "version": 2,
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "env": {
    "API_URL": "https://your-bot-server-url.com"
  }
}
```

### For Railway/Render (server.js)
Create `Procfile`:
```
web: node server.js
```

Or use `package.json`:
```json
{
  "scripts": {
    "start": "node server.js"
  }
}
```

---

## 🌐 Environment Variables Reference

### For Vercel (Web App)
```
SLACK_BOT_TOKEN=xoxb-...
SLACK_SIGNING_SECRET=...
SLACK_APP_TOKEN=xapp-...
NODE_ENV=production
API_URL=https://your-bot-server.railway.app
```

### For Railway/Render (Bot Server)
```
SLACK_BOT_TOKEN=xoxb-...
SLACK_SIGNING_SECRET=...
SLACK_APP_TOKEN=xapp-...
PORT=3001
API_PORT=3002
NODE_ENV=production
```

---

## 🐛 Troubleshooting

### Bot doesn't respond in Slack

1. Check that Socket Mode is enabled
2. Verify environment variables are set correctly
3. Check server logs (Railway/Render dashboard)
4. Verify App Token has `connections:write` scope

### Web interface shows errors

1. Check Vercel deployment logs
2. Verify `API_URL` environment variable points to your bot server
3. Check browser console for errors
4. Verify CORS is enabled in server.js

### Daily messages not sending

1. Verify cron job is running (check server logs)
2. Check that `/daily` command was executed
3. Verify the time is set correctly
4. Check that the bot has `chat:write` permission

### Tasks not saving

1. Verify API endpoints are accessible
2. Check server logs for errors
3. Verify userId is being passed correctly

---

## 📊 Recommended Architecture

```
┌─────────────────┐
│   Vercel        │  → Next.js Web App (Frontend)
│   (Free Tier)   │  → Static hosting
└─────────────────┘
        │
        │ API calls
        ↓
┌─────────────────┐
│   Railway       │  → Express Server (Backend)
│   (Free Tier)   │  → Slack Bot (Socket Mode)
│                 │  → Cron Jobs
└─────────────────┘
        │
        │ WebSocket
        ↓
┌─────────────────┐
│   Slack         │  → Your Workspace
└─────────────────┘
```

---

## 💰 Cost Estimate

**Free Tier (Recommended Setup):**
- Vercel: Free (unlimited deployments)
- Railway: Free ($5 credit/month, ~500 hours)
- **Total: $0/month**

**If you exceed free tier:**
- Railway: ~$5-10/month
- Vercel: Still free

---

## ✅ Post-Deployment Checklist

- [ ] Web app is accessible
- [ ] Bot responds to `/daily` command
- [ ] Bot responds to `/add-task` command
- [ ] Bot responds to `/my-tasks` command
- [ ] Bot responds to `/complete-task` command
- [ ] Tasks can be added from web interface
- [ ] Daily message sends at configured time
- [ ] All environment variables are set
- [ ] Server logs show no errors
- [ ] CORS is working (web can call API)

---

## 🚀 Quick Deploy Commands

```bash
# 1. Push to GitHub
git add .
git commit -m "Ready for deployment"
git push

# 2. Deploy to Vercel (from web directory)
cd web
vercel --prod

# 3. Deploy to Railway (from root)
railway up
```

---

**Need Help?** Check the [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) file.

