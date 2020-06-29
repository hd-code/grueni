/**
 * @file
 * This starts the Web-Server and serves the index.html and other asset-files.
 */

import * as fs from 'fs';
import * as https from 'https';
import * as path from 'path';
import * as os from 'os';
import express from 'express';
import console from 'console';

// -----------------------------------------------------------------------------

const port = process.env.PORT || 8080;

const assetsDir = path.join(__dirname, 'assets');
const sslDir = path.join(__dirname, 'ssl');

let key, cert;

// Get SSL certificate
try {
    key = fs.readFileSync(path.join(sslDir, 'server.key'));
    cert = fs.readFileSync(path.join(sslDir, 'server.cert'));
} catch (err) {
    if (err.code === 'ENOENT') {
        console.error('SSL certificate not found! Please generate one by running:', '\nnpm run make:ssl\n')
    } else {
        console.error(err);
    }
    process.exit();
}

// -----------------------------------------------------------------------------

const app = express();

// Logger
app.use((req, _, next) => {
    console.log('Request:', req.url, ', Device:', req.headers["user-agent"]??'unknown device');
    next();
});

// Home and Assets Directory
app.get('/', (_, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.use('/assets', express.static(assetsDir, {fallthrough: false}));

// Create and Start Server
https.createServer({key,cert}, app).listen(port, () => {
    console.log('Web Server listening on port:', port);
    console.log('');
    console.log('Access this site:');
    console.log('- https://localhost:'+port, '=> locally');
    console.log('- https://'+os.hostname()+':'+port, '=> other device in the same network');
    console.log('');
    console.log('Logs:');
});