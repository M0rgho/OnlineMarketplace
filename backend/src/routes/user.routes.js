const controller = require("../controllers/user.controller");
const verifyToken  = require("../middlewares/authJwt");

module.exports = (app) => {
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "Origin, Content-Type, Accept"
        );
        next();
      });
    app.get("/user/:username",[verifyToken], controller.userAccess);

    app.patch("/user/:username",[verifyToken], controller.addMoney);
}