const hawtness = angular.module('hawtness', []);

hawtness.controller('configController', ($scope, $http) => {

    $scope.data = [];
    $scope.users = [];
    $scope.query = {per_page: 10};

    $scope.getusers = () => {

        $scope.data = [];
        $scope.users = [];

        $http({
            method: 'GET',
            url: 'https://api.github.com/search/users',
            params: $scope.query
        }).then((res) => {
            $scope.data = res.data;
            angular.forEach($scope.data.items, (value, key) => {

                $http({
                    method: 'GET',
                    url: value.url
                }).then((res) => {
                    $scope.users.push(res);
                }, (res) => {
                    console.log(res);
                });
            });

            console.log($scope.users);
        }, (res) => {
            console.log(res);
        });
    }
});
