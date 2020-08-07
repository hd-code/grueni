import { createSocket } from 'dgram';

// -----------------------------------------------------------------------------

const socket = createSocket('udp4');

socket.on('listening', () => {
    const { address, port } = socket.address();
    console.log('UDP Socket listening on:', address + ':' + port);
});

socket.on('error', (err) => {
    console.warn(`UDP Socket error:\n${err.stack}`);
    socket.close();
});

socket.on('message', (msg, rinfo) => {
    // TODO: Add socket handler
    console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
});

// -----------------------------------------------------------------------------

export default socket;