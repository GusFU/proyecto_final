#DROP DATABASE Facegus;

CREATE DATABASE Facegus;

USE Facegus;


#DROP TABLE Logins;
CREATE TABLE Logins (
    id INT AUTO_INCREMENT,
    email VARCHAR(100) NOT NULL,
    contrasena VARCHAR(100) NOT NULL,
    PRIMARY KEY(id)
);


#DROP TABLE Paises;
CREATE TABLE Paises (
    id INT AUTO_INCREMENT,
    pais VARCHAR(100) NOT NULL,
    PRIMARY KEY(id)
);


#DROP TABLE Estados_civiles;
CREATE TABLE Estados_civiles (
    id INT AUTO_INCREMENT,
    estado_civil CHAR(15) NOT NULL,
    PRIMARY KEY(id)
);



#DROP TABLE Usuarios
CREATE TABLE Usuarios (
    id INT AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    apellido1 VARCHAR(100) NOT NULL,
    apellido2 VARCHAR(100) NOT NULL,
    cumpleanos char(15) ,
    alias VARCHAR(50) NOT NULL,
    foto_perfil VARCHAR(600),
    comentario_perfil VARCHAR(300),
    fk_id_estado_civil int,
    fk_id_pais int,
    fk_id_login int,
    PRIMARY KEY(id),
    FOREIGN KEY(fk_id_estado_civil) REFERENCES Estados_civiles(id),
    FOREIGN KEY(fk_id_pais) REFERENCES Paises(id),
    FOREIGN KEY(fk_id_login) REFERENCES Logins(id)
    
);


#DROP TABLE Usuarios_usuarios
CREATE TABLE Usuarios_usuarios (
    id INT AUTO_INCREMENT,
    fk_id_usuario int,
    fk_id_amigo int,
    PRIMARY KEY(id),
    FOREIGN KEY(fk_id_usuario) REFERENCES Usuarios(id),
    FOREIGN KEY(fk_id_amigo) REFERENCES Usuarios(id)
    
);

select * from Usuarios;
select * from Logins;
select * from Paises;
select * from Estados_civiles;

