const Goal = require("../models/goal.model");
const { default: mongoose } = require("mongoose");


module.exports.findOneGoal = (req, res) => {
    Goal.find({ _id: req.params.id, userId : mongoose.Types.ObjectId(req.params.userId) })
        .then(oneGoal => res.json({ goal: oneGoal }))
        .catch(err => res.json({ msg: "An Error Occured", error: err }));
}


module.exports.findAllGoals = (req, res) => {
    Goal.find({userId : mongoose.Types.ObjectId(req.params.userId)})
        .then(allGoals => res.json({ goal: allGoals }))
        .catch(err => res.json({ msg: "An Error Occured", error: err }));
}


module.exports.createGoal = (req, res) => {
    Goal.create(req.body)
        .then(newGoal => {
            res.json({ goal: newGoal })
        })
        .catch(err => res.json({ msg: "An Error Occured", error: err }));
}

module.exports.editGoal = (req, res) => {
    Goal.findOneAndUpdate({ _id: req.params.id, userId : mongoose.Types.ObjectId(req.params.userId) }, req.body, { new: true })
        .then(editGoal => {
            res.json({ goal: editGoal })
        })
        .catch(err => res.json({ msg: "An Error Occured", error: err }));
}

module.exports.deleteGoal = (req, res) => {
    Goal.findOneAndDelete({ _id: req.params.id, userId : mongoose.Types.ObjectId(req.params.userId) })
        .then(deletedGoal => {
            res.json({ goal: deletedGoal })
        })
        .catch(err => res.json({ msg: "An Error Occured", error: err }));
}

module.exports.updateGoalData = (req, res) => {
    Goal.findOne({_id : req.params.id})
        .then((doc) => {
            item = doc.data.id(req.params.ele);
            item["val"] = req.body.val;
            doc.save();
            res.json({ data : data.id(req.params.ele) })
        })
        .catch(err => res.json({ msg: "An Error Occured", error: err }));
}

module.exports.deleteGoalData = (req, res) => {
    Goal.findOne({_id : req.params.id})
        .then((doc) => {
            doc.data.pull({_id : req.params.ele})
            doc.save();
            res.json({ data : doc })
        })
        .catch(err => res.json({ msg: "An Error Occured", error: err }));
}