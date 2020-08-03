import * as os from 'os';
import qr from 'qrcode-terminal';

import server from './server';
import socket from './socket';

// -----------------------------------------------------------------------------

const portApi   = process.env.PORT || 8080; // default port is 8080
const portRaspi = process.env.PORT_RASPI || 4200; // default port is 4200

// -----------------------------------------------------------------------------

socket.bind(portRaspi as number);

server.listen(portApi, () => {
    const siteURL = 'https://' + os.hostname() + ':' + portApi;

    console.log('Web Server listening on port:', portApi, '\n');
    console.log('Access this site:', siteURL);
    qr.generate(siteURL, { small: true });

    console.log('Logs:');
});