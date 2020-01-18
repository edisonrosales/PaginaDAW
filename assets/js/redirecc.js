//document.querySelector('#boton').addEventListener('onclick',busquedaProducto;

function busquedaProducto(){
	let t=document.getElementById("texto").value;
	let mensaje=0;
    //console.log(t);

    const xhttp= new XMLHttpRequest();
	xhttp.open('GET','../../templateHTML/product.json',true);
	xhttp.send();
	xhttp.onreadystatechange=function(){
		if(this.readyState==4 && this.status==200){
			let datos= JSON.parse(this.responseText);
			let res=document.querySelector('#productos');
			res.innerHTML='';
		for(let producto of datos){
			if(t.toLowerCase()==producto.marca.toLowerCase()){
				mensaje+=1;
				//console.log("dentro del if");
				res.innerHTML+=
				`<li class="portfolio-item2" data-type="web">
		            <div class="span4">
		              	<div class="thumbnail">
		                	<div class="image-wrapp">
		                  		<img src="${producto.imagen}" alt="Portfolio name" title="" />
		                  		<article class="da-animate da-slideFromRight" style="display: block;">
		                    	<h4>${producto.titlo}</h4>
		                    	<a href="detalle1.html"><i class="icon-rounded icon-48 icon-link"></i></a>
		                  		</article>
		                	</div>
		              	</div>
		            </div>
		        </li>`
			}
		}
		res.innerHTML+=`<li><h4>Número de resultados: ${mensaje}</h4></div></li>`
	}
	}
}