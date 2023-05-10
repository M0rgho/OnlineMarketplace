const express = require('express');

const mongoose = require('mongoose');
const {URL}  = require('./environment.js');
const cors = require('cors')
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true })); // nwm co to
app.use(cors())

const port = 3000;

mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB', err));

require("./src/routes/items.routes.js")(app)
require("./src/routes/user.routes.js")(app)
require("./src/routes/auth.routes.js")(app)


app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});
  
// app.put("/create", (req, res) => {
//   res.sendStatus(200);
// })
// const user = new userModel({
//   username: "DavidJones",
//   firstname: "Szymon",
//   lastname: "Głomski",
//   email:"sglom@gmail.com",
//   role: "USER",
//   registrationDate: new Date(),
//   lastLoginDate: new Date(),
//   balance: 1000,
//   items: [{
//     name: "AWP",
//     date: new Date(),
//     type: "broń",
//     imgUrl: "awp.png"
//   }],
//   transactions: [],
// })  
// const myItem2 = new itemOnSaleModel({
//   name: "AWP",
//   date: new Date(),
//   type: "broń",
//   owner: user,
//   imgUrl: "awp.png",
//   price: 100
// });


// user.save()
//   .then(() => console.log('Document saved user'))
//   .catch((err) => console.error('Failed to save document user', err));
// myItem2.save()
//   .then(() => console.log('Document saved item2'))
//   .catch((err) => console.error('Failed to save document item2', err));