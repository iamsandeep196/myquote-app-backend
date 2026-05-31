const express = require("express");
const { createQuote , getQuotes , deleteQuote ,getUserQuote , toggleLike , getUserQuotes } = require("../controllers/quote.controller");
const { authMiddleware } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");
const router = express.Router();

router.post("/create",authMiddleware ,upload.single("image"), createQuote);
router.get("/getAllQuotes",authMiddleware, getQuotes);
router.delete("/:id",authMiddleware , deleteQuote);
router.get("/myquotes", authMiddleware , getUserQuote);
router.post("/:id", authMiddleware , toggleLike);
router.get("/user/:id", authMiddleware , getUserQuotes)







module.exports = router;