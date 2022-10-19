'use strict';

const Controller = require('egg').Controller;

class LoginController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }

  async usernamePasswordCheck() {
    const { ctx } = this;
    const { username, password } = ctx.request.body;
    // TODO: first check the existence of the username (service.user.getUserByUsername)
    // TODO: found the user, then verify the password
    const result = await ctx.service.login.usernamePasswordCheck(username, password);
    // TODO: update the session
    ctx.body = {
      code: 200,
      msg: 'login successfully',
      data: result,
    };
  }

  async getLoginStatus() {
    const { ctx } = this;
    // TODO: check the session
    ctx.body = {
      code: 200,
      msg: 'login successfully',
    };
  }

  async addUser() {
    const { ctx } = this;
    const { name } = ctx.request.body;
    try {
      const result = await ctx.service.home.addUser(name);
      ctx.body = {
        code: 200,
        msg: 'new user adding succeeded',
        data: result,
      };
    } catch (error) {
      ctx.body = {
        code: 500,
        msg: 'new user adding failed',
        data: null,
      };
    }
  }
}

module.exports = LoginController;