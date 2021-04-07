const Course = require('../models/course');
const Instructor = require('../models/instructor');

 
module.exports.create_course = function(req, res){
    Course.create({
        c_url: req.body.c_url,
        c_name: req.body.c_name,
        c_description: req.body.c_description,
        instructor: req.user._id
    },function(err, course){
        if(err){
            console.log("Error in creating a Course!");
            console.log(err);
            return;
        }
        console.log(course);
        return res.redirect('back');
    });
};

module.exports.course_modal = function(req, res){
    Course.findById(req.params.id, function(err, courses){
        // console.log('Exploring Course...');
        // console.log(req.params.id);
        return res.render('dashboard',{
            title: courses.c_name,
            c: courses,
            layout: '../views/student_layout/layout'
            // async: true
        });
    });
};