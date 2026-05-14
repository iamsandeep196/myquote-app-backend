const express = require("express");
const { createQuote , getQuotes , deleteQuote ,getUserQuote} = require("../controllers/quote.controller");
const { authMiddleware } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");
const router = express.Router();

router.post("/create",authMiddleware ,upload.single("image"), createQuote);
router.get("/", getQuotes);
router.delete("/:id",authMiddleware , deleteQuote);
router.get("/user-quotes", authMiddleware , getUserQuote);







module.exports = router;