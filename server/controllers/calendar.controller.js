const Calendar = require("../models/calendar.model");

module.exports.findallCalendar = (req, res) => {
    Calendar.find()
        .then(allCalendar => res.json({ calendar: allCalendar }))
        .catch(err => res.json({ msg: "An Error Occured", error: err }));
}

module.exports.createCalendar = (req, res) => {
    Calendar.create(req.body)
        .then(newGoal => {
            res.json({ goal: newGoal })
        })
        .catch(err => res.json({ msg: "An Error Occured", error: err }));
}

module.exports.editCalendar = (req, res) => {
    Calendar.findOne({ _id: req.params.id })
        .then(doc => {
            doc["events"] = req.body;
            doc.save();
            res.json({ calendar: editCalendar })
        })
        .catch(err => res.json({ msg: "An Error Occured", error: err }));
}