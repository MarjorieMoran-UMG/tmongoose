var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var LibroSchema = require("./models/schema.js");

// Importar el validador de express-validator
const { check, validationResult } = require("express-validator");
const cors = require('cors');
router.use(cors());

// Conéctate a la base de datos de MongoDB local
const dbconnection = "mongodb://localhost:27017/libros";

mongoose
  .connect(dbconnection, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Conectado a MongoDB ");
  })
  .catch((err) => {
    console.error(err);
  });


//ruta para comprobar la conexion
router.get("/connection", function (req, res) {
    res.status(200).send("Llegó!");
});

//ruta para obtener todos los datos get
router.get("/libros", async (req, res) => {
    try {
        const libros = await LibroSchema.find(); // Utiliza await para esperar a que se complete la consulta
        res.status(200).send(libros);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error al obtener los libros");
    }
});

//rutas para comprobar la conexión post
router.post('/connection', function (req, res) {
    res.status(201).send('Insertado!');
});

//ruta para insertar un dato post
router.post("/libros", async (req, res) => {
    try {
        const libro = new LibroSchema(req.body);
        await libro.save();
        res.status(200).json(libro);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error al guardar el libro");
    }
});


//ruta para actualizar datos put
router.put("/connection", function (req, res) {
  res.status(200).send("Actualizado!");
});

//ruta para actualizar un dato put
router.put("/libros/:id", async (req, res) => {
    try {
        const libro = await LibroSchema.findById(req.params.id).exec();
        if (!libro) {
            return res.status(404).send("Libro no encontrado");
        }

        libro.titulo = req.body.titulo;
        libro.autor = req.body.autor;
        libro.añoPublicacion = req.body.añoPublicacion;
        libro.isbn = req.body.isbn;
        libro.genero = req.body.genero;

        await libro.save();

        res.status(200).json(libro);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error al actualizar el libro");
    }
});

//ruta para borrar datos delete
router.delete("/connection", function (req, res) {
  res.status(200).send("Se borró el registro");
});

//ruta para borrar un dato delete
router.delete("/libros/:id", async (req, res) => {
    try {
        const libro = await LibroSchema.findByIdAndRemove(req.params.id).exec();
        if (!libro) {
            return res.status(404).send("Libro no encontrado");
        }
        res.status(200).json(libro);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error al eliminar el libro");
    }
});


//ruta para borrar datos delete
router.delete("/connection/:id", function (req, res) {
    res.status(200).send("Si se encontro el resgistro");
});

//ruta para obtener un dato get
router.get("/libros/:id", async (req, res) => {
    try {
        const libro = await LibroSchema.findById(req.params.id); // Utiliza await para esperar a que se complete la consulta
        if (!libro) {
            res.status(404).send("Libro no encontrado");
        } else {
            res.status(200).json(libro);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Error al obtener el libro");
    }
});


module.exports = router;