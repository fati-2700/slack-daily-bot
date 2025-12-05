'use client'

import { useState, useEffect } from 'react'

export default function Home() {
  const [isConnected, setIsConnected] = useState(false)
  const [channelId, setChannelId] = useState('')
  const [hour, setHour] = useState(9)
  const [minute, setMinute] = useState(0)
  const [channels, setChannels] = useState([])
  const [loading, setLoading] = useState(false)
  const [userId, setUserId] = useState('')
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState('')
  const [tasksLoading, setTasksLoading] = useState(false)

  // Connect to Slack and fetch real channels
  const connectSlack = async () => {
    setLoading(true)
    try {
      // Fetch real channels from Slack API
      const apiUrl = typeof window !== 'undefined' && window.location.hostname === 'localhost'
        ? 'http://localhost:3002/api/channels'
        : '/api/channels';
      
      console.log('Fetching channels from:', apiUrl);
      
      const response = await fetch(apiUrl);
      const data = await response.json();
      
      if (!response.ok) {
        console.error('Error response:', data);
        let errorMessage = data.error || `Error ${response.status}`;
        
        // Provide helpful error messages
        if (data.slackError === 'missing_scope') {
          errorMessage = 'Bot is missing required permissions.\n\n' +
            'Please:\n' +
            '1. Go to api.slack.com/apps\n' +
            '2. Select your app → OAuth & Permissions\n' +
            '3. Add these scopes to "Bot Token Scopes":\n' +
            '   - channels:read\n' +
            '   - groups:read\n' +
            '4. Click "Reinstall to Workspace"\n' +
            '5. Try again';
        } else if (data.details) {
          errorMessage += '\n\n' + data.details;
        }
        
        throw new Error(errorMessage);
      }
      
      console.log('Channels received:', data.channels);
      console.log('Response data:', data);
      
      // Set channels
      if (!data.channels || data.channels.length === 0) {
        const message = data.message || data.warning || 'No channels found.';
        const fullMessage = message + '\n\nTo fix this:\n1. Invite the bot to a channel: /invite @bot-name\n2. Make sure the bot has channels:read permission';
        alert(fullMessage);
        setChannels([]);
      } else {
        setChannels(data.channels);
        console.log(`✅ Loaded ${data.channels.length} channels successfully`);
      }
      
      // For now, prompt user for their Slack user ID
      // TODO: Implement real OAuth to get actual userId automatically
      const userInput = prompt(
        'Enter your Slack User ID:\n\n' +
        'You can find it in Railway logs after running /daily in Slack.\n' +
        'It looks like: U0A0TPDCS4A\n\n' +
        'If you leave it empty, the configuration won\'t match with Slack commands.'
      );
      const slackUserId = userInput?.trim() || 'U123456';
      if (slackUserId === 'U123456') {
        alert('⚠️ Warning: Using default User ID. Your configuration from the web won\'t match with /daily command in Slack.\n\nTo fix this, find your User ID in Railway logs and use it here.');
      }
      setUserId(slackUserId);
      console.log('Using Slack User ID:', slackUserId);
      
      setIsConnected(true);
      setLoading(false);
      loadConfig(); // Load existing configuration
      loadTasks();
    } catch (error) {
      console.error('Error connecting to Slack:', error);
      alert(`Error loading channels:\n\n${error.message}\n\nCheck the browser console (F12) for more details.`);
      setLoading(false);
    }
  }

  const loadConfig = async () => {
    if (!userId) return
    try {
      const apiUrl = typeof window !== 'undefined' && window.location.hostname === 'localhost'
        ? `http://localhost:3002/api/config/${userId}`
        : `/api/config?userId=${userId}`
      
      const response = await fetch(apiUrl)
      if (response.ok) {
        const config = await response.json()
        if (config) {
          setChannelId(config.channelId || '')
          setHour(config.hour !== undefined ? config.hour : 9)
          setMinute(config.minute !== undefined ? config.minute : 0)
          console.log('✅ Loaded existing config:', config)
        }
      }
    } catch (error) {
      console.error('Error loading config:', error)
    }
  }

  const loadTasks = async () => {
    if (!userId) return
    try {
      const apiUrl = process.env.NODE_ENV === 'production' 
        ? `/api/tasks/${userId}` 
        : `http://localhost:3002/api/tasks/${userId}`
      
      const response = await fetch(apiUrl)
      const data = await response.json()
      setTasks(data.tasks || [])
    } catch (error) {
      console.error('Error loading tasks:', error)
    }
  }

  const addTask = async () => {
    if (!newTask.trim() || !userId) return

    setTasksLoading(true)
    try {
      const apiUrl = process.env.NODE_ENV === 'production' 
        ? '/api/tasks' 
        : 'http://localhost:3002/api/tasks'
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          text: newTask.trim(),
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to add task')
      }

      const data = await response.json()
      setTasks([...tasks, data.task])
      setNewTask('')
    } catch (error) {
      console.error('Error adding task:', error)
      alert('Error adding task. Please try again.')
    } finally {
      setTasksLoading(false)
    }
  }

  const toggleTask = async (taskId, completed) => {
    try {
      const apiUrl = process.env.NODE_ENV === 'production' 
        ? `/api/tasks/${userId}/${taskId}` 
        : `http://localhost:3002/api/tasks/${userId}/${taskId}`
      
      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed: !completed }),
      })

      if (!response.ok) {
        throw new Error('Failed to update task')
      }

      const data = await response.json()
      setTasks(tasks.map(task => task.id === taskId ? data.task : task))
    } catch (error) {
      console.error('Error updating task:', error)
      alert('Error updating task. Please try again.')
    }
  }

  const deleteTask = async (taskId) => {
    if (!confirm('Are you sure you want to delete this task?')) return

    try {
      const apiUrl = process.env.NODE_ENV === 'production' 
        ? `/api/tasks/${userId}/${taskId}` 
        : `http://localhost:3002/api/tasks/${userId}/${taskId}`
      
      const response = await fetch(apiUrl, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete task')
      }

      setTasks(tasks.filter(task => task.id !== taskId))
    } catch (error) {
      console.error('Error deleting task:', error)
      alert('Error deleting task. Please try again.')
    }
  }

  useEffect(() => {
    if (isConnected && userId) {
      loadTasks()
    }
  }, [isConnected, userId])

  const saveConfig = async () => {
    if (!channelId) {
      alert('Please select a channel')
      return
    }

    setLoading(true)
    try {
      // Use Next.js API route in production, or directly the server in development
      // In production, the API route will proxy to Railway
      const apiUrl = typeof window !== 'undefined' && window.location.hostname === 'localhost'
        ? 'http://localhost:3002/api/config'
        : '/api/config';
      
      console.log('Sending configuration to:', apiUrl);
      console.log('Data:', { userId, channelId, hour, minute });
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          channelId,
          hour,
          minute,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Error ${response.status}`);
      }

      const data = await response.json()
      console.log('Server response:', data);
      
      if (data.success) {
        alert('✅ Configuration saved successfully')
      } else {
        throw new Error('Response was not successful')
      }
    } catch (error) {
      console.error('Complete error:', error)
      alert(`Error saving configuration: ${error.message}\n\nMake sure the server is running on port 3002.`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-dark-surface rounded-2xl border border-dark-border p-8 shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2 text-dark-text">
              Slack Daily Bot
            </h1>
            <p className="text-dark-muted">
              Configure your bot for daily messages
            </p>
          </div>

          {!isConnected ? (
            <div className="space-y-6">
              <button
                onClick={connectSlack}
                disabled={loading}
                className="w-full bg-[#4A154B] hover:bg-[#5a1f5b] text-white font-medium py-3 px-6 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Connecting...' : '🔗 Connect with Slack'}
              </button>
              <p className="text-sm text-dark-muted text-center">
                Connect your Slack workspace to get started
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-green-900/20 border border-green-800/50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-green-400">Connected to Slack</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-text mb-2">
                  Slack Channel
                </label>
                <select
                  value={channelId}
                  onChange={(e) => setChannelId(e.target.value)}
                  className="w-full bg-dark-bg border border-dark-border rounded-xl px-4 py-3 text-dark-text focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select a channel</option>
                  {channels.map((channel) => (
                    <option key={channel.id} value={channel.id}>
                      {channel.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-text mb-2">
                  Daily message time
                </label>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <label className="block text-xs text-dark-muted mb-1">Hour</label>
                    <input
                      type="number"
                      min="0"
                      max="23"
                      value={hour}
                      onChange={(e) => setHour(parseInt(e.target.value) || 0)}
                      className="w-full bg-dark-bg border border-dark-border rounded-xl px-4 py-3 text-dark-text focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs text-dark-muted mb-1">Minute</label>
                    <input
                      type="number"
                      min="0"
                      max="59"
                      value={minute}
                      onChange={(e) => setMinute(parseInt(e.target.value) || 0)}
                      className="w-full bg-dark-bg border border-dark-border rounded-xl px-4 py-3 text-dark-text focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <p className="text-xs text-dark-muted mt-2">
                  Time in 24h format. Current: {String(hour).padStart(2, '0')}:{String(minute).padStart(2, '0')}
                </p>
              </div>

              <button
                onClick={saveConfig}
                disabled={loading || !channelId}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Saving...' : '💾 Save Configuration'}
              </button>

              <div className="pt-4 border-t border-dark-border">
                <p className="text-xs text-dark-muted text-center mb-4">
                  💡 Use the <code className="bg-dark-bg px-2 py-1 rounded">/daily</code> command in Slack to activate the bot
                </p>
              </div>

              {/* Tasks Section */}
              <div className="pt-4 border-t border-dark-border">
                <h3 className="text-lg font-semibold text-dark-text mb-4">Your Tasks</h3>
                
                {/* Add Task */}
                <div className="flex gap-2 mb-4">
                  <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addTask()}
                    placeholder="Add a new task..."
                    className="flex-1 bg-dark-bg border border-dark-border rounded-xl px-4 py-2 text-dark-text focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={addTask}
                    disabled={tasksLoading || !newTask.trim()}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Add
                  </button>
                </div>

                {/* Tasks List */}
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {tasks.length === 0 ? (
                    <p className="text-sm text-dark-muted text-center py-4">
                      No tasks yet. Add one above!
                    </p>
                  ) : (
                    tasks
                      .filter(task => !task.completed)
                      .map((task) => (
                        <div
                          key={task.id}
                          className="flex items-center gap-3 p-3 bg-dark-bg rounded-xl border border-dark-border"
                        >
                          <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => toggleTask(task.id, task.completed)}
                            className="w-4 h-4 rounded border-dark-border text-blue-600 focus:ring-blue-500"
                          />
                          <span className="flex-1 text-dark-text">{task.text}</span>
                          <button
                            onClick={() => deleteTask(task.id)}
                            className="text-red-400 hover:text-red-300 text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      ))
                  )}
                  
                  {tasks.filter(task => task.completed).length > 0 && (
                    <div className="mt-4 pt-4 border-t border-dark-border">
                      <p className="text-xs text-dark-muted mb-2">Completed ({tasks.filter(task => task.completed).length})</p>
                      {tasks
                        .filter(task => task.completed)
                        .slice(-3)
                        .map((task) => (
                          <div
                            key={task.id}
                            className="flex items-center gap-2 p-2 text-sm text-dark-muted line-through"
                          >
                            <span>✅</span>
                            <span className="flex-1">{task.text}</span>
                            <button
                              onClick={() => deleteTask(task.id)}
                              className="text-red-400 hover:text-red-300 text-xs"
                            >
                              Delete
                            </button>
                          </div>
                        ))}
                    </div>
                  )}
                </div>

                <p className="text-xs text-dark-muted text-center mt-4">
                  💡 Use <code className="bg-dark-bg px-2 py-1 rounded">/add-task</code>, <code className="bg-dark-bg px-2 py-1 rounded">/my-tasks</code>, and <code className="bg-dark-bg px-2 py-1 rounded">/complete-task</code> in Slack
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 text-center">
          <a
            href="https://vercel.com/new/clone?repository-url=https://github.com/tu-usuario/slack-daily-bot"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-black hover:bg-gray-900 text-white font-medium rounded-xl border border-gray-800 transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 76 65" fill="none" className="flex-shrink-0">
              <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" fill="currentColor"/>
            </svg>
            Deploy to Vercel
          </a>
        </div>
      </div>
    </div>
  )
}

