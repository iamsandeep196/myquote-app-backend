const express = require("express");
const { registerUser , loginUser } = require("../controllers/auth.controller");
const router = express.Router();

// REGISTER ROUTE
router.post("/register", registerUser);

// LOGIN ROUTE
router.post("/login", loginUser);


module.exports = router;