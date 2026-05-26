const express = require("express");
const { registerUser , loginUser,
    userLogout , getAllUsers ,
    toggleFollowing, getUserFollowing,
    searchUser,getMe} = require("../controllers/auth.controller");
const { authMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router();

// authRoutes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout",userLogout);
router.post("/follow/user/:id", authMiddleware ,toggleFollowing);
router.get("/users",getAllUsers);
router.get("/following/user/:id",authMiddleware,getUserFollowing);
router.get("/users/search", authMiddleware ,searchUser);
router.get("/me",authMiddleware,getMe);


module.exports = router;