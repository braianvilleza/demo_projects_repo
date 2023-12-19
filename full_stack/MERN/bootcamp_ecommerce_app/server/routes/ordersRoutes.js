const express = require("express");

const ordersControllers = require("../controllers/ordersControllers.js");
const auth = require("../auth.js");

const router = express.Router();

router.post("/", auth.verifyToken, ordersControllers.getAllOrders)
router.post("/checkout", auth.verifyToken, ordersControllers.addOrders);
router.get("/countOrders", auth.verifyToken, ordersControllers.countOrders)

module.exports = router;