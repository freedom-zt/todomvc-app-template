(function(angular) {
    var app = angular.module('todoApp.directive', []);
    app.directive('autoFocus', ['$timeout', function($timeout) {
        return {
            link: function(scope, element, attributes) {
                element.on('dblclick', function() {
                    var item = element.parent().next().children();
                    console.log(item);
                    $timeout(function() {
                        item[0].focus()
                    }, 1000);
                });
            }
        }
    }])
})(angular)
