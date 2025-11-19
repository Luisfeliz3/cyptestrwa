import mongoose from "mongoose";
import db from "../models/index.js";
import  mongoOptions  from "./config.js";
import  moment from 'moment';

console.log(moment().add(10, 'days').format("MMM DD") );


// const seed = require("./seedLocalDB");

 

mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://user1:password1234@cluster0.k6ma6.mongodb.net/paymentcenter", {
    useUnifiedTopology: true ,
  useNewUrlParser: true,
});


let userSeed = [
	{
		username: "testUser",
		email: "email@email.com",
		password: "testPassword",
	
	}]

let balances = [

	{	
		statement_balance : 1000.85,
		minimum_payment : 40.00,
		total_balance : 8834.55,
		pending_charges : 1400.65,
		posted_charges : 40.00,
		remaining_statement_balance : 2300.85,
		available_credit : 10205.56
	}

]

let transactions = [
	{
		date: moment().add(0, 'days').format("MMM DD") ,
		description: "Starbucks Coffee",
		amount: "6.56",
	},
	{
		date: moment().add(1, 'days').format("MMM DD") ,
		description: "Gap Clothing Store",
		amount: "76.89",
	},
	{
		date: moment().add(3, 'days').format("MMM DD") ,
		description: "Transportation",
		amount: "16.55",
	},
	{
		date: moment().add(5, 'days').format("MMM DD") ,
		description: "CVS Pharmacy",
		amount: "23.25",
	},
	{
		date: moment().add(6, 'days').format("MMM DD") ,
		description: "Dunkin Donuts",
		amount: "2.66",
	},
	{
		date: moment().add(7, 'days').format("MMM DD") ,
		description: "McDonald's",
		amount: "8.36",
	},
	{
		date: moment().add(8, 'days').format("MMM DD") ,
		description: "Foot Locker",
		amount: "96.11",
	},
	{
		date: moment().add(9, 'days').format("MMM DD") ,
		description: "ZARA'S",
		amount: "106.75",
	},
	{
		date: moment().add(10, 'days').format("MMM DD") ,
		description: "Nadal's Deli",
		amount: "5.15",
	},
	{
		date: moment().add(11, 'days').format("MMM DD") ,
		description: "Grocery SuperMarket",
		amount: "56.56",
	},
	{
		date: moment().add(12, 'days').format("MMM DD") ,
		description: "Min Yin Ramen",
		amount: "13.59",
	},
	{
		date: moment().add(13, 'days').format("MMM DD") ,
		description: "Pizerria Pizza",
		amount: "5.38",
	},
	{
		date: moment().add(56, 'days').format("MMM DD") ,
		description: "TRAVELOCITY",
		amount: "500.38",
	},
];

setTimeout(function () {
	process.exit(0);
}, 5000);



const seed = function () {

	db.Users.deleteMany({})
	.then(() => db.Users.create(userSeed))
	.then((data) => {
		console.log(data.length + " User records inserted!");
	})
	.catch((err) => {
		console.error(err);
	});

	db.Transactions.deleteMany({})
		.then(() => db.Transactions.create(transactions))
		.then((data) => {
			console.log(data.length + "Transaction records inserted!");
		})
		.catch((err) => {
			console.error(err);
		});

		db.Balances.deleteMany({})
		.then(() => db.Balances.create(balances))
		.then((data) => {
			console.log(data.length + " Balance records inserted!");
		})
		.catch((err) => {
			console.error(err);
		});

};
seed();


export default  seed ;