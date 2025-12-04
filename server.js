require('dotenv').config();
const { App } = require('@slack/bolt');
const express = require('express');
const cron = require('node-cron');

// Initialize Express app for API
const expressApp = express();

// Handle CORS errors FIRST (before routes)
expressApp.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

expressApp.use(express.json());

// Check environment variables
if (!process.env.SLACK_BOT_TOKEN || !process.env.SLACK_SIGNING_SECRET || !process.env.SLACK_APP_TOKEN) {
  console.error('❌ Error: Missing environment variables. Check your .env file');
  process.exit(1);
}

// Initialize Slack app
// Note: With Socket Mode, we don't need a port for the Slack app
// The Express server will handle HTTP requests
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN
});

// Simple in-memory storage (in production you'd use a database)
const userConfigs = new Map();
const userTasks = new Map(); // userId -> array of tasks

// /daily command
app.command('/daily', async ({ command, ack, respond, client }) => {
  try {
    await ack();
    
    const userId = command.user_id;
    const channelId = command.channel_id;
    
    console.log(`📝 /daily command received from user ${userId} in channel ${channelId}`);
    
    // Get existing configuration or create new one
    const existingConfig = userConfigs.get(userId);
    const currentHour = existingConfig?.hour || 9; // Use existing hour or default to 9 AM
    
    console.log(`📊 Existing config for user ${userId}:`, existingConfig);
    console.log(`⏰ Using hour: ${currentHour}`);
    
    // Update configuration - preserve hour from web interface if it exists
    userConfigs.set(userId, {
      channelId: channelId, // Update channel to current channel
      hour: currentHour, // Keep the hour that was set (from web or previous config)
      enabled: true,
      lastSent: existingConfig?.lastSent || null
    });
    
    const savedConfig = userConfigs.get(userId);
    console.log(`✅ Configuration saved for user ${userId}:`, savedConfig);
    
    await respond({
      text: `✅ Configuration saved. The bot will send daily messages to this channel at ${savedConfig.hour}:00.\n\n💡 To change the time, use the web interface at your Vercel URL.`,
      response_type: 'ephemeral'
    });
  } catch (error) {
    console.error('❌ Error in /daily command:', error);
    try {
      await respond({
        text: `❌ Error processing command. Please try again.`,
        response_type: 'ephemeral'
      });
    } catch (respondError) {
      console.error('❌ Error responding:', respondError);
    }
  }
});

// /add-task command
app.command('/add-task', async ({ command, ack, respond }) => {
  try {
    await ack();
    
    const userId = command.user_id;
    const taskText = command.text.trim();
    
    if (!taskText) {
      await respond({
        text: '❌ Please provide a task. Usage: `/add-task Buy groceries`',
        response_type: 'ephemeral'
      });
      return;
    }
    
    if (!userTasks.has(userId)) {
      userTasks.set(userId, []);
    }
    
    const task = {
      id: Date.now().toString(),
      text: taskText,
      completed: false,
      createdAt: new Date().toISOString()
    };
    
    userTasks.get(userId).push(task);
    
    await respond({
      text: `✅ Task added: "${taskText}"`,
      response_type: 'ephemeral'
    });
    
    console.log(`✅ Task added for user ${userId}: ${taskText}`);
  } catch (error) {
    console.error('❌ Error in /add-task command:', error);
    try {
      await respond({
        text: '❌ Error adding task. Please try again.',
        response_type: 'ephemeral'
      });
    } catch (respondError) {
      console.error('❌ Error responding:', respondError);
    }
  }
});

// /my-tasks command
app.command('/my-tasks', async ({ command, ack, respond }) => {
  try {
    await ack();
    
    const userId = command.user_id;
    const tasks = userTasks.get(userId) || [];
    const pendingTasks = tasks.filter(task => !task.completed);
    const completedTasks = tasks.filter(task => task.completed);
    
    let message = '';
    
    if (tasks.length === 0) {
      message = '*📋 Your Tasks*\n\nNo tasks yet. Use `/add-task <your task>` to add one!';
    } else {
      message = `*📋 Your Tasks*\n\n`;
      
      if (pendingTasks.length > 0) {
        message += `*Pending (${pendingTasks.length}):*\n`;
        pendingTasks.forEach((task, index) => {
          message += `${index + 1}. ${task.text}\n`;
        });
        message += '\n';
      }
      
      if (completedTasks.length > 0) {
        message += `*Completed (${completedTasks.length}):*\n`;
        completedTasks.slice(-5).forEach((task) => {
          message += `✅ ~${task.text}~\n`;
        });
        if (completedTasks.length > 5) {
          message += `... and ${completedTasks.length - 5} more completed tasks\n`;
        }
      }
      
      if (pendingTasks.length === 0) {
        message += '\n🎉 All tasks completed! Great job!';
      }
    }
    
    await respond({
      text: message,
      response_type: 'ephemeral',
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: message
          }
        }
      ]
    });
    
    console.log(`📋 Tasks shown for user ${userId}`);
  } catch (error) {
    console.error('❌ Error in /my-tasks command:', error);
    try {
      await respond({
        text: '❌ Error retrieving tasks. Please try again.',
        response_type: 'ephemeral'
      });
    } catch (respondError) {
      console.error('❌ Error responding:', respondError);
    }
  }
});

// /complete-task command
app.command('/complete-task', async ({ command, ack, respond }) => {
  try {
    await ack();
    
    const userId = command.user_id;
    const taskIndex = parseInt(command.text.trim()) - 1;
    
    const tasks = userTasks.get(userId) || [];
    const pendingTasks = tasks.filter(task => !task.completed);
    
    if (pendingTasks.length === 0) {
      await respond({
        text: '❌ No pending tasks to complete.',
        response_type: 'ephemeral'
      });
      return;
    }
    
    if (isNaN(taskIndex) || taskIndex < 0 || taskIndex >= pendingTasks.length) {
      await respond({
        text: `❌ Invalid task number. Use a number between 1 and ${pendingTasks.length}.\nUse \`/my-tasks\` to see your tasks.`,
        response_type: 'ephemeral'
      });
      return;
    }
    
    const taskToComplete = pendingTasks[taskIndex];
    taskToComplete.completed = true;
    taskToComplete.completedAt = new Date().toISOString();
    
    await respond({
      text: `✅ Task completed: "${taskToComplete.text}"`,
      response_type: 'ephemeral'
    });
    
    console.log(`✅ Task completed for user ${userId}: ${taskToComplete.text}`);
  } catch (error) {
    console.error('❌ Error in /complete-task command:', error);
    try {
      await respond({
        text: '❌ Error completing task. Please try again.',
        response_type: 'ephemeral'
      });
    } catch (respondError) {
      console.error('❌ Error responding:', respondError);
    }
  }
});

// Function to send daily message
async function sendDailyMessage(userId, config) {
  try {
    const tasks = userTasks.get(userId) || [];
    const pendingTasks = tasks.filter(task => !task.completed);
    
    let message = "Here's your daily task summary.";
    
    if (pendingTasks.length === 0) {
      message += "\n\n✅ No pending tasks. Great job!";
    } else {
      message += `\n\n*You have ${pendingTasks.length} pending task${pendingTasks.length > 1 ? 's' : ''}:*\n`;
      pendingTasks.forEach((task, index) => {
        message += `${index + 1}. ${task.text}\n`;
      });
    }
    
    message += "\nRemember to check your board.";
    
    await app.client.chat.postMessage({
      channel: config.channelId,
      text: message,
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*📋 Daily Summary*\n\n${message}`
          }
        }
      ]
    });
  } catch (error) {
    console.error('Error sending daily message:', error);
  }
}

// Cron job that runs every minute to check if it's time to send
cron.schedule('* * * * *', async () => {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  
  // Check each configured user
  for (const [userId, config] of userConfigs.entries()) {
    if (!config.enabled) continue;
    
    // Check if it's the configured hour (and minute 0)
    if (currentHour === config.hour && currentMinute === 0) {
      // Check if already sent today
      const today = now.toDateString();
      if (config.lastSent !== today) {
        await sendDailyMessage(userId, config);
        config.lastSent = today;
      }
    }
  }
});

// API endpoints for web interface
expressApp.get('/api/config/:userId', (req, res) => {
  try {
    const userId = req.params.userId;
    const config = userConfigs.get(userId);
    console.log(`📥 GET /api/config/${userId}:`, config || 'Not found');
    res.json(config || null);
  } catch (error) {
    console.error('❌ Error in GET /api/config:', error);
    res.status(500).json({ error: error.message });
  }
});

expressApp.post('/api/config', (req, res) => {
  try {
    const { userId, channelId, hour } = req.body;
    
    console.log('📥 POST /api/config received:', { userId, channelId, hour, hourType: typeof hour });
    
    if (!userId || !channelId || hour === undefined) {
      console.error('❌ Missing parameters:', { userId, channelId, hour });
      return res.status(400).json({ error: 'Missing required parameters' });
    }
    
    const parsedHour = parseInt(hour, 10);
    if (isNaN(parsedHour) || parsedHour < 0 || parsedHour > 23) {
      console.error('❌ Invalid hour:', hour);
      return res.status(400).json({ error: 'Invalid hour. Must be between 0 and 23.' });
    }
    
    const previousConfig = userConfigs.get(userId);
    console.log('📊 Previous config:', previousConfig);
    
    userConfigs.set(userId, {
      channelId,
      hour: parsedHour,
      enabled: true,
      lastSent: previousConfig?.lastSent || null
    });
    
    const savedConfig = userConfigs.get(userId);
    console.log('✅ Configuration saved:', savedConfig);
    console.log(`⏰ Hour set to: ${savedConfig.hour}:00`);
    
    res.json({ success: true, config: savedConfig });
  } catch (error) {
    console.error('❌ Error in POST /api/config:', error);
    res.status(500).json({ error: error.message });
  }
});

// API endpoint to get Slack channels
expressApp.get('/api/channels', async (req, res) => {
  try {
    console.log('📥 GET /api/channels - Fetching channels from Slack');
    
    // Use the Slack client to get channels
    const result = await app.client.conversations.list({
      types: 'public_channel,private_channel',
      exclude_archived: true,
      limit: 200
    });
    
    if (!result.ok) {
      console.error('❌ Error fetching channels:', result.error);
      return res.status(500).json({ error: result.error || 'Failed to fetch channels' });
    }
    
    // Format channels for the frontend
    const channels = result.channels.map(channel => ({
      id: channel.id,
      name: channel.is_private ? `🔒 ${channel.name}` : `# ${channel.name}`,
      is_private: channel.is_private
    }));
    
    console.log(`✅ Found ${channels.length} channels`);
    res.json({ channels });
  } catch (error) {
    console.error('❌ Error in GET /api/channels:', error);
    res.status(500).json({ error: error.message });
  }
});

// API endpoints for tasks
expressApp.get('/api/tasks/:userId', (req, res) => {
  try {
    const userId = req.params.userId;
    const tasks = userTasks.get(userId) || [];
    console.log(`📥 GET /api/tasks/${userId}:`, tasks.length, 'tasks');
    res.json({ tasks });
  } catch (error) {
    console.error('❌ Error in GET /api/tasks:', error);
    res.status(500).json({ error: error.message });
  }
});

expressApp.post('/api/tasks', (req, res) => {
  try {
    const { userId, text } = req.body;
    
    console.log('📥 POST /api/tasks received:', { userId, text });
    
    if (!userId || !text) {
      console.error('❌ Missing parameters:', { userId, text });
      return res.status(400).json({ error: 'Missing required parameters: userId and text' });
    }
    
    if (!userTasks.has(userId)) {
      userTasks.set(userId, []);
    }
    
    const task = {
      id: Date.now().toString(),
      text: text.trim(),
      completed: false,
      createdAt: new Date().toISOString()
    };
    
    userTasks.get(userId).push(task);
    
    console.log('✅ Task added:', task);
    res.json({ success: true, task });
  } catch (error) {
    console.error('❌ Error in POST /api/tasks:', error);
    res.status(500).json({ error: error.message });
  }
});

expressApp.put('/api/tasks/:userId/:taskId', (req, res) => {
  try {
    const { userId, taskId } = req.params;
    const { completed } = req.body;
    
    const tasks = userTasks.get(userId) || [];
    const task = tasks.find(t => t.id === taskId);
    
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    task.completed = completed === true;
    if (task.completed) {
      task.completedAt = new Date().toISOString();
    } else {
      task.completedAt = null;
    }
    
    console.log('✅ Task updated:', task);
    res.json({ success: true, task });
  } catch (error) {
    console.error('❌ Error in PUT /api/tasks:', error);
    res.status(500).json({ error: error.message });
  }
});

expressApp.delete('/api/tasks/:userId/:taskId', (req, res) => {
  try {
    const { userId, taskId } = req.params;
    
    const tasks = userTasks.get(userId) || [];
    const taskIndex = tasks.findIndex(t => t.id === taskId);
    
    if (taskIndex === -1) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    const deletedTask = tasks.splice(taskIndex, 1)[0];
    
    console.log('✅ Task deleted:', deletedTask);
    res.json({ success: true, task: deletedTask });
  } catch (error) {
    console.error('❌ Error in DELETE /api/tasks:', error);
    res.status(500).json({ error: error.message });
  }
});

// Root route - Info page
expressApp.get('/', (req, res) => {
  res.json({
    service: 'Slack Daily Bot API',
    status: 'running',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      config: '/api/config/:userId',
      tasks: '/api/tasks/:userId'
    },
    webInterface: process.env.VERCEL_URL || 'https://your-app.vercel.app',
    timestamp: new Date().toISOString()
  });
});

// Health check route
expressApp.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start Express server on Railway's PORT or API_PORT
// Listen on 0.0.0.0 to accept connections from Railway
const serverPort = process.env.PORT || process.env.API_PORT || 3002;
expressApp.listen(serverPort, '0.0.0.0', () => {
  console.log('✅ API server running on port', serverPort);
  console.log('🔗 Health check: http://localhost:' + serverPort + '/health');
  console.log('🌐 Listening on 0.0.0.0:' + serverPort + ' (Railway compatible)');
});

// Global error handling
app.error((error) => {
  console.error('❌ Global bot error:', error);
});

// Start Slack app
(async () => {
  try {
    await app.start();
    console.log('⚡️ Slack bot is running!');
    console.log('📋 Commands available:');
    console.log('   - /daily - Configure daily messages');
    console.log('   - /add-task - Add a new task');
    console.log('   - /my-tasks - View your tasks');
    console.log('   - /complete-task - Mark a task as completed');
  } catch (error) {
    console.error('❌ Error starting bot:', error);
    console.error('💡 Verify that:');
    console.error('   1. Environment variables are correct');
    console.error('   2. Socket Mode is enabled in Slack');
    console.error('   3. App Token has connections:write scope');
    process.exit(1);
  }
})();

