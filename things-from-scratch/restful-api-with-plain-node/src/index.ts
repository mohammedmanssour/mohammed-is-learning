import Application from './Application';
import JsonResponse from './http/JsonResponse';
import Router from './router/Router';

const app = new Application();

const router = new Router();

router.get('/users/{user}/teams/{team}', (req, res, params) => {
  JsonResponse.from(res).send(params);
});

app.setRouter(router).run();
