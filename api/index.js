require('dotenv').config();
const express = require("express");
const State = require("../Models/StateModel");
const AlbertaQuestionModel = require("../Models/AlbertaQuestionModel");
const mongoos = require("mongoose");
const cors = require("cors");

const app = express();
let albertaData = [];
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
  const page = parseInt(req.query.page) || 1; // Start with page 1
  const result = 2; // Always retrieve 1 data item per page

  try {
    const questionList = await AlbertaQuestionModel.findOne({}).select('questionList');

    if (page > 0 && page <= questionList.questionList.length) {
      const index = page - 1; // Adjust page number to zero-based index
      const dataItem = questionList.questionList[index];
      const response = {
        results: [dataItem],
      };

      res.status(200).json(response);
    } else {
      // If 'page' is not provided, set to 0, or exceeds the available data, return an empty response.
      res.status(200).json({ results: [] });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


mongoos.set("strictQuery", false);
mongoos.connect(process.env.MONGO_URL).then(() => {
  console.log('Connected To Database');
});

module.exports = app;
