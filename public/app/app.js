const hawtness = angular.module('hawtness', []);

hawtness.controller('configController', ($scope, $http, $sce) => {

    $scope.data = [];
    $scope.users = [];
    $scope.query = {per_page: 10};
    $scope.rick = {roll: false};

    var regex = /^(?!ron)/;

    $scope.getusers = () => {

        $scope.data = [];
        $scope.users = [];

        $scope.query.q = $scope.query.q.toLowerCase();

        if (!regex.test($scope.query.q)) {

            $scope.rick.roll = true;
            $scope.rick.url = $sce.trustAsResourceUrl('https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1');
        } else {

            $scope.rick.roll = false;
            $scope.rick.url = '';

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
    }
});
