const Course = require('../models/course');
const Instructor = require('../models/instructor');
const Student = require('../models/student');
const Review = require('../models/reviews');

module.exports.create_review = async function(req, res){
    try{
        let course = await Course.findById(req.body.course);

        if(course){
            if(course.students.includes(req.user._id)){
                let review = await Review.create({
                    reviewContent : req.body.r_content,
                    course : req.body.course,
                    student : req.user._id
                })
                console.log('Review created!');
    
                course.c_reviews.push(review);
                course.save();
    
                // review = await review.populate('student', 'username email').execPopulate();
    
                req.flash('success', 'Feedback Recorded!');
                return res.redirect('back');
            }else{
                req.flash('error', 'Enroll to give a Feedback!');
                return res.redirect('back');
            }
        }
    }catch(err){
        req.flash('error', 'Cannot comment!');
        return('back');
    }
};

module.exports.delete_review = function(req, res){
    
}