angular.module('starter.controller', [])





.controller('EditCtrl', function($scope,$stateParams,$cordovaSQLite,$ionicPlatform,$state) {
  $ionicPlatform.ready(function() {
  document.getElementById('hfCheck').value="CHECK";
  val1=document.getElementById('hfNoteValue').value;

  if(val1!=null)
  {
   vartemp=document.getElementById('hfTemp').value;

   if(vartemp=="SET")
   {
 db = $cordovaSQLite.openDB({name:"Test.db", location:'default'});

          var query=  "SELECT * FROM Note WHERE id= ?"
                 $cordovaSQLite.execute(db, query, [val1])

               .then(
                   function(result) {


              $scope.edit = result.rows.item(0).message;

       /* document.getElementById('hfTemp').value="SET";*/
                   },
                   function(error) {
                   }
               );
               }
}
});
   $scope.Confirm= function(edit){
    ///  $scope.count++;

     vartemp=document.getElementById('hfTemp').value;

 if(vartemp!="SET")
 {



 db = $cordovaSQLite.openDB({name:"Test.db", location:'default'});
$cordovaSQLite.execute(db, 'INSERT INTO Note (message) VALUES (?)', [edit])
        .then(function(result) {
         //   $scope.statusMessage = "Message saved successful, cheers!";
               $state.go('second',{});
        }, function(error) {
         //   $scope.statusMessage = "Error on saving: " + error.message;
        })
}
if(vartemp=="SET")
{


val1=document.getElementById('hfNoteValue').value;


  db = $cordovaSQLite.openDB({name:"Test.db", location:'default'});

//  var parameters = [edit.message, val1.id];
// $cordovaSQLite.execute(db, 'UPDATE  Note SET message =  (?) WHERE id= (?)',parameters)
  var query =   "UPDATE  Note SET message='"+edit+"' WHERE id=?";
              $cordovaSQLite.execute(db, query,[val1])
         .then(function(result) {
           document.getElementById('hfTemp').value="test";
          //   $scope.statusMessage = "Message saved successful, cheers!";
                $state.go('second',{});
         }, function(error) {
alert(error.message);
          //   $scope.statusMessage = "Error on saving: " + error.message;
         });
}

   };



})




.controller('SecCtrl', function($scope,$stateParams,$cordovaSQLite,$ionicPlatform,$state,$ionicPopup) {
$ionicPlatform.ready(function() {
document.getElementById('hfCheck').value="CHECK";
   $scope.details = [];


 db = $cordovaSQLite.openDB({name:"Test.db", location:'default'});

           $cordovaSQLite.execute(db, 'SELECT * FROM Note ORDER BY id DESC')
               .then(
                   function(result) {


           if (result.rows.length > 0) {

                  for(var i = 0; i < result.rows.length; i++)
                       {

                            $scope.details.push({id: result.rows.item(i).id, message: result.rows.item(i).message});

                       }

                                     }
                                },
                  function(error) {
                   $scope.statusMessage = "Error on loading: " + error.message;
                   }
               );
               });



       $scope.Delete= function(Notemessage){


     var confirmPopup = $ionicPopup.confirm({
           title: 'Delete',
           template: 'Are you sure?'
        });

        confirmPopup.then(function(res) {
           if(res) {
              console.log('Sure!');
                     db = $cordovaSQLite.openDB({name:"Test.db", location:'default'});


                              var query =   "DELETE  FROM Note WHERE  id = ?";
                            $cordovaSQLite.execute(db, query, [Notemessage.id]).then(function(res) {

                            $scope.details.splice($scope.details.indexOf(Notemessage), 1);


                               }, function (err) {
                             $scope.statusMessage = "Error on loading: " + err.message;
                             });
           } else {
              console.log('Not sure!');
           }
        });





                }




  $scope.Add = function() {
    document.getElementById('hfTemp').value="test";

     $state.go('editor',{});
     }
$scope.watch=function(val)
{
document.getElementById('hfTemp').value="SET";
document.getElementById('hfNoteValue').value=val;
   $state.go('editor',{});
}


});






