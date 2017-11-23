const axios = require('axios');
const helper = require('./helper');

const baseUrl = "https://launchlibrary.net/1.3/launch/";
let apiData = [];

const apiLogic = (date) => {
  const now = new Date(Date.now());
  const lastUpdate = date.lastUpdate ? new Date(date.lastUpdate) : date.lastUpdate;
  const sameDay = lastUpdate ? helper.sameDay(now, lastUpdate) : false;
  const lowerDateRange = new Date(now).toISOString().replace(/\//g, '-').slice(0,10);
  const upperDateRange = new Date(now.setMonth(now.getMonth() + 3)).toISOString().replace(/\//g, '-').slice(0,10);
  const dateRangeParams = `${lowerDateRange}/${upperDateRange}`;
  
  if(sameDay){
    return new Promise((resolve, reject) => resolve(apiData));
  } else { 
    const getApiData = async () => {
      const launches = await axios.get(baseUrl+ dateRangeParams + '/?limit=300').then(result => result.data.launches);
      try {
      const parsedApiData = helper.parseApi(launches);
        apiData = parsedApiData;
        return apiData;
      } catch (err) {
        return err;
      }
    }
    return getApiData();
  }
};

module.exports = { apiLogic };
