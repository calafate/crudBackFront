# CRUD con Express, MongoDB y React
## El esquema es un Blog básico realizado para el trabajo final de backend, al cual se le agrego el frontend con React.

## Trabajo final Backend, puntos solicitados:

- Contar con una base de datos propia y cuenta en moongose.
- Desarrollar el proyecto con un servidor en node que utilice rutas con sus respectivos métodos http para la cominucación con la base de datos
- Poseer un esquema propio y original.
- Poseer aunque sea 4 rutas para conformar el CRUD.
- Validar las rutas que sean necesarias con express-validator.
- Desarrollar un midleware propio.
- Tener una ruta que se comunique con una API externa.- 

## Ejecución del proyecto

Clonar proyecto github
Crear un .Env en Back con las siguientes variables:
    - MONGODB_URI = mongodb+srv://<usuario>:<contraseña>@cluster0.hw5veab.mongodb.net/test
    - PORT = 8080
    - SECRET = cualquiercosa
Instalar dependencias (npm install) en ambos directorios (back y myblog)
crudBackFront/back ejecutar npm run dev
crudBackFront/myblog ejecutar npm start

## Librerias utilizadas en el Back

- [node.js] - Es un entorno de ejecución JavaScript de código abierto y multiplataforma que se utiliza para desarrollar aplicaciones escalables del lado del servidor y de red. Está basado en el motor de ejecución JavaScript V8 de Google Chrome.
- [axios] - Es una librería cliente HTTP basada en promesas que se puede usar tanto en Node JS como en el navegador; por lo que podremos configurar y realizar solicitudes a un servidor y recibiremos respuestas fáciles de procesar.
- [bcryptjs] - Bcrypt es una función de hashing de passwords, basado en el cifrado de Blowfish. Lleva incorporado un valor llamado salt, que es un fragmento aleatorio que se usará para generar el hash asociado a la password, y se guardará junto con ella en la base de datos. Así se evita que dos passwords iguales generen el mismo hash y los problemas que ello conlleva.
- [cors] - Es una característica de seguridad del navegador que restringe las solicitudes HTTP de origen cruzado que se inician desde secuencias de comandos que se ejecutan en el navegador.
- [dotenv] - Es un módulo que permite cargar las variables de entorno de un proyecto node desde un archivo.
- [express] - Express es un framework web transigente, escrito en JavaScript y alojado dentro del entorno de ejecución NodeJS. El modulo explica algunos de los beneficios clave de este framework, como configurar tu entorno de desarrollo y como realizar tareas comunes en desarrollo y publicación web.
- [Express-Validator] - Es un conjunto de middlewares express js que envuelve el validador validator js y otras funciones de sanitización.
- [mongoose] - Mongoose es una librería para Node. js que nos permite escribir consultas para una base de datos de MongooDB, con características como validaciones, construcción de queries, middlewares, conversión de tipos y algunas otras, que enriquecen la funcionalidad de la base de datos.
- [morgan] - Es una gran herramienta que registra las requests junto con otra información dependiendo de su configuración y el ajuste preestablecido utilizado. Resulta muy útil durante la depuración y también si desea crear archivos de registro.
- [multer] - Multer es un "middleware" de node.js para el manejo de multipart/form-data, el cuál es usado sobre todo para la subida de archivos. Está escrito sobre busboy para maximizar su eficiencia.
- [nodemon] - Es una utilidad que monitorea los cambios en el código fuente que se está desarrollando y automáticamente reinicia el servidor. Es una herramienta muy útil para desarrollo de aplicaciones con javascript.

## Librerias utilizadas en el Front

- [react] - React es una biblioteca Javascript de código abierto diseñada para crear interfaces de usuario con el objetivo de facilitar el desarrollo de aplicaciones en una sola página. Es mantenido por Facebook y la comunidad de software libre.
- [axios] - Es una librería cliente HTTP basada en promesas que se puede usar tanto en Node JS como en el navegador; por lo que podremos configurar y realizar solicitudes a un servidor y recibiremos respuestas fáciles de procesar.
- [react-quill] - Es un potente editor de texto enriquecido. Es gratuito y de código abierto creado para la web moderna.
- [dayjs] - Es una librería para validar, parsear y mostrar variables de tipo datetimes.


## Datos para usar de ejemplo:
Usuario de Prueba para login: 
email: usuario@gmail.com
contraseña: 1234

## Rutas para probar en Postman:

### Blog
| Método | Ruta |
| ------ | ------ |
| GET | [http://localhost:8080/api/blogs]|
| GET | [http://localhost:8080/api/blogs/{id}]|
| POST | [http://localhost:8080/api/blogs]|
| PUT | [http://localhost:8080/api/blogs/{id}]|
| DELETE | [http://localhost:8080/api/blogs/{id}]|

### User
| Método | Ruta |
| ------ | ------ |
| POST | [http://localhost:8080/user/register]|
| GET | [http://localhost:8080/user/list]|
| POST | [http://localhost:8080/user/login]|

### API Pokemon
| Método | Ruta |
| ------ | ------ |
| GET | [http://localhost:8080/pokemon/list]|