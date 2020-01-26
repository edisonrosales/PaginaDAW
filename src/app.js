const path= require('path');
const morgan=require('morgan');
const express= require('express');
const mongoose=require('mongoose');
const app=express();

//Conectado DB
mongoose.connect('mongodb://localhost/webStore')
	.then(db=>console.log('conectada'))
	.catch(err=>console.log('error'));


//Importing routers
const indexRoutes= require('./routes/index');

//Settings
app.set('port',process.env.PORT|| 8080);
app.set('views', path.join(__dirname,'views'));
app.set('view engine','ejs');

//Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));

//routes
app.use('/',indexRoutes);


//Starting the server

//const PORT = process.env.PORT || 8080;
app.listen(app.get('port'), () => {
  console.log(`Server listening on port ${app.get('port')}...`);
}); 