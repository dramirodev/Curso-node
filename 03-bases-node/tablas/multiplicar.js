const fs = require('fs');
const colors = require('colors');

const listarTabla = (base, limite = 10) => {
    for (let index = 1; index <= limite; index++) {
        console.log(`${base} x ${index} = ${base * index}`.green);
    }
};

const crearArchivo = (base, limite = 10) => {
    return new Promise((resolve, reject) => {
        if (!Number(base)) {
            reject('La base no es un número');
            return;
        }
        let contenido = '';

        for (let index = 1; index <= limite; index++) {
            contenido += `${base} * ${index} = ${base * index}\n`;
        }

        fs.writeFile(`tablas/table-${base}.txt`, contenido, 'utf8', (error) => {
            if (error) {
                reject(error);
            } else {
                resolve(`tabla-${base}.txt`);
            }
        });
    });
};

module.exports = {
    crearArchivo,
    listarTabla,
};
