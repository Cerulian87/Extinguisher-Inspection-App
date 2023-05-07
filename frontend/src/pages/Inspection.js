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
    
   <div className='flex flex-col items-center'> 

    <h1 class="text-3xl font-bold mb-8">Inspection Checklist</h1>
    <div class="w-full">
        <ul class="gap-4">
            {checklist.map((item, id) => (
                <li class="flex items-center" key={id}>
                    <p class="flex-1 text-lg font-medium">{item.list_item}</p>
                    {item.file_txt && <img src={item.file_txt} alt="Checklist Image" class="w-48 h-auto ml-4 m-3"/>}
                    <div class="flex flex-col items-center justify-center">
                        {item.options.map((option, index) => (
                            <label class="flex items-center mr-3 hover:cursor-pointer" key={index}>
                                <input 
                                    type="radio"
                                    value={option.value}
                                    checked={item.selectedOption === option.value}
                                    onChange={() => setChecklist(prevState => prevState.map((prevItem, itemIndex) => itemIndex === id ? {...prevItem, selectedOption: option.value} : prevItem))}
                                    class="mr-2"
                                />
                                <span class="text-lg">{option.label}</span>
                            </label>
                        ))}
                    </div>
                </li>
            ))}
        </ul>
    </div>
    <div class="flex justify-center mt-8">
        <button class="bg-blue-500 text-white text-sm font-bold py-1 px-2 shadow-lg shadow-opacity-50 hover:bg-blue-700 hover:py-2 hover:px-3 rounded-md mr-3 mb-5" onClick={handleCancel}>Cancel</button>
        <button class="bg-blue-500 text-white text-sm font-bold py-1 px-2 shadow-lg shadow-opacity-50 hover:bg-blue-700 hover:py-2 hover:px-3 rounded-md mb-5" onClick={handleSubmit}>Submit</button>
    </div>  

    </div>
       
  )
}

export default Inspection