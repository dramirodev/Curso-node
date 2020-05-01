const { crearArchivo, listarTabla } = require('./tablas/multiplicar');
const { argv } = require('./config/yargs');
const comando = argv._[0];

switch (comando) {
    case 'listar':
        listarTabla(argv.base, argv.limite);
        break;
    case 'crear':
        crearArchivo(argv.base, argv.limite)
            .then((archivo) => console.log(`Archivo creado ${archivo}`))
            .catch(console.log);
        break;
    default:
        console.log('Comando no recibido');
        break;
}
