import db from "../models/index.js";

export default {
	findAll: function (req, res) {
		db.Transactions.find(req.query).sort({_id: -1})
			.then((transactions) => {
				// console.log(transactions)
				res.json(transactions);
			})
			.catch((err) => res.status(422).json(err));
	},
};


