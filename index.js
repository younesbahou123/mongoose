require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 5050;
const conn = require("./config/db");
conn();
const starterFruits = require("./config/seed");
const Fruit = require("./models/fruit");
const fruitRoutes = require('./routes/fruitRoutes')
app.use('/api/fruits', fruitRoutes)
// home route
app.get("/", (req, res) => {
  res.send("Home Page");
});

// Seed route -> Populate our database with starter data
app.get("/fruits/seed", async (req, res) => {
  try {
    await Fruit.deleteMany({});
    await Fruit.create(starterFruits);
    res.json(starterFruits);
  } catch (error) {
    console.log(`Something went wrong : ${error.message}`);
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port : ${port}`);
});