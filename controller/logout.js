/**
 * New node file
 */
exports.logout = function(req,res,next){
	req.session.user = null;
	req.flash('success','退出完毕，欢迎下次访问');
	return res.redirect('/login');
};
