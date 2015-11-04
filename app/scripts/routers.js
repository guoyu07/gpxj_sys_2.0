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
        .state('index.blankmng', {
            url: '/blankmng',
            views: {
                'main@index': {
                    templateUrl: 'views/blank/blankmng.html',
                }
            }
        })
        .state('index.blankmng.blank', {
            url: '/blank',
            templateUrl: 'views/blank/blank.html'
        })
        .state('index.blankmng.addBlank', {
            url: '/addBlank',
            templateUrl: 'views/blank/addBlank.html'
        })
        .state('index.blankmng.stock', {
            url: '/stock',
            templateUrl: 'views/blank/stock.html'
        })
        .state('index.udp-view', {
            url: '/udp-view',
            views: {
                'main@index': {
                    templateUrl: 'views/udp-view/main.html'
                }
            }
        })
        .state('index.stock', {
            url: '/stock',
            views: {
                'main@index': {
                    templateUrl: 'views/stock/index.html'
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
