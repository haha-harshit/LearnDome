
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

    Course.find({}).populate('instructor').exec(function(err, courses){
        return res.render('homepage', {
            title: 'LearnDome',
            courses: courses,
            layout: '../views/student_layout/layout'
        });
    });

};


module.exports.mydome = function(req, res){
    return res.render('dashboard', {
        title: 'LearnDome | Dashboard',
        layout: '../views/student_layout/layout'
    });
};