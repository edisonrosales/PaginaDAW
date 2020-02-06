const express= require('express');
const router= express.Router();
const pool=require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/contrato',(req,res)=>{
	res.render('login/ncontrato');
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

router.get('/compras',isLoggedIn,async(req,res)=>{
	const info=await pool.query('select * from compraProducto where id_cliente=?',[req.user.id]);
	res.render('login/compras',{info});
});


//Mostar informacion del cliente
router.get('/profile',isLoggedIn, async(req,res) =>{
	const info= await pool.query('select * from contrato where user_id=?',[req.user.id]);
	console.log(info);
	res.render('login/profile',{info});
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
	res.render('login/updateC',{ids:ids[0]});
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


module.exports=router;