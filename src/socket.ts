import * as io from 'socket.io';

// -----------------------------------------------------------------------------

const port = process.env.PORT_RASPI || 4200;

const socket = io.default(port);
