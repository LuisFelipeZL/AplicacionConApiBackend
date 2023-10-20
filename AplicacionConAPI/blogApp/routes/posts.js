// Importa el módulo 'express' y crea un enrutador.
const router = require('express').Router();
// Importa funciones específicas de los modelos 'post.model' y 'author.model' para interactuar con las publicaciones y autores en la base de datos.
const { createPost, getPostAll, getPostById, deletePostById, updatePostById, getPostByAuthor, getPostByAuthorName } = require('../models/post.model');
const { getAuthorAll, getAuthorById } = require('../models/author.model');
// Importa la biblioteca 'dayjs' para formatear fechas.
const dayjs = require('dayjs');

// Ruta que responde a solicitudes GET en '/posts'.
router.get('/', async (req, res) => {
  try {
    // Obtiene todas las publicaciones de la base de datos.
    const posts = await getPostAll();
    // Formatea las fechas de creación de las publicaciones y obtiene los nombres de los autores.
    for (const post of posts) {
      post.date_create = dayjs(post.date_create).format('YYYY-MM-DD');
      const { name } = await getAuthorById(post.authorid);
      post.authorid = name;
    }
// Renderiza una vista 'post/list' y pasa la lista de publicaciones formateadas.
    res.render('post/list', {
      posts
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error getting posts');
  }
});
// Ruta que responde a solicitudes GET en '/posts/new' para mostrar un formulario de creación de publicación
router.get('/new', async (req, res) => {
  try {
    // Obtiene la lista de autores de la base de datos.
    const authors = await getAuthorAll();

    // Renderiza una vista 'post/form_new' y pasa la lista de autores para seleccionar al crear una publicación.
    res.render('post/form_new', {
      authors
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error getting authors');
  }
});
// Ruta que responde a solicitudes POST en '/posts/create' para crear una nueva publicación en la base de datos.
router.post('/create', async (req, res) => {
  try {
    // Crea una nueva publicación utilizando los datos proporcionados en el cuerpo de la solicitud.
    const result = await createPost(req.body);
// Redirige al usuario de vuelta a la lista de publicaciones después de la creación.
    res.redirect('/posts');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating post');
  }
});
// Ruta que responde a solicitudes GET en '/posts/edit/:postId' para mostrar un formulario de edición de una publicación específica
router.get('/edit/:postId', async (req, res) => {
  try {
    // Obtiene el identificador de la publicación desde los parámetros de la URL.
    const { postId } = req.params;
    // Obtiene los detalles de la publicación con el identificador especificado.
    const post = await getPostById(postId);
    post.date_create = dayjs(post.date_create).format('YYYY-MM-DD');
    // Obtiene la lista de autores.
    const authors = await getAuthorAll();
    // Renderiza una vista 'post/form_update' y pasa los datos de la publicación y la lista de autores para editar.
    res.render('post/form_update', {
      post, authors
    })
  } catch (error) {
    console.error(error);
    res.status(500).send('Error getting post');
  }
});

// Ruta que responde a solicitudes POST en '/posts/update' para actualizar una publicación en la base de datos.
router.post('/update', async (req, res) => {
  try {
    // Obtiene el identificador de la publicación y los nuevos datos desde el cuerpo de la solicitud.
    const { postId } = req.body;
    // Actualiza la publicación con los nuevos datos.
    const result = await updatePostById(postId, req.body);
// Redirige al usuario de vuelta a la lista de publicaciones después de la actualización.
    res.redirect('/posts');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating post');
  }
});
// Ruta que responde a solicitudes GET en '/posts/delete/:postId' para eliminar una publicación de la base de datos.
router.get('/delete/:postId', async (req, res) => {
  try {
    // Obtiene el nombre del autor desde los parámetros de la consulta.
    const { postId } = req.params;
    // Busca publicaciones por nombre de autor y formatea las fechas y nombres de autor.
    const result = await deletePostById(postId);

    res.redirect('/posts');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting post');
  }
})

router.get('/author', async (req, res) => {
  try {
    
    const { authorName } = req.query;
    
    const posts = await getPostByAuthorName(authorName);

    for (const post of posts) {
      post.date_create = dayjs(post.date_create).format('YYYY-MM-DD');
      const { name } = await getAuthorById(post.authorid);
      post.authorid = name;
    }
// Renderiza una vista 'post/list' y pasa la lista de publicaciones filtradas.
    res.render('post/list', {
      posts
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error getting posts by author');
  }
})
// Exporta el enrutador configurado para que pueda ser utilizado en otras partes de la aplicación.
module.exports = router;