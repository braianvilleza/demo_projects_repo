const express = require("express");
const router = express.Router();

const productsControllers = require("../controllers/productsControllers.js");

const auth = require("../auth.js");

router.post("/addProduct", auth.verifyToken, productsControllers.addProduct);

router.get("/", auth.verifyToken, productsControllers.getAllProducts)

router.get("/activeProducts", productsControllers.getAllActiveProducts)

router.get("/archivedProducts", auth.verifyToken, productsControllers.getAllArchivedProducts)

router.get("/outOfStockProducts", auth.verifyToken, productsControllers.getAllOutOfStockProducts)

router.get("/featuredProducts", productsControllers.featuredProducts);

router.patch("/updateProduct", auth.verifyToken, productsControllers.updateProduct);

router.get("/:productId", productsControllers.getSpecificProduct)

router.patch("/archiveProduct/:productId", auth.verifyToken, productsControllers.archiveProduct);


module.exports = router;