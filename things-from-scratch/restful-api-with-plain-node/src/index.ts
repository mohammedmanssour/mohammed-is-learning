import Application from './Application';
import Router from './router/Router';

import api from './routes/api';

const app = new Application();

const router = new Router();
api(router);

router.fallback(function (req, res) {
  res.setStatusCode(404);
  res.send('404 not found');
});

app.setRouter(router).run();
