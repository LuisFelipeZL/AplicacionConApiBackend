// Importa las funciones 'executeQuery' y 'executeQueryOne' desde el módulo '../helpers/executeQueries'.
const { executeQuery, executeQueryOne } = require('../helpers/executeQueries');

// Define una función asincrónica 'createPost' que inserta una nueva publicación en la base de datos con los parámetros proporcionados.
const createPost = async ({ title, description, category, authorId }) => {
  try {
    // Ejecuta una consulta SQL para insertar la publicación en la base de datos.
    const result = await executeQuery(
      "INSERT INTO posts (title, description, category, authorid) VALUES (?,?,?,?)",
      [title, description, category, authorId]
    );
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
// Define una función asincrónica 'getPostAll' que obtiene todas las publicaciones de la base de datos junto con información del autor.
const getPostAll = async () => {
  try {
    // Ejecuta una consulta SQL para obtener todas las publicaciones con información del autor mediante una unión (JOIN).
    const result = await executeQuery(
      "SELECT * FROM posts AS p INNER JOIN authors AS a ON p.authorid = a.authorid"
    );
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
// Define una función asincrónica 'getPostById' que obtiene una publicación específica por su identificador (postId) junto con información del autor.
const getPostById = async (postId) => {
  try {
    // Ejecuta una consulta SQL para obtener una publicación específica con información del autor mediante una unión (JOIN).
    const result = await executeQueryOne(
      "SELECT * FROM posts AS p INNER JOIN authors AS a ON p.authorId = a.authorId WHERE p.postid = ?",
      [postId]
    );
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
// Define una función asincrónica 'deletePostById' que elimina una publicación específica por su identificador (postId).
const deletePostById = async (postId) => {
  try {
    // Ejecuta una consulta SQL para eliminar una publicación específica por su identificador.
    const result = await executeQuery(
      "DELETE FROM posts AS p WHERE p.postid = ?",
      [postId]
    );
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
// Define una función asincrónica 'deletePostAll' que elimina todas las publicaciones de la base de datos.
const deletePostAll = async () => {
  try {
 // Ejecuta una consulta SQL para eliminar todas las publicaciones.
    const result = await executeQuery(
      "DELETE FROM posts"
    );
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
// Define una función asincrónica 'updatePostById' que actualiza una publicación específica por su identificador (postId) con nuevos datos proporcionados.
const updatePostById = async (postId, newData) => {
  try {
  // Prepara una consulta de actualización SQL con los nuevos datos proporcionados.
    const properties = [];
    let values = [];
    let query = "UPDATE posts SET ";

    for (const item in newData) {
      properties.push(item);
      values.push(newData[item]);
    }

    query += properties[0] + " = ?";

    if (properties.length > 1) {
      properties.shift();
      properties.forEach((elem) => {
        query += ', ' + elem + ' = ?';
      });
    }

    query += ' WHERE postid = ?';
    values.push(postId);
// Ejecuta la consulta de actualización en la base de datos.
    const result = await executeQuery(
      query, values
    );
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
// Define una función asincrónica 'getPostByAuthor' que obtiene todas las publicaciones de un autor específico por su identificador (authorId).
const getPostByAuthor = async (authorId) => {
  try {
    // Ejecuta una consulta SQL para obtener todas las publicaciones de un autor específico con información del autor mediante una unión (JOIN).
    const result = await executeQuery(
      "SELECT * FROM posts AS p INNER JOIN authors AS a ON a.authorId = p.authorId WHERE a.authorId = ?",
      [authorId]
    );
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
// Define una función asincrónica 'getPostByAuthorName' que obtiene todas las publicaciones de autores cuyos nombres contienen una cadena específica.
const getPostByAuthorName = async (authorName) => {
  try {
    // Ejecuta una consulta SQL para obtener todas las publicaciones de autores cuyos nombres coinciden parcialmente con la cadena proporcionada.
    const result = await executeQuery(
      "SELECT * FROM posts AS p INNER JOIN authors AS a ON a.authorId = p.authorId WHERE a.name LIKE ?",
      ['%' + authorName + '%']
    );
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
// Exporta las funciones definidas para que puedan utilizarse en otros archivos.
module.exports = {
  createPost,
  getPostAll,
  getPostById,
  deletePostById,
  deletePostAll,
  updatePostById,
  getPostByAuthor,
  getPostByAuthorName
};