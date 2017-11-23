import angular from 'angular';
import '../style.scss';

const HOST = location.origin;

angular.module('app', ['smart-table'])
  .controller('landing', ['$scope', '$http', ($scope, $http) => {
    let launchesAll, launchesConfirmed;
    $http.get(`${HOST}/data`).then(result => {
      launchesAll = result.data.map(launch => {
        const time = launch.timeOfLaunch;
        launch.status = time !== 'TBD' ? true : 'unconfirmed';
        launch.timeOfLaunch = time !== 'TBD' ? new Date(time).toTimeString() : time;
        launch.date = new Date(launch.timeOfLaunchRaw).toDateString();
        return launch;
      })
      launchesConfirmed = launchesAll.filter(launch => launch.status === true);
      $scope.launches = launchesAll;
      $scope.success = true;
    })
    .catch(err => $scope.error = true);
    $scope.$watch('confirmed', (newVal, oldVal) => {
      $scope.launches = newVal ? launchesConfirmed : launchesAll;
    })    
  }
])

