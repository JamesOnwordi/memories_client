/* eslint-disable jsx-a11y/alt-text */
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import '../../Style/Welcome.css'

export default function Welcome({ currentUser, setCurrentUser }) {
	const [displayLogin, setDisplayLogin] = useState(true)

	const loginForm = (
		<Login
			currentUser={currentUser}
			setCurrentUser={setCurrentUser}
			setDisplayLogin={setDisplayLogin}
			welcomePage={true}
		/>
	)

	const signupForm = (
		<Register
			currentUser={currentUser}
			setCurrentUser={setCurrentUser}
			setDisplayLogin={setDisplayLogin}
			welcomePage={true}
		/>
	)

	const noUser = (
		<div className='flex'>
			{displayLogin ? loginForm : signupForm}

			<div className='mx-12'>
				<p>
					Have you ever just felt so moody that you reflected back on your life 
					yes and I mean to the point where you almost cried?
					Imagine you had a place to go back to remeber those moments.
				</p>

				<p>
					Have you felt the need to keep a documentation of what you were going through 
					because you wouldn't want to forget such experience?
				</p>

				<p>
					Or have you ever taken a bootcamp course and you wish you could keep a record of 
					how the whole process went for you?
				</p>

				<p>
					<strong>Memories is the app for you!</strong>
				</p>

				<p>
					Memories keeps the most important pictures of an experience you are going through 
					it also provides you with the option to keep a Journal of what you are feeling at the moment 
					about the experience you are having it provides you with.
				</p>
			</div>
		</div>
	)

	const yesUser =(
		<div className='text-center text-lg'>
			<p>Welcome!</p>
			
			<p>
				To get started with our app,
				<Link to='/memories/new'>
					<span className='text-blue-500 hover:cursor-pointer'> click here </span>
				</Link>
				to create a new memory.
			</p>

			<p>
				Already have some memories saved?
				<Link to="/memories">
					<span className='text-blue-500 hover:cursor-pointer'> Click here </span>
				</Link>
				to reminisce about all the good (or bad) times.
			</p>
		</div>
	)

	return (
		<div className='flex flex-col justify-between'>
			<div className='container mx-auto'>
				<h1 className='text-xl text-center font-bold my-5'>Memories 📖</h1>

				{!currentUser ? noUser : yesUser}
			</div>


			<footer className='container mx-auto lg:absolute inset-x-0 bottom-0'>
				<h2 className="text-lg font-medium text-gray-900 text-center mb-4" >About the Developers</h2>

				<div className='flex justify-around items-end'>
					<div className='px-4'>
						<h3>James</h3>
						
						<img src="https://i.pinimg.com/564x/36/d2/38/36d238e34622b54fc3f5a920a2c03f23.jpg"
							style={{ height: 300, width: 300 }}
						/>

						<p>
							contact
						</p>

						<p> 
							Little about
						</p>
					</div>

					<div className='px-4'>
						<h3>Allen</h3>
						
						<img src="https://play-lh.googleusercontent.com/7Ac5TgaL15Ra4bvFVHJKCdJp4qvnL4djZj5bKc6RN-MZjzrvkeHbJytek0NPTSdZcp8"
							width='300'
							height='300' 
						/>

						<p>
							contact
						</p>

						<p> 
							Little about
						</p>
					</div>

					<div className='px-4'>
						<h3>Elijah</h3>
						
						<img src="https://www.clipstudio.net/wp-content/uploads/2020/06/0131_005_en-us.jpg"
							width='300'
							height='300' 
						/>

						<p>
							contact
						</p>

						<p> 
							Little about
						</p>
					</div>
				</div>
			</footer>
		</div>
	)
}