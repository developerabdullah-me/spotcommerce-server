const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config();


const { MongoClient, ServerApiVersion } = require('mongodb');

// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();
const port = process.env.PORT || 5000;
// middelware
app.use(cors());
app.use(express.json());


// const uri = `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@cluster0.c4kzw.mongodb.net/?retryWrites=true&w=majority`;
// const client = new MongoClient(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   serverApi: ServerApiVersion.v1,
// });




const uri = `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@cluster0.wf0ynse.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true,
   useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1
   });






async function run() {
  try {
    await client.connect();
    const ServiceCollection = client.db("E_Shop").collection("Parses");


   
    //    get data
    app.get("/pareses", async (req, res) => {
      const query = {};
      const cursor = ServiceCollection.find(query);
      const services = await cursor.toArray();
      res.send(services);
    });

   
    // post data product
    app.post("/pareses", async (req, res) => {
      const newServices = req.body;
      const result = await ServiceCollection.insertOne(newServices);
      res.send(result);
    });
    
 
  } finally {
  }
}
run().catch(console.dir);
app.get("/", (req, res) => {
  res.send("running parse go");
});

app.listen(port, () => {
  console.log("listen on port", port);
});
