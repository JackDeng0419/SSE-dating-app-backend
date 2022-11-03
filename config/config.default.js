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
      // 判断是否需要 ignore 的方法，请求上下文 context 作为第一个参数
      ignore: ctx => {
        return ctx.request.url === '/login/RSA' || ctx.request.url === '/login/AES'
      },
      headerName: '_csrf'
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
      password: 'pcmco001231',
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
