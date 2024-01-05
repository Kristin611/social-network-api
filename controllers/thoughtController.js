const { User, Thought } = require('../models');

module.exports = {
    //get all thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();

            const thoughtObj = {
                thoughts,
            };

            return res.json(thoughtObj)
        } catch (error) {
            console.log(error)
            return res.status(500).json(error);
        }
    },
    //get a single thought
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId})

            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID exists!'})
            };

            res.json(thought);

        } catch (error) {
            
        }
    },
    //create a thought
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body)
            //get user associated with thought
            const user = await User.findOne({ _id: thought.userId});

            if (!user) {
                return res.status(404).json('Associated user not found')
            };
            //push thought's ID to the user's thoughts array
            user.thoughts.push(thought._id);

            res.json(thought);

        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    },
    //update a thought
    async updateThought(req, res) {
        try {
            const thought = await Thought.findeOneAndUpdate(
                { _id: req.params.thoughtId},
                {$set: req.body}
            )

            if (!thought) {
                return res.status(404).json({message: 'No thought with this ID!'})
            };

            res.json(thought)

        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    },
    //delete a thought
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete(
                {_id: req.params.thoughtId}
            );

            if (!thought) {
                return res.status(404).json({message: 'No thought with that ID found!'})
            }

            res.json(thought);

        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    }

};