import socketio from 'socket.io';

// -----------------------------------------------------------------------------

const socket = socketio();

socket.on('connection', (socket) => {
    console.log(socket);
    console.log('connection was established');

    socket.on('refresh-sensors', function(data) {
        console.log(data)
    })
});

// -----------------------------------------------------------------------------

export default socket;