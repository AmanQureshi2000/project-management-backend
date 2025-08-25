const express = require("express");
const router = express.Router();
const {
  getTags,
  getTagById,
  createTag,
  updateTag,
  deleteTag,
  assignTagToTask,
  unassignTagFromTask
} = require("../controllers/tagsController");

// Task-tag relationship
router.post("/assign", assignTagToTask);
router.delete("/unassign", unassignTagFromTask);

router.get("/", getTags);
router.get("/:id", getTagById);
router.post("/", createTag);
router.put("/:id", updateTag);
router.delete("/:id", deleteTag);



module.exports = router;
