require('dotenv').config();
const express = require("express");
const State = require("../Models/StateModel");
const AlbertaQuestionModel = require("../Models/AlbertaQuestionModel");
const mongoos = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.get("/api/", (req, res) => {
  res.send("Hello DTC API");
});

app.get('/api/state', async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const result = parseInt(req.query.result) || 10;
  const skip = page * result;

  try {
    const states = await State.find({})
      .skip(skip)
      .limit(result);
    res.status(200).json(states);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// app.get("/api/state/alberta", async (req, res) => {
//   try {
//     const albertaTest = await AlbertaQuestionModel.find({});
//     res.status(200).json(albertaTest);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

app.get("/api/state/alberta", async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const result = parseInt(req.query.result) || 10;
  const skip = page * result;

  try {
    const questionList = await AlbertaQuestionModel.findOne({}).select('questionList')
      .skip(skip)
      .limit(result);

    res.status(200).json(questionList.questionList);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



mongoos.set("strictQuery", false);
mongoos.connect(process.env.MONGO_URL).then(() => {
  console.log('Connected To Database');
});

module.exports = app;
