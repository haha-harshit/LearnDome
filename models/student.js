const mongoose = require('mongoose');


const multer = require('multer');
const path =  require('path')
const AVATAR_PATH = path.join('/uploads/students/avatars');


const studentSchema = new mongoose.Schema({
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

    gender: {
        type: Boolean,
        optional: true
    },

    address: {
        label: 'Address',
        type: String,
        optional: true,
        max: 1000
    },

    phoneNumber: {
        label: 'Phone Number',
        type: Number,
        optional: true,
    },

    dob: {
        label: 'Date Of Birth',
        type: Date,
        optional: true,
    },

    description: {
        label: 'Description',
        type: String,
        optional: true,
    },

    eduLevel: {
        label: 'Education Level',
        type: String,
        optional: true
    },

    enrolledCourses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course'
        }
    ],

    instructor: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Instructor',
            autopopulate: false
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
studentSchema.statics.uploadedAvatar = multer({storage: storage}).single('avatar');
studentSchema.statics.avatarPath = AVATAR_PATH;



const Student = mongoose.model('Student', studentSchema);

module.exports = Student;