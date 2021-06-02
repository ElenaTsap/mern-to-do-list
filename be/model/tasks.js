const mongoose = require('mongoose');

//using same naming with front end is more convenient but not a must
const tasks = new mongoose.Schema({
            name: {
                type: String,
                required: true
            }, 
            done: {
                type: Boolean,
                required: true
            }
})

module.exports = mongoose.model('tasks', tasks)