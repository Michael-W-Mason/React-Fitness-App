const Workout = require("../models/workout.model");

// module.exports.findOneGoal = (req, res) => {
//     Goal.findOne({ _id: req.params.id })
//         .then(oneGoal => res.json({ goal: oneGoal }))
//         .catch(err => res.json({ msg: "An Error Occured", error: err }));
// }

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

// module.exports.editGoal = (req, res) => {
//     Goal.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
//         .then(editGoal => {
//             res.json({ goal: editGoal })
//         })
//         .catch(err => res.json({ msg: "An Error Occured", error: err }));
// }

// module.exports.deleteGoal = (req, res) => {
//     Goal.findOneAndDelete({ _id: req.params.id })
//         .then(deletedGoal => {
//             res.json({ goal: deletedGoal })
//         })
//         .catch(err => res.json({ msg: "An Error Occured", error: err }));
// }

// module.exports.updateGoalData = (req, res) => {
//     Goal.findOne({_id : req.params.id})
//         .then((doc) => {
//             item = doc.data.id(req.params.ele);
//             item["val"] = req.body.val;
//             doc.save();
//             res.json({ data : data.id(req.params.ele) })
//         })
//         .catch(err => res.json({ msg: "An Error Occured", error: err }));
// }

// module.exports.deleteGoalData = (req, res) => {
//     Goal.findOne({_id : req.params.id})
//         .then((doc) => {
//             console.log(doc);
//             doc.data.pull({_id : req.params.ele})
//             doc.save();
//             res.json({ data : doc })
//         })
//         .catch(err => res.json({ msg: "An Error Occured", error: err }));
// }