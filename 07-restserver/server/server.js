require('./config/config');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.get('/usuario', (req, res) => {
    res.json('get Usuario');
});

app.post('/usuario', (req, res) => {

    const body = req.body;

    if (body.nombre) {
        res.json({persona: body});

    } else {
        res.status(400).json({
            ok: false,
            msg: 'El nombre es necesario'
        });
    }

});

app.put('/usuario/:id', (req, res) => {

    const id = req.params.id;
    res.json({id});
});

app.delete('/usuario', (req, res) => {
    res.json('get Usuario Delete');
});

app.listen(process.env.PORT, () => {
    console.log(`Escuchando puerto 3000`);
});
