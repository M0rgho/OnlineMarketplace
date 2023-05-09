const controller = require("../controllers/auth.controller")

module.exports = (app) =>{
    app.post("/auth/signup", controller.signup)
}