const express = require("express");
const router = express.Router();
const {
  getComments,
  getCommentById,
  createComment,
  updateComment,
  deleteComment
} = require("../controllers/commentsController");

router.get("/", getComments);
router.get("/:id", getCommentById);
router.post("/", createComment);
router.put("/:id", updateComment);
router.delete("/:id", deleteComment);

module.exports = router;
