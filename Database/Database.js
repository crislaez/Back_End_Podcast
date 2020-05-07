'use strict';

//requerimos la dependencia donde estan las variables de entorno .en
require('dotenv').config();
//requerimos el conector de mysql
const mysql = require('mysql');

const conexion = mysql.createConnection({
    connectionLimit : 10, // default = 10
    host:process.env.SERVIDOR,
    user:process.env.USUARIO,
    password:process.env.CLAVE,
    database:process.env.BBDD
});

const getAllUsers = (callback) => {
    conexion.connect();
    if(conexion){
        conexion.query("SELECT * FROM usuarios", (err, res) => {
            if(!err){
                callback(null, res)
            }
        })
    }
    conexion.end();

};

//funciones para la base de datos
const addUser = (usuario, callback) => {
    //abrir conexion
    conexion.connect();
    if(conexion){
        conexion.query("INSERT INTO usuarios SET ?",usuario,  (err, res) => {
            if(!err){
                callback(null, {data: res}); //null seria el error, en este caso vacio
            }
        })
    }
    //cerrar conexion
    conexion.end();
};

const loginUser = (usuario, callback) => {

    conexion.connect();
    if(conexion){
        conexion.query(`SELECT * FROM usuarios WHERE correo = ${conexion.escape(usuario.correo)} AND clave = ${conexion.escape(usuario.clave)} `, (err, res) => {
            if(!err){
                callback(null, {message:'success', data: res});
            }
        })
    }
}

module.exports = 
    {
        getAllUsers,
        addUser,
        loginUser
    };