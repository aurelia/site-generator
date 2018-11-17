function dateAdd(date, interval, units) {
  let ret = new Date(date); //don't change original date

  switch (interval.toLowerCase()) {
  case 'year'    :  ret.setFullYear(ret.getFullYear() + units);  break;
  case 'quarter' :  ret.setMonth(ret.getMonth() + 3 * units);  break;
  case 'month'   :  ret.setMonth(ret.getMonth() + units);  break;
  case 'week'    :  ret.setDate(ret.getDate() + 7 * units);  break;
  case 'day'     :  ret.setDate(ret.getDate() + units);  break;
  case 'hour'    :  ret.setTime(ret.getTime() + units * 3600000);  break;
  case 'minute'  :  ret.setTime(ret.getTime() + units * 60000);  break;
  case 'second'  :  ret.setTime(ret.getTime() + units * 1000);  break;
  default        :  ret = undefined;  break;
  }
  return ret;
}

export class Cache {
  farFuture() {
    return dateAdd(new Date(), 'year', 1);
  }

  fromNow(hours = 1, minutes = 0, seconds = 0) {
    return dateAdd(dateAdd(dateAdd(new Date(), 'hour', hours), 'minute', minutes), 'second', seconds);
  }

  getItem(key) {
    let content = null;

    try {
      const stored = localStorage.getItem(key);
      
      if (stored) {
        const data = JSON.parse(stored);

        if (data.expires - Date.now() > 0) {
          content = data.content;
        }
      }

      return content;
    } catch(error) {
      return content;
    }
  }

  setItem(key, content, expires) {
    try {
      let toStore = {
        content: content,
        expires: (expires || this.fromNow(1)).getTime()
      };

      localStorage.setItem(key, JSON.stringify(toStore));

      return content;
    } catch(error) {
      return content;
    }
  }
}
