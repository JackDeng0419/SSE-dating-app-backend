'use strict';

const Service = require('egg').Service;

class HomeService extends Service {
  async user() {
    const { app } = this;
    const QUERY_STR = 'id, name';
    const sql = `select ${QUERY_STR} from test_user`; // the SQL of getting user list
    try {
      const result = await app.mysql.query(sql); // mysql has been loaded to the app object and can be obtained by app.mysql
      return result;
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
module.exports = HomeService;
