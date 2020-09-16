const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const saltRounds = 10;

const configDB = require('../config/configDB')
const secretAuth = require('../config/jsonwebtoken');


// SIGNUP USERS FUNCTION
function signUp(req, res){

    let { fullName, userName, password, email, phoneNumber, address } = req.body;
    
    if (fullName && userName && password && email && phoneNumber && address) {
        bcrypt.hash(password, saltRounds, function (err, hash) {
            if (err) {
                res.status(500).send("No se pudo registrar el usuario");
                return;
            }
            password = hash;

            let insertUser = `INSERT INTO users (fullName, userName, password, email, phoneNumber, address) 
                    VALUES ('${fullName}', '${userName}', '${password}', '${email}', '${phoneNumber}', '${address}')`;

            configDB.query(insertUser, (err, result) => {
                if (err) throw err;
                console.log(result);
                res.status(200).send('Usuario Creado con Éxito');
            });
        });
    } else {
        res.status(400).send("Error al registrar el Usuario, faltan datos!");
    };

}

//SIGN UP ADMIN
function signUpAdmin(req, res){

    let { fullName, userName, password, email, phoneNumber, address, isAdmin} = req.body;
    
    if (fullName && userName && password && email && phoneNumber && address && isAdmin) {
        bcrypt.hash(password, saltRounds, function (err, hash) {
            if (err) {
                res.status(500).send("No se pudo registrar el usuario");
                return;
            }
            password = hash;

            let insertAdmin = `INSERT INTO users (fullName, userName, password, email, phoneNumber, address, isAdmin) 
                    VALUES ('${fullName}', '${userName}', '${password}', '${email}', '${phoneNumber}', '${address}', '${isAdmin}')`;

            configDB.query(insertAdmin, (err, result) => {
                if (err) throw err;
                console.log(result);
                res.status(200).send('Usuario Creado con Éxito');
            });
        });
    } else {
        res.status(400).send("Error al registrar el Usuario, faltan datos!");
    };

}

//LOGIN FUNCTION
function login(req, res){

    let userName = req.body.userName;
    let password = req.body.password;

    //validar que el usuario exista en el array

    let usrLogin = `SELECT user_id, userName, password, isAdmin FROM users WHERE userName = '${userName}'`

    configDB.query(usrLogin, (err, result) => {
        if (err) throw err;

        if(result.length == 0) {
            req.status(400).send('usuario o contraseña incorrectos')
            return;
        }
        
        //to check password 
        bcrypt.compare(password, result[0].password, function(err, bcresult) {
            
            if (err) {
                req.status(500).send('no es posible validar el password')
                return;
            }
            
            if (!bcresult) {
                req.status(400).send('usuario o contraseña incorrecto')
                return;
            }
            
            let payload = {
                userName: result[0].userName,
                user_id: result[0].user_id, 
                isAdmin: result[0].isAdmin,
            }
            
            //general el token
            jwt.sign(payload, secretAuth, (err, token) => {
                
                if(err){
                    req.status(500).send('no es posible iniciar sesion')
                    return;
                }
                
                let loginResult = {
                    userName: result[0].userName,
                    user_id: result[0].user_id,
                    isAdmin: result[0].isAdmin,
                    token: token,
                }
                
                res.send(loginResult );
            })   
        });
    })
    
}

module.exports = {
    signUp: signUp,
    signUpAdmin: signUpAdmin,
    login: login
}