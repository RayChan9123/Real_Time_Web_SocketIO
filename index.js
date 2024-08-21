const app = require('express')();
const server = require('http').Server(app)
const io = require('socket.io')(server);
const port = process.env.PORT || 10000;

server.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/javascript', (req, res) => {
    res.sendFile(__dirname + '/public/javascript.html');
});

app.get('/css', (req, res) => {
    res.sendFile(__dirname + '/public/css.html');
});

app.get('/swift', (req, res) => {
    res.sendFile(__dirname + '/public/swift.html');
});

// tech namespace, create separation for different room
const tech = io.of('/tech');

tech.on('connection', (socket) => {

    socket.on('join', (data) => {
        socket.join(data.room);
        tech.in(data.room).emit('message', `New user joined ${data.room} room!`);
    })

    console.log('a new client connected');

    socket.on('message', (data) => {
        console.log(`message: ${data.msg}`);

        tech.in(data.room).emit('message', data.msg);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');

        tech.emit('message', 'user disconnected');
    })
})