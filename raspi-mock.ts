import { createSocket } from 'dgram';
import { IHistoryEntry } from './src/models/history';

// -----------------------------------------------------------------------------

const port = 4200;
const interval = 1000;

const socket = createSocket('udp4');

const sendMessage = () => {
    const data = makeRandom();
    const buf  = JSON.stringify(data);
    socket.send(buf, port);
    console.log('Sent:', buf);
}

console.log('Socket started');

setInterval(sendMessage, interval);

// -----------------------------------------------------------------------------

function makeRandom(): IHistoryEntry {
    return <IHistoryEntry>{
        timestamp: Math.floor(Date.now() / 1000),
        airHumidity: getRandomPercentage(),
        light: getRandomPercentage(),
        temperature: getRandomPercentage(),
        pots: [
            {
                soilHumidity: getRandomPercentage(),
                size: getRandomPercentage(),
            },
        ],
    }
}

function getRandomPercentage(): number {
    return Math.floor(Math.random() * 101);
}