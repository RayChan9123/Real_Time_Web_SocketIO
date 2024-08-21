const app = require('express')();
const server = require('http').Server(app)
const io = require('socket.io')(server);
const port = 3000;

server.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// tech namespace, create separation for different room
const tech = io.of('/tech');

tech.on('connection', (socket) => {
    console.log('a new client connected');
    socket.on('message', (msg) => {
        console.log(`message: ${msg}`);

        tech.emit('message', msg);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');

        tech.emit('message', 'user disconnected');
    })
})