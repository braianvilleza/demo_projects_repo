const mongoose = require("mongoose");

const Orders = require("../models/Orders.js");
const Products = require("../models/Products.js");

const auth = require("../auth.js");

module.exports.addOrders = (request, response) =>{
	
	const userAuth = auth.decodeToken(request.headers.authorization);
	
	const productId = request.body.id;
	const orderQuantity = request.body.quantity


	if(userAuth.isAdmin){
		return response.send("Sorry, you can't add any orders!");
	}else{
		Products.findById(productId)
		.then(result =>{
			if(result){
				
				const dbIsActive = result.isActive

				if(dbIsActive){

					const dbQuantity = result.quantity

					if(dbQuantity > 0 && orderQuantity > 0 && dbQuantity >= orderQuantity){
						let dbPrice = result.price;
						let total = orderQuantity * dbPrice;

						let newOrder = new Orders({
							userId: userAuth.id,
							products:[
								{
									productId: request.body.id,
									quantity: request.body.quantity
								}
							],
							totalAmount: total
						});

						newOrder.save()
						.then(saved => {
							const newQuantity = dbQuantity - orderQuantity;

							const updatedQuantity = {
								quantity: newQuantity
							}

							Products.findByIdAndUpdate(productId, updatedQuantity)
							.then(productResult => {
								if(productResult){
									return response.send("Your have successfully placed your order. Thank you for shopping!");
								}else{
									return response.send("Unable to process your order. Please try again later.");
								}
							})
							.catch(err => response.send(err));
						})
						.catch(err => response.send(err));
					}
					else if(dbQuantity <= 0){
						return response.send("Sorry, this product is currently out-of-stock!");
					}
					else if(dbQuantity < orderQuantity){
						return response.send("Sorry, we don't have enough items for your order.");
					}
					else if(orderQuantity <= 0){
						return response.send("Transaction failed: Sorry, we're unable to process your order at the moment. Order quantity must not be equal or less than 0. Please try again");
					}
					else{
						return response.send("Sorry, we can't process your order at this moment. Please try agian later!");
					}
				}
				else{return response.send("Sorry, this product is currently unavailable!")}
			}
			else{return response.send(`Product not found!`)}
			
		})
		.catch(err => response.send(err));
	}
}

module.exports.getAllOrders = (request, response) => {
	const userAuth = auth.decodeToken(request.headers.authorization);
	
	// return response.send(userAuth.id)

	if(userAuth.isAdmin){
		return response.send(false)
	}else{
		// return response.send('Not admin')
		Orders.find({userId:userAuth.id})
		.then(result => {
				if(result){
					return response.send(result)	
				}else{
					return response.send(false)
				}
			}
		).catch(err => response.send(false))
	}
}


module.exports.countOrders = (request, response) =>{
	let userAuth = auth.decodeToken(request.headers.authorization)

	let userIdOrders = userAuth.id

	let orderCountFunc = (id) => {	
		Orders.estimatedDocumentCount({userId: id})
		.then(result => {
			return response.send(String(result));
		})
		.catch(err => response.send(err));
	}

	Orders.find({userId: userIdOrders})
	.then(result => {
		// console.log(result[0].products[0].productId)
		// console.log(result[1].products[0].productId)
		// console.log(result[3].products[0].productId)
		//orderCountFunc(result.userId);
		return response.send(result)
	})
	.catch(err => response.send(err))
}