var User = require("../models/user")

/**
 * Checks if user is signed in. Returns true if it is, if not returns false
 * and gives req apropiate message 
 */
function checkUser(action, req, res){
	if (req.session.userId == undefined) {
		res.json({
			action: action,
			state: "fail",
			error: {
				message: "User not signed in"
			}
		});
		return false;
	}
	return true;
}

exports.userInfo = function(req, res){
	if (!checkUser('user_info', req, res))
		return;

	jRes = {
		action: "user_info"
	}

	user = User.findOne({'_id': req.session.userId}, function(err, result){
		if (err) {
			jRes.state = "fail";
			jRes.error = err;
		}else{
			jRes.state = "success";
			jRes.user = {
				_id: result._id,
				email: result.email,
				name: result.name
			}
		}
		
		res.json(jRes);
	});
}

exports.signup = function(req, res){
	user = new User(req.body)
	user.save(function(err){
		if(err){
			res.json({
				action: "signup",
				state: "fail",
				error: err,
				user: { "_id": user.id }
			})
		}else{
			req.session.userId = user.id
			res.json({
				action: "signup",
				state: "success",
				user: { "_id": user.id }
			})
		}
	})
}

exports.signout = function(req, res){
	if (!checkUser('signout', req, res))
		return;

	req.session.userId = undefined;
	res.json({
		action: "signout",
		state: "success"
	});
}