import React, { useState, useEffect, useContext } from 'react'
import AuthContext from '../context/AuthContext'
import { Link } from 'react-router-dom'

const HomePage = () => {
    // this is an example for rendering items from the backend
    let [extstatuses, setextstatuses] = useState([])
    let {authTokens} = useContext(AuthContext)

    useEffect(() => {
        getExtStatuses()
    }, [])

    const getExtStatuses = async() => {
        const response = await fetch('http://127.0.0.1:8000/api/myBoxes/', {
            method: 'GET',
            headers: {
                'Content-Type':'application/json',
                'Authorization':'Bearer ' + String(authTokens.access)
            }
        })
        let data = await response.json()
        setextstatuses(data)
    }

  return (
    <div>
        <p className='text-4xl font-bold my-3'>You're logged into the HomePage</p>
        <div className='text-cyan-300'>
        <p><Link to="/inspectorpage">Inspector Page</Link></p>
        <p><Link to="/inspection">Inspection Page</Link></p>
        <p><Link to="/maintainerpage">Maintainer Page</Link></p>
        <p><Link to="/supervisorpage">Supervisor Page</Link></p>
        <p><Link to="/technicianpage">Technician Page</Link></p>
        </div>
       
    </div>
  )
}

export default HomePage