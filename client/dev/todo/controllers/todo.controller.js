;(function(angular) {
  "use strict";

  angular
    .module('myAwesomeApp')
    .controller('TodoController', ['$log', 'Todo', 'TodoDAO', 'socket', function($log, Todo, TodoDAO, socket) {
      var self = this;

      self.todo = new Todo();
      self.todos = [];

      socket.on("getAll", function(socket) {
          _getAll();
      })

      self.createTodo = function(todo) {
        var _onSuccess = function(newTodo) {
          self.todos.push(newTodo);
          self.todo = new Todo();
          socket.emit("refreshAll");
        };

        TodoDAO
          .createTodo(todo)
          .then(_onSuccess)
          .catch($log.error);
      };

      self.deleteTodo = function(id) {
          var _onSuccess = function() {
              _getAll();
              socket.emit("refreshAll");
          }
        TodoDAO
          .deleteTodo(id)
          .then(_onSuccess)
          .catch($log.error);
      }

      var _getAll = function() {
        var _onSuccess = function(todos) {
          return self.todos = todos;
        };

        return TodoDAO
          .getAll()
          .then(_onSuccess)
          .catch($log.error);
      }

      _getAll();
    }]);
}(window.angular));
