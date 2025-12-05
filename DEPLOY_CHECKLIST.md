

# ✅ Deployment Checklist

Use this checklist to ensure everything is ready before deploying.

## 📦 Pre-Deployment

### Code Preparation
- [ ] All code is committed to Git
- [ ] Code is pushed to GitHub/GitLab/Bitbucket
- [ ] No console errors in development
- [ ] All features tested locally
- [ ] `.env` file is NOT committed (in .gitignore)

### Slack App Setup
- [ ] Slack App created at [api.slack.com/apps](https://api.slack.com/apps)
- [ ] Socket Mode is **ENABLED**
- [ ] App-Level Token created with `connections:write` scope
- [ ] Bot Token obtained (starts with `xoxb-`)
- [ ] Signing Secret copied
- [ ] App installed to workspace
- [ ] Bot has `chat:write` permission
- [ ] Bot has `commands` permission

### Slash Commands Created
- [ ] `/daily` command created (NO Request URL)
- [ ] `/add-task` command created (NO Request URL)
- [ ] `/my-tasks` command created (NO Request URL)
- [ ] `/complete-task` command created (NO Request URL)

### Environment Variables Ready
- [ ] `SLACK_BOT_TOKEN` copied
- [ ] `SLACK_SIGNING_SECRET` copied
- [ ] `SLACK_APP_TOKEN` copied

---

## 🚀 Deployment Steps

### Step 1: Deploy Web App (Vercel)
- [ ] Vercel account created
- [ ] Repository imported to Vercel
- [ ] Root directory set to `web`
- [ ] Framework preset: Next.js
- [ ] Environment variables added:
  - [ ] `SLACK_BOT_TOKEN`
  - [ ] `SLACK_SIGNING_SECRET`
  - [ ] `SLACK_APP_TOKEN`
  - [ ] `NODE_ENV=production`
  - [ ] `API_URL` (if using separate server)
- [ ] Deployment successful
- [ ] Web app URL obtained

### Step 2: Deploy Bot Server
- [ ] Hosting service chosen (Railway/Render/Fly.io)
- [ ] Account created
- [ ] Repository connected
- [ ] Environment variables added:
  - [ ] `SLACK_BOT_TOKEN`
  - [ ] `SLACK_SIGNING_SECRET`
  - [ ] `SLACK_APP_TOKEN`
  - [ ] `PORT` (if needed)
  - [ ] `API_PORT` (if needed)
- [ ] Server deployed and running
- [ ] Server URL obtained
- [ ] Health check endpoint working: `/health`

### Step 3: Update Configuration
- [ ] `API_URL` updated in Vercel (if using separate server)
- [ ] CORS configured correctly
- [ ] All URLs verified

---

## 🧪 Testing

### Web Interface Tests
- [ ] Web app loads without errors
- [ ] "Connect with Slack" button works
- [ ] Channel selection works
- [ ] Time configuration works
- [ ] "Save Configuration" works
- [ ] Tasks section loads
- [ ] Can add tasks from web
- [ ] Can complete tasks from web
- [ ] Can delete tasks from web

### Slack Commands Tests
- [ ] `/daily` command responds
- [ ] `/add-task Buy groceries` adds task
- [ ] `/my-tasks` shows tasks
- [ ] `/complete-task 1` completes task
- [ ] All commands show correct responses

### Daily Message Test
- [ ] Configuration saved via `/daily`
- [ ] Time set correctly
- [ ] Daily message sends at configured time
- [ ] Message includes pending tasks
- [ ] Message format is correct

### API Tests
- [ ] `GET /health` returns 200
- [ ] `GET /api/config/:userId` works
- [ ] `POST /api/config` works
- [ ] `GET /api/tasks/:userId` works
- [ ] `POST /api/tasks` works
- [ ] `PUT /api/tasks/:userId/:taskId` works
- [ ] `DELETE /api/tasks/:userId/:taskId` works

---

## 🔍 Post-Deployment Verification

### Functionality
- [ ] Bot responds to all commands
- [ ] Tasks persist between sessions
- [ ] Daily messages send automatically
- [ ] Web interface syncs with Slack
- [ ] No errors in server logs
- [ ] No errors in browser console

### Performance
- [ ] Web app loads quickly (< 3 seconds)
- [ ] API responses are fast (< 1 second)
- [ ] No memory leaks (check server logs)
- [ ] Cron job runs correctly

### Security
- [ ] Environment variables are secure (not in code)
- [ ] CORS is configured correctly
- [ ] No sensitive data in logs
- [ ] API endpoints validate input

---

## 📝 Documentation

- [ ] README.md is up to date
- [ ] Deployment guide is clear
- [ ] Environment variables documented
- [ ] Troubleshooting guide available

---

## 🎉 Final Steps

- [ ] Share your app URL with users
- [ ] Test with real users
- [ ] Monitor logs for first 24 hours
- [ ] Set up error monitoring (optional)
- [ ] Celebrate! 🎊

---

## 🆘 If Something Goes Wrong

1. Check server logs
2. Check Vercel deployment logs
3. Verify environment variables
4. Test locally first
5. Check [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)
6. Review [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

---

**Status**: ⬜ Not Started | 🟡 In Progress | ✅ Complete

