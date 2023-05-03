import React, { useState, useEffect, useContext } from 'react'
import AuthContext from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

const InspectorPage = () => {

  let [extinguishers, setExtinguishers] = useState([])
  let {authTokens} = useContext(AuthContext)

  const navigate = useNavigate()
  const location = useLocation()

  // const startInspection = () => {
  //   navigate('/inspection');
  // }

  const startInspection = (ext_id) => {
    navigate({
      pathname: '/inspection',
      search: `?ext_id=${ext_id}`
    });
  }

  useEffect(() => {
    getExtinguishers()
  }, [])

  const getExtinguishers = async() => {
    const response = await fetch('http://127.0.0.1:8000/api/myInspections/', {
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
      InspectorPage
      <div>
        Extinguisher Assignments
        <div>
          <ul>
            {extinguishers.map((extinguisher, id) => (
              <li key={id} className='App-link' onClick={() => startInspection(extinguisher.ext_id)}>{extinguisher.ext_id}</li>
            ))}
          </ul>
        {/* <button onClick={startInspection}>Start</button> */}
        </div>
      </div>
      <section>
        Maybe add Map here?
      </section>
      </div>
  )
}

export default InspectorPage