import angular from 'angular';
import '../style.scss';

const HOST = location.origin;

angular.module('app', ['smart-table'])
  .controller('landing', ['$scope', '$http', ($scope, $http) => {
    $http.get(`${HOST}/data`).then(result => {
      console.log(result.data);
      $scope.launches = result.data.map(launch => {
        const time = launch.timeOfLaunch;
        launch.timeOfLaunch = time !== 'TBD' ? new Date(time).toTimeString() : time;
        launch.date = new Date(launch.timeOfLaunchRaw).toDateString();
        return launch;
      })
    })
          
  }
])

