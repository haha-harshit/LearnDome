const mongoose = require('mongoose');

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
    ]
}, {
    timestamps: true
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;