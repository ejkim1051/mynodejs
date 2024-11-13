const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors:{
        origin:"http://localhost:3000",
        methods:["GET","POST"],
        credentials:true,
    }
});

let users ={};
let rooms ={};

io.on('connection', (socket) =>{ 
    console.log(`a user connected : ${JSON.stringify(users)}, ${JSON.stringify(rooms)}`);

    //1. login
    socket.on('login', (username) =>{
        users[socket.id] = username;
        socket.emit('login:success', {username, rooms:Object.keys(rooms)});
        io.emit('update:users', Object.values(users));
    });

    //2. create room
    socket.on('create:room', (room) =>{
        if(!rooms[room]){
            rooms[room] = [];
            socket.join(room);
            socket.emit('room:created', room);
            io.emit('update:rooms', Object.keys(rooms));
        }else{
            socket.emit('room:exists', room);
        }
    });

    //3. join room
    socket.on('join:room', (room) =>{
        if(rooms[room]){
            socket.join(room);
            socket.emit('room:joined', room);
            socket.to(room).emit('user:joined', users[socket.id]);
        }else{
            socket.emit('room:notfound', room);
        }
    });

    //4. send message
    socket.on('chat:message', ({room, message}) =>{
        io.to(room).emit(`chat:message`, {user:users[socket.id], message});
    });

    //5. disconnect user
    socket.on('disconnect', () =>{
        if(users[socket.id]){
            io.emit('user:left', users[socket.id]);
            delete users[socket.id];
            io.emit('update:users', Object.values(users));
        }
    });
});

server.listen(3030, ()=>{
    console.log(`socket.io server is running on 3030`);
});