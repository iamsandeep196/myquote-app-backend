const express = require("express");
const { registerUser , loginUser,
    userLogout , getAllUsers ,
    toggleFollowing, getUserFollowing,
    searchUser,getMe ,
    updateProfile, getMyProfile } = require("../controllers/auth.controller");

const upload = require("../middlewares/uploadMiddleware");
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
router.put("/updateprofile",authMiddleware,upload.single("profilepic"),updateProfile);
router.get("/myprofile",authMiddleware , getMyProfile)


module.exports = router;