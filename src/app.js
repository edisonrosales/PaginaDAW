const path= require('path');
const morgan=require('morgan');
const express= require('express');
const exphbs=require('express-handlebars');
const mongoose=require('mongoose');
const passport=require('passport');
const session=require('express-session');
const flash=require('connect-flash');
const mysqlstore=require('express-mysql-session');
const {database}=require('./keys.js');


//Inicializacion
const app=express();
require('./lib/passport');
//const contact=express();

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
app.use(session({
	secret:'mysql',
	resave:false,
	saveUninitialized:false,
	store: new mysqlstore(database)
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//Variables Globales para la autenticacion del login
app.use((req, res, next) => {
  app.locals.message = req.flash('message');
  app.locals.success = req.flash('success');
  app.locals.user = req.user;
  next();
});

//routes
app.use('/',indexRoutes);
app.use(require('./routes/authentication'));
app.use(require('./routes/cliente'));

/*app.use(require('./routes/authentication.js'));
app.use('/links',require('./routes/links.js'));
*/

//Public
/*app.use(express.static(path.join(__dirname,'public')));
*/
//Starting the server
app.listen(app.get('port'), () => {
  console.log(`Server listening on port ${app.get('port')}...`);
}); 