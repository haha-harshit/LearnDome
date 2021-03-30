
const User = require('../models/user');

// access main site page
module.exports.main = function(req, res){
    return res.render('main', {
        title: 'LearnDome'
    })
}

// access sign-up
module.exports.sign_up = function(req, res){
    // check if signed-in
    if(req.isAuthenticated()){
        return res.redirect('/homepage');
    }

    return res.render('_signup', {
        title: 'LearnDome | Sign Up'
    })
}

// access log-in
module.exports.log_in = function(req, res){

    // check if signed-in
    if(req.isAuthenticated()){
        return res.redirect('/homepage');
    }

    return res.render('_login', {
        title: 'LearnDome | Login'
    })
}




// get the sign-up data
module.exports.create_account = function(req, res){
    // matching the password and consfirm password fields
    if(req.body.password != req.body.confirm_password){
        console.error("confirm password did not match your initial password!");
        return res.redirect('back');
    }

    // search if email already taken or not
    User.findOne({email: req.body.email}, function(err, user){
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
            User.findOne({username: req.body.username}, function(err, username){
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
                    User.create(req.body, function(err, user){
                        if(err){
                            console.log('Error in creating the Account!');
                            console.log(err);
                            return;
                        }
                        console.log('Account created successfully!', user)
                        return res.redirect('log-in');
                    })      
                }
            })
        }else{
            return res.redirect('back');
        }
    })
}

// get the sign-in data
module.exports.create_session = function(req, res){
    return res.redirect('homepage');
}
