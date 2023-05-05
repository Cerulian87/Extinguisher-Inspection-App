import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';


const MaintainerPage = () => {

  let [extinguishers, setExtinguishers] = useState([])
  let [boxes, setBoxes] = useState([])
  let [floorplans, setFloorplans] = useState([])
  let [activeFloorplan, setActiveFloorplan] = useState(null)
  let {authTokens} = useContext(AuthContext)

  const navigate = useNavigate();
  const location = useLocation();

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
    <div>
      <h1>MaintainerPage</h1>
      <div>
        <h3>
          Extinguishers that need replaced:
        </h3>
        <ul>
          {sortedExtinguishers.map((extinguisher, id) => (
            <li key={id} className='App-link' onClick={() => startInspection(extinguisher.ext_id)}>
              Ext: {extinguisher.ext_id} ({extinguisher.box_id})
            </li>
          ))}
        </ul>
        <div>
          <h3>
            Boxes that need repaired:
          </h3>
          <ul>
            {boxes.map((box, id) => (
              <li key={id} className='App-link' onClick={() => startBoxInspection(box.box_id)}>
                {box.box_id}
              </li>
            ))}
          </ul>
        </div>
      </div>
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
      
      </div>
  )
}

export default MaintainerPage