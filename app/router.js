'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/user', controller.home.user);
  router.post('/add_user', controller.home.addUser);

  /* Login */
  router.post('/login/check', controller.login.usernamePasswordCheck);
  router.get('/login/status', controller.login.getLoginStatus)
};
