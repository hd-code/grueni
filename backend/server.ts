import * as fs from 'fs'
import * as https from 'https';
import * as path from 'path';

import app from './app';

// -----------------------------------------------------------------------------

const sslDir = path.resolve(__dirname, '..', 'ssl');

const options: https.ServerOptions = {
    key:  fs.readFileSync(path.join(sslDir, 'server.key')),
    cert: fs.readFileSync(path.join(sslDir, 'server.cert')),
};

const server = https.createServer(options, app);

// -----------------------------------------------------------------------------

export default server;