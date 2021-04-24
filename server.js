const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const userRoutes = require('./src/routes/users.routes');
const cors = require('cors');
require('./src/data/mongoose');
const path = require('path');

app.use(express.static(path.join(__dirname, 'build')))
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api/bank', userRoutes);

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

module.exports = app;