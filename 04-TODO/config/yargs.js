const descripcion = {
    demand: true,
    alias: 'd',
    desc: 'Descripción de la tarea por hacer'
};

const completado = {
        default: true,
        alias: 'c',
        desc: 'Marca como completada la tarea'
        }

const argv = require('yargs')
    .command(
        'crear',
        'Crear una tarea por hacer',
        {
        descripcion
}).command(
    'actualizar',
    'Actualizar una tarea',
    {
    descripcion,
    completado
    }
).command(
    'listar',
    'Listar las tareas',
    {
        default: true,
        alias: 'l'
    }
).command(
    'borrar',
    'Borrar una tarea',
    {
        descripcion: {
            demand: true,
            alias: 'd'
        }
    })
    .help()
    .argv;

module.exports = argv
