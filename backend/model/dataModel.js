const {Schema, model}=require('mongoose');

const dataSchema= new Schema({
     name: {
		type: String,
		required: true,
	},
     phoneNumber: {
		type: String,
		required: true,
	},
    email: {
		type: String,
		required: true,
	},
    hobbies: {
		type: String,
		required: true,
	},
});
const dataModel=model('data', dataSchema);
module.exports=dataModel;
   
