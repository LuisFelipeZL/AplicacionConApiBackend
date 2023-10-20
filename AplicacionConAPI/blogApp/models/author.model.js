// Importa las funciones 'executeQuery' y 'executeQueryOne' desde el módulo '../helpers/executeQueries'.
const { executeQuery, executeQueryOne } = require('../helpers/executeQueries');
// Define una función 'createAuthor' que inserta un nuevo autor en la base de datos con los parámetros proporcionados.
const createAuthor = ({ name, email, image }) => {
  return executeQuery("INSERT INTO authors (name, email, image) VALUES (?,?,?)", [name, email, image]);
};
// Define una función 'getAuthorAll' que obtiene todos los autores de la base de datos.
const getAuthorAll = () => {
  return executeQuery("SELECT * FROM authors", []);
};
// Define una función 'getAuthorById' que obtiene un autor específico por su identificador (authorId) de la base de datos.
const getAuthorById = (authorId) => {
  return executeQueryOne("SELECT * FROM authors AS a WHERE a.authorid = ?", [authorId]);
};
// Define una función 'deleteAuthorById' que elimina un autor específico por su identificador (authorId) de la base de datos.
const deleteAuthorById = (authorId) => {
  return executeQuery("DELETE FROM authors AS a WHERE a.authorId = ?", [authorId]);
};
// Define una función 'deleteAuthorAll' que elimina todos los autores de la base de datos
const deleteAuthorAll = () => {
  return executeQuery("DELETE FROM authors", []);
};
// Define una función 'updateAuthorById' que actualiza un autor específico por su identificador (authorId) con nuevos datos proporcionados.
const updateAuthorById = (authorId, newData) => {
  const properties = Object.keys(newData);
  const values = Object.values(newData);
  let query = "UPDATE authors SET ";
// Construye la consulta de actualización con las propiedades y valores proporcionados.
  properties.forEach((property, index) => {
    query += property + " = ?";
    if (index < properties.length - 1) {
      query += ", ";
    }
  });

  query += " WHERE authorid = ?";
  values.push(authorId);

  return executeQuery(query, values);
};
// Exporta las funciones definidas para que puedan utilizarse en otros archivos.
module.exports = {
  createAuthor,
  getAuthorAll,
  getAuthorById,
  deleteAuthorById,
  deleteAuthorAll,
  updateAuthorById
};