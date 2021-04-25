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
        type: String
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

    avatar: {
        type: String
    }
}, {
    timestamps: true
});


let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '..', AVATAR_PATH));
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  });

// static methods
instructorSchema.statics.uploadedAvatar = multer({storage: storage}).single('avatar');
instructorSchema.statics.avatarPath = AVATAR_PATH;

const Instructor = mongoose.model('Instructor', instructorSchema);

module.exports = Instructor;