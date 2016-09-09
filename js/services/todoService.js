(function(angular) {
    // 1.创建服务模块
    var app = angular.module('todoApp.service', []);
    // 2.创建服务,
    // 第一个参数，是服务名字
    // 第二个参数，和控制器第二个参数一样
    // 第二个参数的function可以一个构建函数来使用。angular会自动帮助我们new这个对象，在controller中可以直接传入它。或者直接return一个对象

    app.service('MyService', ['$window', function($window) {
        var str = $window.localStorage.getItem('todos');
        var todos = JSON.parse(str || '[]');
        //1获取数据
        this.get = function() {
            return todos;
        };
        //2添加
        this.add = function(id, newTask) {
            todos.push({ id: id, name: newTask, completed: false });
            this.save();
        };
        //3删除
        this.remove = function(id) {
            for (var i = 0, l = todos.length; i < l; i++) {
                if (todos[i].id == id) {
                    todos.splice(i, 1);
                    this.save();
                    return;
                }
            }
        };
        //4保存
        this.save = function() {
            $window.localStorage.setItem('todos', JSON.stringify(todos));
        };
        //6批量切换状态
        this.toggleAll = function(flag) {
            for (var i = 0, l = todos.length; i < l; i++) {
                todos[i].completed = flag;
            }
        };
        //7删除所有已完成数据
        this.removeAllCompleted = function(tmp) {
            for (var i = 0, l = todos.length; i < l; i++) {
                if (!todos[i].completed) {
                    tmp.push(todos[i]);
                }
            }
            todos = tmp;
            return tmp;
        };
        //7.1isShow
        this.isShow = function() {
            for (var i = 0, l = todos.length; i < l; i++) {
                if (todos[i].completed) {
                    return true;
                }
            }
            return false;
        };
        //8显示未完成的任务数
        this.count = function() {
            var num = 0;
            for (var i = 0, l = todos.length; i < l; i++) {
                if (!todos[i].completed) {
                    num++;
                }
            }
            this.save();
            return num;
        }
    }])
})(angular)
