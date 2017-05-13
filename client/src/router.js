var angular = require('angular');

var uiRouter = require('angular-ui-router');

var app = angular.module('app', [uiRouter]);

var slider = require('./slider.js');

app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');
    $stateProvider
        .state('home', {
            url: "/home",
            templateUrl: "home.html"
        })
        .state('electrocars', {
            url: "/electrocars",
            templateUrl: "electrocars.html"
        })
        .state('car', {
            url: "/car/:id",
            templateUrl: "car.html"
        })
        .state('bin', {
            url: "/bin",
            templateUrl: "bin.html"
        })
        .state('search', {
            url: "/search",
            templateUrl: "search.html"
        })
});

app.directive('carusel',function () {
    var index = 0;
    slider;
});

app.service('car', function () {
    var arr = new Array;
    return{
        addCars : function (obj) {
            obj.forEach(function (item) {
                arr.push(item)
            });
        },
        getCars : function () {
            return arr
        }
    }
});

app.controller('elcars',function ($scope, $http, car) {
    $scope.drow = function(page, arr) {
        $scope.part = new Array;
        arr.forEach(function (item,index) {
            if (page == 0 && index >= 0 && index < 3){
                $scope.part.push(item)
            }
            if (page == 1 && index >= 3 && index < 6){
                $scope.part.push(item)
            }
            if (page == 2 && index >= 6 && index < 9){
                $scope.part.push(item)
            }
        });
    };
    $scope.countPlus = function() {
        $scope.page ++;
        if ($scope.page == 3) $scope.page = 0;
        $scope.drow($scope.page, car.getCars());
    };

    $scope.countMinus = function() {
        $scope.page --;
        if ($scope.page == -1) $scope.page = 2;
        $scope.drow($scope.page, car.getCars());
    };

    $http({
        method:"GET",
        url : "/api/cars"
    }).then(function (response) {

        $scope.page = 0;

        var cars = response.data;

        $scope.drow($scope.page, cars);

        car.addCars(response.data);
    });
});

app.controller('car',function ($scope, $location, $stateParams, $http) {
    $http({
        method:"GET",
        url : "/api/cars"
    }).then(function (response) {
        response.data.forEach(function (item) {
            if (item.id == $stateParams.id){
                $scope.item = item;
                $scope.addCar = function(){
                    localStorage.setItem(item.id,JSON.stringify(item))
                }
            }
        })
    });
});

app.controller('bin',function ($scope) {
    $scope.selectedCars = new Array;
    for (var i = 1; i < 10; i++){
        if (localStorage.getItem(i)){
            $scope.selectedCars.push(JSON.parse(localStorage.getItem(i)));
        }
    }
    $scope.clearBin = function () {
        localStorage.clear();
        $scope.selectedCars = 0;
        $scope.message = 'Ваша корзина пуста!';
    };
    if ($scope.selectedCars.length == 0){
        $scope.message = 'Ваша корзина пуста!';
    }
});

app.controller('search',function ($scope, $http) {
    var searchName = $scope.carName;
    $http({
        method:"GET",
        url : "/api/cars"
    }).then(function (response) {
        var carName = searchName.toLowerCase();
        response.data.some(function (item) {
            if (item.name.toLowerCase().search(carName) !== -1){
                $scope.topic = 'По Вашему запросу найдены следующие автомобили';
                $scope.selectedCars = new Array;
                response.data.forEach(function (item) {
                    if (item.name.toLowerCase().search(carName) !== -1){
                        $scope.selectedCars.push(item)
                    }
                })
            }else{
                $scope.warn = 'К сожалению, по Вашему запросу ничего не найдено';
            }
        });
    });
});
module.exports = app.config;