// const router = require("express").Router();
import {Router}from "express";
const router = Router();
// const commentRoutes = require("./comments");

// const transactionRoutes = require("./transactions");
import transactionRoutes from "./transactions.js";
import balancesRoutes from "./balances.js";
// const userRoutes = require("./user");
import userRoutes from "./user.js";


// transaction routes
router.use("/transactions", transactionRoutes);
router.use("/balances", balancesRoutes);
router.use("/user", userRoutes);




export default  router;
