function Launch (rocket, launchId, timeOfLaunch, timeOfLaunchRaw, agencies, location, wiki) {
  this.rocket = rocket;
  this.launchId = launchId;
  this.timeOfLaunch = timeOfLaunch;
  this.timeOfLaunchRaw = timeOfLaunchRaw;
  this.agencies = agencies;
  this.location = location;
  this.wiki = wiki
}
function WithWiki(name, wiki) {
  this.name = name;
  this.wiki = wiki;
}

module.exports = {
  wikiExt: (str) => str.replace(/\s/g, '_'),
  
  locationName: (str) => str.replace(/,\s/, ';'),

  sameDay: (now, lastUpdate) => now.getFullYear === lastUpdate.getFullYear &&
    now.getMonth === lastUpdate.getMonth &&
    now.getDate === lastUpdate.getDate,

  parseApi: (launches, locations, missionsSelected, rockets) => launches.map(launch => {
    const timeOfLaunch = launch.tbdtime === 1 ? 'TBD' : new Date(launch.net);
    const timeOfLaunchRaw = launch.net;
    const location = locations.find(lc => launch.locationid === lc.id).name;
    const mission = missionsSelected.find(ms => ms.launch.id === launch.id);
    const wikiURL = mission && mission.wikiURL ? mission.wikiURL : 'N/A'
    const agencies = mission && mission.agencies ? mission.agencies.map(agency => new WithWiki(agency.name, agency.wikiURL)) : 'N/A';
    const rocketRaw = rockets.find(rk => rk.id === launch.rocketid);
    const rocket = new WithWiki(launch.name, rocketRaw.wikiURL ? rocketRaw.wikiURL : 'N/A');
    return new Launch(rocket,launch.id,timeOfLaunch, timeOfLaunchRaw, agencies, location, wikiURL);
  })
}
