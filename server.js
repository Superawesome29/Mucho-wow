import express from 'express';
import { createServer } from 'http';
import { scramjetPath } from '@mercuryworkshop/scramjet/path';
import { join } from 'path';

const app = express();
const server = createServer();
const PORT = process.env.PORT || 8080;

// 1. Share Scramjet's background files so the browser can read them
app.use('/scram/', express.static(scramjetPath));

// 2. Share the folder where we will put your website screen
app.use(express.static(join(process.cwd(), 'public')));

// 3. When someone goes to your website, hand them your home screen
app.get('/', (req, res) => {
    res.sendFile(join(process.cwd(), 'public', 'index.html'));
});

// 4. Connect everything to the main internet listener
server.on('request', (req, res) => {
    app(req, res);
});

server.listen(PORT, () => {
    console.log(`Server is running smoothly on port ${PORT}`);
});
