import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as cors from 'cors';
import * as errorHandler from 'errorhandler';
import * as express from 'express';
import * as helmet from 'helmet';
import * as methodOverride from 'method-override';
import nextjs from './nextjs';

import { ApiRoutes } from './routes';

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
  public static bootstrap(): Server {
    return new Server();
  }

  public server: express.Application;

  /**
   * Constructor.
   *
   * @class Server
   * @constructor
   */
  constructor() {
    this.server = express();

    // configure application
    this.config();

    // add routes
    this.routes();

    // nextjs
    this.server.get('*', nextjs());
  }

  /**
   * Configure application
   *
   * @class Server
   * @method config
   */
  public config() {
    this.server.use(bodyParser.json({ limit: '2000kb' }));
    this.server.use(bodyParser.urlencoded({ extended: true }));

    this.server.use(helmet());
    this.server.use(cors());
    this.server.use(compression());
    this.server.use(methodOverride());
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
