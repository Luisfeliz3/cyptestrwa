import mongoose from "mongoose";
// const Schema = mongoose.Schema;
import {Schema as Schema} from 'mongoose';


const BalancesSchema = new Schema({
 
	statement_balance: { type: Number, required: false, default :0.00 },
	minimum_payment: { type: Number, required: false, default :0.00 },
	total_balance: { type: Number, required: false, default :0.00 },
	pending_charges: { type: Number, required: false, default :0.00 },
	posted_charges: { type: Number, required: false, default :0.00 },
	remaining_statement_balance: { type: Number, required: false, default :0.00 },
	available_credit: { type: Number, required: false, default :0.00 },

});

const Balances = mongoose.model("Balances", BalancesSchema);
export default Balances;
