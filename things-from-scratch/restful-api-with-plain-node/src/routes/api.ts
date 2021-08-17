import Router from '../router/Router';

import PingController from '../http/controllers/PingController';

const apiRoutes = (router: Router) => {
  // check current app status
  const pingController = new PingController();
  router.get('ping', [pingController, pingController.index]);
};

export default apiRoutes;
