const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const usrControllers = require('../controllers/usersControllers');
const auth = require('../controllers/authentication');
const middleware = require ('../middlewares/middlewares');
const authentication = require('../controllers/authentication');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

//CREATE USER  
router.post('/api/users', middleware.checkUser, auth.signUp);

//CREATE ADMIN  
router.post('/api/admin', middleware.checkUser, auth.signUpAdmin);

//LOGIN  
router.post('/api/login', authentication.login)

//GET USERS LIST 
router.get('/api/users', [middleware.authenticated, middleware.admin], usrControllers.getUsers)

//DELETE USER
router.delete('/api/users/:id', [middleware.authenticated, middleware.admin], usrControllers.deleteUsr)


module.exports = router;