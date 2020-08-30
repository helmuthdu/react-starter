/* eslint-disable @typescript-eslint/no-var-requires */
import { NextFunction, Request, Response } from 'express';

const accepts = require('accepts');
const glob = require('glob');
const path = require('path');

const dev = process.env.NODE_ENV !== 'production';
const NextJS = require('next')({ dir: './client', dev });
const handle = NextJS.getRequestHandler();

// Get the supported languages by looking for translations in the `locales/` dir.
const supportedLanguages = glob.sync(path.resolve('./locales/*.json')).map(f => path.basename(f, '.json'));

export { NextJS };

// Urls from api
export default () => (
  req: Request & { locale: string; messages: { [key: string]: string } },
  res: Response,
  next: NextFunction
) => {
  const accept = accepts(req as any);
  const locale = accept.language((accept.languages(supportedLanguages) as any) || ['en']);
  req.locale = locale;
  req.messages = require(path.resolve(`./locales/${locale}.json`));
  return handle(req, res);
};
