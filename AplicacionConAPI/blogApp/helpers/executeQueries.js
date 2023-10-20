// Función para ejecutar una consulta SQL en la base de datos y obtener múltiples resultados.
const executeQuery = (sql, params = []) => {
    return new Promise((resolve, reject) => {
        // Utiliza la función 'query' de la base de datos (db) para ejecutar la consulta SQL con los parámetros especificados.
        db.query(sql, params, (err, result) => {
            // Si se produce un error, rechaza la promesa con el error.
            if (err) return reject(err);
            // Si la consulta se ejecuta con éxito, resuelve la promesa con los resultados.
            resolve(result);
        });
    });
}

// Función para ejecutar una consulta SQL en la base de datos y obtener un único resultado.
const executeQueryOne = (sql, params = []) => {
    return new Promise((resolve, reject) => {
        // Utiliza la función 'query' de la base de datos (db) para ejecutar la consulta SQL con los parámetros especificados.
        db.query(sql, params, (err, result) => {
            // Si se produce un error, rechaza la promesa con el error.
            if (err) return reject(err);
            // Si no se encuentra ningún resultado, resuelve la promesa con un valor nulo.
            if (result.length === 0) return resolve(null);
            // Si se encuentra un resultado, resuelve la promesa con el primer elemento del resultado.
            resolve(result[0]);
        });
    });
}
// Exporta las funciones 'executeQuery' y 'executeQueryOne' para que puedan ser utilizadas en otros archivos.
module.exports = { executeQuery, executeQueryOne };