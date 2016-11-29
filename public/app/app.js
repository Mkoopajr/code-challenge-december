const hawtness = angular.module('hawtness', []);

hawtness.controller('configController', ($scope, $http) => {

    $scope.data = [];
    $scope.query = {per_page: 10};

    $scope.getusers = () => {

        $http({
            method: 'GET',
            url: 'https://api.github.com/search/users',
            params: $scope.query
        }).then((res) => {
            $scope.data = res.data;
            console.log($scope.data);
        }, (res) => {
            console.log(res);
        });
    }
});
