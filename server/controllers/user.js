const User = require("../models/User");

// READ (GET) CONTROLLERS

const search = async (req, res) => {
    try {
    
        const user = await User.find({
            "firstName": {  $regex: req.query.u, $options: 'i' },
        })

        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({ msg: error })
    }
}

const getRequests = async (req, res) => {
    try {
        const {array} = req.body;

        const users = await User.find({
            '_id': {
                $in: array
            }
        })

        res.status(200).json(users)
    } catch (error) {
        res.status(400).json(error)
    }
}

const getUser = async (req, res) => {
    try {
        const {userId} = req.params;

        const user = await User.findById({_id: userId});

        res.status(200).json(user)
    } catch (error) {
        res.status(401).json({ msg: error.message});
    }
}

const searchUsers = async (req, res) => {
    try {
        
        res.status(200).json("Success")
    } catch (error) {
        res.status(401).json({ msg: error.message});
    }
}

const getUserLight = async (req, res) => {
    try {
         const {userId} = req.params;
  

        const user = await User.findById({_id: userId}); 
 
        res.status(200).json({
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id,
            profilePicture: user.profilePicture
        })

    } catch (error) {
        console.log(error)
        res.status(400).json({ msg: error})
    }
}

const getRecommendedUsers = async (req, res) => {
    try {
        const {location, occupation, id} = req.query;

        const locationRecommendation = await User.find({ location: location}).select(['-posts', '-email', '-password', '-background', '-sentRequests', '-occupation'])
        const occupationRecommendation = await User.find({ occupation: occupation}).select(['-posts', '-email', '-password', '-background', '-sentRequests', '-location'])
        let usersArray = [...locationRecommendation, ...occupationRecommendation];
        usersArray = usersArray.filter((item) => item._id != id && !item?.friends.includes(id) && !item.recievedRequests.includes(id))

        res.status(200).json(usersArray)
    } catch (error) {
        console.log(error)
        res.status(400).json({ msg: error})
    }
}

// CREATE (POST) CONTROLLERS
const sendRemoveRequest = async (req, res) => {
    try {
        const {userId} = req.user;
        const {friendId} = req.body;

        if(userId === friendId) {
            return res.status(400).json({msg: "Same user!"})
        }

        const user = await User.findOne({_id: userId});
        const friend = await User.findOne({_id: friendId});

        if(user.friends.includes(friendId)) {
            return res.status(400).json({msg: "Already friends!"})
        } /*if(user.recievedRequests.includes(friendId) || friend.recievedRequests.includes(userId)) {
            return res.status(400).json({msg: "Request already sent!"})
        }*/

        let userArray = user.sentRequests;
        let friendArray = friend.recievedRequests;

       if(!user.sentRequests.includes(friend._id)) {
            userArray.push(friend._id);
            friendArray.push(user._id);
       } else if(user.sentRequests.includes(friend._id)) {
            userArray = userArray.filter(item => item != friendId);
            friendArray = friendArray.filter(item => item != userId);
       }

       await User.findByIdAndUpdate(user._id, {sentRequests: userArray}, {new: true});
       await User.findByIdAndUpdate(friend._id, {recievedRequests: friendArray}, {new: true});

        res.status(200).json(userArray);
    } catch (error) {
        console.log(error)
        res.status(400).json({ msg: error.message});
    }
};

const acceptDeclineRequest = async (req, res) => {
    try {
        const {userId} = req.user;
        const {friendId, response} = req.body;
        
        const user = await User.findById({_id: userId});
        const friend = await User.findById({_id: friendId});

        if(user.friends.includes(friend._id)) {
            return  res.status(401).json({ msg: "Already friends!"});
        }

        let userArray = user.recievedRequests;
        let friendArray = friend.sentRequests;
        let userFriends = user.friends;
        let friendFriends = friend.friends;

        if(response === true) {
            userFriends.push(friend._id);
            friendFriends.push(user._id);
            userArray = userArray.filter(id => id != friendId);
            friendArray = friendArray.filter(id => id != userId);
            
        } else if (response === false) {
            userArray = userArray.filter(id => id != friendId);
            friendArray = friendArray.filter(id => id != userId);
        }

        await User.findByIdAndUpdate(user._id, {recievedRequests: userArray, friends: userFriends}, {new: true});
        await User.findByIdAndUpdate(friend._id, {sentRequests: friendArray ,friends: friendFriends}, {new: true});
        
        res.status(200).json({friends: user.friends, recievedRequests: userArray});
    } catch (error) {
        res.status(401).json({ msg: error.message});
    }
}

// UPDATE (PATCH) CONTROLLERS

const updateUser = async (req, res) => {
    try {
        const {userId} = req.user;

        const user = await User.findByIdAndUpdate(userId, {...req.body}, {new: true}).select(['-password', '-email', '-createdAt', '-posts', 
        '-sentRequests', '-recievedRequests']);

        res.status(200).json(user)
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}

// DELETE CONTROLLERS

const removeFriend = async (req, res) => {
    try {
        const {userId} = req.user;
        const {friendId} = req.params;

        const user = await User.findById({_id: userId});
        const friend = await User.findById({_id: friendId});

        if(!user.friends.includes(friendId)) {
            user.friends = user.friends.filter(id => id != friend._id);
            friend.friends = friend.friends.filter(id => id != user._id);
        } else {
            user.friends.push(friend._id);
            friend.friends.push(user._id);
        }

        await user.save();
        await friend.save();
        
        res.status(200).json(user.friends);
    } catch (error) {
        return res.status(401).json({ msg: error.message });
    }
}

const getAllUsers = async (req, res) => {
    try {
        const allUsers = await User.find({});

        res.status(200).json(allUsers);

    } catch (error) {
        res.status(400).json(error)
    }
}

const getFriends = async (req, res) => {
    try {
        const {userId} = req.params
        const user = await User.findById({_id: userId});

        const friends = await User.find({
            '_id': {
                $in: user.friends
            }
        })

        res.status(200).json(friends)
    } catch (error) {
        res.status(402).json(error)
    }
}

module.exports = {search, sendRemoveRequest, acceptDeclineRequest, removeFriend,
                 getUser, searchUsers, getAllUsers, getRequests, getFriends, updateUser,
                getUserLight, getRecommendedUsers};