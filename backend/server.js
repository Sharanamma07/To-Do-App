const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { Pool } = require("pg");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});

// Create tasks table
async function initializeDatabase() {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS tasks (
                id SERIAL PRIMARY KEY,
                title TEXT NOT NULL,
                priority VARCHAR(20) DEFAULT 'medium',
                due_date DATE,
                completed BOOLEAN DEFAULT FALSE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        console.log("Database table ready");
    } catch (error) {
        console.error("Database initialization failed:", error.message);
    }
}

// Home
app.get("/", (req, res) => {
    res.json({
        message: "TaskFlow Backend API is running 🚀"
    });
});

// Health check
app.get("/api/health", async (req, res) => {
    try {
        await pool.query("SELECT 1");

        res.json({
            status: "OK",
            database: "Connected"
        });
    } catch (error) {
        res.status(500).json({
            status: "ERROR",
            database: "Disconnected",
            error: error.message
        });
    }
});

// GET all tasks
app.get("/api/tasks", async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM tasks ORDER BY id DESC"
        );

        res.json(result.rows);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

// POST create task
app.post("/api/tasks", async (req, res) => {
    try {
        const { title, priority, due_date } = req.body;

        if (!title || !title.trim()) {
            return res.status(400).json({
                error: "Task title is required"
            });
        }

        const result = await pool.query(
            `INSERT INTO tasks (title, priority, due_date)
             VALUES ($1, $2, $3)
             RETURNING *`,
            [
                title.trim(),
                priority || "medium",
                due_date || null
            ]
        );

        res.status(201).json(result.rows[0]);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

// PUT update task
app.put("/api/tasks/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { title, priority, due_date, completed } = req.body;

        const result = await pool.query(
            `UPDATE tasks
             SET title = COALESCE($1, title),
                 priority = COALESCE($2, priority),
                 due_date = $3,
                 completed = COALESCE($4, completed)
             WHERE id = $5
             RETURNING *`,
            [
                title,
                priority,
                due_date || null,
                completed,
                id
            ]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: "Task not found"
            });
        }

        res.json(result.rows[0]);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

// DELETE task
app.delete("/api/tasks/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query(
            "DELETE FROM tasks WHERE id = $1 RETURNING *",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: "Task not found"
            });
        }

        res.json({
            message: "Task deleted successfully",
            task: result.rows[0]
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", async () => {
    console.log(`TaskFlow backend running on port ${PORT}`);
    await initializeDatabase();
});