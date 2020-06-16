const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const {addUser,removeUser,getUser,getUsersInRoom} = require('./users');

const router = require('./router');

//connect socketio với client
io.on('connection', socket =>{
	console.log('We have a new connection!!!');

	socket.on('join',({name,room},callback) =>{
		const {error,user} = addUser({id:socket.id,name,room});

		//if(error) return callback(error);
		// khi 1 nguoi moi join vao thi admin se gui cau xin chao
		socket.emit('message',{user:'admin',text:`${user.name}--- id room: ${user.id},welcome to the room ${user.room}`});
		// nhung nguoi da trong room roi se nhan duoc cau, nguoi moi has joined
		socket.broadcast.to(user.room).emit('message',{user:'admin',text:`${user.name}, has joined!`});

		socket.join(user.room);

		callback();
	});

	socket.on('sendMessage',(message, callback)=>{
		const user = getUser(socket.id);

		io.to(user.room).emit('message',{user:user.name, text: message});

		callback();
	});

	socket.on('disconnect',()=>{
		const user = removeUser(socket.id);

		if(user){
			io.to(user.room).emit('message',{user:'admin',text:`${user.name} has left`});
		}
	});

});

app.use(router);

server.listen(PORT,() => console.log(`Server has started on port ${PORT}`));
