const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    reviewContent: {
        type: String, 
        required: true
    },
    // done by a student
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }

},
{
    timestamps: true
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;