require('./config/config');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

mongoose.connect('mongodb://localhost:27017/cafe',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    }, (error, res) => {


    if (error) {
        throw error;
    }
    console.log('Base de datos online');
});

//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(require('./routes/usuario'));



app.listen(process.env.PORT, () => {
    console.log(`Escuchando puerto 3000`);
});
