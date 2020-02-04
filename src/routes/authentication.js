const express= require('express');
const router= express.Router();
const passport=require('passport');
const {isLoggedIn,isNotLoggedIn}=require('../lib/auth');

//Registrar un usuario
router.get('/registro',isNotLoggedIn,(req,res)=>{
	res.render('registro');
});


router.post('/registro',isNotLoggedIn,passport.authenticate('local.signup',{
		successRedirect:'/profile',
		failureRedirect:'/registro',
		failureFlash:true
}));

router.get('/login',isNotLoggedIn,(req,res)=>{
	res.render('login');
});

router.post('/login',isNotLoggedIn,(req,res,next)=>{
	passport.authenticate('local.signin',{
		successRedirect:'/profile',
		failureRedirect:'/login',
		failureFlash:true		
	})(req,res,next);
});

router.get('/logout',isLoggedIn,(req,res)=>{
	req.logOut();
	res.redirect('/login');
});


module.exports=router;