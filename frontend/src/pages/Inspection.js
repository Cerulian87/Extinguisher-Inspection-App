import React, { useState, useEffect, useContext } from 'react'
import AuthContext from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

// This is where the inspection checklist will be

// import { useNavigate} from "react-router-dom";


const Inspection = () => {

  let [checklist, setChecklist] = useState([])
  let {authTokens} = useContext(AuthContext)

  const navigate = useNavigate()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const ext_id = searchParams.get('ext_id')
  console.log(ext_id)


  useEffect(() => {
    getChecklist()    
  }, [])

  const initialItemState = {
    list_item: '',
    file_txt: '',
    // pass: false,
    // fail: false
    selectedOption: null,
    options: [
      { label: 'Pass', value: 'pass' },
      { label: 'Fail', value: 'fail' }
    ]
  }

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

  const handleSubmit = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/inspector-assignments/${ext_id}/`, {
        method: 'DELETE',
        headers: {
          'Content-Type':'application/json',
          'Authorization':'Bearer ' + String(authTokens.access)
        }
      });
      if (response.ok) {
        navigate('/inspectorpage');
      } else {
        console.log('Failed to delete extinguisher from assignments');
      }
    } catch (err) {
      console.error('Error deleting extinguisher from assignments:', err);
    }
  };

  return (
    
   <div> 
    Inspection Checklist Goes Here
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