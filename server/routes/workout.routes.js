const workoutController = require("../controllers/workout.controller");
const { authenticate } = require('../config/jwt.config');


module.exports = app => {
    app.get("/api/workouts/:userId", authenticate, workoutController.findAllWorkouts);
    app.post("/api/workouts", authenticate, workoutController.createWorkout);
    app.get("/api/workouts/:id/:userId", authenticate, workoutController.findOneWorkout);
    app.put("/api/workouts/:id/:userId", authenticate, workoutController.editWorkout);
    app.delete("/api/workouts/:id/:userId", authenticate, workoutController.deleteWorkout);
}