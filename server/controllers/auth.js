const User = require("../models/User");
const mongoose = require("mongoose")

const register = async (req, res) => {
    try {
        const {firstName, lastName, email, password, confirmPassword} = req.body;
        if(!firstName || !lastName || !email || !password || !confirmPassword) {
            return res.status(400).json({ msg: "Please fill in all fields!"})
        }

        const checkEmail = await User.findOne({email: req.body.email});

        if(checkEmail) {
            return res.status(400).json({msg: "User with that email already exist!"});
        }

        if(password !== confirmPassword) {
            return res.status(400).json({ msg: "Password and confirm password fields must match!"})
        }

        if(password.length < 6 ) {
            return res.status(400).json({ msg: "Password must contain atleast 5 characters!"})
        }

        const user = await User.create(req.body);
        const token = await user.generateToken();

        res.status(201).json({user, token});
    } catch (error) {
        res.status(400).json(error.message);
    }
}

const watchDocument = async (documentId) => {
    try {
        const changeStream = User.watch([{ $match: {_id: mongoose.Types.ObjectId('6424b82f38662f3392e9ca9a') } }]);
        console.log(documentId)
        
        changeStream.on('change', (change) => {
                console.log(change)
                
        })

    } catch (error) {
        console.log(error)
    }
}

const login = async (req, res) => {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({email: email});
        if(!user) {
            return res.status(400).json({msg: "Invalid credentials!"});
        }
        const isMatch = await user.comparePassword(password);
        
         if(!isMatch) {
            return res.status(400).json({msg: "Invalid credentials!"});
        }
        const token = user.generateToken();

        const data = {...user._doc};
        delete data.password;
        watchDocument(user._id)
        return res.status(200).json({ data, token });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

module.exports = {login, register};