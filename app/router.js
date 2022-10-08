'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/user_profile', controller.home.userProfile);
  router.post('/update_profile_basic', controller.home.updateProfile_basic);
  router.post('/update_profile_covid', controller.home.updateProfile_covid);

  router.get('/validate_user', controller.home.validateUser);
  router.post('/add_user', controller.home.addUser);
};
