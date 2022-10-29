'use strict';

const Controller = require('egg').Controller;

class LikeController extends Controller {
  async getLikeStatus() {
    const { ctx } = this;
    const id = ctx.session.user_info._uid;

    // all good to start
    try {
      const { toUserId: to_id } = ctx.query;
      const like_status = await ctx.service.like.getLikeStatus(id, to_id);
      ctx.status = 200;
      ctx.message = 'retrieve like status succeeded';
      ctx.body = {
        message: 'get like status successfully',
        code: 200,
        data: {
          likeStatus: like_status,
        },
      };
    } catch (error) {
      ctx.body = {
        msg: 'retrieve like status failed: ' + error.message,
        data: null,
      };
      ctx.status = 500;
    }
  }

  async likeUser() {
    const { ctx } = this;
    const id = ctx.session.user_info._uid;

    // all good to start
    try {
      const { toUserId: to_id } = ctx.request.body;

      const like_status = await ctx.service.like.likeUser(id, to_id);
      if (like_status != -1) {

        ctx.status = 200;
        ctx.message = 'like user succeeded';
        ctx.body = {
          message: 'like user successfully',
          code: 200,
          data: {
            likeStatus: like_status,
          },
        };
      }
    } catch (error) {
      ctx.body = {
        msg: 'like user failed: ' + error.message,
        data: null,
      };
      ctx.status = 500;
    }
  }

  async dislikeUser() {
    const { ctx } = this;
    const id = ctx.session.user_info._uid;

    // all good to start
    try {
      const { toUserId: to_id } = ctx.request.body;

      const like_status = await ctx.service.like.dislikeUser(id, to_id);
      if (like_status != -1) {
        ctx.status = 200;
        ctx.message = 'dislike user succeeded';
        ctx.body = {
          message: 'dislike user successfully',
          code: 200,
          data: {
            likeStatus: like_status,
          },
        };
      }
    } catch (error) {
      ctx.body = {
        msg: 'dislike user failed: ' + error.message,
        data: null,
      };
      ctx.status = 500;
    }
  }

  async normalUser() {
    const { ctx } = this;
    const id = ctx.session.user_info._uid;

    // all good to start
    try {
      const { toUserId: to_id } = ctx.request.body;

      const like_status = await ctx.service.like.normalUser(id, to_id);
      if (like_status != -1) {
        console.log('like_status', like_status);
        ctx.status = 200;
        ctx.message = 'normalize user succeeded';
        ctx.body = {
          message: 'normalize user successfully',
          code: 200,
          data: {
            likeStatus: like_status,
          },
        };
      }
    } catch (error) {
      ctx.body = {
        msg: 'normalize user failed: ' + error.message,
        data: null,
      };
      ctx.status = 500;
    }
  }

  async updateProfile_basic() {
    const { ctx } = this;
    const { id, f_name, l_name, ag, gen, pic, cit } = ctx.request.body;
    try {
      const result = await ctx.service.home.updateProfile_basic(id, f_name, l_name, ag, gen, pic, cit);
      ctx.body = {
        msg: 'profile updated',
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

  async updateProfile_covid() {
    const { ctx } = this;
    const { id, c_status, vac } = ctx.request.body;
    try {
      const result = await ctx.service.home.updateProfile_covid(id, c_status, vac);
      ctx.body = {
        msg: 'profile updated',
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

  /*
  "u_name": "Mike",
	"pass": "password123"
  */

  async validateUser() {
    const { ctx } = this;
    const { u_name, pass } = ctx.request.body;

    // before start need to check user input
    const onlyAlphanumericPattern = /^[A-Za-z0-9]+$/;

    if (!onlyAlphanumericPattern.test(u_name)) {
      ctx.body = {
        msg: 'invalid username',
        data: null,
      };
      ctx.status = 400;
      return;
    }

    // all good to start
    try {
      const result = await ctx.service.home.user(u_name);
      if (result == null) {
        ctx.body = {
          msg: 'user not exist',
          data: null,
        };
        ctx.status = 400;
        return;
      }
      const check = await ctx.compare(pass, result.password); // compare the hased password, return Boolean true/false
      ctx.body = {
        msg: check,
        data: result._id, // return _id can be used for retrive user_profile
      };
      ctx.status = 200;
    } catch (error) {
      ctx.body = {
        msg: 'validate user failed: ' + error.message,
        data: null,
      };
      ctx.status = 500;
    }
  }

  async addUser() {
    const { ctx } = this;
    const { u_name, pass } = ctx.request.body;

    // before start need to check user input
    const onlyAlphanumericPattern = /^[A-Za-z0-9]+$/;

    if (!onlyAlphanumericPattern.test(u_name)) {
      ctx.body = {
        msg: 'invalid username',
        data: null,
      };
      ctx.status = 400;
      return;
    }

    // all good to start
    const pass_h = await ctx.genHash(pass); // hash password
    try {
      const result = await ctx.service.home.addUser(u_name, pass_h); // u_name, em, pass "Mike", "Mike@example.com", "password123"

      if (result == null) {
        ctx.body = {
          msg: 'username or email exist',
          data: null,
        };
        ctx.status = 409;
      } else {
        ctx.body = {
          msg: 'new user adding succeeded',
          data: result,
        };
        ctx.status = 200;
      }
    } catch (error) {
      console.log(error);
      ctx.body = {
        msg: 'new user adding failed: ' + error.message,
        data: null,
      };
      ctx.status = 500;
    }
  }
}

module.exports = LikeController;
