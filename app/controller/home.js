'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }

  async user() {
    const { ctx } = this;
    const result = await ctx.service.home.user();
    ctx.body = result;
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

module.exports = HomeController;
