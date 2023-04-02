const express = require("express");
const router = express.Router();
const {verifyTokenAndUser, verifyToken} = require("../middleware/authorization");
const {sendRemoveRequest, acceptDeclineRequest, removeFriend, getFriends, 
    getUser, getAllUsers, getRequests, updateUser, getUserLight, search, getRecommendedUsers, statistics} = require("../controllers/user");

//READ (GET) ROUTES
router.get("/info/:userId",verifyToken, getUser); // See single user
router.get("/getAllUsers", getAllUsers)
router.get("/getFriends/:userId",verifyToken, getFriends)
router.get("/light/:userId", verifyToken, getUserLight)
router.get("/search", verifyToken, search)
router.get("/recomendations", verifyToken, getRecommendedUsers)
router.get("/stats", verifyToken, statistics)

// CREATE (POST) ROUTES
router.post("/request", verifyToken, sendRemoveRequest); // Send or remove friend request
router.post("/answerRequest", verifyToken, acceptDeclineRequest); // Accept or decline friend request
router.post("/getRequests", verifyToken, getRequests) 

// UPDATE (PATCH) ROUTES
router.patch("/update", verifyToken, updateUser)

// DELETE ROUTES
router.delete("/remove/:friendId", verifyToken, removeFriend); // Remove user from friends list

module.exports = router;