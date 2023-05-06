import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

const TechnicianPage = () => {

  let [extinguishers, setExtinguishers] = useState([])
  let {authTokens} = useContext(AuthContext)

  const navigate = useNavigate()

  useEffect(() => {
    getExtinguishers()
  }, [])

  const startInspection = (ext_id) => {
    navigate({
      pathname: '/techInspectionPage',
      search: `?ext_id=${ext_id}`
    })
  }

  const getExtinguishers = async() => {
    const response = await fetch('http://127.0.0.1:8000/api/techInspections/', {
      method: 'GET',
      headers: {
        'Content-Type':'application/json',
        'Authorization':'Bearer ' + String(authTokens.access)
      }
    })
    let data = await response.json()
    setExtinguishers(data)
  }

  return (
    <div>
      <div>
        <h1>
          TechnicianPage
          </h1>

          </div>
          <div>
            <h3>
              Extinguishers Pending Inspection
            </h3>
            <ul>
              {extinguishers.map((extinguisher, id) => (
                <li key={id} className='App-link' onClick={() => startInspection(extinguisher.ext_id)}>{extinguisher.ext_id}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3>
              Ready Extinguishers
            </h3>
          </div>
          <div>
            <h3>
              End of Life Extinguisher
            </h3>
          </div>
      
      </div>
  )
}

export default TechnicianPage