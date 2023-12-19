const Users = require("../models/Users.js");
const Products = require("../models/Products.js");
const Orders = require("../models/Orders.js");

const bcrypt = require("bcrypt");
const auth = require('../auth.js');

module.exports.checkEmail = (request, response) => {
	const email = request.body.email;

	Users.findOne({email: email})
	.then(result => {
			if(result){
				response.send(true)
			}else{
				response.send(false)
			}
		}
	)
	.catch(err => response.send(err));
}

module.exports.userRegistration = (request, response) =>{
	
	const userEmail = request.body.email;
	const userFirstName = request.body.firstName;

	Users.findOne({email: userEmail})
	.then(result => {
		if(!result){
			let newUser = new Users({
				firstName: request.body.firstName,
				lastName: request.body.lastName,
				middleName: request.body.middleName,
				mobileNo: request.body.mobileNo,
				email: request.body.email,
				password: bcrypt.hashSync(request.body.password, 10),
				isAdmin: request.body.isAdmin
			});

			newUser.save()
			.then(result => response.send(true))
			.catch(err => response.send(false));
		}else{
			return response.send(false);
		}
	})
	.catch(err => console.log(err));
}

module.exports.userLogin = (request, response) =>{
	
	let userEmail = request.body.email;

	Users.findOne({email: userEmail})
	.then(result =>{
		if(result){
			
			const isPasswordCorrect = bcrypt.compareSync(request.body.password, result.password)

			if(isPasswordCorrect){
				return response.send({
					auth: auth.createAccessToken(result)
				});
			}else{
				return response.send(false);
			}

		}else{
			return response.send(false);
		}
	})
	.catch(err => response.send(false));
}

module.exports.userDetails = (request, response) =>{
	const userAuth = auth.decodeToken(request.headers.authorization)

	Users.findById(userAuth.id)
	.then(result =>{
		return response.send(result);
	})
	.catch(err => response.send(false));
}