import React, { useState, useEffect, useContext } from 'react'
import AuthContext from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

const InspectorPage = () => {

  let [extinguishers, setExtinguishers] = useState([])
  let [boxes, setBoxes] = useState([])
  let [floorplans, setFloorplans] = useState([])
  let [activeFloorplan, setActiveFloorplan] = useState(null)
  let {authTokens} = useContext(AuthContext)

  const navigate = useNavigate()
  const location = useLocation()


  const startInspection = (ext_id) => {
    navigate({
      pathname: '/inspection',
      search: `?ext_id=${ext_id}`
    });
  }

  const startBoxInspection = (box_id) => {
    navigate({
      pathname: '/boxInspection',
      search: `?box_id=${box_id}`
    })
  }

  useEffect(() => {
    getExtinguishers()
  }, [])

  // Waits till extinguishers is finished before calling this hook  
  useEffect(() => {
    getBoxes()
  }, [extinguishers])

  useEffect(() => {
    getFloorplans()
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

  const getBoxes = async() => {
    const response = await fetch('http://127.0.0.1:8000/api/extinguishers', {
      method: 'GET',
      headers: {
        'Content-Type':'application/json',
        'Authorization':'Bearer ' + String(authTokens.access)
      }
    })
    let data = await response.json()
    data = data.filter(box => {
      return extinguishers.some(extinguisher => extinguisher.ext_id === box.ext_id)
    })
    setBoxes(data)
  }

  const sortedExtinguishers = [...extinguishers].sort((a, b) => 
    a.ext_id.localeCompare(b.ext_id))

  const sortedBoxes = [...boxes].sort((a, b) =>
    a.box_id.localeCompare(b.box_id))

    const getFloorplans = async() => {
      const response = await fetch('http://127.0.0.1:8000/api/floorplan/', {
        method: 'GET',
        headers: {
          'Content-Type':'application/json',
          'Authorization':'Bearer ' + String(authTokens.access)
        }
      })
      let data = await response.json()
      setFloorplans(data)
      setActiveFloorplan(data[0])
    }

    const handleFloorplanClick = (floorplan) => {
      setActiveFloorplan(floorplan)
    }

  


  return (
    <div className='no-scrollbar h-screen overflow-y-hidden'>
      <h1 className='text-3xl font-bold mb-5'>Inspector Page</h1>
      <div className='no-scrollbar overflow-y-hidden grid grid-cols-4 gap-4 h-full'>

<div className='no-scrollbar p-4 col-span-1'>
    <h3 className='no-scrollbar text-xl font-bold mb-2 mt-8'>Extinguisher Assignments</h3>
    <ul>
      {sortedExtinguishers.map((extinguisher, id) => (
        <li key={id} className='App-link hover:font-bold' onClick={() => startInspection(extinguisher.ext_id)}>Ext: {extinguisher.ext_id}</li>
      ))}
    </ul>
  </div>

  <div className='p-4 col-span-3'>
    <h3 className='text-xl font-bold mb-2'>Map</h3>
    <div className='flex justify-end w-full h-auto'>
      {activeFloorplan && <img src={`http://127.0.0.1:8000/api${activeFloorplan.file_txt}`} alt='Floorplan Image' className='flex max-w-full h-auto overflow-hidden' />}
    </div>

    <div className='absolute right-1 top-28 h-full flex flex-col justify-between'>
      <ul className='my-20'>
        {floorplans.map((floorplan, id) => (
          <li key={id}>
            <button onClick={() => handleFloorplanClick(floorplan)} className='bg-blue-500 text-white shadow-gray-700 shadow-md hover:shadow-gray-700 hover:shadow-lg py-1 px-2 mb-1 rounded-md hover:bg-blue-700 text-sm font-bold w-full h-full'>{id + 1}</button>
          </li>
        ))}
      </ul>
    </div>
  </div>
  </div>
                
      </div>
  )
}

export default InspectorPage