import Router from '../router/Router';

import PingController from '../http/controllers/PingController';
import UsersController from '../http/controllers/UsersController';

const apiRoutes = (router: Router) => {
  // check current app status
  const pingController = new PingController();
  router.get('ping', [pingController, pingController.index]);

  const usersController = new UsersController();
  router.post('users', [usersController, usersController.store]);
  router.post('login', [usersController, usersController.attemptLogin]);
};

export default apiRoutes;
