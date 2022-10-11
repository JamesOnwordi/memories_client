import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';

export default function Navbar({ currentUser, handleLogout }) {

	const loggedIn = (
		<div className='w-full h-[50px] bg-black'>
			<div className=' max-w-[1240px] mx-auto px-4 flex justify-between items-center h-full'>
				<Link to="/">
					<h1 className='text-[#00d8ff]'>Memories</h1>
				</Link>
				<div className='hidden md:flex'>
					<ul className='flex text-white items-center'>
						{/* if the user is logged in... */}
						<Link to="/">
							<span onClick={handleLogout}>Logout</span>
						</Link>

						<Link to="/profile">
							Profile
						</Link>

						<Link to="/memories/new">
							<p>New Memories</p>
						</Link>

						<Link to="/memories">
							<p>Memories</p>
						</Link>

					</ul>
				</div>
			</div>
		</div>
	)
	const loggedOut = (
		<div className='w-full h-[50px] bg-black'>
			<div className=' max-w-[1240px] mx-auto px-4 flex justify-between items-center h-full'>
				<Link to="/">
					<h1 className='text-[#00d8ff]'>Memories</h1>
				</Link>
				<div className='hidden md:flex'>
					<ul className='flex text-white items-center'>
						{/* if the user is not logged in... */}
						<Link to="/register">
							Register
						</Link>

						<Link to="/login">
							Login
						</Link>
					</ul>
				</div>
			</div>
		</div>
	)
	return (
		<nav>
			{/* user always sees this section */}
			{currentUser ? loggedIn : loggedOut}
		</nav>
	)
}