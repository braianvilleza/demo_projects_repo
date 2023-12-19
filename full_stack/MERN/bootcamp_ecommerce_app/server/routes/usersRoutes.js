const express = require("express");
const routes = express.Router();

const usersControllers = require("../controllers/usersControllers.js");
const auth = require("../auth.js");

routes.post("/register", usersControllers.userRegistration);
routes.post("/login", usersControllers.userLogin);
routes.post("/checkEmail", usersControllers.checkEmail);
routes.get("/userDetails", auth.verifyToken, usersControllers.userDetails);


module.exports = routes;