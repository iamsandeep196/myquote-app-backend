const express = require("express");
const { registerUser , loginUser , userLogout } = require("../controllers/auth.controller");
const router = express.Router();

// authRoutes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout",userLogout)


module.exports = router;