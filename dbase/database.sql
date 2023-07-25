# CREO BD
create database ecommerce;
use ecommerce;

# CREO TABLA PRODUCTOS
CREATE TABLE IF NOT EXISTS productos (
    id_producto INT AUTO_INCREMENT NOT NULL,
    nombre VARCHAR(250),
    precio decimal(12,2),
    id_categoria INT,
    PRIMARY KEY (id_producto)
);

# CREO TABLA USUARIOS
CREATE TABLE IF NOT EXISTS usuarios (
    id_usuario INT AUTO_INCREMENT NOT NULL,
    nombre VARCHAR(250),
    email VARCHAR(250),
    PRIMARY KEY (id_usuario)
);

# CREO TABLA CATEGORIAS E INSERTO 1 REGISTRO
CREATE TABLE IF NOT EXISTS categorias (
    id_categoria INT AUTO_INCREMENT NOT NULL,
    nombre VARCHAR(250),
    PRIMARY KEY (id_categoria)
);
insert into categorias (nombre) values ('CATEGORIA 1');

# CREO CLAVE FORANEA DE PRODUCTOS REFERENCIANDO A CATEGORIAS
alter table productos
add foreign key(id_categoria) references categorias(id_categoria);

#INSERTO REGISTROS EN TABLA PRODUCTOS
insert into usuarios (nombre, email) values ('OSCAR MARMELI', 'oscarmarmeli@gmail.com');
insert into productos (nombre, precio, id_categoria) values ('PARRILLA PARANA', '56700', '1');
insert into productos (nombre, precio, id_categoria) values ('PARRILLA PACIFICO', '58500', '1');
insert into productos (nombre, precio, id_categoria) values ('PARRILLA DELTA', '42300', '1');
insert into productos (nombre, precio, id_categoria) values ('PARRILLA MALEVO', '68700', '1');
insert into productos (nombre, precio, id_categoria) values ('PARRILLA PUMA', '65400', '1');
insert into productos (nombre, precio, id_categoria) values ('PARRILLA CAMPER', '48300', '1');
select * from productos;
select * from usuarios;

#HAGO INNER JOIN ENTRE PRODUCTOS Y CATEGORIAS
select * from productos inner join categorias on productos.id_categoria=categorias.id_categoria;