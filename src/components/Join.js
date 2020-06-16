import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import {Container,Input,Button} from 'reactstrap';
const Join = () =>{
	const [name,setName] = useState('');
	const [room,setRoom] = useState('');
	console.log(`name: ${name}, room: ${room}`);
	return(
		<Container>
			<h1>Join in Room</h1>
			<Input type="text" className="w-50 mt-3" placeholder="Name..." onChange={event=> setName(event.target.value)}/>
			<Input type="text" className="w-50 mt-3" placeholder="Room..." onChange={event=> setRoom(event.target.value)} />
			<Link onClick={event=>(!name || !room) ? event.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
				<Button color="primary" className="mt-3" type="submit">Join</Button>
			</Link>
		</Container>
	);
}

export default Join;