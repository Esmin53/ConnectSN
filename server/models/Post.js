const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    text: {
        type: String,
        maxlength: 500
    },
    image: String,
    authorId: String,
    likes: Array,
    comments: {
        type: Array,
        default: []
    }
},
{
    timestamps: true
})

module.exports = mongoose.model("Post", PostSchema);