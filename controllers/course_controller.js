const Course = require('../models/course');
const Instructor = require('../models/instructor');
const Student = require('../models/student');

// for creating a course
// module.exports.create_course = function(req, res){
//     Course.create({
//         c_url: req.body.c_url,
//         c_name: req.body.c_name,
//         c_description: req.body.c_description,
//         instructor: req.user._id
//     },function(err, course){
//         if(err){
//             console.log("Error in creating a Course!");
//             console.log(err);
//             return;
//         }
//         Instructor.findById(req.user._id, function(err, course_inst){
//             course_inst.courses.push(course);
//             course_inst.save();
//             console.log('course id added');
//         })
//         // console.log(course);
//         return res.redirect('back');
//     });
// };

module.exports.create_course = async function(req, res){
    try{
        let course_inst = await Instructor.findById(req.user._id);

        if(course_inst){
            let course = await Course.create({
                c_url: req.body.c_url,
                c_name: req.body.c_name,
                c_description: req.body.c_description,
                instructor: req.user._id
            });

            course_inst.courses.push(course);
            course_inst.save();
            console.log('course id added');
            return res.redirect('back');
        }
    }catch(err){
        return
    }
};


// module.exports.create_course = function(req, res){
//     Instructor.findById(req.user._id, function(err, course_inst){
//         if(course_inst){
//             Course.create({
//                 c_url: req.body.c_url,
//                 c_name: req.body.c_name,
//                 c_description: req.body.c_description,
//                 instructor: req.user._id
//             },function(err, course){
//                 if(err){
//                     console.log("Error in creating a Course!");
//                     console.log(err);
//                     return;
//                 }
//                 course_inst.courses.push(course);
//                 course_inst.save();
//                 console.log('course id added');
//                 return res.redirect('back');
//             });
//         } 
//     });
// };





// for deleting a course
module.exports.delete_course = function(req, res){
    Course.findById(req.params.id, function(err, course){
        console.log(course.id);
    
        console.log('DELETION IN PROGRESS...');
    
        if(course.instructor == req.user.id){
            let instructorId = course.instructor
            course.remove();
            console.log("Course Removed!");
            Instructor.findByIdAndUpdate(instructorId, { $pull: {courses: req.params.id}}, function(err, inst){
                console.log('Course deleted successfully!');
                return res.redirect('back');
            })
        }else{
            console.log("Removal Failed!");
            return res.redirect('back');
        }
    })
}

// STUDENT COURSE-MODAL
module.exports.course_modal = function(req, res){
    // Course.findById(req.params.id, function(err, courses){
    //     return res.render('course_modal',{
    //         title: courses.c_name,
    //         c: courses,
    //         layout: '../views/student_layout/layout'
    //     });
    // });
    // console.log(req.user);
    Course.findById(req.params.id).populate('instructor').exec(function(err, courses){
        return res.render('course_modal',{
            title: 'LearnDome',
            c: courses,
            layout: '../views/student_layout/layout'
        });
    });
};


// INSTRUCTOR COURSE-MODAL
module.exports.inst_course_modal = function(req, res){
    Course.findById(req.params.id).populate('instructor').exec(function(err, courses){
        return res.render('inst_course_modal', {
            title: 'LearnDome',
            c: courses,
            layout: '../views/admin_layout/layout'
        });
    });
};


// module.exports.course_enroll = function(req, res){
//     Student.findById(req.user._id, function(err, enrolling_student){
//         enrolling_student.enrolledCourses.push(req.body.enrolled_c_id);
//         enrolling_student.save();
//         console.log('Successfully Enrolled!');
//         Course.findById(req.body.enrolled_c_id, function(err, sid){
//             sid.students.push(req.user);
//             sid.save();
//             console.log("Student added in Courses's student field")
//         });
//     });
//     return res.redirect('back');
// }



// TRY....................................
// module.exports.course_enroll = function(req, res){
//     Student.findById(req.user._id, function(err, enrolling_student){
//         enrolling_student.enrolledCourses.push(req.body.c);
//         enrolling_student.save();
//         console.log('Successfully Enrolled!');
//         Course.findById(req.body.enrolled_c_id, function(err, sid){
//             sid.students.push(req.user);
//             sid.save();
//             console.log("Student added in Courses's student field")
//         });
//     });
// }

module.exports.course_enroll = function(req, res){
    Student.findById(req.user._id, function(err, enrolling_student){
        Course.findById(req.body.enrolled_c_id)
        .populate('courses')
        .exec(function(err, course){
            enrolling_student.enrolledCourses.push(course);
            if(enrolling_student.instructor.includes(course.instructor)){
                enrolling_student.save();
                course.students.push(req.user);
                course.save();
                console.log('Successfully Enrolled!');
                console.log("Student added in Courses's student field");
            }else{
                enrolling_student.instructor.push(course.instructor);
                enrolling_student.save();
                course.students.push(req.user);
                course.save();
                console.log('Successfully Enrolled!');
                console.log("Student added in Courses's student field");
            }
        });
        return res.redirect('back');
    });
};
