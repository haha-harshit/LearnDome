
const Course = require('../models/course');
const Student = require('../models/student');
const Instructor = require('../models/instructor');


// module.exports.mydome = function(req, res){
//     Course.find({})
    
//     .populate({
//         path: 'courses',
//         populate: {
//             path: 'Instructor'
//         }
//     })
//     .exec(function(err, i){
//         if(i){
//             return res.render('i_mydome', {
//                 title: 'LearnDome | Dashboard', 
//                 layout: '../views/student_layout/layout'
//             });
//         }else{
//             Student.findById(req.user._id)
//             .populate('enrolledCourses')
//             .exec(function(err, myCourses){
//                 return res.render('s_mydome', {
//                     title: 'LearnDome | Dashboard',
//                     myCourse: myCourses,
//                     layout: '../views/student_layout/layout'
//                 });
//             });
//         }
//     })
// }

module.exports.mydome = function(req, res){
    Instructor.findById(req.user._id)
    .populate('courses')
    .exec(function(err, i){
        if(i){
            return res.render('i_mydome', {
                title: 'LearnDome | Dashboard', 
                layout: '../views/admin_layout/layout',
            });
        }else{
            Student.findById(req.user._id)
            .populate('enrolledCourses')
            .exec(function(err, myCourses){
                return res.render('s_mydome', {
                    title: 'LearnDome | Dashboard',
                    myCourse: myCourses,
                    layout: '../views/student_layout/layout'
                });
            });
        }
    })
};





    
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


module.exports.profile = function(req, res){
    return res.render('_profile', {
        title: 'LearnDome | Your Profile',
        layout: '../views/student_layout/layout'
    });
};

module.exports.i_profile = function(req, res){
    return res.render('_profile', {
        title: 'LearnDome | Your Profile',
        layout: '../views/admin_layout/layout'
    });
};
