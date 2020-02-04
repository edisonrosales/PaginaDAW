const passport=require('passport');
const LocalStrategy=require('passport-local');
const pool=require('../database');
const helpers=require('../lib/helpers');

passport.use('local.signin',new LocalStrategy({
	usernameField:'correo',
	passwordField:'password',
	passReqToCallback:true
},async(req,correo,password,done)=>{
	const rows=await pool.query('select * from users where correo=?',[correo]);
	if(rows.length>0){
		const user=rows[0];
		const validPassword=await helpers.matchPassword(password,user.password);
		if(validPassword){
			done(null,user,req.flash('success','Bienvenido'+user.nombre));
		}else{
			done(null,false,req.flash('message','Contraseña incorrecta'));
		}
	}else{
		return done(null,false,req.flash('message','Usuario no existe'));
	}
}));


passport.use('local.signup',new LocalStrategy({
	usernameField:'correo',
	passwordField:'password',
	passReqToCallback:true
},async(req,correo,password,done)=>{
	const {id,nombre,apellido,telefono,direccion}=req.body;
	const newUser={
		id:id,
		correo:correo,
		password:password,
		nombre:nombre,
		apellido:apellido,
		telefono:telefono,
		direccion:direccion
	};
	newUser.password=await helpers.encryptPassword(password);
	const result=await pool.query('insert into users set ?',[newUser]);
	newUser.id=result.insertId;
	return done(null,newUser);
}));


passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async(id,done)=>{
  const rows = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
  done(null, rows[0]);
});