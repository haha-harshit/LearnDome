
const Course = require('../models/course');

const Instructor = require('../models/instructor');

module.exports.home = async function(req, res){

    let inst = await Instructor.findById(req.user._id);
    if(inst){
        return res.render('inst_homepage',{
            title: 'LearnDome', 
            layout: '../views/admin_layout/layout'
        })
    }else{
        let courses = await Course.find({}).populate('instructor').populate('courses');
        return res.render('homepage', {
            title: 'LearnDome',
            courses: courses,
            layout: '../views/student_layout/layout'
        });

    }
};
    // Instructor.findById(req.user._id, function(err, inst){
    //     if(inst){
    //         return res.render('inst_homepage',{
    //             title: 'LearnDome', 
    //             layout: '../views/admin_layout/layout'
    //         })
    //     }
//         else{
//             Course.find({}).populate('instructor').populate('courses').exec(function(err, courses){
//                 return res.render('homepage', {
//                     title: 'LearnDome',
//                     courses: courses,
//                     layout: '../views/student_layout/layout'
//                 });
//             });
//         }
//     })
// };
