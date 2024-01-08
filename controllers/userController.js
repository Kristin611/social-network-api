const { User, Thought } = require('../models');

module.exports = {
    // get all users
    async getUsers(req, res) {
        try {
            const users = await User.find();
            //building response object which contains the fetched users array
            const userObj = {
                users,
            };
            //if code executes successfully, respnd with JSON object containing user info
            return res.json(userObj)
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },
    //get a single user
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId});
            
            if (!user) {
                return res.status(404).json({message: 'No user with that ID'})
            }
            //grab user thoughts
            const thoughts = await Thought.find({_id: req.params.userId});

            //grab user friends
            const friendIds = user.friends || [];
            const friends = await User.find({ _id: { $in: friendIds}})

            res.json({
                user,
                thoughts,
                friends,
                friendCount: user.friendCount, 
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },
    //create new user
    async createUser(req, res) {
        try {
            const newUser = await User.create(req.body);
            res.json(newUser)
        } catch (error) {
            res.status(500).json(error)
        }    
    },

    //update a user
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                {_id: req.params.userId},
                { $set: req.body},
                { runValidators: true, new: true}
            )

            if (!user) {
                return res.status(404).json({message: 'No user with this id!'})
            }

            res.json(user)
        } catch (error) {
            res.status(500).json(error);
        }
    },

    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete( {_id: req.params.userId});

            if (!user) {
                return res.status(404).json({ message: 'No user with that ID!'})
            }

            //remove a user's associated thoughts when deleted
            await User.deleteMany({ _id: { $in: user.thoughts}});
            res.json({ message: 'User and thoughts deleted!'})

            res.json(user);

        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    },

    async createFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate({ _id: req.params.userId}, 
                {$addToSet: {friends: req.params.friendId}},
                {new: true});

            if (!user) {
                return res.status(404).json({message: "No user with that ID!"})
            }
           

            res.json({ message: `You are now friends with ${user.username}`})
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    },

    async deleteFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate({ _id: req.params.userId}, 
                {$pull: {friends: req.params.friendId}},
                {new: true});

            if (!user) {
                return res.status(404).json({message: "No user with that ID!"})
            }
           

            res.json({ message: `You have deleted ${user.username} from your friend's list`})
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    }
};