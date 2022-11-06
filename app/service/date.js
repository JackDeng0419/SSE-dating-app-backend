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

  async getDateFromId(from_id) {
    const { app } = this;
    try {

      const result = await app.mysql.select('date', { from_id });
      for (const date of result) {
        const res = await app.mysql.select('user', { columns: [ 'username' ], where: { _uid: date.to_id } });
        const res2 = await app.mysql.select('user_profile', { columns: [ 'covid_status' ], where: { user_id: date.to_id } });
        date.to_username = res[0].username;
        date.to_user_covid_status = res2[0].covid_status;
      }
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async getDateToId(to_id) {
    const { app } = this;
    try {

      const result = await app.mysql.select('date', { where: { to_id } });
      for (const date of result) {
        const res = await app.mysql.select('user', { columns: [ 'username' ], where: { _uid: date.to_id } });
        const res2 = await app.mysql.select('user_profile', { columns: [ 'covid_status' ], where: { user_id: date.to_id } });
        date.to_username = res[0].username;
        date.to_user_covid_status = res2[0].covid_status;

      }
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async cancelDate(_uid) {
    const { app } = this;
    console.log(_uid);

    try {

      const result = await app.mysql.update('date', { state: 3 }, { where: { _uid } });
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async acceptDate(_uid) {
    const { app } = this;
    console.log(_uid);

    try {

      const result = await app.mysql.update('date', { state: 1 }, { where: { _uid } });
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async rejectDate(_uid) {
    const { app } = this;
    console.log(_uid);

    try {

      const result = await app.mysql.update('date', { state: 2 }, { where: { _uid } });
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }


}
module.exports = DateService;
