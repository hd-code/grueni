import express from 'express';
import * as path from 'path';

// -----------------------------------------------------------------------------

const app = express();

// Logger

app.use((req, _, next) => {
    const log = {
        method: req.method,
        type: 'REST',
        url: req.url,
        userAgent: req.headers["user-agent"]??'unknown device'
    };
    console.log(log);
    next();
});

// Frontend - Home and Assets Directory

const frontendDir = path.join(__dirname, '..', 'frontend');

app.get('/', (_, res) => res.sendFile(path.join(frontendDir, 'index.html')));
app.use('/assets', express.static(path.join(frontendDir, 'assets'), { fallthrough: false }));

// Backend API

app.get('/api', (_, res) => {
    res.send({airHumidity: 54, brightness: 1200, temperature: 24});
});

// -----------------------------------------------------------------------------

export default app;