const mongoose = require("mongoose");


const productsSchema = new mongoose.Schema({
	productName: {
		 type: String
		,required: [true, "Product name is required!"]
	},
	description:{
		 type: String
		,required: [true, "Product description is required!"]
	},
	price:{
		 type: Number
		,required: [true, "Product price is reuired!"]
	},
	quantity:{
		 type: Number
		,required: [true, "Product quantity is required!"]
	},

	productImage: {
		 type: String
		,default: ""
	},
	isActive:{
		 type: Boolean
		,default: true
	},
	isFeatured:{
		 type: Boolean
		,default: false
	},
	createdOn:{
		 type: Date
		,default: new Date()
	}
});


const Products = mongoose.model("Product", productsSchema);

module.exports = Products;