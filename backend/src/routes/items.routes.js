const controller = require("../controllers/item.controller")

module.exports = (app) => {
    app.get("/items", controller.allAccess);

    app.delete("/items/:id", (req, res) => {
        console.log("delete " + req.params.id)
    })

    app.post("/items", controller.post)
}  