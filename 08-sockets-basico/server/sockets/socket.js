const { io } = require ('../server.js')
// Para saber cuando un usuario se conecta al  server
io.on('connection', (client) => {
    console.log('usuario conectado');

    client.emit('enviarMensaje', { usario: 'admin', message: 'Bienvenido a esta aplicación' });

    // Para saber cuando hemos perdido la conexión con el frontend
    client.on('disconnect', () => {
        console.log('Usuario desconectado');
    });

    //Escuchar el cliente

    client.on('enviarMensaje', (data, callback) => {
        console.log(data);
        client.broadcast.emit('enviarMensaje', data);
        // if (mensaje) {
        //     callback({resp:'TODO SALIÖ BIEN'});
        // } else {
        //     callback({resp:'TODO SALIÖ MAL'});
        // }

    })

});
