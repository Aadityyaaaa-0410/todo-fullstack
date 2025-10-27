require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for frontend calls

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// Get all EC2 todos
app.get('/todos-a', async (req, res) => {
    try {
        const todos = await db.getTodos(); // Can use separate table if needed
        res.json(todos);
    } catch (error) {
        console.error('Error fetching EC2 todos:', error);
        res.status(500).json({ error: 'Error fetching EC2 todos' });
    }
});

// Add a new EC2 todo
app.post('/add-todo-a', async (req, res) => {
    const { task } = req.body;
    
    if (!task || task.trim() === '') {
        return res.status(400).json({ error: 'Task is required' });
    }
    
    try {
        await db.addTodo(task); // Can use separate table if needed
        res.status(201).json({ message: 'EC2 Todo added successfully' });
    } catch (error) {
        console.error('Error adding EC2 todo:', error);
        res.status(500).json({ error: 'Error adding EC2 todo' });
    }
});

// Delete an EC2 todo by ID
app.delete('/delete-todo-a/:id', async (req, res) => {
    const { id } = req.params;
    
    if (!id) {
        return res.status(400).json({ error: 'Todo ID is required' });
    }
    
    try {
        const result = await db.deleteTodo(id); // Can use separate table if needed
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'EC2 Todo not found' });
        }
        
        res.status(200).json({ message: 'EC2 Todo deleted successfully' });
    } catch (error) {
        console.error('Error deleting EC2 todo:', error);
        res.status(500).json({ error: 'Error deleting EC2 todo' });
    }
});

app.listen(5000, () => {
    console.log('EC2 Backend running on port 5000');
});