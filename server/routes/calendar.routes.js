const calendarController = require("../controllers/calendar.controller");
const { authenticate } = require('../config/jwt.config');


module.exports = app => {
    app.post("/api/calendar/:userId", authenticate, calendarController.createCalendar);
    app.get("/api/calendar/:userId", authenticate, calendarController.findallCalendar);
    app.put("/api/calendar/:id/:userId", authenticate, calendarController.editCalendar);
}