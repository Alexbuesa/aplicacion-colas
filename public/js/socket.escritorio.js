// Comando para establecer la conexión
var socket = io();
var label = $('small');

socket.on('connect', function() {
    console.log('Conectado al servidor');
});

socket.on('disconnect', function() {
    console.log('Desconectado del servidor');
});

// Obtener los parámetros que vienen en la URL
var searchParams = new URLSearchParams(window.location.search);
if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}

var escritorio = searchParams.get('escritorio');

$('h1').text(`Escritorio ${escritorio}`);

$('button').on('click', function() {
    socket.emit('atenderTicket', { escritorio: escritorio }, function(res) {

        if (res === 'No hay tickets') {
            label.text(res);
            alert(res);
            return;
        }

        label.text(`Ticket ${res.numero}`);
    });
});