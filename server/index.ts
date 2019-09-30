require('dotenv').config();

import { NextJS } from './nextjs';
import { Server } from './server';

const next = require('next');
const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';

NextJS.prepare().then(async () => {
  Server.bootstrap().server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
