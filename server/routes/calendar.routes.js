const calendarController = require("../controllers/calendar.controller");

module.exports = app => {
    app.get("/api/calendar/", calendarController.findallCalendar);
    app.post("/api/calendar/", calendarController.createCalendar);
    app.put("/api/calendar/:id", calendarController.editCalendar);
}