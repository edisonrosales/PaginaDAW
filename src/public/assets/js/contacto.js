//esto es por parte del cliente

const axios=require("axios");
document.getElementById("btnEnv").addEventListener("click",function(){
	let nombre=document.getElementById("name").value;

	if(nombre!=""){
		let datos={
			n=nombre
		};
		axios.post("/contact",datos)
		.then(function(response){
			document.getElementById("name").value="";
			alert("Gracias por escribirnos");
		}).catch(function(error){
			console.log(error);
		});
	}
	else{
		alert("Por favor complete todos los datos");
	}
});