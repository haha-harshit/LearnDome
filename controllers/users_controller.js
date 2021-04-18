
const Course = require('../models/course');
const Student = require('../models/student');
const Instructor = require('../models/instructor');


module.exports.mydome = function(req, res){
    Instructor.findById(req.user._id, function(err, i){
        if(i){
            return res.render('inst_homepage',{
                title: 'LearnDome | Dashboard', 
                layout: '../views/student_layout/layout',
            });
        }else{
            // Student.enrolledCourses.find({}, function(err, enc){
            //     return res.render('mydome',{
            //         title: 'LearnDome | Dashboard',
            //         enc: enc,
            //         layout: '../views/student_layout/layout'
            //     })
            // });
            Student.findById(req.user._id).populate('enrolledCourses').exec(function(err, myCourses){
                return res.render('mydome', {
                    title: 'LearnDome | Dashboard',
                    myCourse: myCourses,
                    layout: '../views/student_layout/layout'
                });
            });
        }
    })
    // Student.findById(req.user._id).populate('enrolledCourses').exec(function(err, myCourses){
    //     return res.render('mydome', {
    //         title: 'LearnDome | Dashboard',
    //         myCourse: myCourses,
    //         layout: '../views/student_layout/layout'
    //     });
    // });

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
        title: 'LearnDome | Your Profile',
        layout: '../views/student_layout/layout'
    });
};
