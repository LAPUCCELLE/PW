const express = require('express');
const bodyParser = require('body-parser');

//Instanciar el motor
const app = express();
const PORT = 3000;

//Middleware
app.use( bodyParser.json() );
app.use( express.urlencoded() );

//Rutas 

//Iniciar el servidor
app.listen( PORT, () => {
    console.log(`Servidor iniciado en ${PORT}`)
})