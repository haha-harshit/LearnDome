
const passport = require('passport');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const Instructor = require('../models/instructor');
const Student = require('../models/student');

let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'LearnDome'
}

passport.use('instructor-jwt', new JWTstrategy(opts, function(jwtPayLoad, done){
    Instructor.findById(jwtPayload._id, function(err, instructor){
        if(err){
            console.log('error in finding instrutor from JWT');
            return;
        }

        if(instructor){
            return done(null, instructor);
        }else{
            return done(null, false);
        }

    })
}));


passport.use('student-jwt', new JWTstrategy(opts, function(jwtPayLoad, done){
    Student.findById(jwtPayload._id, function(err, student){
        if(err){
            console.log('error in finding student from JWT');
            return;
        }

        if(student){
            return done(null, student);
        }else{
            return done(null, false);
        }

    })
}));

module.exports = passport