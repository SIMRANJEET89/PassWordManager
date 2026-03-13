const express = require("express");
const { MongoClient, Collection } = require("mongodb");
const dotenv = require("dotenv");
const bodyparser = require("body-parser");
const cors = require('cors')

dotenv.config();

// connection url
const url = process.env.MONGO_URI;
const client = new MongoClient(url);

// Database Name
const dbName = "myProject";
const app = express();
app.use(express.json());
const port = 3000;
app.use(bodyparser.json());
app.use(cors())


client.connect();

// get all the passwords
app.get("/", async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection("passwords");
  const findResult = await collection.find({}).toArray();
  res.json(findResult);
});

// save password
app.post("/", async (req, res) => {
  const password = req.body;
  const db = client.db(dbName);
  const collection = db.collection("passwords");
  const findResult = await collection.insertOne(password);
  res.send({ success: true, result: findResult });
});

// delete password
const { ObjectId } = require("mongodb");

app.delete("/", async (req, res) => {
  const id = req.body.id;

  const db = client.db(dbName);
  const collection = db.collection("passwords");

  const result = await collection.deleteOne({
    id: id,
  });

  res.send({
    success: true,
    result: result,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
