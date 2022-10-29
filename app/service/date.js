'use strict';

const Service = require('egg').Service;

class DateService extends Service {

  async newDate(dateObject) {
    const { app } = this;

    try {

      const result = await app.mysql.insert('date', { ...dateObject, updated_at: app.mysql.literals.now, created_at: app.mysql.literals.now });
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async likeUser(from_id, to_id) {
    const { app } = this;
    try {
      const { changedRows } = await app.mysql.update('my_like', { like_status: 1 }, { where: { from_id, to_id } });
      return changedRows == 1 ? 1 : -1;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async dislikeUser(from_id, to_id) {
    const { app } = this;

    try {
      const { changedRows } = await app.mysql.update('my_like', { like_status: 2 }, { where: { from_id, to_id } });
      return changedRows == 1 ? 2 : -1;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async normalUser(from_id, to_id) {
    const { app } = this;
    console.log(from_id, to_id);
    try {
      const { changedRows } = await app.mysql.update('my_like', { like_status: 0 }, { where: { from_id, to_id } });

      return changedRows == 1 ? 0 : -1;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
module.exports = DateService;
