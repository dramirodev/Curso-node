const express = require('express');
const { verificaToken, verificaAdminRole } = require('../middlewares/autenticacion');
const Categoria = require('../models/Categoria');

const app = express();

app.get('/categoria', verificaToken, (req, res) => {

    Categoria.find({})
        .sort('nombre')
        .populate('usuario', 'nombre email')
        .exec(
        (error, categorias) => {
            if (error) {
                return res.status(400).json({ ok: false, error });
            }

            if (!categorias.length) {
                return res.status(500).json({
                    ok: false,
                    message: 'Error interno del servidor'

                });
            }

            res.json({ categorias });

        });

});

app.get('/categoria/:id', verificaToken, (req, res) => {
    const id = req.params.id;

    Categoria.findById(id, (error, categoria) => {
        if (error) {
            return res.status(400).json({ ok: false, error });
        }

        if (!categoria) {
            return res.status(500).json({ ok: false, message: 'Error en la BD' });
        }

        res.json({ categoria });

    })
});


//post
app.post('/categoria', [verificaToken, verificaAdminRole], (req, res) => {
    const body = req.body
    const categoria = new Categoria({
        nombre: body.nombre,
        usuario: req.usuario._id
    });

    categoria.save((error, categoriaDB) => {
        if (error) {
            return res.status(400).json({ ok: false, error });
        }

        if (!categoriaDB) {
            return res.status(500).json({ ok: false, message: 'Error interno en la BD'})
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        })
    })
});

//put
app.put('/categoria/:id', verificaToken, (req, res) => {

    let id = req.params.id;
    let body = req.body;

    let descCategoria = {
        nombre: body.nombre,
    };

    Categoria.findOneAndUpdate(id, descCategoria,
        {
            new: true,
            runValidators: true,
            context: 'query'
        }, (err, categoriaDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        });

    });
});

app.delete('/categoria/:id', [verificaToken, verificaAdminRole], (req, res) => {
    const id = req.params.id;

    Categoria.findOneAndRemove(id, (error, categoriaDB) => {
        if (error) {
            res.status(400).json({
                ok: false,
                error
            })
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        })
    })
})






module.exports = app;
