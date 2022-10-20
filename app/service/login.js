'use strict';

const Service = require('egg').Service;

class LoginService extends Service {
  async usernamePasswordCheck(username, password) {
    // const { app } = this;
    // const QUERY_STR = 'id, name';
    // const sql = `select ${QUERY_STR} from test_user`; // the SQL of getting user list
    // try {
    //   const result = await app.mysql.query(sql); // mysql has been loaded to the app object and can be obtained by app.mysql
    //   return result;
    // } catch (error) {
    //   console.log(error);
    //   return null;
    // }
    console.log(username);
    console.log(password);
    // TODO: return a user object to the frontend
    return { data: '1234567' };
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

  async signup(signup_form) {
    const { app } = this;
    const transaction = await app.mysql.beginTransaction();
    try {

      // insert new user row
      const _uid = app.uuint.uuid();
      const new_user_obj = {
        _uid,
        username: signup_form.username,
        password: signup_form.password,
        created_at: app.mysql.literals.now,
        updated_at: app.mysql.literals.now,
      };
      await transaction.insert('user', new_user_obj);

      // insert new user profile row

      const new_user_profile_obj = {
        users_id: _uid,
        first_name: signup_form.first_name,
        last_name: signup_form.last_name,
        age: signup_form.age,
        gender: signup_form.gender,
        created_at: app.mysql.literals.now,
        updated_at: app.mysql.literals.now,
      };

      await transaction.insert('user_profile', new_user_profile_obj);

      await transaction.commit();
      return true;
    } catch (error) {
      console.log('signup error');
      console.log(error);
      return null;
    }
  }
}
module.exports = LoginService;
