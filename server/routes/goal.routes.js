const goalController = require("../controllers/goal.controller");

module.exports = app => {
    app.get("/api/goals", goalController.findAllGoals);
    app.post("/api/goals", goalController.createGoal);
    app.put("/api/goals/:id", goalController.editGoal);
}