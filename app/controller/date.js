'use strict';

const Controller = require('egg').Controller;

class DateController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }

  async sendDate() {
    const { ctx, app } = this;
    const id = ctx.session.user_info._uid;
    const dateForm = ctx.request.body;
    console.log(dateForm);
    // construct the date object

    const dateObject = {
      _uid: app.uuint.uuid(),
      from_id: id,
      to_id: dateForm.toId,
      city: dateForm.city,
      location: dateForm.location,
      mask_required: dateForm.maskRequired,
      date: dateForm.dateTime,
      state: 0,
    };

    try {
      const result = await ctx.service.date.newDate(dateObject);
      ctx.status = 200;
      if (result != null) {

        ctx.body = {
          code: 200,
          message: 'send date successed',
          data: result,
        };
      } else {
        ctx.body = {
          code: 400,
          message: 'send date failed',
          data: result,
        };
      }
    } catch (error) {
      ctx.body = {
        msg: 'send date failed: ' + error.message,
        data: null,
      };
      ctx.status = 500;
    }
  }

  async cancelDate() {
    const { ctx, app } = this;
    // const id = ctx.session.user_info._uid;
    const { date_id: _uid } = ctx.request.body;

    try {
      const result = await ctx.service.date.cancelDate(_uid);
      ctx.status = 200;
      if (result != null) {
        ctx.body = {
          code: 200,
          message: 'cancel date successed',
          data: result,
        };
      } else {
        ctx.body = {
          code: 400,
          message: 'cancel date failed',
          data: result,
        };
      }
    } catch (error) {
      ctx.body = {
        msg: 'cancel date failed: ' + error.message,
        data: null,
      };
      ctx.status = 500;
    }
  }

  async acceptDate() {
    const { ctx, app } = this;
    // const id = ctx.session.user_info._uid;
    const { date_id: _uid } = ctx.request.body;

    try {
      const result = await ctx.service.date.acceptDate(_uid);
      ctx.status = 200;
      if (result != null) {
        ctx.body = {
          code: 200,
          message: 'accept date successed',
          data: result,
        };
      } else {
        ctx.body = {
          code: 400,
          message: 'accept date failed',
          data: result,
        };
      }
    } catch (error) {
      ctx.body = {
        msg: 'accept date failed: ' + error.message,
        data: null,
      };
      ctx.status = 500;
    }
  }

  async rejectDate() {
    const { ctx, app } = this;
    // const id = ctx.session.user_info._uid;
    const { date_id: _uid } = ctx.request.body;

    try {
      const result = await ctx.service.date.rejectDate(_uid);
      ctx.status = 200;
      if (result != null) {
        ctx.body = {
          code: 200,
          message: 'reject date successed',
          data: result,
        };
      } else {
        ctx.body = {
          code: 400,
          message: 'reject date failed',
          data: result,
        };
      }
    } catch (error) {
      ctx.body = {
        msg: 'reject date failed: ' + error.message,
        data: null,
      };
      ctx.status = 500;
    }
  }

  async getDateFromMe() {
    const { ctx, app } = this;
    const id = ctx.session.user_info._uid;

    try {
      const result = await ctx.service.date.getDateFromId(id);
      ctx.status = 200;
      if (result != null) {
        ctx.body = {
          code: 200,
          message: 'get date successed',
          data: result,
        };
      } else {
        ctx.body = {
          code: 400,
          message: 'get date failed',
          data: result,
        };
      }
    } catch (error) {
      ctx.body = {
        msg: 'send date failed: ' + error.message,
        data: null,
      };
      ctx.status = 500;
    }
  }

  async getDateToMe() {
    const { ctx, app } = this;
    const id = ctx.session.user_info._uid;

    try {
      const result = await ctx.service.date.getDateToId(id);
      ctx.status = 200;
      if (result != null) {
        ctx.body = {
          code: 200,
          message: 'get date successed',
          data: result,
        };
      } else {
        ctx.body = {
          code: 400,
          message: 'get date failed',
          data: result,
        };
      }
    } catch (error) {
      ctx.body = {
        msg: 'send date failed: ' + error.message,
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

module.exports = DateController;
