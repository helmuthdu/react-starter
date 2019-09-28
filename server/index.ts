require('dotenv').config();

import { Server } from './server';

const next = require('next');
const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dir: './client', dev });
const handle = app.getRequestHandler();

app.prepare().then(async () => {
  Server.bootstrap(handle).server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
