const express= require('express');
const router= express.Router();
const pool=require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/contrato',(req,res)=>{
	res.render('ncontrato');
});

router.post('/contrato',isLoggedIn,async(req,res) =>{
	const {titulo, descripcion}=req.body;
	const newContrato={
		titulo,
		descripcion,
		user_id:req.user.id
	};
	await pool.query('insert into contrato set ?',[newContrato]);
	req.flash('success','Contrato guardado');
	res.redirect('/profile');
});


//Mostar informacion del cliente
router.get('/profile',isLoggedIn, async(req,res) =>{
	const info= await pool.query('select * from contrato where user_id=?',[req.user.id]);
	console.log(info);
	res.render('profile',{info});
});

//Eliminar contrato de cliente
router.get('/deleteContrato/:id',async(req,res)=>{
	console.log(req.params.id);
	const{id}= req.params;
	await pool.query('delete from contrato where id=?',[id]);
	res.redirect('/profile');
});

//Editar contrato  del cliente
router.get('/editContrato/:id',async(req,res)=>{
	const{id}= req.params;
	const ids= await pool.query('select * from contrato where id=?',[id]);
	res.render('updateC',{ids:ids[0]});
});

router.post('/editContrato/:id',async(req,res)=>{
	const{id}= req.params;
	const {titulo, descripcion}=req.body;
	const newContrato={
		titulo,
		descripcion
	};
	await pool.query('update contrato set ? where id=?',[newContrato,id]);
	res.redirect('/profile');
});
/*
//Crear una cuenta de cliente
router.get('/crearC',(req,res) =>{
	res.render('ncuenta');
});

router.post('/crearC',async(req,res) =>{
	const {id,nombre,apellido,password,correo,telefono,direccion}=req.body;
	const newUser={
		id,
		nombre,
		apellido,
		password,
		correo,
		direccion,
		telefono
	};
	await pool.query('insert into users set ?',[newUser]);
	res.send('Nuevo usuario creado');
});

//Mostar informacion del cliente
router.get('/inforC',async(req,res) =>{
	const info= await pool.query('select * from users');
	console.log(info);
	res.render('profile',{info});
});


//Eliminar cuenta de cliente
router.get('/deleteC/:id',async(req,res)=>{
	console.log(req.params.id);
	const{id}= req.params;
	await pool.query('delete from users where id=?',[id]);
	res.redirect('/inforC');
});

//Actualizar cuenta del cliente
router.get('/updateC/:id',async(req,res)=>{
	const{id}= req.params;
	const ids= await pool.query('select * from users where id=?',[id]);
	res.render('updateC',{ids:ids[0]});
});

router.post('/updateC/:id',async(req,res)=>{
	const{id}= req.params;
	const {nombre,apellido,password,correo,telefono,direccion}=req.body;
	const newUser={
		id,
		nombre,
		apellido,
		password,
		correo,
		direccion,
		telefono
	};	
	await pool.query('update users set ? where id=?',[newUser,id]);
	res.redirect('/inforC');
});

*/

module.exports=router;