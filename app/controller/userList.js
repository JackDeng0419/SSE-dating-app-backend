'use strict';

const Controller = require('egg').Controller;

class UserListController extends Controller {
  async getUserListInSearchMate() {
    const { ctx } = this;
    try {
      const result = await ctx.service.userList.getUserListInSearchMate();
      if (result) {
        ctx.body = {
          code: 200,
          message: 'Signup succeeded',
          data: result,
        };
      } else {
        ctx.body = {
          code: 500,
          message: 'Signup failed',
        };
      }
    } catch (error) {
      console.log(error);
      ctx.body = {
        code: 501,
        message: 'database error, please try again',
      };
    }
  }

  async getUserListInSearchMateWithFilter(filterObj) {
    const { ctx } = this;

    try {
      const result = await ctx.service.userList.getUserListInSearchMate();
      if (result) {
        ctx.body = {
          code: 200,
          message: 'Signup succeeded',
          data: result,
        };
      } else {
        ctx.body = {
          code: 500,
          message: 'Signup failed',
          data: null,
        };
      }
    } catch (error) {
      console.log(error);
      ctx.body = {
        code: 501,
        message: 'database error, please try again',
      };
    }
  }

  async getMyLikesUsers() {
    const { ctx } = this;

    try {
      const result = await ctx.service.userList.getMyLikesUsers();
      if (result) {
        ctx.body = {
          code: 200,
          message: 'Getting my likes users succeeded',
          data: result,
        };
      } else {
        ctx.body = {
          code: 500,
          message: 'Getting my likes users failed',
          data: null,
        };
      }
    } catch (error) {
      console.log(error);
      ctx.body = {
        code: 501,
        message: 'database error, please try again',
      };
    }
  }

  async getMyDislikesUsers() {
    const { ctx } = this;

    try {
      const result = await ctx.service.userList.getMyDislikesUsers();
      if (result) {
        ctx.body = {
          code: 200,
          message: 'Getting my dislikes users succeeded',
          data: result,
        };
      } else {
        ctx.body = {
          code: 500,
          message: 'Getting my dislikes users failed',
          data: null,
        };
      }
    } catch (error) {
      console.log(error);
      ctx.body = {
        code: 501,
        message: 'database error, please try again',
      };
    }
  }

  async getUsersWhoLikesMe() {
    const { ctx } = this;

    try {
      const result = await ctx.service.userList.getUsersWhoLikesMe();
      if (result) {
        ctx.body = {
          code: 200,
          message: 'Getting users who like me succeeded',
          data: result,
        };
      } else {
        ctx.body = {
          code: 500,
          message: 'Getting users who like me failed',
          data: null,
        };
      }
    } catch (error) {
      console.log(error);
      ctx.body = {
        code: 501,
        message: 'database error, please try again',
      };
    }
  }
}

module.exports = UserListController;
