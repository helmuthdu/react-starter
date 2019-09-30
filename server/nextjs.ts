/* eslint-disable @typescript-eslint/no-var-requires */
import { NextFunction, Request, Response } from 'express';
const accepts = require('accepts');
const fs = require('fs');
const glob = require('glob');
const IntlPolyfill = require('intl');
const path = require('path');

const dev = process.env.NODE_ENV !== 'production';
const NextJS = require('next')({ dir: './client', dev });
const handle = NextJS.getRequestHandler();

// Polyfill Node with `Intl` that has data for all locales.
// See: https://formatjs.io/guides/runtime-environments/#server
Intl.NumberFormat = IntlPolyfill.NumberFormat;
Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat;

// Get the supported languages by looking for translations in the `locales/` dir.
const supportedLanguages = glob.sync(path.resolve('./locales/*.json')).map(f => path.basename(f, '.json'));

// We need to expose React Intl's locale data on the request for the user's
// locale. This function will also cache the scripts by lang in memory.
const localeDataCache = new Map();
const getLocaleDataScript = (locale: string) => {
  const lang = locale.split('-')[0];
  if (!localeDataCache.has(lang)) {
    localeDataCache.set(
      lang,
      fs.readFileSync(require.resolve(`@formatjs/intl-relativetimeformat/dist/locale-data/${lang}.js`), 'utf8')
    );
  }
  return localeDataCache.get(lang);
};

export { NextJS };

// Urls from api
export default () => (
  req: Request & { locale: string; messages: { [key: string]: string }; localeDataScript: string },
  res: Response,
  next: NextFunction
) => {
  const accept = accepts(req as any);
  const locale = accept.language(accept.languages(supportedLanguages) as any) || 'en';
  req.locale = locale;
  req.localeDataScript = getLocaleDataScript(locale);
  req.messages = require(path.resolve(`./locales/${locale}.json`));
  return handle(req, res);
};
