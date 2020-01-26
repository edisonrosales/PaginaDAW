const express= require('express');
const router= express.Router();

const Task=require('../models/task');

//se busca renderizar una vista en este caso es la de views => index.ejs
router.get('/',async(req,res)=>{
	const tasks= await Task.find();
	res.render('index',{
		tasks//es igual a tener tasks:tasks para que se llenen los datos en la tabla
	});

});

router.post('/add',async(req,res)=>{
	const task=new Task(req.body);
	await task.save();
	res.redirect('/');

})

router.get('/delete/:id',async(req,res) =>{
	const{id}=req.params;
	await Task.remove({_id:id});
	res.redirect('/');
});

router.get('/edit/:id',async(req,res) =>{
	const{id}=req.params;
	const task=await Task.findById({_id:id});
	res.render('edit',{
		task
	});
});

router.post('/update/:id',async(req,res)=>{
	const{id}=req.params;
	await Task.update({_id:id},req.body);
	res.redirect('/');
});


module.exports=router;