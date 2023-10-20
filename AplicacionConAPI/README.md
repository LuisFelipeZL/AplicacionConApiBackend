# Pasos para hacer funcionar esta aplicacion
1) abrir la terminal y ubicarse en la carpeta blogApp
2) iniciar npm start
3) copiar a la izquierda todo lo escrito en el archivo blogBBDD.sql
4) Abrir el programa MySQL Workbench.
5) crear un nuevo SQL y pegar todo lo escrito en blogBBDD.sql
6) seleccionar todo con crtl+A y hacer clic al boton de rayo para crear la base de datos
7) abrir cualquier navagador y escribir en la url: http://localhost:3000/
8) luego poner en url: localhost:3000/authors
9) luego poner en url: localhost:3000/posts

# titulo del proyecto

En esta aplicacion de backend se desarrolla las API s necesarias para obtener datos desde el frontend.

- Ubiquese dentro de la carpeta /blogApp y ejecute npm install para instalar todos los paquetes necesarios en el proyecto.

## Crear Base de datos

 - Crear una base de datos en MYSQL
 - Debe copiar todo lo escrito dentro del archivo blogBBDD.sql y ejecutarlo dentro su base de daots
 - Puede realizar simple consultas para verificar que funciona
 El comando UNLOCK desbloquea cualquier accion sobre una tabla con restricciones o claves foraneas.

## Variables de Entorno
Una variable de entorno no es mas que un archivo donde colocamos datos sencicles como usuarios y credenciales para acceder a base datos y otros programas.

- Dentro de la carpeta blogApp cree un archivo .env , tal cual sin nada antes del punto.
- Crear cada variable para insertar dentro los datos solicitados en la conexion entre " "



## Varibales

| Varibale            | Dato                                                                |
| ----------------- | ------------------------------------------------------------------ |
| DB_HOST | host de mysql, suele ser 127.0.0.1|
| DB_USER| Por defecto es root |
| DB_PASSWORD | Password personal que usa en MYSQL |
| DB_PORT | Por defecto es 3306 |
| DB_DATABASE | inmobiliaria_model |

