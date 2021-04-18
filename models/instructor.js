const mongoose = require('mongoose');

const instructorSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    
    password: {
        type: String,
        required: true
    },

    username: {
        type: String,
        required: true,
        unique: true 
    },

    organization: {
        type: String,
        required: true
    },

    designation: {
        type: String,
    },

    department: {
        type: String,
        required: false
    },

    expertise: {
        type: String,
        required: false
    },

    courses: [
        {
            type: mongoose.Schema.Types.String,
            ref: 'Course'
        }
    ],
}, {
    timestamps: true
});


const Instructor = mongoose.model('Instructor', instructorSchema);

module.exports = Instructor;