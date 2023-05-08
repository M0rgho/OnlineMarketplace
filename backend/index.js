const express = require('express');

const mongoose = require('mongoose');
const {URL}  = require('./environment.js');
const cors = require('cors')
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json())
app.use(cors())
const port = 3000;

// Schemas
const itemSchema = require("./src/models/Item");
const userSchema = require("./src/models/User");

const itemModel = mongoose.model('Items', itemSchema);
const userModel = mongoose.model('Users', userSchema);


mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB', err));



app.get("/items", async (req, res) => {
  const Items = await itemModel.find({}).lean();
  res.send(Items);

});

app.post("/items", (req, res) => {
  let item = new itemModel(req.body);

  item.save()
  .then(() => console.log('Document saved'))
  .catch((err) => console.error('Failed to save document', err));
  // res.sendStatus(200);
})

app.get("/user/:username", async (req, res) => {
  const userData = await userModel.findOne({username:req.params.username}).lean();
  res.send(userData);
});

app.put("/create", (req, res) => {
  res.sendStatus(200);
})

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});
  
// const myItem = new itemModel({
//   name: "String",
//   date: new Date(),
//   type: "test1",
//   imgUrl: "test2137"
// });


// myItem.save()
//   .then(() => console.log('Document saved'))
//   .catch((err) => console.error('Failed to save document', err));