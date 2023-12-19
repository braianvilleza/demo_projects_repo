const mongoose = require("mongoose");

// const Schema = mongoose.Schema.Types.ObjectId
const ObjectId = mongoose.Schema.Types.ObjectId

const ordersSchema = new mongoose.Schema({
	userId: {
		type: ObjectId,
		required: [true, "UserId is required!"]
	},
	products:[
		{
			productId:{
				type: ObjectId,
				required: [true, "ProductId is required!"]
			},
			quantity:{
				type: Number,
				required: [true, "Product order quantity is required!"]
			}
		}
	],
	totalAmount:{
		type: Number,
		required: [true, "Order totalAmount is required!"]
	},
	purchasedOn:{
		type: Date,
		default: new Date()
	}
});


const Orders = mongoose.model("Oder", ordersSchema);

module.exports = Orders;