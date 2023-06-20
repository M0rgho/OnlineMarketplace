const controller = require("../controllers/market.controller")

module.exports = (app) => {
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "Origin, Content-Type, Accept"
        );
        next();
      });

    // app.post("/sell", [verifyToken], controller.sell)
    app.post("/sell", controller.sell)

    app.post("/buy", controller.buy)
    
    app.post("/cancell", controller.cancell)


    app.get("/market_offers", controller.active_offers)
}
