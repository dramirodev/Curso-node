const argv = require('./config/yargs');
const colors = require('colors');
const porHacer = require('./por-hacer/por-hacer')


let comando = argv._[0];

switch (comando) {
    case 'crear':
        let tarea = porHacer.crear(argv.descripcion);
        console.log('tarea :>> ', tarea);
        break;
    case 'listar':
        let listado = porHacer.getListado()
        console.log('listado :>> ', listado);

        console.log(('========Por hacer========='.green));
        for (const tarea of listado) {
            console.log(` + ${tarea.descripcion}`.red);
            console.log(` Estado: ${tarea.completado ? 'Completada' : 'Por Hacer'}`);
        }
        console.log(('=========================='.green));
        break;
    case 'actualizar':
        const actualizado = porHacer.actualizarRegistro(argv.descripcion, argv.completado);
        console.log(actualizado);
        break;
    case 'borrar':
    porHacer.borrarTarea(argv.descripcion);
        break;
    default:
        break;
}
