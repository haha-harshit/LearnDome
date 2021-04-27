const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;

// crypto for generating password during google-auth
const crypto = require('crypto');

const Instructor = require('../models/instructor');
const Student = require('../models/student');

// importing environment
const env = require('./environment');


// tell passport to use a new strategy for instructor login/signup
passport.use('instructor-google', new googleStrategy({
        clientID: env.google_client_id,
        clientSecret: env.google_client_secret,
        // only callback url is different
        callbackURL: env.inst_google_callback_url
    },
    function(accessToken, refreshToken, profile, done){

        // find instrutor 
        Instructor.findOne({email: profile.emails[0].value}).exec(function(err, instructor){
            if(err){
                console.log('error in google strategy', err);
                return;
            }
            
            // if instructor found set this as req.user
            if(instructor){
                
                console.log('Login successfull through google!');
                return done(null, instructor);

            }else{
                // if instructor not found in db, create it and set as req.user or req.instructor, req.user means login
                Instructor.create({
                    username: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                }, function(err, instructor){
                    if(err){
                        console.log('error in creating instructor', err);
                        return;
                    }

                    console.log(profile);
                    return done(null, instructor);

                })
            }
        })
    }
))



passport.use('student-google', new googleStrategy({
        clientID: env.google_client_id,
        clientSecret: env.google_client_secret,
        callbackURL: env.stu_google_callback_url,
    },
    function(accessToken, refreshToken, profile, done){
        // find student 
        Student.findOne({email: profile.emails[0].value}).exec(function(err, student){
            if(err){
                console.log('error in google strategy', err);
                return;
            }


            // if instructor found set this as req.user
            if(student){
                console.log('Login successfull through google!');
                return done(null, student);

            }else{
                // if student not found in db, create it and set as req.user or req.student, req.user means login
                Student.create({
                    username: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                }, function(err, student){
                    if(err){
                        console.log('error in creating student', err);
                        return;
                    }

                    console.log(profile);
                    return done(null, student);

                })
            }
        })
    }
))



module.exports = passport;