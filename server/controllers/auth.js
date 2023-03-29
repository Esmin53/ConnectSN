const User = require("../models/User");

const register = async (req, res) => {
    try {
        const checkEmail = await User.findOne({email: req.body.email});

        if(checkEmail) {
            return res.status(400).json({msg: "User with that email already exist!"});
        }

        const user = await User.create(req.body);
        const token = await user.generateToken();

        res.status(201).json({user, token});
    } catch (error) {
        res.status(400).json(error.message);
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
        return res.status(200).json({ data, token });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

module.exports = {login, register};