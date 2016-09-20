module.exports = {
	ensureAuthenticated: function (req, res, next) {
		//console.log(req.user, req.session);
		//console.log("!!!ATTENTION!!!", req._passport.instance._userProperty);
		if (req.isAuthenticated()) {
			next();
		} else {
			res.status(401).end();
		}
	},
	isAdministrator: function (req, res, next) {
		if (req.user && req.user.isAdmin) {
			next();
		} else {
			res.status(401).end();
		}
	},
	verifyUser: function (req, res, next) {
		//console.log(req.session, req.user);
		if (req.session.passport.user === +req.params.id) {
			next();
		} else {
			res.status(401).end();
		}
	},
	adminOrUser: function(req,res,next){
		if(req.session.passport.user === +req.params.id || (req.user && req.user.isAdmin)){
			next();
		} else {
			res.status(401).end();
		}
	}
}