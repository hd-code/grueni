import express from 'express';
import * as path from 'path';

// -----------------------------------------------------------------------------

const assetsDir = path.join(__dirname, '..', 'assets');
const app = express();

// Logger

app.use((req, _, next) => {
    const log = {
        url: req.url,
        userAgent: req.headers["user-agent"]??'unknown device'
    };
    console.log(log);
    next();
});

// Frontend - Home and Assets Directory

app.get('/', (_, res) => res.sendFile(path.resolve(__dirname, '..', 'index.html')));
app.use('/assets', express.static(assetsDir, { fallthrough: false }));

// Backend API

app.get('/api', (_, res) => {
    res.send({airHumidity: 54, brightness: 1200, temperature: 24});
});

// -----------------------------------------------------------------------------

export default app;