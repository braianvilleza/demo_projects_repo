require("dotenv").config();

const jwt = require('jsonwebtoken');
const secret = process.env.APP_API_SECRET_KEY;

module.exports.createAccessToken = (userData) =>{
	const data = {
		id: userData._id,
		isAdmin: userData.isAdmin,
		email: userData.email
	}
	return jwt.sign(data, secret, {});
}

module.exports.verifyToken = (request, response, next) => {
	let userToken = request.headers.authorization;
	if(userToken !== undefined){
		userToken = userToken.slice(7, userToken.length)
		return jwt.verify(userToken, secret, (error, data) =>{
			if(error){
				return response.send(false);
			}else{
				next();
			}
		});
	}else{
		return response.send(false);
	}
}

module.exports.decodeToken = (userToken) =>{
	userToken = userToken.slice(7, userToken.length);
	return jwt.decode(userToken, {complete: true}).payload;
}