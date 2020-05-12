const { io } = require('../server');
const { crearMensaje } = require('../utilis/utils');
const Usuarios = require('../classes/Usuarios');

const usuarios = new Usuarios();

io.on('connection', (client) => {

    console.log('Conetado al servidor');

    client.on('entrarChat', (data, callback) => {

        if (!data.nombre || !data.sala) {
            return callback({
                error: true,
                mensaje: 'El nombre es necesario'
            });
        }

        client.join(data.sala);

        let personas = usuarios.agregarPersona(client.id, data.nombre, data.sala);

        client.broadcast.to(data.sala).emit('listaPersona', usuarios.getPersonasPorSala(data.sala));
        client.broadcast.to(data.sala).emit('crearMensaje', crearMensaje('Admin', `${data.nombre} se unió el chat`));

        callback(usuarios.getPersonasPorSala(data.sala));
    });

    client.on('crearMensaje', (data, callback) => {

        const persona = usuarios.getPersona(client.id);
        const mensaje = crearMensaje(persona.nombre, data.mensaje);

        client.broadcast.to(persona.sala).emit('crearMensaje', mensaje);
        callback(mensaje);
    });

    client.on('disconnect', () => {
        const persona = usuarios.deletePerosna(client.id);

        client.broadcast.to(persona.sala).emit('crearMensaje', crearMensaje('Admin', `${persona.nombre} abandonó el chat`));
        client.broadcast.to(persona.sala).emit('listaPersona', usuarios.getPersonasPorSala(persona.sala));
    });

    // MEnsajes privados
    client.on('mensajePrivado', data => {
        let persona = usuarios.getPersona(client.id);
        client.broadcast.to(data.para).emit('mensajePrivado', crearMensaje(persona.nombre, data.mensaje))
    })

});
