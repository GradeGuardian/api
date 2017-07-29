const mongoose = require('../db');

const StudentSchema = new mongoose.Schema({
    name: String,
    gpa: Number,
    //more to come later
});

const Student = mongoose.model('Student', StudentSchema);

module.exports = Student;