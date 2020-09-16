let mysql = require('mysql');

//Set database connection credentials
let configDB = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'fede1309',
    database: 'delilahr',
});

configDB.connect(err => {
    if (err) {
        console.log(err);
        return;
    } else {
        console.log('Conectado Correctamente a la Base de Datos Delilah DB');
    }
})

module.exports = configDB;