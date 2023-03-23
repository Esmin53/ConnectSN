const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Please provide first name!"],
        minlength: [2, "Your name must contain atleast two characters!"],
        maxlength: [50, "Name can not be longer than 50 characters!"]
    },
    lastName: {
        type: String,
        required: [true, "Please provide last name!"],
        minlength: [2, "Your last name must contain atleast two characters!"],
        maxlength: [50, "Last name can not be longer than 50 characters!"]
    },
    email: {
        type: String,
        required: [true, "Please provide password!"],
        maxlength: [150, "Name can not be longer than 50 characters!"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please provide first name!"],
        minlength: [6, "Your password should be atleast 6 characters long!"],
    },
    profilePicture: {
        type: String,
        default: "https://static.vecteezy.com/system/resources/previews/008/442/086/original/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg",
    },
    backgroundImage: String,
    location: String,
    occupation: String,
    instagram: String,
    facebook: String,
    linkedin: String,
    friends: {
        type: Array,
        default: []
    },
    sentRequests: {
        type: Array,
        default: []
    },
    recievedRequests: {
        type: Array,
        default: []
    },
    posts: {
        type: Array,
        default: []
    }}, 
    {
    timestamps: true
});

UserSchema.pre("save",async function (){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

UserSchema.methods.generateToken = function(){
    return jwt.sign({userId: this._id, name: this.firstName}, process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_LIFETIME});
};

UserSchema.methods.comparePassword = async function(candidatePassword){
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
};


module.exports = mongoose.model("User", UserSchema);