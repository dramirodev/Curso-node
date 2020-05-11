var socket = io();

const serachParams = new URLSearchParams(window.location.search);

if (!serachParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario')
}

var escritorio = serachParams.get('escritorio');
var labelSmall = $('small');
$('h1').text('Escritorio: ' + escritorio);

$('button').on('click', function () {
    socket.emit('atenderTicket', { escritorio: escritorio }, function (respuesta) {
        if (respuesta === 'no hay tickets') {
            alert('No hay más tickets que atender');
            return;
        }
        labelSmall.text('Ticket: '+ respuesta.numero);
    })
});
