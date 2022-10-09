import { Link } from 'react-router-dom'

export default function Navbar({ currentUser, handleLogout }) {
	 const loggedIn = (
		<>
			{/* if the user is logged in... */}
			<Link to="/">
				<span onClick={handleLogout}>logout</span>
			</Link>

			<Link to="/profile">
				profile
			</Link>

			<Link to="/newMemories">
				<p>NewMemories</p>
			</Link>
      		<Link to="/memory">
				<p>Memory</p>
			</Link>
      		<Link to="/memories">
				<p>Memories</p>
			</Link>
		</>
	 )

	 const loggedOut = (
		<>
			{/* if the user is not logged in... */}
			<Link to="/register">
				register
			</Link>

			<Link to="/login">
				login
			</Link>
		</>
	 )

	return (
		<nav>
			{/* user always sees this section */}
			<Link to="/">
				<p>User App</p>
			</Link>

			{currentUser ? loggedIn : loggedOut}
		</nav>
	)
}