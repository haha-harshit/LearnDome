const mongoose = require('mongoose');

const multer = require('multer');
const path =  require('path')
const AVATAR_PATH = path.join('/uploads/instructors/avatars');

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
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course'
        }
    ],
}, {
    timestamps: true
});


const Instructor = mongoose.model('Instructor', instructorSchema);

module.exports = Instructor;