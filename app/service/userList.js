'use strict';

const Service = require('egg').Service;

class UserListService extends Service {

  async getUserListInSearchMate() {
    console.log('getUserListInSearchMate');
    const { app, ctx } = this;
    const requestUserID = ctx.session.user_info._uid;
    try {

      const userList = await app.mysql.query(`SELECT picture, first_name, last_name, age, gender, city FROM user LEFT JOIN user_profile on _uid=users_id WHERE NOT _uid=${requestUserID} `);
      console.log('USERLIST', userList);

      return userList;
    } catch (error) {
      console.log('signup error');
      console.log(error);
      return null;
    }
  }

  async getMyLikesUsers() {
    const { app, ctx } = this;
    const requestUserID = ctx.session.user_info._uid;
    try {
      const myLikesUsersID = await app.mysql.select('my_like', { from_id: requestUserID });
      console.log(myLikesUsersID);
      const myLikesUsers = await this.getUserListByIDArray(myLikesUsersID);

      return myLikesUsers;
    } catch (error) {
      console.log('get my likes error');
      console.log(error);
      return null;
    }
  }

  async getUserListByIDArray(id_array) {
    const { app, ctx } = this;
    const userList = [];
    id_array.forEach(async userID => {
      const user = await app.mysql.select('user_profile', { users_id: userID });
      userList.push(user);
    });

    return userList;
  }
}
module.exports = UserListService;
