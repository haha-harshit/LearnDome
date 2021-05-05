const mongoose = require('mongoose');


const multer = require('multer');
const path =  require('path')
const AVATAR_PATH = path.join('/uploads/courses/avatars');


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

    c_reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review' 
        }
    ],

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
        },

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
courseSchema.statics.uploadedAvatar = multer({storage: storage}).single('avatar');
courseSchema.statics.avatarPath = AVATAR_PATH;


const Course = mongoose.model('Course', courseSchema);

module.exports = Course;