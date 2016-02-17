"use strict";

module.exports = class SocketConf {
    static init(http) {
        const io = require('socket.io')(http);

        io.on('connection', function(socket){
          console.log('User connected. Socket id %s', socket.id);

          socket.on("refreshAll", function() {
              console.log("refresh all connected users");
              io.sockets.emit("getAll")
          })
        });
    }
};
