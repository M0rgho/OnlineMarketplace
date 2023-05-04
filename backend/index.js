const express = require('express');

const mongoose = require('mongoose');
const {url}  = require('./environments');
const cors = require('cors')


const app = express();
app.use(cors())
const port = 3000;

// Schemas
const itemSchema = require("./Schemas/Item");
const userSchema = require("./Schemas/Item");

const itemModel = mongoose.model('Items', itemSchema);
const userModel = mongoose.model('Users', itemSchema);


mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB', err));



async function getItems(){
  const Items = await itemModel.find({}).lean();
  // console.log(Items)
  return Items;
}
app.get("/items", function (req, res) {
  getItems().then(function(FoundItems){
    res.send(FoundItems);
  });
});

app.put("/create", (req, res) => {
  res.sendStatus(200);
})

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});
  