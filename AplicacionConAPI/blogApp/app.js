
// Importa el módulo 'http-errors' para manejar errores HTTP.
const httpErrors = require('http-errors');
// Importa el módulo 'express' para configurar y ejecutar una aplicación Express.
const express = require('express');
// Importa el módulo 'path' para manejar rutas de archivos y directorios.
const path = require('path');
// Importa el módulo 'cookie-parser' para analizar cookies en las solicitudes.
const cookieParser = require('cookie-parser');

// Importa el módulo 'logger' para registrar las solicitudes HTTP en la consola.
const logger = require('morgan');


// Importa enrutadores para manejar rutas específicas.
const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api');
const authorsRouter = require('./routes/authors');
const postsRouter = require('./routes/posts');
// Crea una instancia de la aplicación Express.
const app = express();

// Configura la carpeta de vistas y el motor de plantillas a utilizar (en este caso, 'pug').
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
// Configura middleware para el registro de solicitudes (logger) y analiza solicitudes en formato JSON y URL codificada.
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Configura middleware para analizar cookies en las solicitudes.
app.use(cookieParser());
// Configura middleware para servir archivos estáticos desde la carpeta 'public'.
app.use(express.static(path.join(__dirname, 'public')));

// Configura las rutas principales para manejar las solicitudes.
app.use('/', indexRouter);
app.use('/api', apiRouter);
app.use('/authors', authorsRouter);
app.use('/posts', postsRouter);


// Middleware para manejar solicitudes que no coinciden con ninguna ruta, generando un error 404.
app.use(function (req, res, next) {
  next(httpErrors(404));
});
// Middleware para manejar errores generados en la aplicación.
app.use(function (err, req, res, next) {
  // Configura las variables 'message' y 'error' para usar en la vista de error.
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
// Configura el código de estado de la respuesta (por defecto 500 para errores internos del servidor) y renderiza la vista de error.
  res.status(err.status || 500);
  res.render('error');
});
// Exporta la aplicación configurada para que pueda ser ejecutada en otros archivos.
module.exports = app;