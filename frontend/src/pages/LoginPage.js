import React, {useContext} from 'react'
import AuthContext from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {

    let navigate = useNavigate();
    const routeChange = () => {
      let path = '/register';
      navigate(path);
    };
    let {loginUser} = useContext(AuthContext)


  return (

    <div className='flex flex-col items-center justify-center h-screen'>
        <form onSubmit={loginUser} >
            <div>
                <input className='text-black bg-white bg-opacity-80 text-center p-1 rounded border border-teal-400 hover:border-red-600 hover:bg-opacity-100 focus:bg-opacity-100 shadow-md mb-1' type='text' name='username' placeholder='Enter Username' />
                </div>
                <div>
                <input className='text-black bg-white bg-opacity-80 text-center p-1 rounded border border-teal-400 hover:border-red-600 hover:bg-opacity-100 focus:bg-opacity-100 shadow-md my-2' type='password' name='password' placeholder='Enter Password' />
            </div>
            <input className='bg-blue-500 text-white text-sm font-bold py-1 px-2 rounded-md hover:cursor-pointer mb-2 shadow-lg shadow-opacity-50 hover:bg-blue-700' type='submit' />
        </form>
            <div>
            <button className='flex items-center justify-center bg-blue-500 text-white text-sm font-bold py-1 px-2 shadow-lg shadow-opacity-50 hover:bg-blue-700 rounded-md' onClick={routeChange} onSubmit={e  => {e.preventDefault();}}>Register</button>
            </div>
    </div>
  )
}

export default LoginPage