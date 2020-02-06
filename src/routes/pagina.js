const express= require('express');
const Task=require('../models/task');
const pool=require('../database');
const { isNotLoggedIn } = require('../lib/auth');
const router= express.Router();

router.get('/inicio',(req,res)=>{
	res.render('pagina/inicio');
});

router.get('/producto',(req,res)=>{
	res.render('pagina/producto');
});

router.get('/software',(req,res)=>{
	res.render('pagina/software');
});

router.get('/productos',async(req,res)=>{
	const task=await Task.find();
	res.render('pagina/producto2.ejs',{
		task
	})
});


router.get('/detalle/:id',async(req,res)=>{
	const{id}=req.params;
	const task=await Task.findById({_id:id});
	res.render('pagina/detalle.ejs',{
		task
	})
});

router.get('/comprar/:id',async(req,res)=>{
	const{id}=req.params;
	const task=await Task.findById({_id:id});
	const newCompra={
		id_cliente:req.user.id,
		id_producto:task._id,
		marca:task.marca,
		descripcion:task.descripcion,
		total:task.precio
	}
	await pool.query('insert into compraProducto set?',[newCompra]);
	res.redirect('/productos');
});


router.get('/noticias',(req,res)=>{
	res.render('pagina/noticias.ejs');
});

router.get('/equipo',(req,res)=>{
	res.render('pagina/equipo.ejs');
});

router.get('/contacto',(req,res)=>{
	res.render('pagina/contac.ejs');
});


router.get('/loginA',isNotLoggedIn,(req,res)=>{
	res.render('pagina/loginA.ejs');
});



module.exports=router;