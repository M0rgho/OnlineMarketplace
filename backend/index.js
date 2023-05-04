const express = require('express');

const mongoose = require('mongoose');
const {url}  = require('./environments');
const cors = require('cors')

const app = express();
app.use(cors())
const port = 3000;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB', err));

const item = new mongoose.Schema({
    name: String,
    date: { type: Date, default: Date.now },
    type: String,
    imgUrl: String
});

const MyModel = mongoose.model('Items', item); // item constructor

// const myItem = new MyModel({
//     name: "String",
//     date: new Date(),
//     type: "test1",
//     imgUrl: "test2137"
//   });
async function getItems(){
  const Items = await MyModel.find({}).lean();
  // console.log(Items)
  return Items;
}
app.get("/", function (req, res) {
  getItems().then(function(FoundItems){
    res.send(FoundItems);
  });
});
app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});
  
// myItem.save()
//     .then(() => console.log('Document saved'))
//     .catch((err) => console.error('Failed to save document', err));
