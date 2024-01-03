const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trimmed: {
                type: Boolean,
                default: true,
            }
        },
        email: {
            type: String,
            unique: true,
            required: true,
            Validate: {
                validator: function(v) {
                    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v)
                },
                // validator: () => Promise.resolve(false),
                // message: 'Email validation failed'
                message: props => `${props.value} is not a valid email address!`
            }
        },
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'Thought',
        }],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }]
    }
)

const User = mongoose.model('User', userSchema);
