const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    c_url: {
        type: String,
        required: true
    }, 
 
    c_name: {
        type: String,
        required: true
    },

    c_description: {
        type: String,
        required: true
    },

    students:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student'
        }
    ],

    instructor:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Instructor',
            // required: true
        }
}, {
    timestamps: true
});


const Course = mongoose.model('Course', courseSchema);

module.exports = Course;