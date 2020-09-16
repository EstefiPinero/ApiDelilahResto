const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const controllers = require('../controllers/productsController');
//const auth = require('../controllers/authentication');
const middleware = require ('../middlewares/middlewares');
const middlewares = require('../middlewares/middlewares');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));



//ADD PRODUCT
router.post('/api/products',[middleware.authenticated, middleware.admin], controllers.addProd);

//PRODUCTS LIST
router.get('/api/products',middleware.authenticated, controllers.getProd);

//GET A PRODUCT BY ID
router.get('/api/products/:id',middleware.authenticated, controllers.getProdId);

//UPDATE PRODUCT
router.post('/api/products/:id', [middleware.authenticated,middlewares.admin], controllers.updateProd);

//DELETE PRODUCT
router.delete('/api/products/:id', [middleware.authenticated,middlewares.admin], controllers.deleteProd);

module.exports = router;