const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const { moongose } = require('./db/mongoose')

//Controllers
const listController = require('./controllers/list.controller')
const taskController = require('./controllers/task.controller')
const userController = require('./controllers/user.controller')

//load middleware
app.use(bodyParser.json())
app.use(function (req, res, next) {
    res.contentType('application/json');
    next();
  });
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token, x-refresh-token, _id");
    res.header(
        'Access-Control-Expose-Headers',
        'x-access-token,x-refresh-token'
    )
    next();
});

app.use('/', listController)
app.use('/', taskController)
app.use('/', userController)





app.listen(3000, () => {
    console.log("Server is listening on port 3000");

})