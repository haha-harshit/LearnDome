module.exports.mydome = function(req, res){
    return res.render('dashboard', {
        title: 'LearnDome | Dashboard'
    });
};

module.exports.profile = function(req, res){
    return res.render('_profile', {
        title: 'LearnDome | Your Profile'
    });
};
