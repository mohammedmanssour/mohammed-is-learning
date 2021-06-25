import Application from './Application';
import Router from './router/Router';

// controllers
import PingController from './http/controllers/PingController';

const app = new Application();

const router = new Router();

// check current app status
const pingController = new PingController();
router.get('ping', [pingController, pingController.index]);

app.setRouter(router).run();
