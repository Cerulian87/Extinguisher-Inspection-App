import React, {useContext} from 'react'
import AuthContext from '../context/AuthContext'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {

    let navigate = useNavigate();
    const routeChange = () => {
      let path = '/register';
      navigate(path);
    };
    let {loginUser} = useContext(AuthContext)
  return (
    <div>
        <form onSubmit={loginUser}>
            <div>
                <input type='text' name='username' placeholder='Enter Username' />
                </div>
                <div>
                <input type='password' name='password' placeholder='Enter Password' />
            </div>
            {/* <Link to="/register">Register</Link> */}
            {/* <button onClick={routeChange} onSubmit={e  => {e.preventDefault();}}>Register</button> */}
            <input type='submit' />
        </form>

            <button onClick={routeChange} onSubmit={e  => {e.preventDefault();}}>Register</button>
    </div>
  )
}

export default LoginPage