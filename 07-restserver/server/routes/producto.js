const express = require('express');
const { verificaToken } = require('../middlewares/autenticacion')
const Producto = require('../models/Producto');
const Categoria = require('../models/Categoria');
app = express();

app.get('/productos', verificaToken, (req, res) => {

    // parametros para paginar
    const desde = + req.query.desde || 0;
    const hasta = + req.query.hasta || 5;

    Producto.find({disponible: true})
        .populate('usuario', 'nombre email')
        .populate('categoria', 'nombre')
        .skip(desde)
        .limit(hasta)
        .exec((error, categorias) => {
            if (error) {
                res.status(400).json({ ok: false, error });
            }

            Producto.countDocuments({ disponible: true }, (error, total) => {
                res.json({
                    ok: true,
                    categorias,
                    totalCategorias: total
                })
            })
        })
})

app.get('/producto/:id', verificaToken, (req, res) => {
    const id = req.params.id;

    Producto.findById(id)
        .populate('usuario', 'nombre email')
        .populate('categoria', 'nombre')
        .exec((error, producto) => {
            if (error) {
                return res.status(400).json({ ok: false, error });
            }

            if (!producto) {
                return res.status(500).json({
                    ok: false,
                    error
                });
            }

            res.json(producto);
        });

})

app.post('/producto', verificaToken, (req, res) => {
    const usuario = req.usuario;
    const {nombre,
        precioUni,
        descripcion,
        categoria,
    } = req.body;
    let idCategoria;

    Categoria.findOne({ nombre: categoria }, (error, categoria) => {
        if (error) {
                return res.status(400).json({ ok: false, error });
        }

        idCategoria = categoria._id;
    })

    const prouducto = new Producto({
        nombre,
        precioUni,
        descripcion,
        categoria: idCategoria,
        usuario: usuario._id
    });

    prouducto.save((error, producto) => {
        if (error) {
            return res.status(400).json({ ok: false, error });
        }

        res.json(producto);
    });
});

app.put('/producto/:id', verificaToken, (req, res) => {
    const body = req.body;
    const id = req.params.id;

    Producto.findOneAndUpdate(id,
        body,
        {
            new: true,
            runValidators: true,
            context: 'query'
        },
        (error, producto) => {
            if (error) {
            return res.status(400).json({ ok: false, error });
            }

            if (!producto) {
                return res.status(500).json({ ok: false, error });
            }
            res.json({ ok: true, producto });
         }
    )
});

app.delete('/producto/:id', verificaToken, (req, res) => {
    const id = req.params.id;

    Producto.findOneAndUpdate(id,
        { disponible: false },
        {
            new: true,
            runValidators: true,
            context: 'query'
        },
        (error, producto) => {
            if (error) {
            return res.status(400).json({ ok: false, error });
            }

            if (!producto) {
                return res.status(500).json({ ok: false, error });
            }
            res.json({ ok: true, producto });
         }
    )
});


module.exports = app;
