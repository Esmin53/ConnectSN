const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    text: {
        type: String,
        maxlength: 500
    },
    image: String,
    authorId: String,
    likes: Array
},
{
    timestamps: true
})

module.exports = mongoose.model("Post", PostSchema);