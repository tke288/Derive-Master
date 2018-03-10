const mongoose = require('mongoose'); 
const _=require('lodash')



var BudgetSchema = mongoose.Schema({
	location:{
		type:String
	},
	date:{
		type:String
	},
	targerBudget:{
		type:String
	},
	airfareCost:{
		type:String
	},
	hostelCost:{
		type:String
	},
	miscellaneous:{
		type:String
	},
	totalCost:{
		type:String
	},
	underBudget:{
		type:String
	}

})

var Budget=mongoose.model('budget', BudgetSchema); 

module.exports={Budget}