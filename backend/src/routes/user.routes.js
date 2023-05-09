const controller = require("../controllers/user.controller");

module.exports = (app) => {
    app.get("/user/:username", controller.allAccess);
}