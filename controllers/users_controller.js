
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



// module.exports.mydome = function(req, res){
//     Instructor.findById(req.user._id)
//     .populate('courses')
//     .exec(function(err, i){
//         if(i){
//             return res.render('i_mydome', {
//                 title: 'LearnDome | Dashboard', 
//                 layout: '../views/admin_layout/layout',
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
// };



// instructor's uploaded courses
module.exports.uploadedCourses = function(req, res){
    Instructor.findById(req.user._id)
    .populate('courses')
    .exec(function(err, ucourses){
        return res.render('i_mydome', {
            title: 'LearnDome | Dashboard',
            uc: ucourses,
            layout: '../views/admin_layout/layout'
        });
    })
};


// student's enrolled courses
module.exports.mydome = function(req, res){
    Student.findById(req.user._id).populate('enrolledCourses').exec(function(err, myCourses){
        return res.render('s_mydome', {
            title: 'LearnDome | Dashboard',
            myCourse: myCourses,
            layout: '../views/student_layout/layout'
        });
    });
}
    

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
