import * as fs from 'fs'
import * as https from 'https';
import * as os from 'os';
import * as path from 'path';
import qr from 'qrcode-terminal';

import app from './app';
import socket from './socket';

// -----------------------------------------------------------------------------

const portApi   = process.env.PORT || 8080; // default port is 8080
const portRaspi = process.env.PORT_RASPI || 4200; // default port is 4200

// -----------------------------------------------------------------------------

const sslDir = path.resolve(__dirname, '..', 'ssl');

const options: https.ServerOptions = {
    key:  fs.readFileSync(path.join(sslDir, 'server.key')),
    cert: fs.readFileSync(path.join(sslDir, 'server.cert')),
};

https.createServer(options, app).listen(portApi, () => {
    const siteURL = 'https://' + os.hostname() + ':' + portApi;

    console.log('Web Server listening on port:', portApi, '\n');
    console.log('Access this site:', siteURL);
    qr.generate(siteURL, { small: true });

    console.log('Logs:');
});

// -----------------------------------------------------------------------------

socket.listen(portRaspi as number);