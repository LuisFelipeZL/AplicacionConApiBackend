// Importa el módulo 'mysql2' que se utilizará para conectarse a una base de datos MySQL.
const mysql = require('mysql2');

// Crea un pool de conexiones a la base de datos MySQL utilizando la configuración proporcionada en las variables de entorno.
const pool = mysql.createPool({
    host: process.env.DB_HOST,    // Obtiene el host de la base de datos desde una variable de entorno.
    user: process.env.DB_USER,    // Obtiene el nombre de usuario de la base de datos desde una variable de entorno. 
    password: process.env.DB_PASSWORD, // Obtiene la contraseña de la base de datos desde una variable de entorno.
    port: process.env.DB_PORT,         // Obtiene el puerto de la base de datos desde una variable de entorno.
    database: process.env.DB_DATABASE   // Obtiene el nombre de la base de datos desde una variable de entorno.

});

// Establece la variable global 'db' para que sea igual al pool de conexiones, lo que permitirá acceder a la base de datos desde otros lugares del código.
global.db = pool;