// Importa el módulo 'express' para configurar rutas y crear un enrutador.
let express = require('express');
// Crea un nuevo enrutador utilizando Express.
let router = express.Router();

// Define una ruta '/post' que usa y redirige las solicitudes a un archivo de enrutador externo 'post.js' ubicado en el directorio './api'.
router.use('/post', require('./api/post.js'));

// Define una ruta '/author' que usa y redirige las solicitudes a un archivo de enrutador externo 'author.js' ubicado en el directorio './api'
router.use('/author', require('./api/author.js'));

// Exporta el enrutador configurado para que pueda ser utilizado en otras partes de la aplicación.
module.exports = router;
