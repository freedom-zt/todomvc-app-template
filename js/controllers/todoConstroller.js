(function(angular) {
    'use strict';
    var app = angular.module("todoApp.controller", ['todoApp.service'])
    app.controller('todoController', ['$scope', '$location', 'MyService', function($scope, $location, MyService) {
        //功能一:展示数据
        // $scope.tasks = [
        //     // { id: 1, name: '吃饭', completed: true },
        //     // { id: 2, name: '睡觉', completed: false },
        //     // { id: 3, name: '敲代码', completed: true },
        //     // { id: 4, name: '打游戏', completed: false },
        //     // { id: 5, name: '玩手机', completed: true }
        // ];
        $scope.tasks = MyService.get();
        //功能二:添加功能
        $scope.newTask = '';
        $scope.add = function() {
            if (!$scope.newTask) return;
            var id;
            if ($scope.tasks.length > 0) {
                id = $scope.tasks[$scope.tasks.length - 1].id + 1;
            } else {
                id = 1;
            }
            MyService.add(id, $scope.newTask);
            $scope.newTask = '';
        };
        //三:删除功能
        $scope.remove = function(id) {
            MyService.remove(id);
        };
        //四:编辑功能
        $scope.isEditing = -1;
        $scope.edit = function(id) {
            $scope.isEditing = id;
        };
        $scope.save = function() {
            console.log(this.remove);
            for (var i = 0, l = $scope.tasks.length; i < l; i++) {
                if (!$scope.tasks[i].name) {
                    MyService.remove($scope.tasks[i].id);
                    /////////////
                    i-- /////////////
                }
            }
            $scope.isEditing = -1;
            // MyService.save();
        };
        //五:切换任务是否完成的状态
        //六:批量切换任务状态
        var flag = true;
        $scope.toggleAll = function() {
            MyService.toggleAll(flag);
            flag = !flag;
        };
        //七:清除所有已完成的任务
        $scope.clearCompletedAll = function() {
            var tmp = [];
            $scope.tasks = MyService.removeAllCompleted(tmp);
            // $scope.tasks = tmp;
        };
        //7.1:控制删除按钮是否现实
        $scope.isShow = function() {
            return MyService.isShow();
        };
        //八:显示-未完成的任务数

        $scope.count = function() {
            return MyService.count();
        };
        //九:切换不同状态任务的现实
        // $scope.search = {};
        // $scope.all = function() {
        //     $scope.search = { completed: '' }
        // };
        // $scope.active = function() {
        //     $scope.search = { completed: false }
        // }
        // $scope.completed = function() {
        //     $scope.search = { completed: true }
        // }
        $scope.laca = $location;
        $scope.status = {};
        $scope.$watch('laca.url()', function(now, old) {
            switch (now) {
                case '/active':
                    $scope.status = { completed: false };
                    break;
                case '/completed':
                    $scope.status = { completed: true };
                    break;
                default:
                    $scope.status = {}
                    break;
            }
        })
    }]);
})(angular)
