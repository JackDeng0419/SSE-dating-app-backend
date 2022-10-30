'use strict';

const Controller = require('egg').Controller;


class ProfileController extends Controller {

  async userProfile() {
    const { ctx } = this;
    const { id } = ctx.query;

    // all good to start
    try {
      const result = await ctx.service.profile.userProfile(id);
      ctx.status = 200;
      ctx.body = {
        code: 200,
        message: 'retrieve user profile successed',
        data: result,
      };
    } catch (error) {
      ctx.body = {
        code: 500,
        message: 'retrieve user profile failed: ' + error.message,
        data: null,
      };
      ctx.status = 500;
    }
  }

  async userLooks() {
    const { ctx } = this;
    const { id } = ctx.query;

    // all good to start
    try {
      const result = await ctx.service.profile.userProfile(id);
      ctx.status = 200;
      ctx.body = {
        code: 200,
        message: 'retrieve user profile successed',
        data: result,
      };
    } catch (error) {
      ctx.body = {
        code: 500,
        message: 'retrieve user profile failed: ' + error.message,
        data: null,
      };
      ctx.status = 500;
    }
  }

  async userHobbies() {
    const { ctx } = this;
    const { id } = ctx.query;

    // all good to start
    try {
      const result = await ctx.service.profile.userHobbies(id);
      Object.keys(result).forEach(key => {
        if (result[key] == 0) {
          result[key] = false;
        } else if (result[key] == 1) {
          result[key] = true;
        }
      });
      ctx.status = 200;
      ctx.body = {
        code: 200,
        message: 'retrieve user hobbies succeeded',
        data: result,
      };
    } catch (error) {
      ctx.body = {
        code: 500,
        message: 'retrieve user hobbies failed: ' + error.message,
        data: null,
      };
      ctx.status = 500;
    }
  }

  async updateProfileBasicInfo() {
    const { ctx } = this;
    const basic_info = ctx.request.body;
    const id = ctx.session.user_info._uid;

    try {
      const result = await ctx.service.profile.updateProfileBasicInfoOfId(id, basic_info);
      ctx.body = {
        code: 200,
        message: 'profile updated',
        data: result,
      };
      ctx.status = 200;
    } catch (error) {
      ctx.body = {
        msg: 'profile update failed: ' + error.message,
        data: null,
      };
      ctx.status = 500;
    }
  }

  async updateLooks() {
    const { ctx } = this;
    const looks = ctx.request.body;
    const id = ctx.session.user_info._uid;
    console.log(looks);

    try {
      const result = await ctx.service.profile.updateLooksOfId(id, looks);
      ctx.body = {
        code: 200,
        message: 'profile updated',
        data: result,
      };
      ctx.status = 200;
    } catch (error) {
      ctx.body = {
        msg: 'profile update failed: ' + error.message,
        data: null,
      };
      ctx.status = 500;
    }
  }

  async updateHobbies() {
    const { ctx } = this;
    const hobbies = ctx.request.body;
    const id = ctx.session.user_info._uid;

    try {
      const result = await ctx.service.profile.updateHobbiesOfId(id, hobbies);
      ctx.body = {
        code: 200,
        message: 'profile updated',
        data: result,
      };
      ctx.status = 200;
    } catch (error) {
      ctx.body = {
        msg: 'profile update failed: ' + error.message,
        data: null,
      };
      ctx.status = 500;
    }
  }
}

module.exports = ProfileController;
