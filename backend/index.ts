import * as os from 'os';
import qr from 'qrcode-terminal';

import server from './server';
import socket from './socket';

// -----------------------------------------------------------------------------

const portApi   = process.env.PORT || 8080; // default port is 8080

const raspi = {
    addr: process.env.RASPI_ADDR || '0.0.0.0',
    port: parseInt(process.env.RASPI_PORT) || 4200,
};

// -----------------------------------------------------------------------------

socket.bind(raspi.port, raspi.addr);

server.listen(portApi, () => {
    const siteURL = 'https://' + os.hostname() + ':' + portApi;

    console.log('Web Server listening on port:', portApi, '\n');
    console.log('Access this site:', siteURL);
    qr.generate(siteURL, { small: true });

    console.log('Logs:');
});