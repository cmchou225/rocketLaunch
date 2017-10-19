const axios = require('axios');
const baseUrl = require('./baseURLs');
const helper = require('./helper');

let apiData = [];

const apiLogic = (date) => {
  const now = new Date(Date.now());
  const lastUpdate = date.lastUpdate ? new Date(date.lastUpdate) : date.lastUpdate;
  const sameDay = lastUpdate ? helper.sameDay(now, lastUpdate) : false;
  const fields = ['name', 'location', 'rocket', 'net', 'tbdtime', 'tbddate']
  const lowerDateRange = new Date(now).toISOString().replace(/\//g, '-').slice(0,10);
  const upperDateRange = new Date(now.setMonth(now.getMonth() + 3)).toISOString().replace(/\//g, '-').slice(0,10);
  const dateRangeParams = `startdate=${lowerDateRange}&enddate=${upperDateRange}&limit=300&fields=${fields.join(',')}`;
  
  if(sameDay){
    return new Promise((resolve, reject) => resolve(apiData));
  } else { 
    const getApiData = async () => {
      const launches = await axios.get(baseUrl.launch + dateRangeParams).then(result => result.data.launches) ;
      const launchIdsMerge = 'launchid=' + launches.map(launch => launch.id).join('&launchid=');
      const missionsSelected = await axios.get(baseUrl.mission + launchIdsMerge + '&mode=verbose&limit=300').then(result => result.data.missions); //fields selector param doesn't work in api
      const rocketIdsMerge = 'id=' + launches.map(launch => launch.rocketid).join('&id=');
      const rockets = await axios.get(baseUrl.rocket + rocketIdsMerge + '&mode=verbose&limit=300').then(result => result.data.rockets); //fields selector param doesn't work in api      
      const agencies = await axios.get(baseUrl.agencies + "limit=300").then(result => result.data.agencies);
      const locationIdsMerge = 'id=' + launches.map(launch => launch.locationid).join('&id=');
      const locations = await axios.get(baseUrl.pad + locationIdsMerge + '&limit=300').then(result => result.data.pads);
      try {
        const parsedApiData = helper.parseApi(launches, locations, missionsSelected, rockets, agencies);
        return parsedApiData;
      } catch (err) {
        console.log(err);
      }
    }
    return getApiData().then(launches => {
      apiData = launches
      return apiData;
    })
    .catch(err => {
      console.log(err);
    })
  }
};

module.exports = { apiLogic };
