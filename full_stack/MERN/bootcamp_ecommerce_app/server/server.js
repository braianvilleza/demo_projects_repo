require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors')

const port = process.env.APP_API_PORT || 3600;

const app = express();

const usersRoutes = require("./routes/usersRoutes.js");
const productsRoutes = require("./routes/productsRoutes.js");
const ordersRoutes = require("./routes/ordersRoutes.js");
const cartRoutes = require("./routes/cartRoutes.js");

// const maxRequestBodySize = '2mb';

let dbConn = mongoose.connection;
	dbConn.on("error", console.error.bind(console, "Error! Server connection to cloud database failed!"));
	dbConn.once("open", () => console.log("Server connection to cloud database was successful!"));

const dbConString = process.env.APP_API_DBCONSTRING;

mongoose.connect(dbConString,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true
	}
);


// cors
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: true}));
// app.use(express.json({limit: maxRequestBodySize}));
// app.use(express.urlencoded({extended: true, limit: maxRequestBodySize}));

app.use("/users", usersRoutes);
app.use("/products", productsRoutes);
app.use("/cart", cartRoutes);
app.use("/orders", ordersRoutes);

app.listen(port, () => console.log(`Server is running at port ${port}`));