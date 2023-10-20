// Importa el módulo 'express' para configurar rutas y crear un enrutador.
let express = require('express');
// Crea un nuevo enrutador utilizando Express.
let router = express.Router();

// Define una ruta que responde a solicitudes GET en la raíz del sitio ('/').
router.get('/', function (req, res, next) {
  // Renderiza una vista llamada 'index' y pasa un objeto con un título para mostrar en la vista
  res.render('index', { title: 'Activity 9: blogApp' });
});
// Exporta el enrutador configurado para que pueda ser utilizado en otras partes de la aplicación.
module.exports = router;
