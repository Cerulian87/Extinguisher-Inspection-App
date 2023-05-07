import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const TechnicianPage = () => {

  let [extinguishers, setExtinguishers] = useState([])
  let [passExtinguishers, setPassExtinguishers] = useState([])
  let [failExtinguishers, setFailExtinguishers] = useState([])
  let {authTokens} = useContext(AuthContext)

  const navigate = useNavigate()

  const handleExtinguisherForm = () => {
    navigate('/extinguisherForm')
  }

  useEffect(() => {
    getExtinguishers()
  }, [])

  useEffect(() => {
    getPassExtinguishers()
  }, [])

  useEffect(() => {
    getFailExtinguishers()
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
    data = data.filter(extinguisher => extinguisher.warehouse_status === "Pending")
    setExtinguishers(data)
  }

  const getPassExtinguishers = async() => {
    const response = await fetch('http://127.0.0.1:8000/api/techInspections/', {
      method: 'GET',
      headers: {
        'Content-Type':'application/json',
        'Authorization':'Bearer ' + String(authTokens.access)
      }
    })
    let data = await response.json()
    data = data.filter(passExtinguisher => passExtinguisher.warehouse_status === "Pass")
    setPassExtinguishers(data)
  }

  const getFailExtinguishers = async() => {
    const response = await fetch('http://127.0.0.1:8000/api/techInspections/', {
      method: 'GET',
      headers: {
        'Content-Type':'application/json',
        'Authorization':'Bearer ' + String(authTokens.access)
      }
    })
    let data = await response.json()
    data = data.filter(failExtinguisher => failExtinguisher.warehouse_status === "Fail")
    setFailExtinguishers(data)
  }

  return (
    <div className='items-center h-screen'>

          <h1 className='text-3xl font-bold mb-14'>
          Technician Page
          </h1>

      <div className='grid grid-cols-3 gap-4'>
        

          <div className='col-span-1'>
            <h3 className='text-xl font-bold mb-4'>
              Extinguishers Pending Inspection
            </h3>
            <ul className='hover:font-bold mb-8'>
              {extinguishers.map((extinguisher, id) => (
                <li key={id} className='App-link' onClick={() => startInspection(extinguisher.ext_id)}>{extinguisher.ext_id} ({extinguisher.model_number}) {extinguisher.warehouse_status}</li>
              ))}
            </ul>
          </div>
          <div className='col-span-1'>
            <h3 className='text-xl font-bold mb-4'>
              Ready Extinguishers
            </h3>
            <ul className='hover:font-bold mb-8 font-bold text-emerald-400'>
              {passExtinguishers.map((extinguisher, id) => (
                <li key={id}>{extinguisher.ext_id} ({extinguisher.model_number}) {extinguisher.warehouse_status}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className='text-xl font-bold mb-4'>
              End of Life Extinguisher
            </h3>
            <ul className='hover:font-bold mb-8 text-rose-500 font-bold'>
              {failExtinguishers.map((extinguisher, id) => (
                <li key={id}>{extinguisher.ext_id} ({extinguisher.model_number}) {extinguisher.warehouse_status}</li>
              ))}
            </ul>
          </div>
          </div>
          <div className='flex justify-center mt-8'>
            <button class="bg-blue-500 text-white text-sm font-bold py-1 px-2 shadow-lg shadow-opacity-50 hover:bg-blue-700 hover:py-2 hover:px-3 rounded-md" onClick={handleExtinguisherForm}>Add New Extinguisher</button>
          </div>
      
      </div>
  )
}

export default TechnicianPage