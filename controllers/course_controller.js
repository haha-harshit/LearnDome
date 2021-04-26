const Course = require('../models/course');
const Instructor = require('../models/instructor');
const Student = require('../models/student');

const enrollmentMailer = require('../mailers/enrollment_mailer');

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

// for creating a course with ASYNC/AWAIT
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
            req.flash('success', 'Course Uploaded Successfully!')
            return res.redirect('back');
        }
    }catch(err){
        req.flash('error', 'Error in Uploading Course!')
        return res.redirect('back');
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
// module.exports.delete_course = function(req, res){
//     Course.findById(req.params.id, function(err, course){
//         console.log(course.id);
    
//         console.log('DELETION IN PROGRESS...');
    
//         if(course.instructor == req.user.id){
//             let instructorId = course.instructor
//             course.remove();
//             console.log("Course Removed!");
//             Instructor.findByIdAndUpdate(instructorId, { $pull: {courses: req.params.id}}, function(err, inst){
//                 req.flash('success', 'Course Deleted!')
//                 return res.redirect('back');
//             })
//         }else{
//             req.flash('success', "Couldn't Delete!");
//             return res.redirect('back');
//         }
//     })
// }

// for deleting a course with ASYNC/AWAIT
module.exports.delete_course = async function(req, res){
    try{
        let course = await Course.findById(req.params.id)
        console.log(course.id);
        console.log('DELETION IN PROGRESS...');

        if(course.instructor == req.user.id){
            let instructorId = course.instructor
            course.remove();
            console.log("Course Removed!");

            let inst = await Instructor.findByIdAndUpdate(instructorId, { $pull: {courses: req.params.id}})
            req.flash('success', 'Course Deleted!')
            return res.redirect('back');
        }
    }catch(err){
        req.flash('error', "Couldn't Delete!");
        return res.redirect('back');
    }
}






// STUDENT COURSE-MODAL with ASYNC/AWAIT
module.exports.course_modal = async function(req, res){
    try{
        let courses = await Course.findById(req.params.id).populate('instructor');
        return res.render('course_modal',{
            title: 'LearnDome',
            c: courses,
            layout: '../views/student_layout/layout'
        });
    }catch(err){
        return res.redirect('back')
    };
};    



// INSTRUCTOR COURSE-MODAL with ASYNC/AWAIT
module.exports.inst_course_modal = async function(req, res){
    try{
        let courses = await Course.findById(req.params.id).populate('instructor');
        return res.render('inst_course_modal', {
            title: 'LearnDome',
            c: courses,
            layout: '../views/admin_layout/layout'
        })
    }catch(err){
        return res.redirect('back')
    };
};

// INSTRUCTOR COURSE-MODAL
// module.exports.inst_course_modal = function(req, res){
//     Course.findById(req.params.id).populate('instructor').exec(function(err, courses){
//         return res.render('inst_course_modal', {
//             title: 'LearnDome',
//             c: courses,
//             layout: '../views/admin_layout/layout'
//         });
//     });
// };


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

module.exports.course_enroll = async function(req, res){

    try{
        let enrolling_student = await Student.findById(req.user._id)
        let course = await Course.findById(req.body.enrolled_c_id)
        .populate('courses');
        enrolling_student.enrolledCourses.push(course);

        if(enrolling_student.instructor.includes(course.instructor)){
            enrolling_student.save();
            course.students.push(req.user);
            course.save();
            // req.flash('success', 'Successfully Enrolled!');

            // course = await course.populate('stuednts')

            enrollmentMailer.newEnrollment(enrolling_student);

            console.log('Successfully Enrolled!');
            console.log("Student added in Courses's student field");
        }else{
            enrolling_student.instructor.push(course.instructor);
            enrolling_student.save();
            course.students.push(req.user);
            course.save();

            // course = await course.populate('students email').execPopulate();

            enrollmentMailer.newEnrollment(enrolling_student);

            // req.flash('success', 'Successfully Enrolled!');
            console.log('Successfully Enrolled!');
            console.log("Student added in Courses's student field");
        }
        req.flash('success', 'Successfully Enrolled!');
        return res.redirect('back');

    }catch(err){
        return res.redirect('back')        
    }
};

    // Student.findById(req.user._id, function(err, enrolling_student){
    //     Course.findById(req.body.enrolled_c_id)
    //     .populate('courses')
    //     .exec(function(err, course){
    //         enrolling_student.enrolledCourses.push(course);
    //         if(enrolling_student.instructor.includes(course.instructor)){
    //             enrolling_student.save();
    //             course.students.push(req.user);
    //             course.save();
    //             // req.flash('success', 'Successfully Enrolled!');
    //             console.log('Successfully Enrolled!');
    //             console.log("Student added in Courses's student field");
    //         }else{
    //             enrolling_student.instructor.push(course.instructor);
    //             enrolling_student.save();
    //             course.students.push(req.user);
    //             course.save();
    //             // req.flash('success', 'Successfully Enrolled!');
    //             console.log('Successfully Enrolled!');
    //             console.log("Student added in Courses's student field");
    //         }
    //     });
    // });
    // req.flash('success', 'Successfully Enrolled!');
    // return res.redirect('back');

