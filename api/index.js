require('dotenv').config()
const express = require("express");

const State = require("../Models/StateModel");
const AlbertaQuestionModel = require("../Models/AlbertaQuestionModel");
const mongoos = require("mongoose");
const cors = require("cors");


const app = express();
app.use(express.static('public'))
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.get("/api/", (req, res) => {
  res.send("Heloo DTC API");
});

app.get("/api/state", async (req, res) => {
  try {
    const states = await State.find({});
    console.log(states);
    res.status(200).json(states);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/api/state/alberta", async (req, res) => {
  try {
    const albertaTest = await AlbertaQuestionModel.find({});
    res.status(200).json(albertaTest);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/api/state/create", async (req, res) => {
  try {
    const state = await State.create(req.body);
    res.status(200).json(state);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
});

app.post("/api/state/alberta/create", async (req, res) => {
  try {
    const albertatest = await AlbertaQuestionModel.create(req.body);
    res.status(200).json(albertatest);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
});

mongoos.set("strictQuery", false);
mongoos.connect(process.env.MONGO_URL).then(()=>{
    console.log('Connected To Database')
app.listen(process.env.PORT, ()=>{
    console.log('Node API app is running on port 3000')
})
}).catch((err)=>{
    console.log(err)
})
