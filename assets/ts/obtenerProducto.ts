// Importar hoja de estilos
import 'assets/css/style.css';


/* Completar la clase Plantilla */
import { Producto } from "./Producto";

fetch('https://api.myjson.com/bins/t17t8')
.then( response => response.json())
.then( data => {
  let arreglo = producto.productos;

  for (let objeto of arreglo) {
    let producto:Producto = new Producto(objeto["titlo"], objeto["imagen"])
    document.getElementById("productos").innerHTML += producto.renderizarPlantilla()
  }
})
.catch(function(error) {
  console.log('Hubo un problema con la petición Fetch:' + error.message);
});
