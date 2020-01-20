const path= require('path');
const morgan=require('morgan');
const express= require('express');
const app=express();

//Importing routers
const indexRoutes= require('./routes/index');

//Settings
app.set('port',process.env.PORT|| 8080);
app.set('views', path.join(__dirname,'views'));
app.set('view engine','ejs');

//Middlewares
app.use(morgan('dev'));

//routes
app.use('/',indexRoutes);


//Starting the server

//const PORT = process.env.PORT || 8080;
app.listen(app.get('port'), () => {
  console.log(`Server listening on port ${app.get('port')}...`);
}); 