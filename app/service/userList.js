'use strict';

const Service = require('egg').Service;
const LIKE_STATUS = require('../constant');

class UserListService extends Service {

  async getUserListInSearchMate() {
    const { app, ctx } = this;
    const requestUserID = ctx.session.user_info._uid;
    try {

      const userList = await app.mysql.query(`SELECT *, _uid as userId FROM user LEFT JOIN user_profile on _uid=user_id WHERE NOT _uid=${requestUserID} `);

      return userList;
    } catch (error) {
      console.log('signup error');
      console.log(error);
      return null;
    }
  }

  async getUserListInSearchMateWithFilter(filter) {
    const { app, ctx } = this;
    const requestUserID = ctx.session.user_info._uid;
    try {

      let userList = await app.mysql.query(`
      SELECT *, _uid as userId FROM user 
      LEFT JOIN user_profile up on _uid=up.user_id 
      LEFT JOIN user_hobby uh on _uid=uh.user_id
      WHERE NOT _uid=${requestUserID} `);

      if (userList.length != 0) {
        const filtered = this.filterUserList(userList, filter);


        userList = filtered;
        console.log(userList);

        return userList;

      }
      return null;


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
      const myLikesUsersID = await (await app.mysql.select('my_like', { where: { from_id: requestUserID, like_status: 1 } })).map(element => { return element.to_id; });
      const myLikesUsers = await this.getUserListByIDArray(myLikesUsersID);

      return myLikesUsers;
    } catch (error) {
      console.log('get my likes error');
      console.log(error);
      return null;
    }
  }

  async getMyDislikesUsers() {
    const { app, ctx } = this;
    const requestUserID = ctx.session.user_info._uid;
    try {
      const myDislikesUsersID = await (await app.mysql.select('my_like', { where: { from_id: requestUserID, like_status: 2 } })).map(element => { return element.to_id; });
      const myDislikesUsers = await this.getUserListByIDArray(myDislikesUsersID);

      return myDislikesUsers;
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
      const myLikesUsersID = await (await app.mysql.select('my_like', { where: { to_id: requestUserID, like_status: 1 } })).map(element => {
        return element.from_id;
      });
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
        first_name: element.first_name,
        last_name: element.last_name,
        gender: element.gender,
        age: element.age,
        userId: element.user_id,
        location: element.city }));

    return userList;
  }

  filterUserList(userList, filter) {
    const filtered = [];
    for (let i = 0; i < userList.length; i++) {
      userList[i].password = null;
      if (filter.city !== '' && userList[i].city != filter.city) {
        // userList.splice(i, 1);
        continue;
      }
      if (filter.gender != 3 && userList[i].gender != filter.gender) {
        // userList.splice(i, 1);
        continue;
      }
      if (userList[i].age < filter.ageMin || userList[i].age > filter.ageMax) {
        // userList.splice(i, 1);
        continue;
      }
      if (userList[i].covid_status != filter.covid_status || userList[i].vaccinated != filter.vaccinated) {
        // userList.splice(i, 1);
        continue;
      }
      if (filter.sport && !userList[i].sport) {
        // userList.splice(i, 1);
        continue;
      }
      if (filter.movie && !userList[i].movie) {
        // userList.splice(i, 1);
        continue;
      }
      if (filter.reading && !userList[i].reading) {
        // userList.splice(i, 1);
        continue;
      }
      if (filter.dancing && !userList[i].dancing) {
        // userList.splice(i, 1);
        continue;
      }
      if (filter.music && !userList[i].music) {
        // userList.splice(i, 1);
        continue;
      }
      filtered.push(userList[i]);
      return filtered;
    }
  }
}
module.exports = UserListService;
