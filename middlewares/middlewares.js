  
const jwt = require("jsonwebtoken");
const secretKey = require("../config/jsonwebtoken");
const mysql = require('../config/configDB');


//ERROR HANDLING
function errorHandling(err, req, res, next) {

  if(err) {
      console.log('trace del error', err)
      //loguearlo en un archivo
      res.status(500).send('unexpected error');
      return;
  }

  next();
}

//AUTHENTICATED
function authenticated (req, res, next){
    
  let auth = req.headers.authorization
  
  //verify authorization
  if(!auth) {
    res.status(401).send('does not have authorization')
    return;
  }
  
  //verify a token
  let token = auth.split(" ")[1];

  if(!token) {
    res.status(401).send('does not have authorization')
    return;
  }
  
  jwt.verify(token, secretKey, (err, payload) => {

    if(err) {
      res.status(500).send('there was a problem with the token')
      return;
    }
    req.userInfo = payload;
    next()
  });
    
}

//ADMIN ATHENTICATED

function admin(req, res, next) {
  if (req.userInfo.isAdmin != 1) {
    res.status(401).send("You do not have access to make this query!");
    return;
  }
  next();
}

//CHECK USER
function checkUserid(req, res, next) {
  let id = req.params.id;

  if (req.userInfo.user_id == id || req.userInfo.isAdmin == 1) {
    next();
  } else {
    res.status(401).send("You do not have access to make this query!");
    return;
  }
}

//CHECK EXISTING USER
function checkUser(req, res, next) {

    let userName = req.body.userName;
  
    mysql.query(`SELECT userName FROM users WHERE userName = '${userName}'`, (err, result) => {
      if (!err) {
        if (result.length !== 0) {
          res.status(400).send('Username already exist! Please choose another');
        } else {
          next();
        }
      } else {
        console.log(err);
      }
    })
  };


module.exports = {
  errorHandling: errorHandling,
  authenticated: authenticated,
  admin: admin,
  checkUserid: checkUserid,
  checkUser: checkUser
}