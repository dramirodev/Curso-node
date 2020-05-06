const fs = require('fs');

let listadoPorHacer = [];

const crear = (descripcion) => {
    cargarDB();

    let porHacer = {
        descripcion,
        completado: false,
    };

    listadoPorHacer.push(porHacer);
    guardarDB();
    return porHacer
}

const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);
    fs.writeFile('db/data.json', data, err => {
        if (err) {
            console.log('No se pudo grabar');
        }
    });
}

const getListado = () => {
    cargarDB();
    return listadoPorHacer;
}

const actualizarRegistro = (descripcion, estado) => {
    cargarDB();

    const index = listadoPorHacer.findIndex(element => element.descripcion === descripcion);

    if (index >= 0) {
        listadoPorHacer[index].estado = estado;
        guardarDB();
        return true;
    }

    return false;

}

const borrarTarea = (descripcion) => {
    console.log('descripcion :>> ', descripcion);
    cargarDB();
    const index = listadoPorHacer.findIndex(element => element.descripcion === descripcion);

    if (index >= 0) {
        const eliminado = listadoPorHacer.splice(index, 1);
        guardarDB();
        return eliminado;
    }

    return false;
}

const cargarDB = () => {
    try {
        listadoPorHacer = require('../db/data.json')
    } catch (error) {
        listadoPorHacer = [];
    }
}
module.exports = {
    crear,
    getListado,
    actualizarRegistro,
    borrarTarea
}
