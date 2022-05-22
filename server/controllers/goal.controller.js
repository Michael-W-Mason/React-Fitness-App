const Goal = require("../models/goal.model");

module.exports.findAllGoals = (req, res) => {
    Goal.find()
        .then(allGoals => res.json({ goal: allGoals }))
        .catch(err => res.json({ msg: "An Error Occured", error: err }));
}

module.exports.createGoal = (req, res) => {
    Goal.create(req.body)
        .then(newGoal => {
            res.json({goal: newGoal})
        })
        .catch(err => res.json({ msg: "An Error Occured", error: err }));
}

module.exports.editGoal = (req, res) => {
    Goal.findOneAndUpdate({_id : req.params.id}, req.body, {new : true})
        .then(editGoal => {
            res.json({goal: newGoal})
        })
        .catch(err => res.json({ msg: "An Error Occured", error: err }));
}

module.exports.deleteGoal = (req, res) => {
    Goal.deleteOne({ _id: req.params.id })
        .then(deletedGoal => {
            res.json({ goal: deletedGoal })
        })
        .catch(err => res.json({ msg: "An Error Occured", error: err }));
}