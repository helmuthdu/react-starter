import { NextFunction, Request, Response, Router } from 'express';
import { logger } from '../../services';

export class PingRoute {
  public static path = '/ping';
  private static instance: PingRoute;
  private router = Router();

  private constructor() {
    logger.info('[PingRoute] Creating ping route.');

    this.router.get('/', this.get);
  }

  static get router() {
    if (!PingRoute.instance) {
      PingRoute.instance = new PingRoute();
    }
    return PingRoute.instance.router;
  }

  /**
   * @api {get} /ping Ping Request object
   * @apiName Ping
   * @apiGroup Ping
   *
   * @apiSuccess {String} type Json Type.
   */
  private get = async (req: Request, res: Response, next: NextFunction) => {
    res.json('pong');
    next();
  };
}
