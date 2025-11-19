// const router = require("express").Router();
import {Router} from "express";
//  const transactionsController = require("../../controllers/transactionsController");
import  transactionsController from "../../controllers/transactionsController.js";
// import passport from "../../utils/passport";

const router = Router();
// Matches with "/api/transactions" from API.js
router.route("/").get(transactionsController.findAll);


export default router ;
