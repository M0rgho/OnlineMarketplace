const controller = require("../controllers/market.controller")
const verifyToken  = require("../middlewares/authJwt");

module.exports = (app) => {
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "Origin, Content-Type, Accept"
        );
        next();
      });

    app.post("/market/sell", [verifyToken], controller.sell)

    app.post("/market/buy", [verifyToken], controller.buy)
    
    app.post("/market/cancel", [verifyToken], controller.cancel)

    app.get("/market/transactions", controller.transactions)
}
