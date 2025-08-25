const pool = require("../db");

// GET all tags
const getTags = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM tags ORDER BY id DESC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET single tag
const getTagById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM tags WHERE id=$1", [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: "Tag not found" });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE tag
const createTag = async (req, res) => {
  try {
    const { name } = req.body;
    const result = await pool.query(
      "INSERT INTO tags (name) VALUES ($1) RETURNING *",
      [name]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE tag
const updateTag = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const result = await pool.query(
      "UPDATE tags SET name=$1 WHERE id=$2 RETURNING *",
      [name, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: "Tag not found" });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE tag
const deleteTag = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM tags WHERE id=$1", [id]);
    res.json({ message: "Tag deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ASSIGN tag to task
const assignTagToTask = async (req, res) => {
  try {
    const { task_id, tag_id } = req.body;
    await pool.query(
      "INSERT INTO task_tags (task_id, tag_id) VALUES ($1, $2) ON CONFLICT DO NOTHING",
      [task_id, tag_id]
    );
    res.json({ message: "Tag assigned to task" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UNASSIGN tag from task
const unassignTagFromTask = async (req, res) => {
  try {
    const { task_id, tag_id } = req.body;
    await pool.query(
      "DELETE FROM task_tags WHERE task_id=$1 AND tag_id=$2",
      [task_id, tag_id]
    );
    res.json({ message: "Tag unassigned from task" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getTags,
  getTagById,
  createTag,
  updateTag,
  deleteTag,
  assignTagToTask,
  unassignTagFromTask
};
