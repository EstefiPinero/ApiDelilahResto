const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
const configDB = require('../config/configDB')

//USERS LIST FUNCTION
function getUsers(req, res) {
    configDB.query('SELECT * FROM users', (err, result) => {
        if (!err) {
            res.status(200).send(result);
        } else {
            console.log(err);
        }
    })
};

//DELETE USER
function deleteUsr (req, res) {

    let id = req.params.id;
    let queryDelUsr = `DELETE FROM users WHERE user_id = ${id}`;

    configDB.query(queryDelUsr, (err, result) => {
        if (err) throw err;
        res.status(200).send("user deleted successfully");
    })
};


module.exports = {
    getUsers: getUsers,
    deleteUsr: deleteUsr
}
