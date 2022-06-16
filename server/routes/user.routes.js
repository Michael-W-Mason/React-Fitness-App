const userController = require("../controllers/user.controller");
// const { authenticate } = require('../config/jwt.config');

module.exports = app => {
    app.post("/api/register", userController.createUser);
    app.post("/api/login", userController.loginUser);
    app.get("/api/logout", userController.logoutUser);
}