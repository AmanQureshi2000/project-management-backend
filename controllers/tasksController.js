const pool = require("../db");

// GET all tasks (optionally filter by projectId)
const getTasks = async (req, res) => {
  try {
    const { projectId } = req.query;
    let result;
    if (projectId) {
      result = await pool.query(
        "SELECT * FROM tasks WHERE project_id = $1 ORDER BY id DESC",
        [projectId]
      );
    } else {
      result = await pool.query("SELECT * FROM tasks ORDER BY id DESC");
    }
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET single task
const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM tasks WHERE id=$1", [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: "Task not found" });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE task
const createTask = async (req, res) => {
  try {
    const { project_id, title, description, priority, status, due_date } = req.body;
    const result = await pool.query(
      `INSERT INTO tasks 
        (project_id, title, description, priority, status, due_date) 
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [project_id, title, description, priority || "medium", status || "todo", due_date]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE task
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, priority, status, due_date } = req.body;
    const result = await pool.query(
      `UPDATE tasks 
       SET title=$1, description=$2, priority=$3, status=$4, due_date=$5, updated_at=NOW()
       WHERE id=$6 RETURNING *`,
      [title, description, priority, status, due_date, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: "Task not found" });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE task
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM tasks WHERE id=$1", [id]);
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getTasks, getTaskById, createTask, updateTask, deleteTask };
