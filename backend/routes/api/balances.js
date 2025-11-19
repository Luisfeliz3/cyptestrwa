// const router = require("express").Router();
import {Router} from "express";
//  const transactionsController = require("../../controllers/transactionsController");
import  balancesController from "../../controllers/balancesController.js";
// import passport from "../../utils/passport";

const router = Router();
// Matches with "/api/balances" from API.js
router.route("/").get(balancesController.findAll);

// router.route("/makepayment/").post(
//     balancesController.payBalance
// )

router
  .route("/")
  .post(balancesController.findById)
  // .put(balancesController.update)
   

export default router ;
