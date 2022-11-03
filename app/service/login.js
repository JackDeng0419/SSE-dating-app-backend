'use strict';

const Service = require('egg').Service;

class LoginService extends Service {
  async usernamePasswordCheck(username) {
    const { app } = this;
    try {
      console.log(username);
      return await app.mysql.get('user', { username });
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

  async check_username(username) {
    const { app } = this;
    try {
      const result = await app.mysql.get('user', { username });
      return result === null;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async check_email(email) {
    const { app } = this;
    try {
      const result = await app.mysql.get('user', { email });
      return result === null;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async signup(signup_form) {
    const { app } = this;
    const transaction = await app.mysql.beginTransaction();
    try {

      // insert new user row
      let _uid = 0;
      while (true) {
        _uid = app.uuint.uuid();
        const result = await app.mysql.get('user', { _uid });
        if (!result) break;
      }
      const new_user_obj = {
        _uid,
        username: signup_form.username,
        password: signup_form.password,
        email: signup_form.email,
        created_at: app.mysql.literals.now,
        updated_at: app.mysql.literals.now,
      };
      await transaction.insert('user', new_user_obj);

      // insert new user profile row

      const new_user_profile_obj = {
        user_id: _uid,
        first_name: signup_form.first_name,
        last_name: signup_form.last_name,
        age: signup_form.age,
        gender: signup_form.gender,
      };

      await transaction.insert('user_profile', new_user_profile_obj);

      const new_user_hobby_obj = {
        user_id: _uid,
      };

      await transaction.insert('user_hobby', new_user_hobby_obj);
      await transaction.commit();

      return new_user_obj.username;
    } catch (error) {
      console.log('errrrrrrrrrrrrr', error);
      return null;
    }
  }
}
module.exports = LoginService;
