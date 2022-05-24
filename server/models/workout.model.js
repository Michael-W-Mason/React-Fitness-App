const mongoose = require("mongoose");
// const setsSchema = new mongoose.Schema({
//     type: {
//         type: String
//     },
//     steps :[{
//         movement : {
//             type: String
//         },
//         sets : {
//             type: Number
//         },
//         reps : {
//             type: Number
//         }
//     }]
// })

// const circuitSchema = new mongoose.Schema({
//     type: {
//         type: String
//     },
//     rounds: {
//         type: Number
//     },
//     steps: [{
//         movement: {
//             type: String
//         },
//         reps: {
//             type: Number
//         },
//         units: {
//             type: String
//         }
//     }]
// })

// const timeDistSchema = new mongoose.Schema({
//     type: {
//         type: String
//     },
//     duration: {
//         type: Number
//     },
//     units: {
//         type: String
//     },
//     movement: {
//         type: String
//     }
// })

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
        ]
}, { timestamps: true });

const Workout = mongoose.model('workout', workoutSchema);
module.exports = Workout;