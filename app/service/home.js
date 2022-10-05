'use strict';

const Service = require('egg').Service;

class HomeService extends Service {

  async userProfile(id) {
    const { app } = this;
    const QUERY_STR = id;
    const row = {
      where: { users_id: QUERY_STR }, // WHERE criteria
    };

    try {
      const result = await app.mysql.select('user_profiles', row);
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async updateProfile(f_name, l_name, c_id, p_picture, gen, d_of_birth, a_me, p_lan, r_stat, w_stat, edu, c_pic, is_ver, inf, vac) {
    const { app } = this;
    const row = {
      first_name: f_name,
      last_name: l_name,
      updated_at: app.mysql.literals.now, // `now()` on db server
      countries_id: c_id,
      profile_picture: p_picture, 
      gender: gen,
      dob: d_of_birth,
      about_me: a_me,
      preferred_language: p_lan,
      relationship_status: r_stat,
      work_status: w_stat,
      education: edu,
      cover_picture: c_pic,
      is_verified: is_ver,
      infected: inf,
      vacination: vac
    };

    const options = {
      where: {
        users_id: u_id,
      }
    };

    try {
      const result = await app.mysql.update('user_profiles', row, options);
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async user(u_name) {
    const { app } = this;
    const QUERY_STR = u_name;
    const row = {
      where: { username: QUERY_STR }, // WHERE criteria
    };

    try {
      const result = await app.mysql.select('users', row);
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async addUser(u_name, em, pass) {
    const { app } = this;
    var result;

    const row = {
      _uid: app.uuint.uuid(), // a int uuid
      created_at: app.mysql.literals.now, // `now()` on db server
      updated_at: app.mysql.literals.now, // `now()` on db server
      username: u_name,
      email: em,
      password: pass, // hashed password
    };

    try {
      result = await app.mysql.insert('users', row); // add user
    } catch (error) {
      console.log(error);
      return null;
    }

    const row2 = {
      _uid: app.uuint.uuid(), // a int uuid
      created_at: app.mysql.literals.now, // `now()` on db server
      updated_at: app.mysql.literals.now, // `now()` on db server
      users_id: result.insertId,
      user_roles_id: 2, // 2 for member
    };

    try {
      await app.mysql.insert('user_authorities', row2); // set authority
    } catch (error) {
      console.log(error);
      return null;
    }

    const row3 = {
      users_id: result.insertId,
      created_at: app.mysql.literals.now, // `now()` on db server
      updated_at: app.mysql.literals.now, // `now()` on db server
    };

    try {
      const final = await app.mysql.insert('user_profiles', row3); // initialise user profile
      return final;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
module.exports = HomeService;
