(function(){
  
  var module = angular.module("githubViewer");
  
  var FollowerController = function($scope, github, $routeParams) {
    
    var onFollower = function(data){
      $scope.followers = data;
    };
    
    var onError = function(reason) {
      $scope.error = reason;
    };
    
    var username = $routeParams.username;
    
    github.getFollowerDetails(username)
          .then(onFollower, onError);
    
  };
  
  module.controller("FollowerController", FollowerController);
}());