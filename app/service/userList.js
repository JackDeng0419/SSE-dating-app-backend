'use strict';

const Service = require('egg').Service;
<<<<<<< HEAD
const LIKE_STATUS = require('../constant');
=======
>>>>>>> wangwenjin

class UserListService extends Service {

  async getUserListInSearchMate() {
<<<<<<< HEAD
=======
    console.log('getUserListInSearchMate');
>>>>>>> wangwenjin
    const { app, ctx } = this;
    const requestUserID = ctx.session.user_info._uid;
    try {

<<<<<<< HEAD
      const userList = await app.mysql.query(`SELECT picture as avatar, first_name as firstName, last_name as lastName, age, gender, city as location, _uid as userId FROM user LEFT JOIN user_profile on _uid=user_id WHERE NOT _uid=${requestUserID} `);
=======
      const userList = await app.mysql.query(`SELECT picture, first_name, last_name, age, gender, city FROM user LEFT JOIN user_profile on _uid=users_id WHERE NOT _uid=${requestUserID} `);
      console.log('USERLIST', userList);
>>>>>>> wangwenjin

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
<<<<<<< HEAD
      const myLikesUsersID = await (await app.mysql.select('my_like', { where: { from_id: requestUserID, like_status: 1 } })).map(element => { return element.to_id; });
=======
      const myLikesUsersID = await app.mysql.select('my_like', { from_id: requestUserID });
      console.log(myLikesUsersID);
>>>>>>> wangwenjin
      const myLikesUsers = await this.getUserListByIDArray(myLikesUsersID);

      return myLikesUsers;
    } catch (error) {
      console.log('get my likes error');
      console.log(error);
      return null;
    }
  }

<<<<<<< HEAD
  async getMyDislikesUsers() {
    const { app, ctx } = this;
    const requestUserID = ctx.session.user_info._uid;
    try {
      const myLikesUsersID = await (await app.mysql.select('my_like', { where: { from_id: requestUserID, like_status: 2 } })).map(element => { return element.to_id; });
      const myLikesUsers = await this.getUserListByIDArray(myLikesUsersID);

      return myLikesUsers;
    } catch (error) {
      console.log('get my dislikes error');
      console.log(error);
      return null;
    }
  }

  async getUsersWhoLikesMe() {
    const { app, ctx } = this;
    const requestUserID = ctx.session.user_info._uid;
    try {
      const myLikesUsersID = await (await app.mysql.select('my_like', { where: { to_id: requestUserID, like_status: 1 } })).map(element => { return element.to_id; });
      const myLikesUsers = await this.getUserListByIDArray(myLikesUsersID);

      return myLikesUsers;
    } catch (error) {
      console.log('get my dislikes error');
      console.log(error);
      return null;
    }
  }

  async getUserListByIDArray(id_array) {
    if (!id_array || id_array.length === 0) {
      return [];
    }
    const { app, ctx } = this;
    // const userList = [];
    // id_array.forEach(async userID => {
    //   const user = await app.mysql.select('user_profile', { users_id: userID });
    //   userList.push({
    //     avatar: user.picture,
    //     firstName: user.first_name,
    //     lastName: user.last_name,
    //     gender: user.gender,
    //     age: user.age,
    //     location: user.city,
    //   });
    // });

    const userList = await (await app.mysql.select('user_profile', { where: { user_id: id_array } })).map(
      element => ({
        avatar: element.picture,
        firstName: element.first_name,
        lastName: element.last_name,
        gender: element.gender,
        age: element.age,
        userId: element.users_id,
        location: element.city }));
=======
  async getUserListByIDArray(id_array) {
    const { app, ctx } = this;
    const userList = [];
    id_array.forEach(async userID => {
      const user = await app.mysql.select('user_profile', { users_id: userID });
      userList.push(user);
    });
>>>>>>> wangwenjin

    return userList;
  }
}
module.exports = UserListService;
