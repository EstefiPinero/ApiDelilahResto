let express = require('express');
let bodyparser = require('body-parser');
let cors = require("cors");

let app = express();


//config
app.use(bodyparser.urlencoded({extended: false}))
app.use(cors());

//server config
app.set('port', process.env.PORT || 3001);

module.exports = app;