import { useState, useEffect } from 'react';
import axios from 'axios';


export default function Profile({ currentUser, handleLogout }) {
	// state for the secret message (aka user privilaged data)
	const [msg, setMsg] = useState('')



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
	return (
		<div class="rounded-3xl overflow-hidden shadow-xl mx-auto max-w-screen-xl my-3 bg-blue-500">
			<img src="https://i.imgur.com/dYcYQ7E.png" class="w-full" alt="pbackground" />
			<div class="flex justify-center -mt-8">
				<img src="https://i.imgur.com/8Km9tLL.jpg" class="rounded-5xl border-solid border-white border-2 -mt-1" alt="profilePic" />
			</div>
			<div class="text-center px-3 pb-6 pt-2">
				<h3 class="text-white text-xl bold font-sans">{currentUser.name}</h3>
				<p class="mt-2 font-sans text-xl font-light text-white">{currentUser.email}</p>
			</div>
			<div class="flex justify-center pb-3 text-white">
				<div class="text-center text-xl">
					<h2>{currentUser.memories}</h2>
					<span>Memories</span>
				</div>
			</div>
		</div>
	)
}