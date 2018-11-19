// Comando para establecer la conexión
var socket = io();
var label = $('#lblNuevoTicket')

socket.on('connect', function() {
    console.log('Conectado al servidor');
});

socket.on('disconnect', function() {
    console.log('Desconectado del servidor');
});

// Cuando el cliente se conecta al servidor, inicia un listener para el evento 'estadoActual'
socket.on('estadoActual', function(res) {

    label.text(res.actual);

});

// Listener para ejecutar esa función al hacer click en algún botón de la página
$('button').on('click', function() {

    socket.emit('siguiente', null, function(siguienteTicket) {

        label.text(siguienteTicket);

    });

});