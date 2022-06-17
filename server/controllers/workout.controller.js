const { default: mongoose } = require("mongoose");
const Workout = require("../models/workout.model");

module.exports.findOneWorkout = (req, res) => {
    Workout.find({ _id: mongoose.Types.ObjectId(req.params.id),  userId: mongoose.Types.ObjectId(req.params.userId)})
        .then(oneWorkout => res.json({ workout: oneWorkout }))
        .catch(err => res.json({ msg: "An Error Occured", error: err }));
}

module.exports.findAllWorkouts = (req, res) => {
    Workout.find({userId: mongoose.Types.ObjectId(req.params.userId)})
        .then(allWorkouts => res.json({ workout: allWorkouts }))
        .catch(err => res.json({ msg: "An Error Occured", error: err }));
}

module.exports.createWorkout = (req, res) => {
    Workout.create(req.body)
        .then(newWorkout => {
            res.json({ workout: newWorkout })
        })
        .catch(err => res.json({ msg: "An Error Occured", error: err }));
}

module.exports.editWorkout = (req, res) => {
    Workout.findOneAndUpdate({ _id: mongoose.Types.ObjectId(req.params.id), userId: mongoose.Types.ObjectId(req.params.userId) }, req.body, { new: true })
        .then(editedWorkout => {
            res.json({ workout: editedWorkout })
        })
        .catch(err => res.json({ msg: "An Error Occured", error: err }));
}

module.exports.deleteWorkout = (req, res) => {
    Workout.findOneAndDelete({ _id: mongoose.Types.ObjectId(req.params.id), userId: mongoose.Types.ObjectId(req.params.userId) })
        .then(deletedWorkout => {
            res.json({ workout: deletedWorkout })
        })
        .catch(err => res.json({ msg: "An Error Occured", error: err }));
}