// Mock server for local development
const express = require('express');
const cors = require('cors');
const app = express();

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

// In-memory storage for tasks
let tasks = [
  {
    id: '1',
    title: 'Complete SkyBoard project',
    description: 'Finish the React frontend and Express backend implementation',
    priority: 'High',
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    userId: 'user123'
  },
  {
    id: '2',
    title: 'Fix API connections',
    description: 'Resolve issues with API proxy and connection errors',
    priority: 'Medium',
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    userId: 'user123'
  },
  {
    id: '3',
    title: 'Add more features',
    description: 'Implement dark mode and other requested features',
    priority: 'Low',
    completed: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    userId: 'user123'
  }
];

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// GET /api/tasks
app.get('/api/tasks', (req, res) => {
  const { search, priority, completed } = req.query;
  
  let filteredTasks = [...tasks];
  
  // Apply filters
  if (search) {
    const searchTerm = search.toLowerCase();
    filteredTasks = filteredTasks.filter(task => 
      task.title.toLowerCase().includes(searchTerm) || 
      (task.description && task.description.toLowerCase().includes(searchTerm))
    );
  }
  
  if (priority) {
    filteredTasks = filteredTasks.filter(task => task.priority === priority);
  }
  
  if (completed !== undefined) {
    const completedBool = completed === 'true';
    filteredTasks = filteredTasks.filter(task => task.completed === completedBool);
  }
  
  res.json(filteredTasks);
});

// GET /api/tasks/:id
app.get('/api/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === req.params.id);
  
  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }
  
  res.json(task);
});

// POST /api/tasks
app.post('/api/tasks', (req, res) => {
  const newTask = {
    id: Date.now().toString(),
    ...req.body,
    userId: 'user123', // Mock user ID
    completed: req.body.completed || false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// PATCH /api/tasks/:id
app.patch('/api/tasks/:id', (req, res) => {
  const taskIndex = tasks.findIndex(t => t.id === req.params.id);
  
  if (taskIndex === -1) {
    return res.status(404).json({ message: 'Task not found' });
  }
  
  const updatedTask = {
    ...tasks[taskIndex],
    ...req.body,
    updatedAt: new Date().toISOString()
  };
  
  tasks[taskIndex] = updatedTask;
  res.json(updatedTask);
});

// DELETE /api/tasks/:id
app.delete('/api/tasks/:id', (req, res) => {
  const taskIndex = tasks.findIndex(t => t.id === req.params.id);
  
  if (taskIndex === -1) {
    return res.status(404).json({ message: 'Task not found' });
  }
  
  tasks.splice(taskIndex, 1);
  res.status(204).end();
});

// Auth mock endpoint
app.get('/api/auth/status', (req, res) => {
  res.json({ 
    authenticated: true, 
    user: {
      id: 'user123',
      displayName: 'Test User',
      email: 'test@example.com'
    }
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Mock server running on port ${PORT}`);
}); 