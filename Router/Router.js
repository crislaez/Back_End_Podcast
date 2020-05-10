'use strict';

const express = require('express');

const multipart = require('connect-multiparty');
const multipartMiddleware = multipart({uploadDir: './sound'}) /// ./sound es pa carpeta donde se subira la foto
//objeto donde estan todas las funciones de la databse
const Database = require('../Database/Database');
//importamos el Email.js
const EmailCtrl = require('../Email');

//******************** */

function endPoint(app){
    const router = express.Router();

    app.use('/api', router);

    //todos los usuarios: ruta -> http://localhost:3001/api/all
    router.get('/all', (req, res) => {

        Database.getAllUsers( (err, data) => {
            if(err) return res.status(500).json({message: `error al realizar la peticion: ${err}`});
            if(!data) return res.status(404).json({message: `error al enviar los datos`});

            res.status(200).json({success:true, data: data});
        })
    });

    //añadir usuario: ruta-> http://localhost:3001/api/addUser
    router.post('/addUser', (req, res) => {
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
            //enviamos un email al usuario que se acaba de registrar
            // usuario.correo
            EmailCtrl.sendEmail(req, res);
            res.status(200).json({success:true, data: data});
        });
    });

    //loguear usuiario: ruta -> http://localhost:3001/api/login
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

    //añadir podcast: ruta -> ruta-> http://localhost:3001/api/addPodcast
    router.post('/addPodcast',multipartMiddleware, (req, res) => {
        let aux = req.files.mp3.path.split('\\');
        let aux2 = req.files.foto.path.split('\\');
              
        let podcast = 
            {
                id_usuario: req.body.id_usuario,
                id_podcast: '',
                titulo: req.body.titulo,
                mp3:'http://localhost:3001/sound/'+aux[1],
                foto:'http://localhost:3001/sound/'+aux2[1]
            };
            
        Database.addPodcast(podcast, (err, data) => {
            if(err) return res.status(500).json({message: `error al realizar la peticion: ${err}`});
            if(!data) return res.status(404).json({message: `error al enviar los datos`});

            res.status(200).json({success:true, data: data});
        })
    })

    //mostrar topdos los podcast por id de usuario: ruta-> http://localhost:3001/api/podcast/1
    router.get('/podcast/:id', (req, res) => {
        let id_usuario = req.params.id;

        Database.gePodcastById(id_usuario, (err, data) => {
            if(err) return res.status(500).json({message: `error al realizar la peticion: ${err}`});
            if(!data) return res.status(404).json({message: `error al enviar los datos`});

            res.status(200).json({success:true, data: data});
        })
    })

    //borrar podcast por id: ruta -> http://localhost:3001/api/deletePodcast/1
    router.delete('/deletePodcast/:id', (req, res) => {
        let id_podcast = req.params.id;

        Database.deletePodcast(id_podcast, (err, data) => {
            if(err) return res.status(500).json({message: `error al realizar la peticion: ${err}`});
            if(!data) return res.status(404).json({message: `error al borrar los datos`})
            
            res.status(200).json({success:true, data:data})
        })
    })
    
    //mostrar todos los podcast: ruta -> http://localhost:3001/api/podcast
    router.get('/podcast', (req, res) => {

        Database.getAllPodcast( (err,data) => {
            if(err) return res.status(500).json({message: `error al realizar la peticion: ${err}`});
            if(!data) return res.status(404).json({message: `error al borrar los datos`})
            
            res.status(200).json({success:true, data:data})
        })
    })

    //buscar podcast por nombre usuario: ruta -> http://localhost:3001/api/podcastByUser/Roberto
    router.get('/podcastByUser/:nombre', (req, res) => {
        let nombre_usuario = req.params.nombre;

        Database.searchPodcastByUser(nombre_usuario, (err, data) => {
            if(err) return res.status(500).json({message: `error al realizar la peticion: ${err}`});
            if(!data) return res.status(404).json({message: `error al buscar podcast`})
            
            res.status(200).json({success:true, data:data})
        })
    })
}

module.exports = endPoint;