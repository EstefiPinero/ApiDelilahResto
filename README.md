ApiDelilahResto

Es una API para la gestión de pedidos para cualquier tipo de negocio de comidas

////PROGRAMAS REQUERIDOS////

--> Instalar 
* Visual Studio
* Postman
* Node js
* SQL


////INSTRUCTIVO DE INSTALACIÓN////

--> Descargar el proyecto https://github.com/EstefiPinero/ApiDelilahResto

--> Desde Visual Studio instalar dependencias ejecutando el comando: ```npm install```

--> Crea la Base de datos copiando del archivo delilahr.sql la sentencia: ```CREATE DATABASE IF NOT EXISTS delilahr;```

--> Crear las tablas copiando del archivo delilahr.sql cada sentencia: ```use delilahr;```  ```CREATE TABLE IF NOT EXISTS```
* users 
* products
* orderStatus
* orders
* ordersDetails

--> Agregar valores a las tablas products y orderStatus copiando del archivo las sentencias

```SELECT * FROM (nombre tabla)```
```INSERT INTO (nombre tabla) VALUES```

--> Desde Visual Studio inicializar el servidor ejecutando:
```npm start```

--> Abrir Postman e importar la colección de endpoints desde ```/tools/APIDelilahResto.postman_collection.json``` y ```/tools/URL.postman_environment.json```


////DOCUMENTACIÓN////
