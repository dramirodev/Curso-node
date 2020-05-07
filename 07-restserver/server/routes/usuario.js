const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const Usuario = require('../models/Usuario');
const app = express();

app.get('/usuario', (req, res) => {
    //Parametros opcionales para paginar registros
    const desde = +req.query.desde || 0; // con el más me aseguro que es un número
    const hasta = +req.query.hasta || 5;
    // Para recuperar todos los usuarios
    Usuario.find({})
        .skip(desde)
        .limit(hasta)
        .exec((error, arrayUsuarios) => {
        if (error) {
            return res.status(400).json({ ok: false, error }); // 400 BAD REQUEST
        }

        res.json({ok: true, usuarios: arrayUsuarios});
    });
});

app.post('/usuario', (req, res) => {

    const body = req.body;
    const usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password,10),
        role: body.role
    });

    usuario.save((error, usuarioDB) => {
        if (error) {
            return res.status(400).json({ ok: false, error }); // 400 BAD REQUEST
        }

        res.json({
            ok: true,
            usuario: {usuarioDB}
        })
    });

});

app.put('/usuario/:id', (req, res) => {
    const body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);
    const id = req.params.id;

    Usuario.findByIdAndUpdate(id, body, {
        new: true,
        runValidators: true
    }, (error, usuarioDB) => {
        if (error) {
            return res.status(400).json({ ok: false, error }); // 400 BAD REQUEST
        }
        res.json({ok: true, usuario: usuarioDB});
    })
});

app.delete('/usuario', (req, res) => {
    res.json('get Usuario Delete');
});

module.exports = app;
