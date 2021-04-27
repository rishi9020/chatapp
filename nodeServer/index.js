const io = require('socket.io')(8001, {
    cors: {
        origin: '*',
    }
});

const users = {};

console.log("Starting node server")
//it will listen the socket connection
io.on('connection', socket => {

    //it will handle the events produced for that socket connection
    socket.on("new-user-joined", name => {
        console.log(name);
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name)
    });

    socket.on('send', msg => {
        socket.broadcast.emit('receive', { message: msg, name: users[socket.id] })
    });

});
