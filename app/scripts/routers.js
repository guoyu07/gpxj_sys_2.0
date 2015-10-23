/**
 * Created by haoxu on 2015/10/22.
 */
var gpxjRouters = angular.module('gpxjRouters', ['ui.router']);
gpxjRouters.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/index');
    $stateProvider
        .state('index', {
            url: '/index',
            views: {
                '': {
                    templateUrl: 'views/tpls/tplindex.html'
                },
                'topbar@index': {
                    templateUrl: 'views/tpls/topbar.html'
                },
                'main@index': {
                    templateUrl: 'views/tpls/home.html'
                }
            }
        })
        .state('index.usermng', {
            url: '/usermng',
            views: {
                'main@index': {
                    templateUrl: 'views/users/usermng.html',
                    controller: function($scope, $state) {
                        $scope.addUserType = function() {
                            $state.go("index.usermng.addusertype");
                        }
                    }
                }
            }
        })
        .state('index.usermng.highendusers', {
            url: '/highendusers',
            templateUrl: 'views/users/highendusers.html'
        })
        .state('index.usermng.normalusers', {
            url: '/normalusers',
            templateUrl: 'views/users/normalusers.html'
        })
        .state('index.usermng.lowusers', {
            url: '/lowusers',
            templateUrl: 'views/users/lowusers.html'
        })
        .state('index.usermng.addusertype', {
            url: '/addusertype',
            templateUrl: 'views/users/addusertypeform.html'
        })
        .state('index.udp-view', {
            url: '/udp-view',
            views: {
                'main@index': {
                    templateUrl: 'views/udp-view/main.html'
                }
            }
        })
        .state('index.report', {
            url: '/report',
            views: {
                'main@index': {
                    template: 'report'
                }
            }
        })
        .state('index.settings', {
            url: '/settings',
            views: {
                'main@index': {
                    template: 'settings'
                }
            }
        })
});
