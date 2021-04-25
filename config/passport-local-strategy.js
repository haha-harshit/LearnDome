const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');
const Student = require('../models/student');
const Instructor = require('../models/instructor');

// authenticating STUDENT using passport
passport.use('student-local' ,new LocalStrategy({
        usernameField: 'email',
        passReqToCallback: true
    }, 
    function(req, email, password, done){
        // find a user and establish the identity
        Student.findOne({email: email}, function(err, student){
            if(err){
                req.flash('error', err);
                return done(err);
            }
            else if(!student || student.password != password){
                req.flash('error', 'Invalid Username/Password');
                // console.log('Not a student id!');
                return done(null, false);
            }
            else{
                return done(null, student);
            }
        }) 
    }
));


// authentication INSTRUCTOR using passport
passport.use('instructor-local' ,new LocalStrategy({
        usernameField: 'email', 
        passReqToCallback: true
    }, 
    function(req, email, password, done){
        // find a user and establish the identity
        Instructor.findOne({email: email}, function(err, instructor){
            if(err){
                req.flash('error', err);
                return done(err);
            }
            else if(!instructor || instructor.password != password){
                req.flash('error', 'Invalid Username/Password');
                return done(null, false);
            }
            else{
                // console.log('passed instructor!');
                return done(null, instructor);

            }
        
        }) 
    }
));


function SessionConstructor(userId, userGroup, details) {
    this.userId = userId;
    this.userGroup = userGroup;
    this.details = details;  
}

// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function (userObject, done){
// userObject could be a Model1 or a Model2... or Model3, Model4, etc.
    let userGroup = "Student";
    let userPrototype =  Object.getPrototypeOf(userObject);
    if (userPrototype === Student.prototype){
        userGroup = "Student";
    }else if (userPrototype === Instructor.prototype){
        userGroup = "Instructor";
    }

    let sessionConstructor = new SessionConstructor(userObject.id, userGroup, '');
    done(null,sessionConstructor);
});
passport.deserializeUser(function (sessionConstructor, done){
    if (sessionConstructor.userGroup == 'Student'){
        Student.findOne({
            _id: sessionConstructor.userId
        },
        '-localStrategy.password', function (err, user){ // When using string syntax, prefixing a path with - will flag that path as excluded.
            done(err, user);
        });

    }else if (sessionConstructor.userGroup == 'Instructor'){
        Instructor.findOne({
            _id: sessionConstructor.userId
        },
        '-localStrategy.password', function (err, user){ // When using string syntax, prefixing a path with - will flag that path as excluded.
            done(err, user);
        });
    }
});


// serializing the user to decide which key is to be kept in the cookies
// passport.serializeUser(function(user, done){
//     if(isStudent(student)){
//         done(null, user.id);
//     }
//     else if(isInstructor(instructor)){
//         done(null, user.id);
//     }
    
// })


// // deserializing the user from the key in the cookies
// passport.deserializeUser(function(id, done){
//     Student.findById(id, function(err, user){
//         if(err){
//             console.log('Error in finding user--> Passport');
//             Instructor.findById(id, function(err, user){
//                 if(err){
//                     console.log('Error in finding user--> Passport');
//                     return done(err);
//                 }
//                 return done(null, user);
//             });
//         }
//         return done(null, user);
//     });
// });


// check if user is authenticated
passport.checkAuthentication = function(req, res, next){
    // if user is signed in then pass on the next action
    if(req.isAuthenticated()){
        return next();
    }

    // if user is not signed in
    req.flash('information', 'You are not Logged In!');
    return res.redirect('back');
}

passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated){
        // req.user contains the current signed in user from the session cookie and sending this to the locals for views
        res.locals.user = req.user;
    }
    next();
}



module.exports = passport;