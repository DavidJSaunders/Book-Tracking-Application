var bookTracker = angular.module('bookTrackerApp', ['firebase']);

// bookTracker.config(['$routeProvider',
//   function($routeProvider) {
//     $routeProvider.
//       when('/<main class="html"></main>', {
//         templateUrl: 'view/view.html'
//       }).
//       when('/add', {
//         templateUrl: 'view/add.html'
//       }).
//       when('/edit', {
//         templateUrl: 'view/edit.html'
//       }).
//       otherwise({
//         redirectTo: '/'
//       });
//   }]);

bookTracker.directive("clickToEdit", function() {
    var editorTemplate = '<div class="click-to-edit">' +
        '<div ng-hide="view.editorEnabled">' +
            '{{value}} ' +
            '<a ng-click="enableEditor()">Edit</a>' +
        '</div>' +
        '<div ng-show="view.editorEnabled">' +
            '<input ng-model="view.editableValue">' +
            '<a href="#" ng-click="save()">Save</a>' +
            ' or ' +
            '<a ng-click="disableEditor()">cancel</a>.' +
        '</div>' +
    '</div>';

    return {
        restrict: "A",
        replace: true,
        template: editorTemplate,
        scope: {
            value: "=clickToEdit",
        },
        controller: function($scope) {
            $scope.view = {
                editableValue: $scope.value,
                editorEnabled: false
            };

            $scope.enableEditor = function() {
                $scope.view.editorEnabled = true;
                $scope.view.editableValue = $scope.value;
            };

            $scope.disableEditor = function() {
                $scope.view.editorEnabled = false;
            };

            $scope.save = function() {
                $scope.value = $scope.view.editableValue;
                $scope.disableEditor();
            };
        }
    };
});

bookTracker.factory('trackerFactory', function($firebase) {

  // connect to firebase
  // $firebase allows us to synchronize data between client(s) and server
  var url = "https://incandescent-fire-3730.firebaseio.com/Book-Tracker";
  var ref = new Firebase(url);
  var fb = $firebase(ref);
  var booksRef = ref.child("booklist");

  var trackerFactory = {};

  trackerFactory.addBooks = function() {
	booksRef.push({
	  title: "American Elsewhere",
	  date_started: "December 15, 2014",
	  date_completed: "January 2, 2015",
	  author: "Robert Jackson Bennett",
	  comments: "It was a good book."
	});
	booksRef.push({
	  title: "Misery",
	  date_started: "January 2, 2015",
	  date_completed: "January 8, 2015",
	  author: "Stephen King",
	  comments: "I enjoyed this book."
	});

	alert('Books Added!');
  }

  trackerFactory.getBooks = function() {
    return $firebase(ref.child('booklist')).$asObject();
  }

  trackerFactory.addBooks = function(newBook) {

    booksRef.push({
      title: newBook.title,
      dateStarted: newBook.startDate,
      dateCompleted: newBook.endDate,
      author: newBook.author,
      comments: newBook.comments
    })

    alert('New book added');
    var name = snapshot.name();
    alert(name);
  }

  trackerFactory.removeBooks = function(key) {
    booksRef.child('booklist').remove();
    alert('book deleted');
  }



  // trackerFactory.removeBooks = function(book) {
  //   booksRef

  // }

  // trackerFactory.editBooks = function() {
  //   booksRef.update({
  //     title: newBook.title,
  //     dateStarted: newBook.startDate,
  //     dateCompleted: newBook.endDate,
  //     author: newBook.author,
  //     comments: newBook.comments
  //   })
  // }

  return trackerFactory;
});

bookTracker.controller('bookCtrl', function ($scope, trackerFactory) {

  $scope.bookList = trackerFactory.getBooks();
  $scope.bookInfo = {};

  $scope.addBooks = function() {
    trackerFactory.addBooks();
  }

  $scope.addBooks = function() {
    trackerFactory.addBooks($scope.bookInfo);
  }

  $scope.removeBooks = function() {
    trackerFactory.removeBooks($scope.bookInfo);
  }

  // $scope.addBooks = function() {
  //   trackerFactory.editBooks($scope.bookInfo);
  // }

});


