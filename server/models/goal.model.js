const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name is required"],
    },
    unit: {
        type: String,
    },
    goal: {
        type: Number,
        required: [true, "Goal is required"],
    },
    data: {
        type: [{
            val : {
                type : Number,
            },
            updatedAt : {
                type : Date,
                default : Date.now
            }
        }]
    }
}, {timestamps : true});

const Goal = mongoose.model('goal', goalSchema);
module.exports = Goal;