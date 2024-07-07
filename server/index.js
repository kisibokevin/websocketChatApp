
import express from 'express';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.static(path.join(__dirname, "public")));

const expressServer = app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});



const io = new Server(expressServer, {
    cors: {
        origin: process.env.NODE_ENV === "production" ? false : ["http://localhost:5500","http://127.0.0.1:5500"]
    }
});


io.on('connection', socket => {
    console.log(`User ${socket.id} connected`);

    // upon connection - send to user only
    socket.emit('message', 'Welcome To Chat App!');

    // upon connection - send to all users
    socket.broadcast.emit('message', `${socket.id.substring(0, 5)} Connected`)

    socket.on('message', data => {
        io.emit('message', `${socket.id.substring(0, 5)}: ${data}`)
    })

    // when user disconnects
    socket.on('disconnect', () => {
        socket.broadcast.emit('message', `${socket.id.substring(0, 5)} Disconnected`)
    })

    // listen for activity
    socket.on('activity', (name) => {
        socket.broadcast.emit('activity', name)
    })


})
