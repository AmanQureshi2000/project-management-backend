const pool = require("../db");

// GET all comments (optionally filter by taskId)
const getComments = async (req, res) => {
  try {
    const { taskId } = req.query;
    let result;
    if (taskId) {
      result = await pool.query(
        "SELECT * FROM comments WHERE task_id = $1 ORDER BY created_at ASC",
        [taskId]
      );
    } else {
      result = await pool.query("SELECT * FROM comments ORDER BY created_at DESC");
    }
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET single comment
const getCommentById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM comments WHERE id=$1", [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: "Comment not found" });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE comment
const createComment = async (req, res) => {
  try {
    const { task_id, content } = req.body;
    const result = await pool.query(
      "INSERT INTO comments (task_id, content) VALUES ($1, $2) RETURNING *",
      [task_id, content]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE comment
const updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const result = await pool.query(
      "UPDATE comments SET content=$1 WHERE id=$2 RETURNING *",
      [content, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: "Comment not found" });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE comment
const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM comments WHERE id=$1", [id]);
    res.json({ message: "Comment deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getComments, getCommentById, createComment, updateComment, deleteComment };
