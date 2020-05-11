const fs = require('fs');

class Ticket{
    constructor(numero, escritorio) {
        this.numero = numero;
            this.escritorio = escritorio;
    }
}

class TicketControl {

    constructor() {
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimosCuatro = [];

        const data = require('../data/data.json');

        if (data.hoy === this.hoy) {
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimosCuatro = data.ultimosCuatro;

        } else {
            this.reiniciarConteo();
        }
    }

    siguienteTicket() {
        this.ultimo += 1;

        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);

        this.grabarArchivo();

        return `Ticket: ${this.ultimo}`;

    }

    estadoUltimoTicket() {
        return `Ticket: ${this.ultimo}`;
    }

    estadoUltimosCuatroTickets() {
        return this.ultimosCuatro;
    }

    atenderTIcket(escritorio) {
        if (this.tickets.length === 0) {
            return 'no hay tickets';
        }
        let numeroTicket = this.tickets[0].numero;

        this.tickets.shift();

        let atenderTicket = new Ticket(numeroTicket, escritorio);

        this.ultimosCuatro.unshift(atenderTicket);

        if (this.ultimosCuatro.length > 4) {
            this.ultimosCuatro.pop();
        }

        this.grabarArchivo();

        return atenderTicket;
    }

    reiniciarConteo() {
        this.ultimo = 0;
        this.tickets = [];
        this.ultimosCuatro = [];
        this.grabarArchivo(this.ultimo, this.hoy);
    }

    grabarArchivo() {
        const jsonData = {
            "ultimo": this.ultimo,
            "hoy": this.hoy,
                "tickets": this.tickets,
                "ultimosCuatro": this.ultimosCuatro
        }

        fs.writeFileSync('./server/data/data.json', JSON.stringify(jsonData));
    }


}

module.exports = TicketControl;
