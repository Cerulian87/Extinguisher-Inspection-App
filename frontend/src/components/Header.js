import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'



const Header = () => {
    let {user, logoutUser} = useContext(AuthContext)
  return (
    <div>
        <Link to="/">Home</Link>
        <span>  |  </span>

        {user ? (
            // <p onClick={logoutUser}>Logout</p>
            <Link onClick={logoutUser}>Logout</Link>
            // <button type="button" onClick={logoutUser}>Logout</button>
            
        ): (
           <Link to="/login">Login</Link> 
        )}
        {/* <Link to="/login">Login</Link> */}
        
        
        
        {user && <p>Hello {user.username.charAt(0).toUpperCase() + user.username.slice(1)}</p>}
    </div>
  )
}

export default Header