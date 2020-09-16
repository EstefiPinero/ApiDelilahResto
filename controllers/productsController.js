const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
const configDB = require('../config/configDB')


//ADD PRODUCT
function addProd(req, res) {

    let {NAME, price, description, item} = req.body;
    let queryAddProd = `INSERT INTO products (NAME, price, description, item)
        VALUES ('${NAME}','${price}', '${description}', '${item}' )`;

    configDB.query(queryAddProd, (err, result) => {
        if (err) throw err
        res.status(200).send('new product added correctly')

    })
};

//PRODUCTS LIST
function getProd(req, res) {
    configDB.query('SELECT * FROM products', (err, result) => {
        if (!err) {
            res.status(200).send(result);
        } else {
            console.log(err);
        }
    })
};

//GET A PRODUCT BY ID
function getProdId (req, res) {
    let idProd = req.params.id;
    let queryProd = `SELECT t.product_id, t.NAME, t.price, t.description, t.item FROM products t WHERE product_id = ${idProd}`;

    configDB.query(queryProd, (err, result) => {
        if (err) throw err;
        res.status(200).send(result);
    })
}


//UPDATE PRODUCT
function updateProd (req, res) {

    let id = req.params.id;
    let {NAME, price, description, item} = req.body;
    let queryUDProd = `UPDATE products SET NAME = '${NAME}', price = '${price}', description = '${description}', item = '${item}' WHERE product_id = ${id}`;

    configDB.query(queryUDProd, (err, result) => {
        if (err) throw err
        res.status(200).send('updated product correctly')

    })
}

//DELETE PRODUCT
function deleteProd (req, res) {

    let idDel = req.params.id;
    let queryDelProd = `DELETE FROM products WHERE product_id = ${idDel}`;

    configDB.query(queryDelProd, (err, result) => {
        if (err) throw err;
        res.status(200).send("deleted product correctly");
    })
};



module.exports = {
    addProd: addProd, 
    getProd: getProd, 
    getProdId: getProdId, 
    updateProd: updateProd, 
    deleteProd: deleteProd
}