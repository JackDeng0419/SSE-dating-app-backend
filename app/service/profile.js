'use strict';

const Service = require('egg').Service;

class ProfileService extends Service {


  async userProfile(id) {
    const { app } = this;

    try {
      const result = await app.mysql.get('user_profile', { user_id: id });
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async userHobbies(id) {
    const { app } = this;

    try {
      const result = await app.mysql.get('user_hobby', { user_id: id });
      if (result == []) {
        let _result = await app.mysql.insert('user_hobby', { user_id: id });
        _result = await app.mysql.get('user_hobby', { user_id: id });
        return _result;
      }
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async updateProfileBasicInfoOfId(id, basic_info) {
    const { app } = this;
    const result = await app.mysql.update('user_profile', basic_info, { where: { user_id: id } });
    return result;
  }

  async updateLooksOfId(id, looks) {
    const { app } = this;
    const result = await app.mysql.update('user_profile', looks, { where: { user_id: id } });
    return result;
  }

  async updateHobbiesOfId(id, hobbies) {
    const { app } = this;
    const result = await app.mysql.update('user_hobby', hobbies, { where: { user_id: id } });
    if (result.affectedRows == 0) {
      // row not exist, insert a new row
      const _result = await app.mysql.insert('user_hobby', { ...hobbies, user_id: id });
      return _result;
    }
    return result;
  }
}
module.exports = ProfileService;
