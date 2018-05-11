const express = require('express');
const app = express();
const path = require('path');

const restRouter = require('./routes/rest');
const mongoose = require('mongoose');

app.use('/api/v1', restRouter);

app.use(express.static(path.join(__dirname, '../public/')));

app.use((req, res) => {
    res.sendFile('index.html', {root: path.join(__dirname, '../public/')});
})

mongoose.connect('mongodb://user:user@ds161459.mlab.com:61459/test-db');

// app.get('/', (req, res) => res.send('Hello World!'));

app.listen(3000, () => console.log('Example app listening on port 3000!'));

