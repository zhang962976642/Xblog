exports.loginUp = function(req,res,next){
	if(!req.session.user){
		req.flash('error','未登录');
		res.redirect('/login');
	};
	next();
};
exports.loginDown = function(req,res,next){
	if(req.session.user){
		req.flash('error','已登陆');
		res.redirect('back');
	};
	next();
};
