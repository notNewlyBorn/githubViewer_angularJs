// github service manages URL, response processing etc-
// it also make it easy to add new features. Additional features will be available everywhere
(function(){
    // github service requires http service
    var github = function($http){
      
      // this kind of function call delivers a promise encapsulating the data inside it
      var getUser = function(username){
            return $http.get("https://api.github.com/users/" + username)
                        .then(function(response){
                           return response.data; 
                        });
      };
      
      var getRepos = function(user){
            return $http.get(user.repos_url)  
                        .then(function(response){
                            return response.data;
                        });
      };
      
      var getRepoDetails = function(username, reponame){
            // varriable that contains repo details + collaborators
            var repo;
          var repoUrl = "https://api.github.com/repos/" + username + "/" + reponame;
          
          return $http.get(repoUrl)
                      .then(function(response){
                          repo = response.data;
                          return $http.get(repoUrl + "/collaborators");
                      })
                      .then(function(response){
                          repo.collaborators = response.data;
                          return repo;
                      });
      };
      
      var getFollowerDetails = function(username) {
        var followers;
          var followerUrl = "https://api.github.com/users/" + username + "/followers";
          
          return $http.get(followerUrl)
                      .then(function(response){
                          followers = response.data;
                          return followers;
                      });
      };
      
      // public API calls. Any controller or anything inside the app ask for 'github', will getback
      // this obj
      return {
          getUser: getUser,
          getRepos: getRepos,
          getRepoDetails: getRepoDetails
      };
        
    };
    // dear angular, plz gimme a reference to githubViewer so that i can register service0
    var module = angular.module("githubViewer");
    // register service
    module.factory("github", github);
    
}());