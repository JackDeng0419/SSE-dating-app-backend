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
}

module.exports = LikeController;
