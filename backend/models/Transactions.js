import mongoose from "mongoose";
// const Schema = mongoose.Schema;
import {Schema as Schema} from 'mongoose';


const TransactionsSchema = new Schema({
	date: { type: String, required: true },
	description: { type: String, required: true },
	amount: { type: Number, required: false }
});

const Transactions = mongoose.model("Transactions", TransactionsSchema);
export default Transactions;
