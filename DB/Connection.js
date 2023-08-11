const mongoose = require('mongoose')

const conn = mongoose.connect('mongodb+srv://zecodeekIT:223344@cluster0.wiq8aur.mongodb.net/DTC_API')

module.exports = conn