const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'your-rds-endpoint.rds.amazonaws.com',
    user: process.env.DB_USER || 'admin',
    password: process.env.DB_PASSWORD || 'yourpassword',
    database: process.env.DB_NAME || 'todos_db',
    waitForConnections: true,
    connectionLimit: 10,
});

async function getTodos() {
    const [rows] = await pool.query('SELECT * FROM todos ORDER BY id DESC');
    return rows;
}

async function addTodo(task) {
    await pool.query('INSERT INTO todos (task) VALUES (?)', [task]);
}

async function deleteTodo(id) {
    const [result] = await pool.query('DELETE FROM todos WHERE id = ?', [id]);
    return result;
}

module.exports = { getTodos, addTodo, deleteTodo };