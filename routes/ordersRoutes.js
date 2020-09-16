const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const controllers = require('../controllers/ordersControllers');
const middleware = require ('../middlewares/middlewares');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));


//CREATE NEW ORDER
router.post('/api/orders', middleware.authenticated, controllers.createOrder);

//GET ORDERS LIST (ADMIN)
router.get('/api/orders', [middleware.authenticated, middleware.admin], controllers.ordersList);

//GET ORDERS LIST BY USER
router.get('/api/ordersUser/:id', [middleware.authenticated], controllers.getOrdersUser);

//GET ORDER BY ID
router.get('/api/orders/:id', [middleware.authenticated, middleware.checkUserid], controllers.getOneOrder);

//UPDATE ORDER
router.put('/api/orders/:id', [middleware.authenticated, middleware.admin], controllers.update);

//DELETE ORDER
router.delete('/api/orders/:id', [middleware.authenticated, middleware.admin], controllers.deleteOrder);


module.exports = router;