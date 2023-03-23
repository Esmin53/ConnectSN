const { findById } = require("../models/Post")
const Post = require("../models/Post")
const User = require("../models/User")

// GET (READ) CONTROLLERS

const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find({})

        res.status(200).json(posts)
    } catch (error) {
        res.status(400).json({ msg: error})
    }
}

const getUsersPosts = async (req, res) => {
    try {
        const {userId} = req.params

        const posts = await Post.find({ authorId: userId}).sort({ createdAt: -1})

        res.status(200).json(posts)
    } catch (error) {
        res.status(400).json({ msg: error})
    }
}

const getHomepage = async (req, res) => {
    try {
        const {userId} = req.user;
        const user = await User.findById(userId)

         const posts = await Post.find({
            'authorId': {
                $in: user.friends
            }
        }).sort({ createdAt: -1})

        res.status(200).json(posts)

    } catch (error) {
        res.status(400).json({ msg: error})
    }
}

// CREATE (POST) CONTROLLERS
const newPost = async (req, res) => {
    try {
        req.body.authorId = req.user.userId;

        const newPost = await Post.create(req.body)
        
        res.status(200).json(newPost)
    } catch (error) {
        res.status(401).json({ msg: error})
    }
}

const likePost = async (req, res) => {
    try {
        const {postId} = req.body;
        const {userId} = req.user;
        
        const post = await Post.findById(postId);

        let newLikesArray = post.likes

        if(!newLikesArray.includes(userId)) {
            newLikesArray.push(userId)
        } else {
            newLikesArray = newLikesArray.filter((id) => id != userId)
        }

        const updatedLikes = await Post.findByIdAndUpdate({_id: postId}, {likes: newLikesArray}, {new: true})

        res.status(200).json(newLikesArray);
    } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: error })
    }
}

// DELETE CONTROLLERS
const deletePost = async (req, res) => {
    try {
        const {userId} = req.user;
        const {postId} = req.params;

        const post = await Post.findById(postId)

        if(userId === post.authorId) {
            await Post.findByIdAndDelete(postId)
        } else {
            return res.status(401).json("Unauthorized")
        }

        res.status(200).json("Success")
    } catch (error) {
        res.status(400).json({ msg: error })
    }
}
 





module.exports = { newPost, getAllPosts, getUsersPosts, getHomepage, likePost, deletePost }