const controller = require("../controllers/auth.controller")

module.exports = (app) =>{
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "Origin, Content-Type, Accept"
        );
        next();
      });
    app.post("/auth/signup", controller.signup)
    app.post("/auth/signin", controller.signin)
}