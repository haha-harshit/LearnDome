
const Course = require('../models/course');
const Student = require('../models/student');

module.exports.mydome = function(req, res){
    Student.find({}).populate('enrolledCourses').exec(function(err, myCourses){
        return res.render('dashboard', {
            title: 'LearnDome | Dashboard',
            myCourse: myCourses,
            layout: '../views/student_layout/layout'
        });
    });

    // Student.findById(req.user._id, function(err, e_courses){
    //     return res.render('dashboard', {
    //         title: 'LearnDome | Dashboard',
    //         e_course: e_courses,
    //         layout: '../views/student_layout/layout'
    //     });
    // });
};

module.exports.profile = function(req, res){
    return res.render('_profile', {
        title: 'LearnDome | Your Profile'
    });
};
