
const Course = require('../models/course');

const Instructor = require('../models/instructor');

module.exports.home = function(req, res){

    // Course.find({}).populate('instructor')
    // .exec(function(err, courses){
    //     return res.render('homepage',{
    //         title: 'LearnDome',
    //         courses: courses
    //     });    
    // });
    Instructor.findById(req.user._id, function(err, inst){
        if(inst){
            return res.render('inst_homepage',{
                title: 'LearnDome', 
                layout: '../views/admin_layout/layout'
            })
        }
        else{
            Course.find({}).populate('instructor').populate('courses').exec(function(err, courses){
                return res.render('homepage', {
                    title: 'LearnDome',
                    courses: courses,
                    layout: '../views/student_layout/layout'
                });
            });
        }
    })
};
