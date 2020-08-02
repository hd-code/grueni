import * as fs from 'fs';
import * as https from 'https';
import * as os from 'os';
import * as path from 'path';
import qr from 'qrcode-terminal';

import app from './app';

// -----------------------------------------------------------------------------

const port = process.env.PORT || 8080; // default port is 8080

const sslDir = path.resolve(__dirname, '..', 'ssl');

const options: https.ServerOptions = {
    key:  fs.readFileSync(path.join(sslDir, 'server.key')),
    cert: fs.readFileSync(path.join(sslDir, 'server.cert')),
};

https.createServer(options, app).listen(port, () => {
    const siteURL = 'https://' + os.hostname() + ':' + port;

    console.log('Web Server listening on port:', port, '\n');
    console.log('Access this site:', siteURL);
    qr.generate(siteURL, { small: true });

    console.log('Logs:');
});