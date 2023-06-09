const express = require("express");
const { newPost, getAllPosts, getUsersPosts, getHomepage, likePost, deletePost, comment } = require("../controllers/post");
const router = express.Router();
const { verifyToken } = require("../middleware/authorization");

// CREATE (POST) ROUTES
router.post("/newpost", verifyToken, newPost);
router.post("/like", verifyToken, likePost);
router.post("/comment/:postId", verifyToken, comment)

router.get("/allposts", verifyToken, getAllPosts);
router.get("/profile/:userId", getUsersPosts);
router.get("/homepage", verifyToken, getHomepage);

router.delete("/delete/:postId", verifyToken, deletePost)

module.exports = router