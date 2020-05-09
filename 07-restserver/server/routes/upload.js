const express = require('express');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const path = require('path');
const app = express();
const Usuario = require('../models/Usuario');
const Producto = require('../models/Producto');

app.use(fileUpload({ useTempFiles: true }));

app.put('/upload/:tipo/:id', (req, res) => {

    const tipo = req.params.tipo;
    const id = req.params.id;

    const tiposValidos = ['usuarios', 'productos'];

    if (!tiposValidos.includes(tipo)) {
        return res.status(400).json({
            ok: false,
            error: {
                message: `Los tipos permitidos son: ${tiposValidos.join(',')}`
            }
        });
    }

    if (!req.files) {
        return res.status(400).json({
            ok: false,
            error: {
                message: 'No se seleccionaron ficheros'
            }
        });
    }

    const sampleFile = req.files.archivo;

    const extensionesValidas = ['png', 'jpg', 'jpeg'];
    const nombreArchivo = sampleFile.name.split('.');
    const extensionesDeArchivo = nombreArchivo[nombreArchivo.length - 1];

    if (extensionesValidas.indexOf(extensionesDeArchivo) < 0) {
        return res.status(400).json({
            ok: false,
            error: {
                message: 'La extensión no es válida'
            }
        })
    }

    // Cambiar nombre al archivo
    const nombreArchivoFinal = `${id}-${new Date().getMilliseconds()}-${sampleFile.name}`;
        sampleFile.mv(`uploads/${tipo}/${nombreArchivoFinal}`, (error) => {
            if (error) {
                return res.status(500).json({
                    ok: false,
                    error
                });
            }

            if (tipo === 'usuarios') {
                imagenUsuario(id, res, nombreArchivoFinal);
            } else {
                imagenProducto(id, res, nombreArchivoFinal);
            }

        });
});

const imagenUsuario = async (id, res, img) => {
    try {
        const usuario = await Usuario.findById(id);
        if (usuario) {
            borraArchivo(usuario.img, 'usuarios');
            usuario.img = img;
            const usuarioActualizado = await Usuario.findOneAndUpdate(id, usuario);
            res.json({
                ok: true,
                usuario: usuarioActualizado
            });
        }
    } catch (error) {
        res.status(400).json({
            ok: false,
            error
        });
    }
};

const imagenProducto = async (id, res, img) => {
    try {
        const producto = await Producto.findById(id);
        if (producto) {
            borraArchivo(producto.img, 'productos');
            producto.img = img;
            const productoActualizado = await Producto.findOneAndUpdate(id, producto);
            res.json({
                ok: true,
                producto: productoActualizado
            });
        }
    } catch (error) {
        res.status(400).json({
            ok: false,
            error
        })
    }

}
const borraArchivo = (img, tipo) => {
    const url = path.resolve(__dirname, `../../uploads/${tipo}/${img}`);
    if (fs.existsSync(url)) {
        fs.unlinkSync(url);
     }
}

module.exports = app;
