import { useState } from 'react'
import Login from './Login'
import Register from './Register'

export default function Welcome({ currentUser, setCurrentUser }) {
	const [displayLogin, setDisplayLogin] = useState(true)

	const loginForm = (
		<>
			<Login
				currentUser={currentUser}
				setCurrentUser={setCurrentUser}
			/>
			<button onClick={() => setDisplayLogin(false)}>Create an account</button>
		</>
	)

	const signupForm = (
		<>
			<Register
				currentUser={currentUser}
				setCurrentUser={setCurrentUser}
			/>
			<button onClick={() => setDisplayLogin(true)}>Login to your account</button>
		</>
	)

	const noUser = (
		<>
			{displayLogin ? loginForm : signupForm}
		</>
	)

	const yesUser =(
		<>
			<p>Welcome to our app</p>
		</>
	)

	return (
		<div className='container mx-auto'>
			<h1 className='text-xl text-center font-bold my-5'>Memories 📖</h1>

			{!currentUser ? noUser : yesUser}
		</div>
	)
}