import * as io from 'socket.io';

// -----------------------------------------------------------------------------

const port = process.env.PORT || 5210;

const server = io.default(port);

server