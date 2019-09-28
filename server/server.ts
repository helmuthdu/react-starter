import * as accepts from 'accepts';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as cors from 'cors';
import * as errorHandler from 'errorhandler';
import * as express from 'express';
import { NextFunction, Request, Response } from 'express';
import { readFileSync } from 'fs';
import * as glob from 'glob';
import * as helmet from 'helmet';
import * as http from 'http';
import * as methodOverride from 'method-override';
import { UrlLike } from 'next-server/router';
import * as path from 'path';

import { ApiRoutes } from './routes';

type RequestHandler = (req: http.IncomingMessage, res: http.ServerResponse, parsedUrl?: UrlLike) => Promise<void>;

// Polyfill Node with `Intl` that has data for all locales.
// See: https://formatjs.io/guides/runtime-environments/#server
const IntlPolyfill = require('intl');
Intl.NumberFormat = IntlPolyfill.NumberFormat;
Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat;

// Get the supported languages by looking for translations in the `locales/` dir.
const supportedLanguages = glob.sync(path.resolve('./locales/*.json')).map(f => path.basename(f, '.json'));

// We need to expose React Intl's locale data on the request for the user's
// locale. This function will also cache the scripts by lang in memory.
const localeDataCache = new Map();
const getLocaleDataScript = locale => {
  const lang = locale.split('-')[0];
  if (!localeDataCache.has(lang)) {
    localeDataCache.set(
      lang,
      readFileSync(require.resolve(`@formatjs/intl-relativetimeformat/dist/locale-data/${lang}.js`), 'utf8')
    );
  }
  return localeDataCache.get(lang);
};
/**
 * The server.
 *
 * @class Server
 */
export class Server {
  /**
   * Bootstrap the application.
   *
   * @class Server
   * @method bootstrap
   * @static
   */
  public static bootstrap(requestHandle: RequestHandler): Server {
    return new Server(requestHandle);
  }

  public server: express.Application;
  public requestHandler: RequestHandler;

  /**
   * Constructor.
   *
   * @class Server
   * @constructor
   */
  constructor(requestHandler: RequestHandler) {
    this.requestHandler = requestHandler;
    this.server = express();

    // configure application
    this.config();

    // add routes
    this.routes();

    // nextjs
    this.server.get(
      '*',
      (req: Request & { locale: string; messages: { [key: string]: string }, localeDataScript: string }, res: Response, next: NextFunction) => {
        const accept = accepts(req);
        const locale = accept.language(accept.languages(supportedLanguages) as any) || 'en';
        req.locale = locale;
        req.localeDataScript = getLocaleDataScript(locale);
        req.messages = require(path.resolve(`./locales/${locale}.json`));
        return this.requestHandler(req, res);
      }
    );
  }

  /**
   * Configure application
   *
   * @class Server
   * @method config
   */
  public config() {
    // mount json form parser
    this.server.use(bodyParser.json({ limit: '2000kb' }));

    // mount query string parser
    this.server.use(
      bodyParser.urlencoded({
        extended: true
      })
    );

    // mount override?
    this.server.use(helmet());
    this.server.use(cors());
    this.server.use(compression());
    this.server.use(methodOverride());

    // catch 404 and forward to error handler
    this.server.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
      err.status = 404;
      next(err);
    });

    // error handling
    this.server.use(errorHandler());
  }

  /**
   * Create and return Router.
   *
   * @class Server
   * @method routes
   * @return void
   */
  private routes() {
    // use router middleware
    this.server.use(ApiRoutes.path, ApiRoutes.router);
  }
}
