const mongoose = require('mongoose');

// Define the schema for options
const optionSchema = new mongoose.Schema({
  id: String,
  option: String,
  answer: String,
  imgURI: String,
});

// Define the schema for questions
const questionSchema = new mongoose.Schema({
  question: String,
  imgURI: String,
  state: [String],
  category:[String],
  type: [String], // Add the 'type' array
  diff: [String], // Add the 'diff' array

  options: [optionSchema],
  correctAnswerId: Number,
});

// Define the schema for the question list
const questionListSchema = new mongoose.Schema({
  questionList: [questionSchema],
});

module.exports = mongoose.model('QuestionList', questionListSchema);
