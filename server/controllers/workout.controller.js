const Workout = require("../models/workout.model");

module.exports.findOneWorkout = (req, res) => {
    Workout.findOne({ _id: req.params.id })
        .then(oneWorkout => res.json({ workout: oneWorkout }))
        .catch(err => res.json({ msg: "An Error Occured", error: err }));
}

module.exports.findAllWorkouts = (req, res) => {
    Workout.find()
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
    Workout.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
        .then(editedWorkout => {
            res.json({ workout: editedWorkout })
        })
        .catch(err => res.json({ msg: "An Error Occured", error: err }));
}

module.exports.deleteWorkout = (req, res) => {
    Workout.findOneAndDelete({ _id: req.params.id })
        .then(deletedWorkout => {
            res.json({ workout: deletedWorkout })
        })
        .catch(err => res.json({ msg: "An Error Occured", error: err }));
}