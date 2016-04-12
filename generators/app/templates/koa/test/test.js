import test from 'ava';
import 'babel-core/register';

import { agent } from 'supertest';

test.beforeEach(async t => {
  const start = require('../src/app').default;
  const { app, server } = start();

  t.context.app = app;
  t.context.server = server;
  t.context.agent = agent(server);
});

test.afterEach(t => {
  t.context.server.close();
});

test('title', async t => {
  const res = await t.context.agent.get('/');
  t.truthy(res.status === 200);
  t.truthy(res.body.status === 'hello');
});

test('title', async t => {
  const res = await t.context.agent.get('/');
  t.truthy(res.status === 200);
  t.truthy(res.body.status === 'hello');
});
