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
            const user = await User.findOneAndUpdate({ _id: req.body.userId}, 
                {$push: {thoughts: thought._id}}, 
                {new: true});

            if (!user) {
                return res.status(404).json('Associated user not found')
            };

            res.json({message: 'thought created', thought});

        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    },
    //update a thought
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
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
    },

    //create reaction
    async createReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                {_id: req.params.thoughtId},
                {$addToSet: {reactions: req.body}},
                {runValidators: true, new: true}
            )

            if (!thought) {
                return res.status(404).json({message: 'No thought with that ID found!'})
            }

            res.json(thought)

        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    },

    async deleteReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                {_id: req.params.thoughtId},
                {$pull: {reactions: {reactionId: req.params.reactionId}}},
                {runValidators: true, new: true}
            )

            if (!thought) {
                return res.status(404).json({message: 'No thought with that ID found!'})
            }

            res.json(thought)

        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    }

};