//Clase para enviar correo electronico
const nodemailer=require("nodemailer");
const mailGun=require("nodemailer-mailgun-transport");


const auth={
	auth:{
		api_key:'pubkey-4e564e18f364cbb0c826d0baafa462de',
		domain:'https://app.mailgun.com/app/sending/domains/sandboxba6aaf8742564e4883a6005be3c94246.mailgun.org'
	}
};

const transporter=nodemailer.createTransport(mailGun(auth));

const sendMail=(email,subject,mensaje,cb)=>{
	const mailOptions={
		from:email,
		to:'apidawespol@gmail.com',
		subject,
		text:mensaje
	};
	transporter.sendMail(mailOptions,function(err,data){
		if(err){
			cb(err,null);
		}
		else{
			cb(null,data);
		}
	});
}
module.exports=sendMail;

