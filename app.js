(function() {
  // my module needs ngRoute module
var app = angular.module("githubViewer", ["ngRoute"]);
   
   // define routes here 
    app.config(function($routeProvider){
        $routeProvider
            .when("/main", {
                templateUrl: "main.html",
                controller: "MainController"
            })
            .when("/user/:username", {
                templateUrl: "user.html",
                controller: "UserController"
            })
            .when("/repo/:username/:reponame", {
                templateUrl: "repo.html",
                controller: "RepoController"
            })
            .when("/user/:username/followers", {
                templateUrl: "followers.html",
                controller: "FollowerController"
            })
            .otherwise({redirectTo:"/main"});
    });

}());