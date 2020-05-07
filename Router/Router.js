'use strict';

const express = require('express');
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart({uploadDir: './sound'}) /// ./sound es pa carpeta donde se subira la foto
//objeto donde estan todas las funciones de la databse
const Database = require('../Database/Database');

//******************** */

function endPoint(app){
    const router = express.Router();

    app.use('/api', router);

    //todos ruta -> http://localhost:3001/api/all
    router.get('/all', (req, res) => {

        Database.getAllUsers( (err, data) => {
            if(err) return res.status(500).json({message: `error al realizar la peticion: ${err}`});
            if(!data) return res.status(404).json({message: `error al enviar los datos`});

            res.status(200).json({success:true, data: data});
        })
    });

    //añadir usuario ruta-> http://localhost:3001/api/add
    router.post('/add', (req, res) => {
        let usuario = 
            {
                id_usuario: '',
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                nacimiento: req.body.nacimiento,
                correo: req.body.correo,
                clave: req.body.clave    
            };

        Database.addUser(usuario, (err, data) => {
            if(err) return res.status(500).json({message: `error al realizar la peticion: ${err}`});
            if(!data) return res.status(404).json({message: `error al enviar los datos`});

            res.status(200).json({success:true, data: data});
        });
    });

    // por id
    router.post('/login', (req, res) => {
        let usuario = 
            {
                correo:req.body.correo,
                clave:req.body.clave
            };

        Database.loginUser(usuario, (err, data) => {
            if(err) return res.status(500).json({message: `error al realizar la peticion: ${err}`});
            if(!data) return res.status(404).json({message: `error al enviar los datos`});

            res.status(200).json({success:true, data: data});
        });
    });

    // //actualizar por id
    // router.put('/update/:id', (req, res) => {

    // });

    // //borrar por id
    // router.delete('/delete/:id', (req, res) => {

    // });

}

module.exports = endPoint;