const goalController = require("../controllers/goal.controller");

module.exports = app => {
    app.put("/api/goals/data/:id/:ele", goalController.updateGoalData);
    app.delete("/api/goals/data/:id/:ele", goalController.deleteGoalData);

    app.get("/api/goals/:id", goalController.findOneGoal);
    app.get("/api/goals", goalController.findAllGoals);
    app.post("/api/goals", goalController.createGoal);
    app.put("/api/goals/:id", goalController.editGoal);
    app.delete("/api/goals/:id", goalController.deleteGoal);

}