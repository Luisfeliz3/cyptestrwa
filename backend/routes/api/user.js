// const router = require("express").Router();
import {Router}from "express";
// const userController = require("../../controllers/userController");
import userController from "../../controllers/userController.js";
// Requiring passport as we've configured it
import passport from "../../utils/passport.js";

const router = Router();

// Matches with "/api/user/login"
router
	.route("/login")
	// Using the passport.authenticate middleware with our local strategy.
	// If the user has valid login credentials, send them to the members page.
	// Otherwise the user will be sent an error
	.post(passport.authenticate("local"), userController.login);

// Matches with "/api/user/signup"
router.route("/signup").post(userController.signup);

// Matches with "/api/user/logout"
router
	.route("/logout")
	// Route for logging user out
	.get(userController.logout);

// Matches with "/api/user/authenticate"
router
	.route("/authenticate")
	// Route for getting some data about our user to be used client side
	.post(userController.authenticate);
export default router;
