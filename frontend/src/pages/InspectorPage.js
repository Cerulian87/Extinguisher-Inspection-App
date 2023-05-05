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
    <div>
      <h1>
      InspectorPage
      </h1>

      {/* <div>
        <h3>
          Boxes
        </h3>
      </div>
      <div>
        <ul>
          {sortedBoxes.map((box, id) => (
            <li key={id} className='App-link' onClick={() => startBoxInspection(box.box_id)}>{box.box_id}</li>
          ))}
        </ul>
      </div> */}

      <div>
        <h3>
        Extinguisher Assignments
        </h3>
        <div>
          <ul>
            {sortedExtinguishers.map((extinguisher, id) => (
              <li key={id} className='App-link' onClick={() => startInspection(extinguisher.ext_id)}>Ext: {extinguisher.ext_id}</li>
            ))}
          </ul>
        </div>
      </div>

      <section>
        <h3>
          Map
        </h3>
        <div>
          <ul>
            {floorplans.map((floorplan, id) => (
              <li key={id}>
               <button onClick={() => handleFloorplanClick(floorplan)}>Floor {id + 1}</button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          {activeFloorplan && <img src={`http://127.0.0.1:8000/api${activeFloorplan.file_txt}`} alt="Floorplan Image" />}
        </div>
      </section> 
                
      </div>
  )
}

export default InspectorPage