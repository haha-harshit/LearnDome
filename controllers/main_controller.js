
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

}

// get the sign-in data
module.exports.create_session = function(req, res){

}
