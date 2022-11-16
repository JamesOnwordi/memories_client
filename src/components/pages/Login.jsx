import { useState } from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { Navigate } from 'react-router-dom'

export default function Login({ currentUser, setCurrentUser, welcomePage, setDisplayLogin }) {
	// state for the controlled form
	const [email, setEmail] = useState('visitor@clickSignUp.com')
	const [password, setPassword] = useState('1234')
	const [msg, setMsg] = useState('')

	// submit event handler
	const handleSubmit = async e => {
		e.preventDefault()
		try {
			// post fortm data to the backend
			const reqBody = {
				email, 
				password
			}
			const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/login`, reqBody)

			// save the token in localstorage
			const { token } = response.data
			localStorage.setItem('jwt', token)

			// decode the token
			const decoded = jwt_decode(token)

			// set the user in App's state to be the decoded token
			setCurrentUser(decoded)

		} catch (err) {
			console.warn(err)
			if (err.response) {
				if (err.response.status === 400) {
					setMsg(err.response.data.msg)
				}
			}
		}
 	}

	const welcomePageButton = (
		<button
			className='text-blue-700 hover:underline hover:cursor-pointer'
			type='button'
			onClick={() => setDisplayLogin(false)}
		>
			Create a new account
		</button>
	)

	// conditionally render a navigate component
	if (currentUser) {
		return <Navigate to="/profile" />
	}

	return (
		<div className='w-full max-w-xs mx-auto bg-white shadow-md rounded px-5 pt-6 pb-8 mb-4'>
			<h2 className='text-lg font-semibold mb-2'>Login to Your Account:</h2>

			<p>{msg}</p>

			<form onSubmit={handleSubmit}>
				<div className='mb-4'>
					<label
						className='block text-gray-700 text-sm font-bold mb-2'
						htmlFor='email'
					>
						Email:
					</label>

					<input
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
						type="email"
						id="email"
						placeholder='your email...'
						onChange={e => setEmail(e.target.value)}
						value={email}
					/>
				</div>

				<div className='mb-4'>
					<label
						className='block text-gray-700 text-sm font-bold mb-2'
						htmlFor='password'
					>
						Password: 
					</label>
					
					<input
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
						type="password"
						id="password"
						placeholder='password...'
						onChange={e => setPassword(e.target.value)}
						value={password}
					/>
				</div>

				<div className='flex justify-between items-center'>

					{welcomePage ? welcomePageButton : ''}
					
					<button
						className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
						type="submit"
					>
						Login
					</button>
				</div>
			</form>
		</div>
	)
}