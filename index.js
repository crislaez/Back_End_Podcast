'use strict';

require('dotenv').config();

const express = require('express');

//funcion que esta dentro de Roputer->Router donde estan todas las rutas
const endPoint = require('./Router/Router');

const app = express();
app.use(express.urlencoded( { extended: false} ));
app.use(express.json());


//para poder coger la ruta de la carpeta htt://localhost:3001/sound/nombrefoto.jpg
app.use('/sound', express.static(__dirname + '/sound', {
    maxAge: '12h'
}));

// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');  //el * se cambiara y se pondra la url permitida
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

endPoint(app);

app.listen(process.env.PORT, () => {
    console.log(`Api Rest corriendo en localhost:${process.env.PORT}`);
})
