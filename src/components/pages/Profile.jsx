import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


export default function Profile({ currentUser, handleLogout }) {
	// state for the secret message (aka user privilaged data)
	const [msg, setMsg] = useState('');
	const [memory, setMemory] = useState({});


	// useEffect for getting the user data and checking auth
	useEffect(() => {
		const fetchData = async () => {
			try {
				// get the token from local storage
				const token = localStorage.getItem('jwt')
				// make the auth headers
				const options = {
					headers: {
						'Authorization': token
					}
				}
				// hit the auth locked endpoint
				const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/auth-locked`, options)
				// example POST with auth headers (options are always last argument)
				// await axios.post(url, requestBody (form data), options)
				// set the secret user message in state
				setMsg(response.data.msg)
			} catch (err) {
				// if the error is a 401 -- that means that auth failed
				console.warn(err)
				if (err.response) {
					if (err.response.status === 401) {
						// panic!
						handleLogout()
					}
				}
			}
		}
		fetchData()
	})
	useEffect(() => {
		// pull token from local storage
		const token = localStorage.getItem('jwt')
		// set request headers
		const options = {
			headers: {
				"Authorization": token
			}
		}
		axios.get(process.env.REACT_APP_SERVER_URL + '/api-v1/memories', options)
			.then(response => {
				const foundMemory = response.data
				setMemory(foundMemory)
				console.log(memory.length)
			})
	}, [])


	return (
		<div className="rounded-3xl overflow-hidden shadow-xl mx-auto max-w-screen-xl my-3 bg-blue-500">
			<img src="https://i.imgur.com/dYcYQ7E.png" className="w-full" alt="pbackground" />
			<div className="flex justify-center -mt-8">
				<img src="https://i.imgur.com/8Km9tLL.jpg" className="rounded-5xl border-solid border-white border-2 -mt-1" alt="profilePic" />
			</div>
			<div className="text-center px-3 pb-6 pt-2">
				<h3 className="text-white text-xl bold font-sans">User Name: {currentUser.name}</h3>
				<p className="mt-2 font-sans text-xl font-light text-white">Email: {currentUser.email}</p>
			</div>
			<div className="flex justify-center pb-3 text-white">
				<div className="text-center text-xl">
					<h2>{memory.length}</h2>
					<Link to="/memories">
					<p>Memories</p>
						</Link>
				</div>
			</div>
		</div>
	)
}