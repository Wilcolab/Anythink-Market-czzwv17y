/**
 * Express router handling comment-related API endpoints.
 *
 * @module routes/api/comments
 *
 * @requires express.Router
 * @requires mongoose
 * @requires mongoose.model.Comment - Mongoose model representing comments
 *
 * @exports {import("express").Router} router - Router exposing comment endpoints.
 *   Note: This router is typically mounted at /api/comments.
 *
 * @route GET /
 * @description Retrieve all comments.
 * @returns {Array<Object>} 200 - JSON array of comment documents.
 * @returns {Object} 500 - { error: "Failed to fetch comments" } on server error.
 *
 * @route DELETE /:id
 * @description Delete a comment by its ID.
 * @param {string} id.path.required - Comment ObjectId to delete.
 * @returns {Object} 200 - { message: "Comment deleted successfully" } when deletion completes.
 *   (Current implementation returns success even if no document was found/deleted.)
 * @returns {Object} 500 - { error: "Failed to delete comment" } on server error.
 */
const router = require("express").Router();
const mongoose = require("mongoose");
const Comment = mongoose.model("Comment");

module.exports = router;
// Hey GitHub Copilot, " and see if it completes your sentence
router.get("/", async (req, res) => {
  try {
    const comments = await Comment.find();
    res.json(comments);
  } catch (err) {
    console.error("Error fetching comments:", err);
    res.status(500).json({ error: "Failed to fetch comments" });
  }
});
//add another endpoint to delete a comment by its ID
router.delete("/:id", async (req, res) => {
  try {
    const commentId = req.params.id;
    await Comment.findByIdAndDelete(commentId);
    res.json({ message: "Comment deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete comment" });
  }
});