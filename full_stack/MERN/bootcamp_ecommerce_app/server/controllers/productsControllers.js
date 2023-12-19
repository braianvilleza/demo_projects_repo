const Products = require("../models/Products.js")

const auth = require('../auth.js');

module.exports.addProduct = (request, response) =>{

	const product = request.body.productName;

	let userAuth = auth.decodeToken(request.headers.authorization);
	
	if(userAuth.isAdmin){
		Products.findOne({productName: product})
		.then(result =>{
			if(result){
				return response.send("Product available")
			}else{
				let newProduct = new Products({
					productName: request.body.productName,
					description: request.body.description,
					price: request.body.price,
					quantity: request.body.quantity,
					productImage: request.body.productImage,
					isActive: request.body.isActive,
					isFeatured: request.body.isFeatured,
					createdOn: request.body.createdOn
				})

				newProduct.save()
				.then(result => response.send(true))
				.catch(err => response.send(false));
			}
		})
		.catch(err => response.send(false))
	}else{
		return response.send(false);
	}
}

module.exports.getAllProducts = (request, response) =>{

	let userAuth = auth.decodeToken(request.headers.authorization);

	if(userAuth.isAdmin){
		Products.find({})
		.then(result => response.send(result))
		.catch(err => response.send(false));
	}else{
		return response.send(false);
	}
}

module.exports.getAllActiveProducts = (request, response) =>{
	Products.find(
		{isActive: true}
		// ,{_id: 0, isActive: 0, __v: 0, createdOn: 0}
	)
	.then(result =>{
		if(result){
			return response.send(result);
		}else{
			return response.send(false);
		}
	})
	.catch(err => response.send(false))
}

module.exports.getAllArchivedProducts = (request, response) => {

	const userAuth = auth.decodeToken(request.headers.authorization);

	if(userAuth.isAdmin){
		Products.find({isActive: false})
		.then(result => {
			if(result){
				return response.send(result)
			}else{
				return response.send(false)
			}
		})
		.catch(err => response.send(false))
	}else{
		return response.send(false)
	}
}

module.exports.getAllOutOfStockProducts = (request, response) => {
	const userAuth = auth.decodeToken(request.headers.authorization);

	if(userAuth.isAdmin){
		Products.find({isActive: true, quantity: 0})
		.then(result =>{
			return response.send(result)
		})
		.catch(err => response.send(false))
	}else{
		return response.send(false)
	}
}

module.exports.getSpecificProduct = (request, response) =>{

	let selectProductId = request.params.productId

	Products.findById(selectProductId)
	.then(result => {
		if(result){
			const isInStock = result.quantity > 0;
			if(result.isActive){
				if(isInStock){
					return response.send(result)
				}else{
					return response.send(result)
				}
			}else{
				return response.send('Not active')
			}
		}else{
			return response.send('No result');
		}
	})
	.catch(err => response.send(err))
}

module.exports.updateProduct = (request, response) =>{
	
	const userAuth = auth.decodeToken(request.headers.authorization);

	const productId = request.body.id

	const productInfo = {
		productName: request.body.productName,
		description: request.body.description,
		price: request.body.price,
		quantity: request.body.quantity,
		productImage: request.body.productImage
	}

	if(userAuth.isAdmin){
		Products.findByIdAndUpdate(productId, productInfo)
		.then(result => {
			if(result){
				if(result.isActive){
					return response.send(true);
					// return response.send(`Product is successfully updated!`)
				}else{
					return response.send(true);
					// return response.send(`Product is successfully updated!\n\nNOTICE: This product is currently in archived!`)
				}				
			}else{
				return response.send(true);
				// return response.send(`Invalid Transaction: You are using an invalid ProductID.`);
			}
		})
		.catch(err => response.send(false))
	}else{
		return response.send(true);
		// return response.send("Access Denied: Sorry, you don't have access to update any product!");
	}
}

module.exports.archiveProduct = (request, response) =>{
	
	const userAuth = auth.decodeToken(request.headers.authorization);
	const productId = request.params.productId;


	// checks if user is admin
	if(userAuth.isAdmin){

		// find product by product id
		Products.findById(productId)
		.then(result => {

			// checks if there will be a result based from the product id
			if(result){
				
				if(result.isActive){
					const archiveThisProduct = {
						isActive: false
					}
					// archive this product
					Products.findByIdAndUpdate(productId, archiveThisProduct)
					.then(result => {
						if(result){
							return response.send(result)
						}else{
							return response.send(false);
							// return response.send(`Can't archive this product. Something went wrong`);
						}
					})
					.catch(err => response.send(false))
				}else{
					const archiveThisProduct = {
						isActive: true
					}
					// Unarchive this product
					Products.findByIdAndUpdate(productId, archiveThisProduct)
					.then(result => {
						if(result){
							return response.send(result)
						}else{
							return response.send(false);
							// return response.send(`Can't unarchive this product. Something went wrong`);
						}
					})
					.catch(err => response.send(false))
				}
			}else{
				return response.send(false)
				// return response.send('No response back from this product id')
			}
			
		})
		.catch(err => response.send(false))

	}else{
		return response.send(false)
		// return response.send("Access Denied: Sorry, you don't have access on product archiving!");
	}
}

module.exports.featuredProducts = (request, response) => {
	const featured = {
		isFeatured: true
	}
	
	Products.find(featured)
		.then(result => response.send(result))
		.catch(err => response.send(err));
}