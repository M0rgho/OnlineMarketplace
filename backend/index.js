const express = require('express');

const mongoose = require('mongoose');
const {url}  = require('./environments');

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


const myItem = new MyModel({
    name: "String",
    date: new Date(),
    type: "test1",
    imgUrl: "test2137"
  });

  
myItem.save()
    .then(() => console.log('Document saved'))
    .catch((err) => console.error('Failed to save document', err));

// const MongoClient = require('mongodb').MongoClient;
// const { ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://sglomski:EYlsSlP6KMSYsO7Y@steam-workshop.hpcicmv.mongodb.net/?retryWrites=true&w=majority";
// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });
// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//         await client.connect()
//         // Send a ping to confirm a successful connection
//         await client.db("workshop").command({ ping: 1 });
//         console.log("Pinged your deployment. You successfully connected to MongoDB!");
//     } finally {
//         // Ensures that the client will close when you finish/error
//         await client.close();
//     }
// }
// run().catch(console.dir);

