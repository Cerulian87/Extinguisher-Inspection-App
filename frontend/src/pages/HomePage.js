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
        <p>You're logged into the HomePage</p>
        <p><Link to="/inspectorpage">Inspector Page</Link></p>
        <p><Link to="/inspection">Inspection Page</Link></p>
        <p><Link to="/maintainerpage">Maintainer Page</Link></p>
        <p><Link to="/supervisorpage">Supervisor Page</Link></p>
        <p><Link to="/technicianpage">Technician Page</Link></p>

        <ul>
            {extstatuses.map((extstatus, id) => (
                <li key={id}>{extstatus.notes}</li>
            ))}
        </ul>
    </div>
  )
}

export default HomePage