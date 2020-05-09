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

conexion.connect();

//funciones para la base de datos----------------

const getAllUsers = (callback) => {
    // conexion.connect();
    if(conexion){
        conexion.query("SELECT * FROM usuarios", (err, res) => {
            if(!err){
                callback(null, {data:res})
            }
        })
    }
    // conexion.end();
};

const getAllPodcast = (callback) => {
    // conexion.connect();
    if(conexion){
        conexion.query("SELECT * FROM podcast", (err, res) => {
            if(!err){
                callback(null, {data:res});
            }
        })
    }
    // conexion.end()
}

//añadir usuarios
const addUser = (usuario, callback) => { 
    // conexion.connect();
    if(conexion){
        conexion.query("INSERT INTO usuarios SET ?",usuario,  (err, res) => {
            if(!err){
                callback(null, {data: res}); //null seria el error, en este caso vacio
            }
        })
    }
    // conexion.end();
};

//loguear usuarios
const loginUser = (usuario, callback) => {
    // conexion.connect();
    if(conexion){
        conexion.query(`SELECT * FROM usuarios WHERE correo = ${conexion.escape(usuario.correo)} AND clave = ${conexion.escape(usuario.clave)} `, (err, res) => {
            if(!err){
                callback(null, {message:'success', data: res});
            }
        })
    }
    // conexion.end();
}

//añadir podcast
const addPodcast = (podcast, callback) => {
    // conexion.connect();
    if(conexion){
        conexion.query("INSERT INTO podcast SET ?",podcast, (err, res) => {
            if(!err){
                callback(null,{data: res});
            }
        })
    }
    // conexion.end();
}

//seleccionar todos los podcast por usuario
const gePodcastById = (id, callback) => {
    // conexion.connect();
    if(conexion){
        conexion.query(`SELECT * FROM podcast WHERE id_usuario = ${conexion.escape(id)}`, (err, res) => {
            if(!err){
                callback(null, {data:res});
            }
        })
    }
    // conexion.end();
}

//borrar los podcast
const deletePodcast = (id, callback) => {
    // conexion.connect();
    if(conexion){
        conexion.query(`DELETE FROM podcast WHERE id_podcast = ${conexion.escape(id)}`, (err, req) => {
            if(!err){
                callback(null, {data:' Podcastr borrado'});
            }
        })
    }
    // conexion.end();
}



module.exports = 
    {
        getAllUsers,
        getAllPodcast,
        addUser,
        loginUser,
        addPodcast,
        gePodcastById,
        deletePodcast
    };