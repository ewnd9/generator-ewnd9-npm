import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import compression from 'koa-compress';
import Router from 'koa-router';
import kstatic from 'koa-static';
import convert from 'koa-convert';

export default (port = 3000) => {
  const app = new Koa();

  app.use(async (ctx, next) => {
    try {
      await next();
    } catch (e) {
      ctx.status = 500;
      ctx.body = { status: 'error' };
    }
  });

  app.use(convert(kstatic(__dirname + '/static')));

  app.use(bodyParser());
  app.use(compression());

  const router = new Router();

  router.get('/', async ctx => {
    ctx.body = {
      status: 'hello'
    };
  });

  app.use(router.routes());
  app.use(router.allowedMethods());

  const server = app.listen(port);
  return { app, server };
};
