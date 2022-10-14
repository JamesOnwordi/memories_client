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
					 to the point where you almost cried ?
					Imagine you had a place to go back to remeber those moments.
				</p>

				<p>
					Have you felt the need to keep a documentation of what you are going through 
					because you don't want to forget an event?
				</p>

				<p>
					Perharps you have taken a bootcamp course and you wish you could keep a record of 
					your trip to mount stupid ?
				</p>

				<p>
					<strong>Memories is the app for you!</strong>
				</p>

				<p>
					Memories keeps the pictures of an important event 
					and provides you with the option to keep a journal of what you are 
					feeling at the moment.
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
					<div className='px-4 text-center'>
						<h3>James</h3>
						
						<img src="https://i.pinimg.com/564x/36/d2/38/36d238e34622b54fc3f5a920a2c03f23.jpg"
							style={{ height: 270, width: 270 }}
						/>

						<p>
							<a href='https://www.linkedin.com/in/james-onwordi'><button> click here! to link with James</button></a>
						</p>

						<p> 
						</p>
					</div>

					<div className='px-4 text-center'>
						<h3>Allen</h3>
						
						<img src="https://play-lh.googleusercontent.com/7Ac5TgaL15Ra4bvFVHJKCdJp4qvnL4djZj5bKc6RN-MZjzrvkeHbJytek0NPTSdZcp8"
							width='270'
							height='300' 
						/>

						<p>
							<a href='https://www.linkedin.com/in/allen-tang13/'><button> click here! to link with Allen</button></a>
						</p>

						
					</div>

					<div className='px-4 text-center'>
						<h3>Elijah</h3>
						
						<img src="https://www.clipstudio.net/wp-content/uploads/2020/06/0131_005_en-us.jpg"
							width='270'
							height='300' 
						/>

						<p>
						<a href='https://www.linkedin.com/in/elijah-kubes-196432248/'><button> click here! to link with Allen</button></a>
						</p>

						
					</div>
				</div>
			</footer>
		</div>
	)
}