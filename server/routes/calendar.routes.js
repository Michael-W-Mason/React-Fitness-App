const calendarController = require("../controllers/calendar.controller");
const { authenticate } = require('../config/jwt.config');


module.exports = app => {
    app.get("/api/calendar/", authenticate, calendarController.findallCalendar);
    app.post("/api/calendar/", authenticate, calendarController.createCalendar);
    app.put("/api/calendar/:id", authenticate, calendarController.editCalendar);
}