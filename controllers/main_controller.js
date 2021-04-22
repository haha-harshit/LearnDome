
const User = require('../models/user');
const Student = require('../models/student');
const Instructor = require('../models/instructor');

// access main site page
module.exports.main = function(req, res){

    if(req.isAuthenticated()){
        return res.redirect('/homepage');
    }

    return res.render('main', {
        title: 'LearnDome',
    })
}

// access sign-up
module.exports.stu_sign_up = function(req, res){
    // check if signed-in
    if(req.isAuthenticated()){
        return res.redirect('/homepage');
    }

    return res.render('_stu_signup', {
        title: 'LearnDome | Sign Up',
    })
}
module.exports.inst_sign_up = function(req, res){
    // check if signed-in
    if(req.isAuthenticated()){
        return res.redirect('/homepage');
    }

    return res.render('_instructor_signup', {
        title: 'LearnDome | Sign Up',
    }) 
}

// access log-in for STUDENT
module.exports.log_in_student = function(req, res){

    // check if signed-in
    if(req.isAuthenticated()){
        return res.redirect('/homepage');
    }

    return res.render('_stu_login', {
        title: 'LearnDome | Login'
    })
}
// access log-in for INSTRUCTOR
module.exports.log_in_instructor = function(req, res){

    // check if signed-in
    if(req.isAuthenticated()){
        return res.redirect('/homepage');
    }

    return res.render('_inst_login', {
        title: 'LearnDome | Login'
    })
}




// get the sign-up data for STUDENT
module.exports.create_stu_account = function(req, res){
    // matching the password and consfirm password fields
    if(req.body.password != req.body.confirm_password){
        console.error("confirm password did not match your initial password!");
        return res.redirect('back');
    }
    
    // search if email already taken or not
    Student.findOne({email: req.body.email}, function(err, user){
        // for any technical error!
        if(err){
            console.log(err);
            return;
        }

        // for user's email successfully found in database---->> ALREADY TAKEN!
        if(user){
            console.log("E-mail already registered!");
            return res.render('_alreadyPresent', {
                title: 'LearnDome | Notice'
            });
        }

        if(!user){
            
            // search for user's USERNAME if ALREADY TAKEN or not!
            Student.findOne({username: req.body.username}, function(err, username){
                // technical error
                if(err){
                    console.log(err);
                    return;
                }

                // for USERNAME successfully found in Database---->> ALREADY TAKEN!
                if(username){
                    console.log("USERNAME already taken!");
                    return res.redirect('back');
                }

                if(!username){
                    Student.create(req.body, function(err, user){
                        if(err){
                            console.log('Error in creating the Account!');
                            console.log(err);
                            return;
                        }
                        console.log('Account created successfully!', user)
                        return res.redirect('log-in-student');
                    })      
                }
            })
        }else{
            return res.redirect('back');
        }
    })    

    // User.findOne({email: req.body.email}, function(err, user){
    //     // for any technical error!
    //     if(err){
    //         console.log(err);
    //         return;
    //     }

    //     // for user's email successfully found in database---->> ALREADY TAKEN!
    //     if(user){
    //         console.log("E-mail already registered!");
    //         return res.render('_alreadyPresent', {
    //             title: 'LearnDome | Notice'
    //         });
    //     }

    //     if(!user){
            
    //         // search for user's USERNAME if ALREADY TAKEN or not!
    //         User.findOne({username: req.body.username}, function(err, username){
    //             // technical error
    //             if(err){
    //                 console.log(err);
    //                 return;
    //             }

    //             // for USERNAME successfully found in Database---->> ALREADY TAKEN!
    //             if(username){
    //                 console.log("USERNAME already taken!");
    //                 return res.redirect('back');
    //             }

    //             if(!username){
    //                 User.create(req.body, function(err, user){
    //                     if(err){
    //                         console.log('Error in creating the Account!');
    //                         console.log(err);
    //                         return;
    //                     }
    //                     console.log('Account created successfully!', user)
    //                     return res.redirect('log-in');
    //                 })      
    //             }
    //         })
    //     }else{
    //         return res.redirect('back');
    //     }
    // })
}


// get the sign-up data for INSTRUCTOR
module.exports.create_inst_account = function(req, res){
    // matching the password and consfirm password fields
    if(req.body.password != req.body.confirm_password){
        console.error("confirm password did not match your initial password!");
        return res.redirect('back');
    }
    
    // search if email already taken or not
    Instructor.findOne({email: req.body.email}, function(err, user){
        // for any technical error!
        if(err){
            console.log(err);
            return;
        }

        // for user's email successfully found in database---->> ALREADY TAKEN!
        if(user){
            console.log("E-mail already registered!");
            return res.render('_alreadyPresent', {
                title: 'LearnDome | Notice'
            });
        }

        if(!user){
            
            // search for user's USERNAME if ALREADY TAKEN or not!
            Instructor.findOne({username: req.body.username}, function(err, username){
                // technical error
                if(err){
                    console.log(err);
                    return;
                }

                // for USERNAME successfully found in Database---->> ALREADY TAKEN!
                if(username){
                    console.log("USERNAME already taken!");
                    return res.redirect('back');
                }

                if(!username){
                    Instructor.create(req.body, function(err, user){
                        if(err){
                            console.log('Error in creating the Account!');
                            console.log(err);
                            return;
                        }
                        console.log('Account created successfully!', user)
                        return res.redirect('log-in-instructor');
                    })      
                }
            })
        }else{
            return res.redirect('back');
        }
    })
}



// get the sign-in data
module.exports.create_session_student = function(req, res){
    req.flash('success', 'Logged in successfully!');
    return res.redirect('homepage');
}
module.exports.create_session_instructor = function(req, res){
    req.flash('success', 'Logged in successfully!');
    return res.redirect('homepage');
}

// logging-out
module.exports.destroy_session = function(req, res){
    // function given by passport
    req.logout();
    req.flash('success', 'Logged Out Successfully!')
    
    return res.redirect('/');
}