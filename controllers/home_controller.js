module.exports.home = function(req, res){
    return res.render('homepage',{
        title: 'LearnDome'
    })
}

module.exports.mydome = function(req, res){
    return res.render('dashboard', {
        title: 'LearnDome | Dashboard'
    });
};