const fs = require('fs');
class Ticket {

    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;
    }

}

// Clase que controla toda la lógica del sistema
class TicketControl {

    /**
     * Cuando se instancia la clase, el constructor crea sus propiedades y las inicializa
     * Comprueba la fecha, si la fecha que hay en la 'base de datos' json es igual que la de hoy carga los datos, si es distinta, lo inicializa todo vacío
     */
    constructor() {

        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimos4 = [];

        let data = require('../data/data.json');

        if (data.hoy === this.hoy) {
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimos4 = data.ultimos4;
        } else {
            this.reiniciarConteo(); // No es necesario, al inicio del constructor ya lo inicia todo vacío
        }
    }

    /**
     * Crea un nuevo ticket, lo añade al array de tickets pendientes y devuelve su número de ticket
     */
    siguiente() {

        this.ultimo += 1;

        let ticket = new Ticket(this.ultimo, null);

        this.tickets.push(ticket);

        this.grabarArchivo();

        return `Ticket ${this.ultimo}`;

    }

    // Devuelte el último ticket
    getUltimoTicket() {

        return `Ticket ${this.ultimo}`;

    }

    // Devuelte el array 'ultimos4'
    getUltimos4() {

        return this.ultimos4;

    }

    /**
     * Se le pasa un número de escritorio
     * Coge el primer ticket pendiente lo elimina del array de pendientes y lo mete en el de 'ultimos4'
     * Si 'ultimos4' tiene mas de 4 tickets borra el último
     * Graaba el archivo json y devuelve el ticket atendido 
     * 
     * @param {*} escritorio 
     */
    atenderTicket(escritorio) {

        if (this.tickets.length === 0) {
            return 'No hay tickets';
        }

        let numTicket = this.tickets[0].numero;
        this.tickets.shift(); // Borra el primer elemento

        let atenderTicket = new Ticket(numTicket, escritorio);

        this.ultimos4.unshift(atenderTicket); // Añade cómo primer elemento

        if (this.ultimos4.length > 4) {
            this.ultimos4.splice(-1, 1); //Borra el último elemento
        }

        this.grabarArchivo();

        return atenderTicket;

    }

    // Inicializa el sistema con todo vacío
    reiniciarConteo() {
        this.ultimo = 0;
        this.tickets = [];
        this.ultimos4 = [];

        console.log('Se ha inicializado el sistema');
        this.grabarArchivo();
    }

    // Graba los datos de la clase en la 'base de datos' json
    grabarArchivo() {
        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        }

        let jsonDataString = JSON.stringify(jsonData);

        fs.writeFileSync('./server/data/data.json', jsonDataString);
    }

}

module.exports = {
    TicketControl
}