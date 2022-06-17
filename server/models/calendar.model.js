const mongoose = require("mongoose");

const calendarSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Goal is required"]
    },
    events : [{
        id: {
            type: String
        },
        title: {
            type: String,
        },
        start: {
            type: Date,
        },
        end: {
            type: Date
        },

    },
    {_id: false}],
}, {timestamps : true});

const Calendar = mongoose.model('calendar', calendarSchema);
module.exports = Calendar;