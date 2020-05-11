const { io } = require('../server');
const TicketControl  = require('../classes/ticket-control');

const tickectControl = new TicketControl();

io.on('connection', (client) => {

    // Escuchar el cliente
   client.on('siguienteTicket', (data, callback) => {

        let siguiente = tickectControl.siguienteTicket();

        console.log(siguiente);
        callback(siguiente);
   });

    client.emit('estadoActual', {
        actual: tickectControl.estadoUltimoTicket(),
        ultimosCuatro: tickectControl.estadoUltimosCuatroTickets()
    });

    client.broadcast.emit('ultimosCuatro', {
        ultimosCuatro: tickectControl.estadoUltimosCuatroTickets()
    });

    client.on('atenderTicket', (data , callback) => {
        if (!data.escritorio) {
            return callback({
                error: true
            });
        }

        const atenderTicket = tickectControl.atenderTIcket(data.escritorio);

        callback(atenderTicket);

        // Actualizar o notificar cambios en los ultimos 4
    })


    client.on('disconnect', () => {
        console.log('Usuario desconectado');
    });

});
