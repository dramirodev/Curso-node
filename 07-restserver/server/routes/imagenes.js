const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const { verificaTokenImg } = require('../middlewares/autenticacion');


app.get('/imagen/:tipo/:img',verificaTokenImg, (req, res) => {
    const tipo = req.params.tipo;
    const img = req.params.img;
    if (fs.existsSync(pathImagen)) {
        const pathImagen = path.resolve(__dirname, `../../uploads/${tipo}/${img}`);
        res.sendFile(pathImagen);
    } else {
        const noImagePath = path.resolve(__dirname, '../assets/img/no-image.jpg');
        res.sendFile(noImagePath);
    }

});

















module.exports = app;
