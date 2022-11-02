/* eslint valid-jsdoc: "off" */

'use strict';

const path = require("path");
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
  config.middleware = [ 'encryption' ];

  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
    xframe: {
      enable: true,
    }
  };

  config.cors = {
    origin: "http://localhost:8080",
    credentials: true,
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };

  config.mysql = {
    client: {
      host: '127.0.0.1',
      port: '3306',
      user: 'root',
      password: '123456',
      database: 'SSE-dating-app',
    },
  };

  config.session = {
    maxAge: 1800 * 1000,
    encrypt: true,
    renew: true,
  };

  config.uuidInt = {
    client: {
      id: 0,
      seed: 156015570,
    },
  };

  config.bcrypt = {
    saltRounds: 10, // default 10
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
