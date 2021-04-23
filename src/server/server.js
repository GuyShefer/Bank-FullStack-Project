const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const userRoutes = require('./src/routes/users.routes');
const cors = require('cors');
require('./src/data/mongoose');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api/bank', userRoutes);

module.exports = app;