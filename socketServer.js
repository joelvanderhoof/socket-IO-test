const app = require('express')();
const server = require('http').Server(app)
const path = require('path');

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './index.html'));
});

server.listen(4444, () => {
    console.log('the server is listening on port 4444')
});

const io = require('socket.io')(server);

io.on('connection', socket => {
    console.log('new user connected');

    socket.username = 'no name';

    socket.on('CHANGE_USER_NAME', data => {
        console.log(data)
        socket.username = data.username;
    });

    socket.on('SEND_MESSAGE', data => {
        console.log(data)
        io.sockets.emit('SEND_MESSAGE', { 
            message: data.message,
            username: socket.username });
    });
    
});

