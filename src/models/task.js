const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const TaskSchema=new Schema({
	marca:String,
	descripcion:String,
	stock:Number,
	precio:Number,
	imagen:String
});

module.exports= mongoose.model('tasks',TaskSchema);