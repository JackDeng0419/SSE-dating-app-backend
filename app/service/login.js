'use strict';

const Service = require('egg').Service;

class LoginService extends Service {
  async usernamePasswordCheck(username) {
     const { app } = this;
     try {
       console.log(username)
       return await app.mysql.get('user', {username: username});
     } catch (error) {
       console.log(error);
       return null;
     }
  }

  async addUser(name) {
    const { app } = this;
    try {
      const result = await app.mysql.insert('test_user', { name });
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
module.exports = LoginService;
