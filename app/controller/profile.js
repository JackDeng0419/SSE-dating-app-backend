'use strict';

const Controller = require('egg').Controller;


class ProfileController extends Controller {

  async userProfile() {
    const { ctx } = this;
    const { id } = ctx.query;

    // all good to start
    try {
      const result = await ctx.service.profile.userProfile(id);
      ctx.status = 200;
      ctx.body = {
        code: 200,
        message: 'retrieve user profile successed',
        data: result,
      };
    } catch (error) {
      ctx.body = {
        code: 500,
        message: 'retrieve user profile failed: ' + error.message,
        data: null,
      };
      ctx.status = 500;
    }
  }

  async userLooks() {
    const { ctx } = this;
    const { id } = ctx.query;

    // all good to start
    try {
      const result = await ctx.service.profile.userProfile(id);
      ctx.status = 200;
      ctx.body = {
        code: 200,
        message: 'retrieve user profile successed',
        data: result,
      };
    } catch (error) {
      ctx.body = {
        code: 500,
        message: 'retrieve user profile failed: ' + error.message,
        data: null,
      };
      ctx.status = 500;
    }
  }

  async userHobbies() {
    const { ctx } = this;
    const { id } = ctx.query;

    // all good to start
    try {
      const result = await ctx.service.profile.userHobbies(id);
      Object.keys(result).forEach(key => {
        if (result[key] == 0) {
          result[key] = false;
        } else if (result[key] == 1) {
          result[key] = true;
        }
      });
      ctx.status = 200;
      ctx.body = {
        code: 200,
        message: 'retrieve user hobbies succeeded',
        data: result,
      };
    } catch (error) {
      ctx.body = {
        code: 500,
        message: 'retrieve user hobbies failed: ' + error.message,
        data: null,
      };
      ctx.status = 500;
    }
  }

  async userCovid() {
    const { ctx } = this;
    const { id } = ctx.query;

    // all good to start
    try {
      const result = await ctx.service.profile.userCovid(id);
      // Object.keys(result).forEach(key => {
      //   if (result[key] == 0) {
      //     result[key] = false;
      //   } else if (result[key] == 1) {
      //     result[key] = true;
      //   }
      // });
      ctx.status = 200;
      ctx.body = {
        code: 200,
        message: 'retrieve user covid info succeeded',
        data: result,
      };
    } catch (error) {
      ctx.body = {
        code: 500,
        message: 'retrieve user covid info failed: ' + error.message,
        data: null,
      };
      ctx.status = 500;
    }
  }

  async updateProfileBasicInfo() {
    const { ctx } = this;
    const _basic_info = ctx.request.body;
    const basic_info = {
      first_name: _basic_info.first_name,
      last_name: _basic_info.last_name,
      age: _basic_info.age,
      gender: _basic_info.gender,
      preferred_language: _basic_info.preferred_language,
      nationality: _basic_info.nationality,
      birthday: _basic_info.birthday,
      location: _basic_info.location,
      latitude: _basic_info.latitude,
      longitude: _basic_info.longitude,
    };
    const id = ctx.session.user_info._uid;

    try {
      const result = await ctx.service.profile.updateProfileBasicInfoOfId(id, basic_info);
      ctx.body = {
        code: 200,
        message: 'profile updated',
        data: result,
      };
      ctx.status = 200;
    } catch (error) {
      ctx.body = {
        msg: 'profile update failed: ' + error.message,
        data: null,
      };
      ctx.status = 500;
    }
  }

  async updateLooks() {
    const { ctx } = this;
    const _looks = ctx.request.body;
    const id = ctx.session.user_info._uid;
    const looks = {
      ethnicity: _looks.ethnicity,
      body_type: _looks.body_type,
      height: _looks.height,
      weight: _looks.weight,
      hair_color: _looks.hair_color,
      eye_color: _looks.eye_color,
    };

    try {
      const result = await ctx.service.profile.updateLooksOfId(id, looks);
      ctx.body = {
        code: 200,
        message: 'profile updated',
        data: result,
      };
      ctx.status = 200;
    } catch (error) {
      ctx.body = {
        msg: 'profile update failed: ' + error.message,
        data: null,
      };
      ctx.status = 500;
    }
  }

  async updateHobbies() {
    const { ctx } = this;
    const _hobbies = ctx.request.body;
    const id = ctx.session.user_info._uid;
    const hobbies = {
      sport: _hobbies.sport,
      movie: _hobbies.movie,
      reading: _hobbies.reading,
      dancing: _hobbies.dancing,
      music: _hobbies.music,
    };

    try {
      const result = await ctx.service.profile.updateHobbiesOfId(id, hobbies);
      ctx.body = {
        code: 200,
        message: 'profile updated',
        data: result,
      };
      ctx.status = 200;
    } catch (error) {
      ctx.body = {
        msg: 'profile update failed: ' + error.message,
        data: null,
      };
      ctx.status = 500;
    }
  }

  async updateCovid() {
    const { ctx } = this;
    const _covid = ctx.request.body;
    const id = ctx.session.user_info._uid;
    const covid = {
      vaccinated: _covid.vaccinated,
      covid_status: _covid.covid_status,
    };

    try {
      const result = await ctx.service.profile.updateCovidOfId(id, covid);
      ctx.body = {
        code: 200,
        message: 'profile updated',
        data: result,
      };
      ctx.status = 200;
    } catch (error) {
      ctx.body = {
        msg: 'profile update failed: ' + error.message,
        data: null,
      };
      ctx.status = 500;
    }
  }
}

module.exports = ProfileController;
