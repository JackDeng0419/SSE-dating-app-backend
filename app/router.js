'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/user_profile', controller.home.userProfile);
  router.post('/update_profile', controller.home.updateProfile);

  router.get('/user', controller.home.user);
  router.post('/add_user', controller.home.addUser);
};
