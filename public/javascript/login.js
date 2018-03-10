var app = angular.module("login", []);
app.config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('{[{');
  $interpolateProvider.endSymbol('}]}');
});

app.controller("loginController", ['$scope','$http','$window', function($scope,$http,$window)  {

$scope.data={
	'email':'',
	'password':''
};	
$scope.token={
  token:''
}
$scope.budgetData=''

$scope.business={
  'location':'',
  'date':'',
  'targerBudget':'',
  'airfareCost':'',
  'hostelCost':'',
  'miscellaneous':'',
  'totalCost':'',
  'underBudget':''
}

$scope.submit=function()
{


	$http({
    url: '/users/login',
    method: "POST",
    data: $scope.data,
    headers: {
        'Content-Type': 'application/json'
    }
}).then(function(resp){

  if(resp.data.status==0){
    alert("user name or password is wrong")
  }
  else{
    $window.localStorage.setItem('token',resp.data.data.token)
    $window.location.href='/';
  }

});


}


$scope.getloginStatus=function(){
  $scope.token={
    token:$window.localStorage.getItem('token')
  }
}

$scope.logout=function(){
var token=$window.localStorage.getItem('token')
 $window.localStorage.setItem('token','')
    $http({
    url: '/users/logout',
    method: "POST",
    data: $scope.business,
    headers: {
      'Content-Type': 'application/json',
      'x-auth':token
    }
}).then(function(resp){
  if(resp.data.status==1){
    $window.location.href='/users/login';  }
  else{
    $window.location.href='/users/login';
  }

});
  
}


$scope.saveBusinessBudget=function(){
  var token=$window.localStorage.getItem('token')
  $http({
    url: '/users/savebudget',
    method: "POST",
    data: $scope.business,
    headers: {
      'Content-Type': 'application/json',
      'x-auth':token
    }
}).then(function(resp){

  if(resp.data.status==1){
    alert('new budget added')
  }
  else if(resp.data.status==2){
    alert('register to create budget')
  }
  else{
    alert('something went wrong')
  }

});

}
$scope.getBudget=function(){
  
    $window.location.href='/users/budget'
}
$scope.viewBudget=function(){
  var token=$window.localStorage.getItem('token')
  $http({
    url: '/users/getbudget',
    method: "POST",
    data: $scope.business,
    headers: {
      'Content-Type': 'application/json',
      'x-auth':token
    }
}).then(function(resp){

  if(resp.data.status==1){

    $scope.budgetData=resp.data.data
  }
  else if(resp.data.status==2){
    alert('register create and view')
  }
  else{
    alert('something went wrong')
  }

});
}


}])