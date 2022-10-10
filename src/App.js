import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate

} from 'react-router-dom'
import { useState, useEffect } from 'react'
import Login from './components/pages/Login'
import Profile from './components/pages/Profile'
import Register from './components/pages/Register'
import Welcome from './components/pages/Welcome'
import Navbar from './components/Navbar'
import './App.css'
import jwt_decode from 'jwt-decode'
import NewMemories from './components/pages/NewMemories'
import Memory from './components/pages/Memory'
import Memories from './components/pages/Memories'
import EditMemories from './components/pages/EditMemories'

function App() {
  // the currently logged in user will be stored up here in state
  const [currentUser, setCurrentUser] = useState(null)

  // useEffect -- if the user navigates away form the page, we will log them back in
  useEffect(() => {
    // check to see if token is in storage
    const token = localStorage.getItem('jwt')
    if (token) {
      // if so, we will decode it and set the user in app state
      setCurrentUser(jwt_decode(token))
    } else {
      setCurrentUser(null)
    }
  }, []) // happen only once

  // event handler to log the user out when needed
  const handleLogout = () => {
    // check to see if a token exists in local storage
    if (localStorage.getItem('jwt')) {
      // if so, delete it
      localStorage.removeItem('jwt')
      // set the user in the App state to be null
      setCurrentUser(null)
    }
  }

  return (
    <Router>
      <header>
        <Navbar 
          currentUser={currentUser}
          handleLogout={handleLogout}
        />
      </header>

      <div className="App">
        <Routes>
          <Route 
            path="/"
            element={<Welcome
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />}
          />

          <Route 
            path="/register"
            element={<Register currentUser={currentUser} setCurrentUser={setCurrentUser} />}
          />

          <Route 
            path="/login"
            element={<Login currentUser={currentUser} setCurrentUser={setCurrentUser} />}
          />

          {/* conditionally render auth locked routes */}
          <Route 
            path="/profile"
            element={currentUser ? <Profile handleLogout={handleLogout} currentUser={currentUser} setCurrentUser={setCurrentUser} /> : <Navigate to="/login" />}
          />

          {/* newly added route so that we can get to view our pages */}
          <Route 
            path="/memories/new"
            element={<NewMemories />}
          />

          <Route 
            path="/memories/:id"
            element={<Memory />}
          />

          {/* conditionally render auth locked routes */}
          <Route 
            path="/memories"
            element={ <Memories  /> }
          />

          <Route 
            path="/memories/:id/edit"
            element={ <EditMemories  /> }
          />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
