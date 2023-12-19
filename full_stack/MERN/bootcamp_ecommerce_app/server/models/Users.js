const mongoose = require("mongoose");

const ObjectId = mongoose.Schema.Types.ObjectId;

const usersSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: [true, "First name is required!"]
	},
	middleName: {
		type: String,
		default: ""
	},
	lastName: {
		type: String,
		required: [true, "Last name is required!"]
	},
	mobileNo: {
		type: String,
		required: [true, "Mobile number is required!"]
	},
	email: {
		type: String,
		required: [true, "Email is required!"]
	},
	password: {
		type: String,
		required: [true, "Password is required"]
	},
	isAdmin:{
		type: Boolean,
		default: false
	},
	address: [
		{	
			brgy:{
				type: String,
				default: ""
			},
			addressPart:{
				type: String,
				default: ""
			},
			municipality:{
				type: String,
				default: ""
			},
			city:{
				type: String,
				default: ""
			},
			region:{
				type: String,
				default: ""
			}
		}
	],
	cart: [
        {
            productId: {
                type: ObjectId,
                required: [true, 'ProductId is required!']
            },
            quantity: {
                type: Number,
                required: [true, 'Product quantity is required!']
            },
            createdOn: {
                type: Date,
                default: new Date()
            }
        }
    ],
	orders: [
		{
			orderId: {
				type: ObjectId,
				required: [true, "OrderId is required"]
			},
			totalAmount: {
				type: ObjectId,
				required: [true, "Order total amount is required"]
			}
		}
	]
});

const Users = mongoose.model("User", usersSchema);

module.exports = Users