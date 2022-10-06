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

    // before start need to check user input
    const onlyNumericPattern = /^[0-9]+$/; 

    if(!onlyNumericPattern.test(id)) {
      ctx.body = {
        code: 400,
        msg: 'invalid id',
        data: null,
      };
      return;
    }

    // all good to start
    try {
      const result = await ctx.service.home.userProfile(id);
      if (result == null) {
        ctx.body = {
          code: 400,
          msg: 'user_profile not exist',
          data: null,
        };
        return;
      }
      ctx.body = {
        code: 200,
        msg: 'retrieve user profile successed',
        data: result, // return _id can be used for retrive user_profile 
      };
    } catch (error) {
      ctx.body = {
        code: 500,
        msg: 'retrieve user profile failed: ' + error.message,
        data: null,
      };
    }
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

  async validateUser() {
    const { ctx } = this;
    const { u_name, pass } = ctx.request.body;

    // before start need to check user input
    const onlyAlphanumericPattern = /^[A-Za-z0-9]+$/; 

    if(!onlyAlphanumericPattern.test(u_name)) {
      ctx.body = {
        code: 400,
        msg: 'invalid username',
        data: null,
      };
      return;
    }

    // all good to start
    try {
      const result = await ctx.service.home.user(u_name);
      if (result == null) {
        ctx.body = {
          code: 400,
          msg: 'user not exist',
          data: null,
        };
        return;
      }
      const check = await ctx.compare(pass, result.password); // compare the hased password, return Boolean true/false
      ctx.body = {
        code: 200,
        msg: check,
        data: result._id, // return _id can be used for retrive user_profile 
      };
    } catch (error) {
      ctx.body = {
        code: 500,
        msg: 'validate user failed: ' + error.message,
        data: null,
      };
    }
  }

  async addUser() {
    const { ctx } = this;
    const { u_name, em, pass } = ctx.request.body;

    // before start need to check user input
    const onlyAlphanumericPattern = /^[A-Za-z0-9]+$/; 
    const emailPattern = /^\S+@\S+\.\S+$/;

    if(!onlyAlphanumericPattern.test(u_name)) {
      ctx.body = {
        code: 400,
        msg: 'invalid username',
        data: null,
      };
      return;
    }

    if(!emailPattern.test(em)) {
      ctx.body = {
        code: 400,
        msg: 'invalid email address',
        data: null,
      };
      return;
    }

    // all good to start
    const pass_h = await ctx.genHash(pass); // hash password
    try {
      const result = await ctx.service.home.addUser(u_name, em, pass_h); // u_name, em, pass "Mike", "Mike@example.com", "password123"

      if (result == null) {
        ctx.body = {
          code: 409,
          msg: 'username or email exist',
          data: null,
        };
      } else {
        ctx.body = {
          code: 200,
          msg: 'new user adding succeeded',
          data: result,
        };
      }
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
