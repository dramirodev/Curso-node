const express = require('express');
const Producto = require('../models/Producto');
const Categoria = require('../models/Categoria');
const { verificaToken } = require('../middlewares/autenticacion')

const app = express();

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

//Buscar Productos

app.get('/productos/buscar/:termino', verificaToken, (req, res) => {
    const termino = req.params.termino;
    const regex = new RegExp(termino, 'i');
    Producto.find({ nombre: regex, disponible: true })
        .populate('categoria', 'nombre')
        .exec((error, productos) => {
            if (error) {
                return res.status(400).json({ ok: false, error });
                }

            res.json(productos);
        });
});

app.post('/producto', verificaToken, (req, res) => {
    const usuario = req.usuario;
    const {nombre,
        precioUni,
        descripcion,
        categoria,
        disponible
    } = req.body;

        const prouducto = new Producto({
        nombre,
        precioUni,
        descripcion,
        disponible,
        categoria,
        usuario: usuario._id
    });

    prouducto.save((error, producto) => {
        if (error) {
            return res.status(500).json({ ok: false, error });
        }

        res.status(201).json({ok: true,producto});
    });
});

app.put('/producto/:id', verificaToken, (req, res) => {
    const usuarioId = req.usuario._id;
    const id = req.params.id;
    const {nombre,
        precioUni,
        descripcion,
        categoria,
        disponible
    } = req.body;


    Producto.findById(id, (error, producto) => {
        if (error) {
            return res.status(400).json({ ok: false, error });
        }

        const productoActualizado = {
            nombre: nombre || producto.nombre,
            precioUni: precioUni || producto.precioUni,
            descripcion: descripcion || producto.descripcion,
            categoria: categoria || producto.categoria,
            disponible: disponible || producto.disponible,
            usuario: usuarioId
        }

        Producto.findOneAndUpdate({_id: producto._id},
        productoActualizado,
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
