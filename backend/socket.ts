import { createSocket } from 'dgram';

import { handleMessage } from './controller/socket';

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
    const log = {
        addr: rinfo.address,
        port: rinfo.port,
        type: 'UDP',
    };
    console.log(log);
    handleMessage(msg);
});

// -----------------------------------------------------------------------------

export default socket;