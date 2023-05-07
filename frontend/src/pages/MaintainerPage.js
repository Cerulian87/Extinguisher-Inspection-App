import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';


const MaintainerPage = () => {

  let [extinguishers, setExtinguishers] = useState([])
  let [boxes, setBoxes] = useState([])
  let [floorplans, setFloorplans] = useState([])
  let [activeFloorplan, setActiveFloorplan] = useState(null)
  let {authTokens} = useContext(AuthContext)

  const navigate = useNavigate();

  const startInspection = (ext_id) => {
    navigate({
      pathname: '/maintExtinguisher',
      search: `?ext_id=${ext_id}`
    });
  }

  const startBoxInspection = (box_id) => {
    navigate({
      pathname: '/maintBox',
      search: `?box_id=${box_id}`
    })
  }

  useEffect(() => {
    getExtinguishers()
  }, [])

  useEffect(() => {
    getBoxes()
  }, [])

  useEffect(() => {
    getFloorplans()
  }, [])

  const getExtinguishers = async() => {
    const response = await fetch('http://127.0.0.1:8000/api/extinguishers/', {
      method: 'GET',
      headers: {
        'Content-Type':'application/json',
        'Authorization':'Bearer ' + String(authTokens.access)
      }
    })
    let data = await response.json()
    data = data.filter(extinguisher => extinguisher.status_id === "2")
    setExtinguishers(data)
  }

  const getBoxes = async() => {
    const response = await fetch('http://127.0.0.1:8000/api/box/', {
      method: 'GET',
      headers: {
        'Content-Type':'application/json',
        'Authorization':'Bearer ' + String(authTokens.access)
      }
    })
    let data = await response.json()
    data = data.filter(box => box.status_id === "2")
    setBoxes(data)
  }

  const sortedExtinguishers = [...extinguishers].sort((a, b) => 
    a.ext_id.localeCompare(b.ext_id))

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
    <div className='h-screen overflow-y-hidden'>
      <h1 className='text-3xl font-bold mb-5'>Maintainer Page</h1>

      <div className='overflow-y-hidden grid grid-cols-4 gap-4 h-full'>
      <div className='p-4 col-span-1'>
        <h3 className='text-xl font-bold mb-2 mt-8'>
          Extinguishers that need replaced:
        </h3>
        <ul>
          {sortedExtinguishers.map((extinguisher, id) => (
            <li key={id} className='App-link hover:font-bold' onClick={() => startInspection(extinguisher.ext_id)}>
              Ext: {extinguisher.ext_id} ({extinguisher.box_id})
            </li>
          ))}
        </ul>
        <div>
          <h3 className='text-xl font-bold mb-2 mt-8'>
            Boxes that need repaired:
          </h3>
          <ul>
            {boxes.map((box, id) => (
              <li key={id} className='App-link hover:font-bold' onClick={() => startBoxInspection(box.box_id)}>
                {box.box_id}
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className='p-4 col-span-3'>
      <h3 className='text-lg font-bold mb-2'>
        Map
      </h3>
        
        <div className='flex justify-end w-full h-auto'>
          {activeFloorplan && <img src={`http://127.0.0.1:8000/api${activeFloorplan.file_txt}`} alt="Floorplan Image" className='flex max-w-full h-auto overflow-hidden'/>}
        </div>

          <div className='absolute right-1 top-28 h-full flex flex-col justify-between'>
          <ul className='my-20'>
            {floorplans.map((floorplan, id) => (
              <li key={id}> 
                
               <button onClick={() => handleFloorplanClick(floorplan)} className='bg-blue-500 text-white shadow-gray-700 shadow-md hover:shadow-gray-700 hover:shadow-lg  py-1 px-2 mb-1 rounded-md hover:bg-blue-700 text-sm font-bold w-full h-full' >{id + 1}</button>
              </li>

            ))}
          </ul>


        </div>
        </div>
      </div>
      </div>
  )
}

export default MaintainerPage