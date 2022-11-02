'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/profile/BI/get', controller.home.userProfile);
  router.post('/profile/BI/update', controller.home.updateProfile_basic);
  router.post('/update_profile_covid', controller.home.updateProfile_covid);

  router.get('/validate_user', controller.home.validateUser);
  router.post('/add_user', controller.home.addUser);

  /* Login */
  router.post('/login/signup', controller.login.signup);
  router.post('/login/login', controller.login.usernamePasswordCheck);
  router.post('/login/verify', controller.login.verificationCheck);
  router.get('/login/code', controller.login.updateLoginCode);

  /* Get user list */
  router.get('/search-mate', controller.userList.getUserListInSearchMate);
  router.get('/search-mate-with-filter', controller.userList.getUserListInSearchMateWithFilter);
  router.get('/my-likes', controller.userList.getMyLikesUsers);
};
