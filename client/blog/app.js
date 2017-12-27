(function () {
    'use strict';
    angular
        .module('app', ['ui.router', 'ngMessages'])
        .config(config)
        .run(run);

    function config($locationProvider, $stateProvider, $urlRouterProvider, $httpProvider) {
        // set variable to control behaviour on initial app load
        window.initialLoad = true;

        // default route
        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state('home', {
                url: '/?:page',
                templateUrl: function (stateParams) {
                    return window.initialLoad ? null :
                        '/?xhr=1' + (stateParams.page ? '&page=' + stateParams.page : '');
                }
            }) 
            .state('post-details', {
                url: '/post/:year/:month/:day/:slug',
                templateUrl: function (stateParams) {
                    return window.initialLoad ? null :
                        '/post/' + stateParams.year + '/' + stateParams.month + '/' + stateParams.day + '/' + stateParams.slug + '?xhr=1';
                }
            })
            .state('posts-for-tag', {
                url: '/posts/tag/:tag',
                templateUrl: function (stateParams) {
                    return window.initialLoad ? null :
                        '/posts/tag/' + stateParams.tag + '?xhr=1';
                }
            })
            .state('posts-for-month', {
                url: '/posts/:year/:month',
                templateUrl: function (stateParams) {
                    return window.initialLoad ? null :
                        '/posts/' + stateParams.year + '/' + stateParams.month + '?xhr=1';
                }
            })
            .state('page-details', {
                url: '/page/:slug',
                templateUrl: function (stateParams) {
                    return window.initialLoad ? null :
                        '/page/' + stateParams.slug + '?xhr=1';
                }
            })          			          
        // mark all requests from angular as ajax requests
        $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    }

    function run($rootScope, $timeout, $location, $window) {

        $rootScope.$on('$stateChangeSuccess', function () {
            
            $rootScope.showNav = false;
            // jump to top of page if not initial page load
            if (!window.initialLoad) {
                document.body.scrollTop = document.documentElement.scrollTop = 0;
            }

            window.initialLoad = false;
        });
    }

})();