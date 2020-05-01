const opt = {
    base: {
        alias: 'b',
        demand: true,
        type: Number,
    },
    limite: {
        alias: 'l',
        default: 10,
    },
};

const argv = require('yargs')
    .command('listar', 'Imprime en consola la tabla de multiplicar', opt)
    .command(
        'crear',
        'Genera un documento de texto con la tabla de multiplicar',
        opt,
    )
    .help().argv;

module.exports = {
    argv,
};
