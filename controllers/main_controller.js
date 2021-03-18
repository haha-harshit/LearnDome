
// access main site page
module.exports.main = function(req, res){
    return res.render('main', {
        title: 'LearnDome'
    })
}

// access sign-up
module.exports.sign_up = function(req, res){
    return res.end('<h1>Sign Up</h1>')
}

// access log-in
module.exports.log_in = function(req, res){
    return res.end('<h1>Log In</h1>')
}

// access log-out
// module.exports.log_out = function(req, res){
//     return res.end('<h1>This is main</h1>')
// }
