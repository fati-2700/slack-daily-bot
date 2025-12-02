# ⚡ Quick Deploy Guide

## 🎯 Fastest Way to Deploy (5 Minutes)

### Prerequisites
- GitHub account
- Vercel account (free)
- Railway account (free) or Render account (free)
- Slack App already configured

---

## Step 1: Push to GitHub (2 min)

```bash
# If not already done
git init
git add .
git commit -m "Ready for deployment"
git remote add origin https://github.com/fati-2700/slack-daily-bot.git
git push -u origin main
```

---

## Step 2: Deploy Web App to Vercel (1 min)

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. **IMPORTANT**: Set **Root Directory** to `web`
4. Add environment variables:
   - `SLACK_BOT_TOKEN`
   - `SLACK_SIGNING_SECRET`
   - `SLACK_APP_TOKEN`
   - `NODE_ENV=production`
5. Click **Deploy**
6. Copy your Vercel URL (e.g., `https://your-app.vercel.app`)

---

## Step 3: Deploy Bot Server to Railway (2 min)

### Option A: Railway (Recommended)

1. Go to [railway.app](https://railway.app)
2. Sign in with GitHub
3. Click **"New Project"** → **"Deploy from GitHub repo"**
4. Select your repository
5. Add environment variables:
   - `SLACK_BOT_TOKEN`
   - `SLACK_SIGNING_SECRET`
   - `SLACK_APP_TOKEN`
   - `PORT=3001`
   - `API_PORT=3002`
6. Railway will auto-deploy
7. Copy your Railway URL (e.g., `https://your-app.railway.app`)

### Option B: Render

1. Go to [render.com](https://render.com)
2. Sign in with GitHub
3. Click **"New +"** → **"Web Service"**
4. Connect your repository
5. Configure:
   - **Name**: `slack-daily-bot`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
6. Add environment variables (same as Railway)
7. Click **"Create Web Service"**
8. Copy your Render URL

---

## Step 4: Update Vercel with API URL (30 sec)

1. Go back to Vercel dashboard
2. Go to your project → **Settings** → **Environment Variables**
3. Add: `API_URL` = your Railway/Render URL
4. Redeploy (or it will auto-redeploy)

---

## Step 5: Test Everything (1 min)

### Test Web Interface
- Visit your Vercel URL
- Connect Slack
- Configure channel and time
- Add a task

### Test Slack Commands
- In Slack: `/daily`
- In Slack: `/add-task Test task`
- In Slack: `/my-tasks`
- In Slack: `/complete-task 1`

---

## ✅ Done!

Your app is now live! 🎉

**Web App**: `https://your-app.vercel.app`  
**Bot Server**: `https://your-app.railway.app`

---

## 🔗 Quick Links

- [Vercel Dashboard](https://vercel.com/dashboard)
- [Railway Dashboard](https://railway.app/dashboard)
- [Slack App Management](https://api.slack.com/apps)

---

## 🆘 Need Help?

- Check [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed steps
- Check [DEPLOY_CHECKLIST.md](./DEPLOY_CHECKLIST.md) for verification
- Check [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) for problems

