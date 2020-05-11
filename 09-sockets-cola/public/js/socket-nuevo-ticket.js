// Comando para establecer la conexion

var socket = io();
var label = $('#lblNuevoTicket');


socket.on('connect', () => {
    console.log('Conectado al servidor');

});

socket.on('disconnect', () => {
        console.log('Desconectaod del servidor');
    })

$('button').on('click', function() {

    socket.emit('siguienteTicket', null, function(siguienteTicket) {
        label.text(siguienteTicket);
    });

});

socket.on('estadoActual', function (respuesta) {
    label.text(respuesta.actual);
});
