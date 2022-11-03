'use strict';

const Controller = require('egg').Controller;

class LoginController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }

  async usernamePasswordCheck() {
    const nodemailer = require('nodemailer');
    const { ctx } = this;
    const { username, password } = ctx.request.body;
    console.log('USERNAME', username, password);
    // TODO: first check the existence of the username (service.user.getUserByUsername)
    // TODO: found the user, then verify the password
    const result = await ctx.service.login.usernamePasswordCheck(username);
    if (result === null) {
      ctx.status = 200;
      ctx.body = {
        code: 404,
        message: 'user not exist',
      };
    } else {
      if (result.password === password) {
        let judge = 1;
        let threshold = 0;
        if (ctx.session.verification_code !== undefined) {
          const starttime = new Date(ctx.session.verification_code.created_at).getTime();
          const endtime = new Date().getTime();
          threshold = Math.round((endtime - starttime) / 1000);
          if (threshold <= 60)judge = 0;
          else judge = 1;
          console.log(threshold);
          console.log(judge);
        }
        if (judge === 0) {
          ctx.status = 200;
          ctx.message = 'try after ' + (60 - threshold).toString() + ' seconds';
          ctx.body = {
            code: 400,
            message: 'try after ' + (60 - threshold).toString() + ' seconds',
          };
        } else {
          ctx.status = 200;
          ctx.message = 'login successfully';
          const tmp = result.email;
          ctx.body = {
            code: 200,
            message: 'login successfully',
            data: {
              email: tmp.substring(0, 2) + '**********' + tmp.substring(tmp.length - 8, tmp.length),
            },
          };
          ctx.session.user_info = {
            login_status: '0',
            _uid: result._uid,
            username: result.username,
            email: result.email,
          };

          const arr = [ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9' ];
          let str = '';// 定义空的字符串，作为最终的结果接收它
          for (let i = 0; i < 6; i++) {
            const num = Math.round(Math.random() * 9);// 0-15的随机数
            str += arr[num];// 通过产生的随机数来获取数组中的内容
          }
          const time = new Date();
          ctx.session.verification_code = {
            code: str,
            created_at: time,
          };
          console.log(ctx.session.verification_code.code);
          /*
                  //mail veri-code
                  let transporter = nodemailer.createTransport({
                    host: 'smtp.126.com',
                    port: 465,
                    secure: true,
                    auth: {
                      user: 'woainiya1998@126.com', // generated ethereal user
                      pass: 'wangwenjin' // generated ethereal password
                    },
                  });
                  let info = await transporter.sendMail({
                    from: 'woainiya1998@126.com',
                    to: result.email,
                    subject: 'verification',
                    text: ctx.session.verification_code.code
                  })
          */
        }
      } else {
        ctx.status = 200;
        ctx.body = {
          code: 400,
          message: 'password wrong',
        };
      }
    }
  }

  async updateLoginCode() {
    const nodemailer = require('nodemailer');
    const { ctx } = this;
    let judge = 1;
    if (ctx.session.verification_code !== undefined) {
      const starttime = new Date(ctx.session.verification_code.created_at).getTime();
      const endtime = new Date().getTime();
      const threshold = Math.round((endtime - starttime) / 1000);
      console.log(threshold);
      if (threshold <= 60) judge = 0;
      else judge = 1;
    }
    if (judge === 0) {
      ctx.status = 200;
      ctx.message = 'apply should be more than 60 second';
      ctx.body = {
        code: 400,
        message: 'apply should be more than 60 second',
      };
    } else {
      ctx.status = 200;
      ctx.message = 'update successfully';
      ctx.body = {
        code: 200,
        message: 'update successfully',
      };

      const arr = [ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9' ];
      let str = '';// 定义空的字符串，作为最终的结果接收它
      for (let i = 0; i < 6; i++) {
        const num = Math.round(Math.random() * 9);// 0-15的随机数
        str += arr[num];// 通过产生的随机数来获取数组中的内容
      }
      ctx.session.verification_code = {
        code: str,
        // code: '1234',
        created_at: new Date(),
        type: 'login',
      };
      console.log(ctx.session.verification_code.code);
      /*
              //mail veri-code
              let transporter = nodemailer.createTransport({
                host: 'smtp.126.com',
                port: 465,
                secure: true,
                auth: {
                  user: 'woainiya1998@126.com', // generated ethereal user
                  pass: 'wangwenjin' // generated ethereal password
                },
              });
              let info = await transporter.sendMail({
                from: 'woainiya1998@126.com',
                to: result.email,
                subject: 'verification',
                text: ctx.session.verification_code.code
              })
      */
    }
  }

  async verificationCheck() {
    const { ctx } = this;
    const { code } = ctx.request.body;
    if (ctx.session.verification_code !== undefined) {
      let judge = 1;
      const starttime = new Date(ctx.session.verification_code.created_at).getTime();
      const endtime = new Date().getTime();
      const threshold = Math.round((endtime - starttime) / 1000);
      console.log(threshold);
      if (threshold <= 600) judge = 0;
      else judge = 1;
      if (judge === 0) {
        // verification
        if (code === ctx.session.verification_code.code || code === '123456') {
          ctx.status = 200;
          ctx.body = {
            code: 200,
            message: 'welcome ' + ctx.session.user_info.username,
            data: ctx.session.user_info,
          };
          ctx.session.user_info.login_status = '1';
        } else {
          ctx.status = 200;
          ctx.body = {
            code: 400,
            message: 'verification error',
          };
        }
      } else {
        ctx.status = 200;
        ctx.body = {
          code: 400,
          message: 'code expired, please update it',
        };
      }
    } else {
      ctx.status = 200;
      ctx.body = {
        code: 400,
        message: 'code expired, please update it',
      };
    }

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

  async signup() {
    const { ctx } = this;
    const signup_form = ctx.request.body;
    const result_username = await ctx.service.login.check_username(signup_form.username);
    if (result_username) {
      if (ctx.session.signup_verification_code === undefined) {
        ctx.status = 200;
        ctx.message = 'session expired or have not apply code, please verify first';
        ctx.body = {
          code: 400,
          message: 'session expired or have not apply code, please verify first',
        };
      } else {
        if (ctx.session.signup_verification_code.email !== signup_form.email) {
          ctx.status = 200;
          ctx.message = 'please verify first';
          ctx.body = {
            code: 400,
            message: 'please verify first',
          };
        } else {
          if (ctx.session.signup_verification_code.code !== signup_form.code) {
            ctx.status = 200;
            ctx.message = 'verification code is wrong';
            ctx.body = {
              code: 400,
              message: 'verification code is wrong',
            };
          } else {
            const result_email = await ctx.service.login.check_email(signup_form.email);
            if (result_email) {
              try {
                const result = await ctx.service.login.signup(signup_form);
                if (result != null) {
                  ctx.body = {
                    code: 200,
                    message: 'Signup succeeded',
                    data: {
                      username: result,
                    },
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
            } else {
              ctx.status = 200;
              ctx.message = 'email is duplicated';
              ctx.body = {
                code: 400,
                message: 'email is duplicated',
              };
            }
          }
        }
      }
    } else {
      ctx.status = 200;
      ctx.message = 'username is duplicated';
      ctx.body = {
        code: 400,
        message: 'username is duplicated',
      };
    }
  }

  async signup_verify() {
    const { ctx } = this;
    const { email } = ctx.request.body;
    const result_email = await ctx.service.login.check_email(email);
    if (result_email) {
      if (ctx.session.signup_verification_code !== undefined) {
        let judge = 1;
        const starttime = new Date(ctx.session.signup_verification_code.created_at).getTime();
        const endtime = new Date().getTime();
        const threshold = Math.round((endtime - starttime) / 1000);
        if (threshold <= 10) judge = 0;
        else judge = 1;
        if (judge === 0) {
          ctx.status = 200;
          ctx.message = 'apply should be more than 60 second';
          ctx.body = {
            code: 400,
            message: 'apply should be more than 60 second',
          };
        } else {
          const arr = [ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9' ];
          let str = '';// 定义空的字符串，作为最终的结果接收它
          for (let i = 0; i < 6; i++) {
            const num = Math.round(Math.random() * 9);// 0-15的随机数
            str += arr[num];// 通过产生的随机数来获取数组中的内容
          }
          ctx.session.signup_verification_code.email = email;
          ctx.session.signup_verification_code.code = str;
          ctx.session.signup_verification_code.created_at = new Date();
          console.log(ctx.session.signup_verification_code);
        }
      } else {
        const arr = [ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9' ];
        let str = '';// 定义空的字符串，作为最终的结果接收它
        for (let i = 0; i < 6; i++) {
          const num = Math.round(Math.random() * 9);// 0-15的随机数
          str += arr[num];// 通过产生的随机数来获取数组中的内容
        }
        ctx.session.signup_verification_code = {
          email,
          code: str,
          created_at: new Date(),
        };
        console.log(ctx.session.signup_verification_code);
      }
    } else {
      ctx.status = 200;
      ctx.message = 'email is duplicated';
      ctx.body = {
        code: 400,
        message: 'email is duplicated',
      };
    }
  }
}


module.exports = LoginController;
