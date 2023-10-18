
const express = require('express');
const api = require('./api');

const port = 3000;
const app = express();

app.listen(port, function () {
    console.log('Escuchando en puerto ' + port);
});

// Analiza el texto como datos codificados en la URL para usarlos
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);


//http://localhost:3000/api/libros
//http://localhost:3000/api/libros
//http://localhost:3000/api/libros/652ca5a53d793a7baf5e7d22
//http://localhost:3000/api/libros/652ca5a53d793a7baf5e7d22


//define la ruta
app.use('/api', api);

