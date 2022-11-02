'use strict';

module.exports = {
  getDay(day) {
    const today = new Date();
    const targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;
    today.setTime(targetday_milliseconds); // 注意，这行是关键代码

    const tYear = today.getFullYear();
    let tMonth = today.getMonth();
    let tDate = today.getDate();
    tMonth = this.doHandleMonth(tMonth + 1);
    tDate = this.doHandleMonth(tDate);
    return tYear + '-' + tMonth + '-' + tDate;
  },
  doHandleMonth(month) {
    let m = month;
    if (month.toString().length === 1) {
      m = '0' + month;
    }
    return m;
  },
  getCurrentHour() {
    const today = new Date();
    return today.getHours();
  },
  dateFormat(fmt, date) {
    let ret;
    const opt = {
      "y+": date.getFullYear().toString(),
      "M+": (date.getMonth() + 1).toString(),
      "d+": date.getDate().toString()
    };
    for (let k in opt) {
      ret = new RegExp("(" + k + ")").exec(fmt);
      if (ret) {
        fmt = fmt.replace(ret[1], (ret[1].length === 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
      }
    }
    return fmt;
  }
};
