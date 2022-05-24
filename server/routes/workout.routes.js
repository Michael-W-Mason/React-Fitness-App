const workoutController = require("../controllers/workout.controller");

module.exports = app => {
    app.get("/api/workouts", workoutController.findAllWorkouts);
    app.post("/api/workouts", workoutController.createWorkout);
}