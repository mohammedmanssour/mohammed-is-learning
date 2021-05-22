import Application from './Application';
import Router from './router/Router';

const app = new Application();

const router = new Router();

app.setRouter(router).run();
