const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
const configDB = require('../config/configDB');


//CREATE NEW ORDER
function createOrder (req, res) {
    let { userName, description, payType} = req.body;
    let totalGeneral = 0;

    description.forEach((ordDetails) => {
        let queryGetPrice = `SELECT price FROM products WHERE product_id = ${ordDetails.product}`;
        configDB.query(queryGetPrice, (err, result) => {
            if (err) throw err;
            let totalProduct = result[0].price * ordDetails.quantity;
            totalGeneral += totalProduct;
        })
    });

    configDB.beginTransaction(function (err) {
        if (err) throw err;

        let queryOrdInsert = `INSERT INTO orders (userName, payType, total) 
            VALUES ('${userName}', '${payType}', '${totalGeneral}')`;
        configDB.query(queryOrdInsert, (err, result) => {
            if (err) {
                configDB.rollback(function () {
                    throw err;
                });
            } else {
                let ordersDetails_id = result.insertId;
                description.forEach(ordDetails => {

                    let queryOrdInsertDetail = `INSERT INTO ordersdetails (order_id, product, quantity) 
                    VALUES ('${ordersDetails_id}', '${ordDetails.product}', '${ordDetails.quantity}')`;

                    configDB.query(queryOrdInsertDetail, (err, result) => {
                        if (err) {
                            configDB.rollback(function () {
                                throw err;
                            });
                        }
                    })
                });
                configDB.commit(function (err) {
                    if (err) {
                        configDB.rollback(function () {
                            throw err;
                        });
                    }
                });
                res.send('order created successfully');
            }
        });
    });
}


//GET ORDERS LIST (ADMIN)
function ordersList (req, res) {
    configDB.query('SELECT * FROM orders', (err, result) => {
        if (!err) {
            res.status(200).send(result);
        } else {
            console.log(err);
        }
    })

}

//GET ORDERS LIST BY USER
function getOrdersUser (req, res) {
    let id = req.params.id;
    let queryOrders = `SELECT ordersdetails.order_id, orders.userName, orders.dateT, orders.status, ordersdetails.product, ordersdetails.quantity, orders.total 
    FROM ordersdetails INNER JOIN orders ON ordersdetails.order_id = orders.order_id WHERE orders.userName= ${id}`;

    configDB.query(queryOrders, (err, result) => {
        if (!err) {
            let objectResult = [];
            result.forEach((orderDB) => {
                let orderNotUpl = true;

                objectResult.forEach((orderUpl) => {
                    if (orderUpl.order_id === orderDB.order_id) {
                        orderNotUpl = false;
                        orderUpl.description.push(
                            {
                                product: orderDB.product,
                                quantity: orderDB.quantity,
                            }
                        )
                    }orderDB
                })

                if (orderNotUpl) {
                    const newObjectResult = {
                        order_id: orderDB.order_id,
                        userName: orderDB.userName,
                        dateT: orderDB.dateT,
                        status: orderDB.status,
                        description: [],
                        total: orderDB.total,
                    }
                    newObjectResult.description.push(
                        {
                            product: orderDB.product,
                            quantity: orderDB.quantity,
                        }
                    )
                    objectResult.push(newObjectResult);
                }
            })
            res.status(200).send(objectResult);
        } else {
            console.log(err);
        }
    })
}

//GET ORDER BY ID
function getOneOrder(req, res){
    let idOrd= req.params.id;
    let queryOrd = `SELECT t.order_id, t.UserName, t.dateT, t.status, t.payType, t.total FROM orders t WHERE order_id = ${idOrd}`;

    configDB.query(queryOrd, (err, result) => {
        if (result.length == 0) {
            res.status(404).send('order not found')
        }
        else {
            res.status(200).send(result);    
        }
        
    })
}

//UPDATE ORDER
function update (req, res) {
    let id = req.params.id
    let status = req.body.status;
    let queryOrderStatus = `UPDATE orders SET status = ${status} WHERE order_id = ${id} `;

    configDB.query(queryOrderStatus, (err, result) =>{
        if (err) throw err;
        res.status(200).send("Order status updated");
    })
};
  
//DELETE ORDER
function deleteOrder(req, res) {
    let id = req.params.id;
    let queryDeleteOrder = `DELETE FROM orders WHERE order_id = ${id}`;

    configDB.query(queryDeleteOrder, (err, result) => {
        if (err) throw err;
        res.status(200).send("Order deleted successfully");
    })
};

module.exports = {
    createOrder: createOrder, 
    ordersList: ordersList, 
    getOrdersUser: getOrdersUser,
    getOneOrder: getOneOrder, 
    update :update, 
    deleteOrder: deleteOrder 
}