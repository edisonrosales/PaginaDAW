const mysql=require('mysql');
const {promisify}=require('util');
const {database}=require('./keys');

const pool=mysql.createPool(database);

pool.getConnection((err,connection)=>{
	if(err){
		if(err.code==='PROTOCOL_CONNECTION_LOST'){
			console.error('Se perdio la conexion con la BD');
		}
		if(err.code==='ERR_CON_COUNT_ERROR'){
			console.error('La BD tiene muchas conexiones');
		}
		if(err.code==='ECONNREFUSED'){
			console.error('Conexion rechazada');
		}
	}
	if(connection)connection.release();
	console.log('BD conectada');
	return;
});

//Promisify pool queries
pool.query= promisify(pool.query);

module.exports=pool;