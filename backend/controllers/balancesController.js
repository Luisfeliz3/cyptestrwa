import db from "../models/index.js";

export default {
	findAll: function (req, res) {
		db.Balances.find(req.query).sort({_id: -1})
			.then((balances) => {
		
				res.json(balances);
			})
			.catch((err) => res.status(422).json(err));
	},

	payBalance: function (req, res) {
		db.Balances
		.findOneAndUpdate({ _id: req.params.id }, req.body)
		.then((balances) => {
			
				res.json(balances);
			})
			.catch((err) => res.status(422).json(err));
s
			// balances => console.log(req.params)

	},
	findById: async (req, res) => {
 
		await  db.Balances.findById(req.body.id)
       .findOneAndUpdate(
         { _id: req.body.id },
         {
           statement_balance: await req.body.statement_balance,
           minimum_payment: await req.body.minimum_payment,
           total_balance: await req.body.total_balance,
           pending_charges: await req.body.pending_charges,
           posted_charges: await req.body.posted_charges,
           remaining_statement_balance: await req.body.remaining_statement_balance,
           available_credit: await req.body.available_credit,
         }
       )
       .then(console.log(req.body))
       .then((balances) => res.json(balances))
       .catch((err) => res.status(422).json(err));
	 
	 },

	 update: function(req, res) {
		// db.Balances
		//  .findOneAndUpdate({ _id: req.params.id },{ remaining_statement_balance : req.params.payment})
		//  .then(Balances => res.json(Balances))
		//  .catch(err => res.status(422).json(err));

 
	 },
};


