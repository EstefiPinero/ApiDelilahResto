
const app = require('./config/server');
const middlewares = require('./middlewares/middlewares');


//APP ROUTES
app.use(require('./routes/usersRoutes'));
app.use(require('./routes/prodRoutes'));
app.use(require('./routes/ordersRoutes'))

//error handle
app.use(middlewares.errorHandling)


//SERVER
app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'))
});

