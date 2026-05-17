const express = require("express");
const { registerUser , loginUser , userLogout , getAllUsers , toggleFollowing } = require("../controllers/auth.controller");
const { authMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router();

// authRoutes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout",userLogout);
router.post("/follow/:id", authMiddleware ,toggleFollowing);
router.get("/users",getAllUsers);


module.exports = router;