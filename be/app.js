require('dotenv').config();

const express = require('express');
const app = express();
const connectDB = require('./config/db')
const tasks = require('./router/tasks');
const auth = require('./router/auth');
const authMid = require('./middleware/auth');

const port = process.env.PORT || 8060;

connectDB();
app.use(express.json());

let allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', "*");
    res.header('Access-Control-Allow-Methods', "GET, PUT, POST, DELETE");
    next();
}

app.use(allowCrossDomain);

app.use('/tasks', authMid.checkAuth, tasks);
app.use('/auth', auth);

app.listen(port, () => console.log(`Server started to run on ${port}`));