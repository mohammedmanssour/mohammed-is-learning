import Application from './Application';
import Router from './router/Router';

// controllers
import PingController from './http/controllers/PingController';

const app = new Application();

const router = new Router();

// check current app status
const pingController = new PingController();
router.get('ping', [pingController, pingController.index]);

router.fallback(function (req, res) {
  res.setStatusCode(404);
  res.send('404 not found');
});

app.setRouter(router).run();
