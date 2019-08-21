/* eslint-disable @typescript-eslint/no-var-requires */
const { basename } = require('path');
const { createServer } = require('http');
const accepts = require('accepts');
const glob = require('glob');
const next = require('next');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dir: './client', dev });
const handle = app.getRequestHandler();

// Get the supported languages by looking for translations in the `lang/` dir.
const supportedLanguages = glob.sync('./locales/*.json').map(f => basename(f, '.json'));

// We need to load and expose the translations on the request for the user's
// locale. These will only be used in production, in dev the `defaultMessage` in
// each message description in the source code will be used.
const getMessages = locale => {
  return require(`./locales/${locale}.json`);
};

app.prepare().then(() => {
  createServer((req, res) => {
    const accept = accepts(req);
    const locale = accept.language(accept.languages(supportedLanguages)) || 'en';
    req.locale = locale;
    req.messages = dev ? {} : getMessages(locale);
    handle(req, res);
  }).listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
