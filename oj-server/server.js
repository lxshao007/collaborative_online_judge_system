const express = require('express');
const app = express();
const restRouter = require('./routes/rest');
const mongoose = require('mongoose');

app.use('/api/v1', restRouter);


mongoose.connect('mongodb://user:user@ds161459.mlab.com:61459/test-db');

// app.get('/', (req, res) => res.send('Hello World!'));

app.listen(3000, () => console.log('Example app listening on port 3000!'));