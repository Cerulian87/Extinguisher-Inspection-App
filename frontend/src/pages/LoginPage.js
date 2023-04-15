import React, {useContext} from 'react'
import AuthContext from '../context/AuthContext'

const LoginPage = () => {
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
            <input type='submit' />
        </form>
    </div>
  )
}

export default LoginPage