 // Funciones para enviar o recibir información del backend

        var socket = io();

        // cuando estoy conectado con el servidor
        socket.on('connect', function(){
            console.log('Conectado con el servidor')
        });

        socket.on('disconnect', function(){
            console.log('perdimos conexión con el servidor')
        });

        // Enviar información
        socket.emit('enviarMensaje', {usuario: 'David', message: 'Hola Mundo'} , function (resp) {
        console.log('Respuesta del servidor: ', resp);
    });

        //Escuchar mensaje
        socket.on('enviarMensaje', function(respuesta){
            console.log(respuesta)
        });
