
const User = require('../models/user');

// access main site page
module.exports.main = function(req, res){
    return res.render('main', {
        title: 'LearnDome'
    })
}

// access sign-up
module.exports.sign_up = function(req, res){
    return res.render('_signup', {
        title: 'LearnDome | Sign Up'
    })
}

// access log-in
module.exports.log_in = function(req, res){
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

    User.findOne({email: req.body.email}, function(err, user){
        if(err){
            console.log('Error in finding the user!');
            return;
        }
        if(user){
            console.log("User already present");
            return res.render('_alreadyPresent', {
                title: 'LearnDome | Notice'
            });
        }

        if(!user){

            User.create(req.body, function(err, user){
                if(err){
                    console.log('Error in creating the Account!');
                    return;
                }
                console.log('Account created successfully!', user)
                return res.redirect('log-in');
            })
        }else{
            return res.redirect('back');
        }
    })
}

// get the sign-in data
module.exports.create_session = function(req, res){

}
