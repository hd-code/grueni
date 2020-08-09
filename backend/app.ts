import express from 'express';
import * as path from 'path';

import * as box from './controller/box';
import * as history from './controller/history';

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
    // console.log(log);
    next();
});

// Frontend - Home and Assets Directory

const frontendDir = path.join(__dirname, '..', 'frontend');

app.get('/', (_, res) => res.sendFile(path.join(frontendDir, 'index.html')));
app.use('/assets', express.static(path.join(frontendDir, 'assets'), { fallthrough: false }));

// Backend API

app.get('/api', (_, res) => {
    const data = box.getBoxData()
    res.send(data);
});

app.get('/api/history/air', (_, res) => {
    const data = history.getAirHum();
    res.send(data);
});

app.get('/api/history/light', (_, res) => {
    const data = history.getLight();
    res.send(data);
});

app.get('/api/history/temperature', (_, res) => {
    const data = history.getTemp();
    res.send(data);
});

app.get('/api/plants/:potIndex/soil', (req, res) => {
    console.log(req.params);
    const potIndex = parseInt(req.params.potIndex);
    const data = box.getSoilHumidity(potIndex);
    res.send({data});
});

// -----------------------------------------------------------------------------

export default app;