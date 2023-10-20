
// Importa el módulo 'express' para configurar rutas y crear un enrutador.
const express = require('express');
// Crea un nuevo enrutador utilizando Express.
const router = express.Router();

// Importa funciones específicas del modelo 'author.model' para interactuar con autores en la base de datos.
const { createAuthor, getAuthorAll, getAuthorById, deleteAuthorById, updateAuthorById } = require('../models/author.model');

// Ruta que responde a solicitudes GET en '/authors'.
router.get('/', async (req, res) => {
    // Obtiene todos los autores de la base de datos de manera asíncrona.
    const authors = await getAuthorAll();
    // Renderiza una vista 'author/list' y pasa la lista de autores como datos para mostrar en la vista.
    res.render('author/list', { authors });
});

// Ruta que responde a solicitudes GET en '/authors/new' para mostrar un formulario de creación de autor.
router.get('/new', (req, res) => {
    // Renderiza una vista 'author/form_new' para crear un nuevo autor.
    res.render('author/form_new');
});

// Ruta que responde a solicitudes POST en '/authors/create' para crear un nuevo autor en la base de datos.
router.post('/create', async (req, res) => {
    // Crea un nuevo autor utilizando los datos proporcionados en el cuerpo de la solicitud (req.body).
    const result = await createAuthor(req.body);
    // Redirige al usuario de vuelta a la lista de autores después de la creación.
    res.redirect('/authors');
});
// Ruta que responde a solicitudes GET en '/authors/edit/:authorId' para mostrar un formulario de edición de autor.
router.get('/edit/:authorId', async (req, res) => {
    // Obtiene el identificador del autor de los parámetros de la URL.
    const { authorId } = req.params;
    // Obtiene los detalles del autor con el identificador especificado de la base de datos de manera asíncrona.
    const author = await getAuthorById(authorId);
    // Renderiza una vista 'author/form_update' y pasa los datos del autor para la edición.
    res.render('author/form_update', { author });
});
// Ruta que responde a solicitudes POST en '/authors/update' para actualizar un autor en la base de datos.
router.post('/update', async (req, res) => {
    // Obtiene el identificador del autor y los nuevos datos del cuerpo de la solicitud.
    const { authorId } = req.body;
    // Actualiza el autor con los nuevos datos en la base de datos de manera asíncrona.
    const result = await updateAuthorById(authorId, req.body);
    // Redirige al usuario de vuelta a la lista de autores después de la actualización.
    res.redirect('/authors');
});
// Ruta que responde a solicitudes GET en '/authors/delete/:authorId' para eliminar un autor de la base de datos
router.get('/delete/:authorId', async (req, res) => {
    // Obtiene el identificador del autor de los parámetros de la URL.
    const { authorId } = req.params;
    // Elimina el autor con el identificador especificado de la base de datos de manera asíncrona.
    const result = await deleteAuthorById(authorId);
    // Redirige al usuario de vuelta a la lista de autores después de la eliminación.
    res.redirect('/authors');
});
// Exporta el enrutador configurado para que pueda ser utilizado en otras partes de la aplicación.
module.exports = router;