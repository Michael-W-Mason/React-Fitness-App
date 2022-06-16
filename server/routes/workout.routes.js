const workoutController = require("../controllers/workout.controller");
const { authenticate } = require('../config/jwt.config');


module.exports = app => {
    app.get("/api/workouts", authenticate, workoutController.findAllWorkouts);
    app.post("/api/workouts", authenticate, workoutController.createWorkout);
    app.get("/api/workouts/:id", authenticate, workoutController.findOneWorkout);
    app.put("/api/workouts/:id", authenticate, workoutController.editWorkout);
    app.delete("/api/workouts/:id", authenticate, workoutController.deleteWorkout);
}