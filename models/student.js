const mongoose = require('../db');

const StudentSchema = new mongoose.Schema({
    name: String,
},{strict: false})

const Student = mongoose.model('Student', StudentSchema)

module.exports = Student