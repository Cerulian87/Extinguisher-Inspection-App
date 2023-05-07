import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'



const Header = () => {
    let {user, logoutUser} = useContext(AuthContext)
  return (
    <div className='py-4 text-white'>
      <div className='text-purple-700'>
        <Link to="/" className='hover:text-purple-400 hover:font-bold'>Home</Link>
        <span className='text-white'>  |  </span>

        {user ? (
            // <p onClick={logoutUser}>Logout</p>
            <Link onClick={logoutUser} className='hover:text-purple-400 hover:font-bold'>Logout</Link>
            // <button type="button" onClick={logoutUser}>Logout</button>
            
        ): (
           <Link to="/login" className='hover:font-bold hover:text-purple-400'>Login</Link> 
        )}
        {/* <Link to="/login">Login</Link> */}
        
        
        </div>
        <div>
        {user && <span >Hello <span class="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-teal-500 relative inline-block"> <span class="relative text-white">
          {user.username.charAt(0).toUpperCase() + user.username.slice(1)}</span>
          </span>
          </span>}
        </div>
    </div>
  )
}

export default Header