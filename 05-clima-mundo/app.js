const argv = require('yargs').options({
    direccion: {
        alias: 'd',
        desc: 'Dirección de la ciudad para obtener el clima',
        demand: true
    }
}).argv;

const lugar = require('./lugar/lugar');
const clima = require('./clima/clima');

const getInfo = async (direccion) => {
    const datosLugar = await lugar.getLugar(direccion);

    if (!datosLugar) {
        throw new Error(`No hay resultados para ${direccion}`);
    } else {
        const data = await clima.getClima(datosLugar.lat, datosLugar.long);
        console.log(data);

        console.log(`La temperatura de ${direccion} es : ${data}`);

    }
}
//lugar.getLugar(argv.direccion).then(resp =>clima.getClima(resp.lat, resp.long).then(console.log)).catch(console.log)

getInfo(argv.direccion);
