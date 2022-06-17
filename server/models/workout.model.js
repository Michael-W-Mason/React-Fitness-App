const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name is required"],
    },
    workout:
        [
            {
                type: mongoose.Schema.Types.Mixed
            }
        ],
    userId: {
            type: mongoose.Schema.Types.ObjectId
        }
}, { timestamps: true });

const Workout = mongoose.model('workout', workoutSchema);
module.exports = Workout;