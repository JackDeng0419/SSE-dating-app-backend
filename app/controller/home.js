'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }

  async userProfile() {
    const { ctx } = this;
    const { id } = ctx.request.body;
    const result = await ctx.service.home.userProfile(id);
    ctx.body = result;
  }

  async updateProfile() {
    const { ctx } = this;
    const { f_name, l_name, c_id, p_picture, gen, d_of_birth, a_me, p_lan, r_stat, w_stat, edu, c_pic, is_ver, inf, vac } = ctx.request.body;
    try {
      const result = await ctx.service.home.updateProfile(u_id, f_name, l_name, c_id, p_picture, gen, d_of_birth, a_me, p_lan, r_stat, w_stat, edu, c_pic, is_ver, inf, vac);
      ctx.body = {
        code: 200,
        msg: 'profile updated',
        data: result,
      };
    } catch (error) {
      ctx.body = {
        code: 500,
        msg: 'profile update failed: ' + error.message,
        data: null,
      };
    }
  }

  async user() {
    const { ctx } = this;
    const { u_name, pass } = ctx.request.body;
    const result = await ctx.service.home.user(u_name);
    const check = await ctx.compare(pass, result[0].password); // compare the hased password
    ctx.body = check;
  }

  async addUser() {
    const { ctx } = this;
    const { u_name, em, pass } = ctx.request.body;
    const pass_h = await ctx.genHash(pass); // hash password
    try {
      const result = await ctx.service.home.addUser(u_name, em, pass_h); // u_name, em, pass "Lily", "Lily@example.com", "password123"
      ctx.body = {
        code: 200,
        msg: 'new user adding succeeded',
        data: result,
      };
    } catch (error) {
      console.log(error);
      ctx.body = {
        code: 500,
        msg: 'new user adding failed: ' + error.message,
        data: null,
      };
    }
  }  
}

module.exports = HomeController;
