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
  const result = parseInt(req.query.result) || 10; // Default to 10 results per page

  try {
    // Check if we have already fetched data for this page
    if (albertaData[page]) {
      const startIndex = (page - 1) * result;
      const endIndex = startIndex + result;
      const paginatedData = albertaData[page].slice(startIndex, endIndex);
      const response = {
        results: paginatedData,
      };
      res.status(200).json(response);
    } else {
      // Fetch the data from the external API
      const apiUrl = `https://dtc-api.vercel.app/api/state/alberta?page=${page}&result=${result}`;
      const response = await axios.get(apiUrl);
      const data = response.data;

      // Store the fetched data in the albertaData array
      albertaData[page] = data;

      const startIndex = 0; // Start from the beginning
      const endIndex = Math.min(result, data.length); // Cap the results at the available data length
      const paginatedData = data.slice(startIndex, endIndex);

      const responseData = {
        results: paginatedData,
      };
      res.status(200).json(responseData);
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
