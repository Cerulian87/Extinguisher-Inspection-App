import React, { useState, useEffect, useContext } from 'react'
import AuthContext from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

const Inspection = () => {

  let [checklist, setChecklist] = useState([])
  let [extinguishers, setExtinguishers] = useState([])
  let [boxes, setBoxes] = useState([])
  let [anyFail, setAnyFail] = useState(false)
  let {authTokens} = useContext(AuthContext)

  const navigate = useNavigate()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const ext_id = searchParams.get('ext_id')
  // console.log(ext_id)


  useEffect(() => {
    getChecklist()    
  }, [])

  useEffect(() => {
    getExtinguishers()
  }, [])

  useEffect(() => {
    getBoxes()
  }, [extinguishers])
 

  const initialItemState = {
    list_item: '',
    file_txt: '',
    // pass: false,
    // fail: false
    selectedOption: [],
    options: [
      { label: 'Pass', value: 'pass' },
      { label: 'Fail', value: 'fail' }
    ]
  }


  const startBoxInspection = async (boxId) => {
    try {
      navigate({
        pathname: '/boxInspection',
        search: `?box_id=${boxId}`
      });
    } catch (err) {
      console.error('Error getting box id:', err);
    }
  };


  const getChecklist = async() => {
    const response = await fetch('http://127.0.0.1:8000/api/checklist/', {
      method: 'GET',
      headers: {
        'Content-Type':'application/json',
        'Authorization':'Bearer ' + String(authTokens.access)
      }
    })
    let data = await response.json()
    setChecklist(data.map(item => ({...initialItemState, ...item})))
  }

  const handleCancel = () => {
    navigate('/inspectorpage')
  }

  const getExtinguishers = async() => {
    const response = await fetch('http://127.0.0.1:8000/api/extinguishers/', {
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
    const response = await fetch('http://127.0.0.1:8000/api/box', {
      method: 'GET',
      headers: {
        'Content-Type':'application/json',
        'Authorization':'Bearer ' + String(authTokens.access)
      }
    })
    let data = await response.json()
    data = data.filter(box => {
      return extinguishers.some(extinguisher => extinguisher.box_id === box.box_id)
    })
    setBoxes(data)
    // console.log(data)
  }


const handleSubmit = async () => {
  if (window.confirm('Are you sure you want to submit the inspection?')) {

  try {
    const extinguisher = extinguishers.find(ext => ext.ext_id === ext_id);
    if (!extinguisher) {
      console.log(`Extinguisher not found with ID ${ext_id}`);
      return;
    }

    const box = boxes.find(box => box.box_id === extinguisher.box_id);
    if (!box) {
      console.log(`Box not found for extinguisher with ID ${ext_id}`);
      return;
    }
    
    const response = await fetch(`http://127.0.0.1:8000/api/extinguishers/${ext_id}/`, {
      method: 'PATCH',
      headers: {
        'Content-Type':'application/json',
        'Authorization':'Bearer ' + String(authTokens.access)
      },
      body: JSON.stringify({
        selectedOptions: checklist.map(item => item.selectedOption)
      })
    });
    if (!response.ok) {
      console.log('Failed to update extinguisher status');
    }

    startBoxInspection(box.box_id);
    
  } catch (err) {
    console.error('Error updating extinguisher status:', err);
  }

  try {
    const response = await fetch(`http://127.0.0.1:8000/api/inspector-assignments/${ext_id}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type':'application/json',
        'Authorization':'Bearer ' + String(authTokens.access)
      }
    });
    if (response.ok) {
      // navigate('/inspectorpage');
      // startBoxInspection(box.box_id);
    } else {
      console.log('Failed to delete extinguisher from assignments');
    }
  } catch (err) {
    console.error('Error deleting extinguisher from assignments:', err);
} 
}};


  return (
    
   <div> 
    <h1>
    Inspection Checklist 
    </h1>
    <div>
      <ul>

        {checklist.map((item, id) => (
          <li key={id}>
            {item.list_item}
            {item.file_txt && <img src={item.file_txt} alt="Checklist Image" />}
            {item.options.map((option, index) => (
            <label key={index}>
        <input 
          type="radio"
          value={option.value}
          checked={item.selectedOption === option.value}
          onChange={() => setChecklist(prevState => prevState.map((prevItem, itemIndex) => itemIndex === id ? {...prevItem, selectedOption: option.value} : prevItem))}
        />
        {option.label}
      </label>
    ))}
  </li>
))}
<br />
        
      </ul>
    </div>
    <div>
      <button onClick={handleCancel}>Cancel</button>
      <button onClick={handleSubmit}>Submit</button>
    </div>  
    </div>
       
  )
}

export default Inspection