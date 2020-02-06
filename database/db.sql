drop database tienda;
CREATE DATABASE	tienda;
USE tienda;

CREATE TABLE users(
	id int(10) not null,
	nombre varchar(40) not null,
	apellido varchar(40) not null,
	password varchar(40) not null,
	correo varchar(40) not null,
	telefono varchar(10) not null,
	direccion varchar(10) not null
);

alter table users 
	Add primary key (id);

Describe users;

create table links(
	id int(10) not null,
	title varchar(150) not null,
	url varchar(255) not null,
	description TEXT,
	user_id int(10),
	created_at timestamp not null default current_timestamp,
	constraint fk_user foreign key(user_id) references users(id)
);

alter table links
	add primary key(id);


create table contrato(
	id int(11) not null,
	descripcion varchar(100) not null,
	user_id varchar(10),
	created_at timestamp not null default current_timestamp,
	constraint fk_user foreign key (user_id) references users(id)
);

create table admin(
	id_admin varchar(10) not null,
	nombre varchar(40) not null,
	apellido varchar(40) not null,
	password varchar(40) not null,
	correo varchar(40) not null,
	sueldo int(5)
);

alter table admin add primary key (id_admin);

create table compraProducto(
	id int(11) not null,
	id_cliente varchar(10),
	id_producto varchar(100),
	marca varchar(20),
	descripcion varchar(30),
	total int(10)
);

alter table compraProducto add primary key(id);
alter table compraProducto modify id int(11) not null AUTO_INCREMENT;