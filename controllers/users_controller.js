
const Course = require('../models/course');
const Student = require('../models/student');
const Instructor = require('../models/instructor');
const { profile } = require('../../codeial/controllers/users_controllers');


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
module.exports.uploadedCourses = async function(req, res){
    try{
        let ucourses = await Instructor.findById(req.user._id).populate('courses');
        return res.render('i_mydome', {
            title: 'LearnDome | Dashboard',
            uc: ucourses,
            layout: '../views/admin_layout/layout'
        });
    }catch(err){
        return res.redirect('back');
    }
}

// student's enrolled courses
module.exports.mydome =async function(req, res){
    try{
        let myCourses = await Student.findById(req.user._id).populate('enrolledCourses')
        
        let instructor = await Instructor.find({})

        return res.render('s_mydome', {
            title: 'LearnDome | MyDome',
            myCourse: myCourses,
            all_inst: instructor,
            layout: '../views/student_layout/layout'
        });
    }catch(err){
        return res.redirect('back');
    } 
};
    
// viewing self profile(for student)
module.exports.s_profile = function(req, res){
    return res.render('s_profile', {
        title: 'LearnDome | Your Profile',
        layout: '../views/student_layout/layout'
    });
};

// viewing self profile(for instructor)
module.exports.i_profile = function(req, res){
    return res.render('i_profile', {
        title: 'LearnDome | Your Profile',
        layout: '../views/admin_layout/layout'
    });
};

// viewing instructor profile
module.exports.inst_profile = function(req, res){
    Instructor.findById(req.params.id, function(err, instructor){
        return res.render('v_profile', {
            title: 'LearnDome',
            i: instructor,
            layout: '../views/student_layout/layout'
        });        
    });
};

// getting the update form - student
module.exports.stu_update_profile = function(req, res){
    return res.render('stu_update_profile',{
        title: 'LearnDome | Update Profile',
        layout: '../views/student_layout/layout'
    });
}

// getting the update form - instructor
module.exports.inst_update_profile = function(req, res){
    return res.render('inst_update_profile',{
        title: 'LearnDome | Update Profile',
        layout: '../views/admin_layout/layout'
    });
}

// updating-instructor
module.exports.inst_update_profile_ok = function(req, res){
    if(req.user.id == req.params.id){
        Instructor.findByIdAndUpdate(req.params.id, req.body, function(err, inst){
            req.flash('success', 'Profile Updated!');
            return res.redirect('back');
        });
    }else{
        req.flash('error', "Couldn't perform this action");
        return res.staus(401).send('UNAUTHORIZED REQUEST!');
    };
};

// updating-student
module.exports.stu_update_profile_ok = function(req, res){
    if(req.user.id == req.params.id){
        Student.findByIdAndUpdate(req.params.id, req.body, function(err, stu){
            req.flash('success', 'Profile Updated!');
            return res.redirect('back');
        });
    }else{
        req.flash('error', "Couldn't perform this action");
        return res.staus(401).send('UNAUTHORIZED REQUEST!');
    };
};