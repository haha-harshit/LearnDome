module.exports.mydome = function(req, res){
    return res.render('dashboard', {
        title: 'LearnDome | Dashboard'
    });
};