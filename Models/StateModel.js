const mongoose = require('mongoose');

const StateSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter a State Name"], 
  },
  imgURI: {
    type: String,
    required: true,
  },
});

const State = mongoose.model('State', StateSchema);

module.exports = State;
