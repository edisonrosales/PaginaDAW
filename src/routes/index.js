const express= require('express');
const router= express.Router();
const Task=require('../models/task');
const bodyParse=require('body-parser');
const sendMail=require('../email');
const pool=require('../database');


router.use(bodyParse.json());
router.use(bodyParse.urlencoded({extended:true}));


router.post('/buscar',async(req,res)=>{
	const{id}=req.body;
	const fecha={
		id:id
	};
	const info= await pool.query('select * from compraProducto where id_cliente=?',[id]);
	const user= await pool.query('select * from users where id=?',[id]);
	console.log(info);
	console.log(user);


	res.render('reporte2.ejs',{info});
});


router.get('/reporte',(req,res)=>{
	res.render('reporte.ejs');
})

/*router.get('/compras',isLoggedIn,async(req,res)=>{
	const info=await pool.query('select * from compraProducto where id_cliente=?',[req.user.id]);
	res.render('login/compras',{info});
});*/
//se busca renderizar una vista en este caso es la de views => index.ejs
router.get('/admin',async(req,res)=>{
	const tasks= await Task.find();
	res.render('index.ejs',{
		tasks//es igual a tener tasks:tasks para que se llenen los datos en la tabla
	});

});

router.post('/add',async(req,res)=>{
	const task=new Task(req.body);
	await task.save();
	res.redirect('/admin');

})

router.get('/delete/:id',async(req,res) =>{
	const{id}=req.params;
	await Task.remove({_id:id});
	res.redirect('/admin');
});

router.get('/edit/:id',async(req,res) =>{
	const{id}=req.params;
	const task=await Task.findById({_id:id});
	res.render('edit.ejs',{
		task
	});
});

router.post('/update/:id',async(req,res)=>{
	const{id}=req.params;
	await Task.update({_id:id},req.body);
	res.redirect('/admin');
});

router.get('/contact',(req,res)=>{
	res.render('../views/contac');
});

router.post('/contact', function(req, res){
	const{subject,email,mensaje}=req.body;
	console.log('Data: ',req.body);
	sendMail(email,mensaje,subject,function(err,data){
		if(err){
			res.status(500).json({message:'ERROR'});
		}
		else{
			res.json({message:'Email enviado' });
		}
	});
	res.json({message:'Mensaje recibido'});

});



module.exports=router;