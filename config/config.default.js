/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1663915538419_5954';

  // add your middleware config here
  config.middleware = [];

  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
    domainWhiteList: [ '*' ],
  };

  // config.cors = {
  //   credentials: true,
  //   allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  // };

  config.mysql = {
    client: {
      host: '127.0.0.1',
      port: '3306',
      user: 'root',
      password: 'pcmco001231',
      database: 'SSE-dating-app',
    },
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
