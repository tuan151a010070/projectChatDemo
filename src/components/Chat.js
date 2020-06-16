import React,{useState,useEffect} from 'react';
import {useLocation} from 'react-router';
import queryString from 'query-string';
import io from 'socket.io-client';
let socket;

const Chat = () =>{
	const location = useLocation();
	const {search} = location;
	const [name,setName] = useState('');
	const [room,setRoom] = useState('');
	const [message,setMessage] = useState('');
	const [messages,setMessages] = useState([]);
	const ENDPOINT = 'localhost:5000';
	useEffect(()=>{
		const {name,room} = queryString.parse(search);

		socket = io(ENDPOINT);

		setName(name);
		setRoom(room);

		// client gui phong va name den server, sau do server tra va data
		socket.emit('join',{name,room},()=>{

		});

		return()=>{
			socket.emit('disconnect');

			socket.off();
		}

	},[ENDPOINT,search]);

	// nhan message tu server
	useEffect(()=>{
		socket.on('message',(message)=>{
			setMessages([...messages,message]);
		});
	},[messages]);

	const sendMessage = (event) =>{
		event.preventDefault();
		if(message){
			socket.emit('sendMessage',message,() => setMessage(''));
		}
	}
	//console.log(message);
	return(
		<div className='border-primary' style={{width:'300px',height:'400px',backgroundColor:'white',border:'1px solid',margin:'100px auto'}}>
			<div className='d-flex justify-content-between px-3 align-items-center bg-primary' style={{height:'40px'}}>
				<div className='text-white font-weight-bold'>Test</div>
				<div className='text-white font-weight-bold'>x</div>
			</div>
			<div className='p-3'>
				<div>
					<span className='p-2 rounded d-inline-block mb-2' style={{backgroundColor:'#DDDDDD',width:'auto'}}>Hello everyone !!!</span><span>  admin</span><br />		
					<span className='p-2 rounded d-inline-block mb-2' style={{backgroundColor:'#DDDDDD',width:'auto'}}>Hello everyone aaaaaa !!!</span><span>  admin</span><br />		
					<span className='p-2 rounded d-inline-block mb-2' style={{backgroundColor:'#DDDDDD',width:'auto'}}>Hello everyone !!!</span><span>  admin</span><br />		
				</div>
				<div className='float-right'>
					<span>admin   </span><span className='p-2 rounded d-inline-block mb-2 bg-primary text-white' style={{width:'auto'}}>Hello everyone !!!</span><br />		
					<span>admin   </span><span className='p-2 rounded d-inline-block mb-2 bg-primary text-white' style={{width:'auto'}}>Hello everyone !!!</span><br />		
					<span>admin   </span><span className='p-2 rounded d-inline-block mb-2 bg-primary text-white' style={{width:'auto'}}>Hello everyone !!!</span><br />		
				</div>
				<div style={{clear:'both'}}></div>
			</div>
			<div className='d-flex'>
				<input className='form-control rounded-0 border-primary' type="text" value={message} onChange={event=> setMessage(event.target.value)}
				onKeyPress={event=>event.key ==='Enter' ? sendMessage(event) : null}
				style={{borderLeft:0,borderBottom:0}}
				placeholder="type a message..."
				/>
				<div className='btn btn-primary rounded-0'>SEND</div>
			</div>
		</div>
	);
}

export default Chat;