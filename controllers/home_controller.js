
const Course = require('../models/course');

module.exports.home = function(req, res){

    Course.find({}).populate('instructor').exec(function(err, courses){
        return res.render('homepage',{
            title: 'LearnDome',
            courses: courses
        });   
    });
}

module.exports.mydome = function(req, res){
    return res.render('dashboard', {
        title: 'LearnDome | Dashboard'
    });
};