const Calendar = require("../models/calendar.model");
const { default: mongoose } = require("mongoose");

module.exports.findallCalendar = (req, res) => {
    Calendar.findOne({userId : mongoose.Types.ObjectId(req.params.userId)})
        .then(allCalendar => res.json({ calendar: allCalendar }))
        .catch(err => res.json({ msg: "An Error Occured", error: err }));
}

module.exports.createCalendar = (req, res) => {
    Calendar.create({userId : mongoose.Types.ObjectId(req.params.userId)})
        .then(newCalendar => {
            res.json({ calendar: newCalendar })
        })
        .catch(err => res.json({ msg: "An Error Occured", error: err }));
}

module.exports.editCalendar = (req, res) => {
    Calendar.findOne({ _id: req.params.id, userId: mongoose.Types.ObjectId(req.params.userId)})
        .then(doc => {
            doc["events"] = req.body;
            doc.save();
            res.json({ calendar: editCalendar })
        })
        .catch(err => res.json({ msg: "An Error Occured", error: err }));
}