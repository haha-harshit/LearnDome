
const User = require('../models/user');

module.exports.home = function(req, res){
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id, function(err, user){
            if(user){
                return res.render('homepage', {
                    title: 'LearnDome',
                    user: user
                })
            }
            return res.redirect('/log-in');
        });

    }else{
        return res.redirect('/log-in');
    }
}

module.exports.mydome = function(req, res){
    return res.render('dashboard', {
        title: 'LearnDome | Dashboard'
    });
};