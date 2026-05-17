const express = require("express");
const { addComment , deleteComment } = require("../controllers/comment.controller");
const { authMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router();



router.post("/:quoteId", authMiddleware ,addComment);
router.delete("/:commentId", authMiddleware , deleteComment);



module.exports = router;