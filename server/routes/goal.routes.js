const goalController = require("../controllers/goal.controller");
const { authenticate } = require('../config/jwt.config');


module.exports = app => {
    app.put("/api/goals/data/:id/:ele", authenticate, goalController.updateGoalData);
    app.delete("/api/goals/data/:id/:ele", authenticate, goalController.deleteGoalData);

    app.get("/api/goals/:id/:userId", authenticate, goalController.findOneGoal);
    app.get("/api/goals/:userId", authenticate, goalController.findAllGoals);
    app.post("/api/goals", authenticate, goalController.createGoal);
    app.put("/api/goals/:id/:userId", authenticate, goalController.editGoal);
    app.delete("/api/goals/:id/:userId", authenticate, goalController.deleteGoal);
}