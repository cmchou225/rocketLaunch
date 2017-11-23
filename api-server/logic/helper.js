function Launch (rocket, launchId, timeOfLaunch, timeOfLaunchRaw, agencies, location, wiki) {
  this.rocket = rocket;
  this.launchId = launchId;
  this.timeOfLaunch = timeOfLaunch;
  this.timeOfLaunchRaw = timeOfLaunchRaw;
  this.agencies = agencies;
  this.location = location;
}
function WithWiki(name, wiki) {
  this.name = name;
  this.wiki = wiki;
}

module.exports = {
  sameDay: (now, lastUpdate) => now.getFullYear === lastUpdate.getFullYear &&
    now.getMonth === lastUpdate.getMonth &&
    now.getDate === lastUpdate.getDate,

  parseApi: (launches) => launches.map(launch => {
    const timeOfLaunch = launch.tbdtime === 1 ? 'TBD' : new Date(launch.windowstart);
    const timeOfLaunchRaw = launch.windowstart;
    const location = launch.location.pads[0];
    const rocket = new WithWiki(launch.name, launch.rocket.wikiURL ? launch.rocket.wikiURL : 'N/A');
    const rocketAgencies = launch.rocket.agencies.map(agent => new WithWiki(agent.name, agent.wikiURL));
    return new Launch(rocket,launch.id,timeOfLaunch, timeOfLaunchRaw, rocketAgencies, location);
  })
}
