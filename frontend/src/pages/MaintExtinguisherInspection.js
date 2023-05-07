import React, { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';


const MaintExtinguisherInspection = () => {

let [extStatus, setExtStatus] = useState('')
let {authTokens} = useContext(AuthContext)

const navigate = useNavigate()
const location = useLocation()
const searchParams = new URLSearchParams(location.search)
const ext_id = searchParams.get('ext_id')

const handleCancel = () => {
    navigate('/maintainerpage')
}


const handleSubmit = async () => {
  if (window.confirm('Are you sure you want to submit the inspection?')) {
    try {
      let status_id = extStatus === "yes" ? "1" : "2";
      const response1 = await fetch(`http://127.0.0.1:8000/api/maintExtinguisher/${ext_id}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type':'application/json',
          'Authorization':'Bearer ' + String(authTokens.access)
        },
        body: JSON.stringify({
          status_id,
        })
      });
      if (!response1.ok) {
        console.error(`Failed to update extinguisher status: ${response1.status}`)
        return;
      }

      const response2 = await fetch('http://127.0.0.1:8000/api/sendExtinguisherToTech/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + String(authTokens.access)
        },
        body: JSON.stringify({
          ext_id,
          status_id,
          model_number: 'old',
          warehouse_status: 'pending'
        })
      });
      if (!response2.ok) {
        console.error(`Failed to create tech assignment: ${response2.status}`)
        return;
      }

      navigate('/maintainerpage');
    } catch (err) {
      console.error('Error updating extinguisher status and creating tech assignment:', err)
    }
  }
}


  return (
    <div className='items-center'>
        <div>
            <h1 className='text-3xl font-bold mb-8'>
                Maintainer's Inspection of Ext: <span className=' bg-gradient-to-br from-violet-500 to-blue-700 absolute rounded transform rotate-3'>{ext_id}</span>
            </h1>
        </div>
        <div>
            <p className='font-medium'>Has the Extinguisher been replaced?</p>
            <label className='flex items-center justify-center mt-5 hover:cursor-pointer'>
                <input
                    type="radio"
                    value="yes"
                    checked={extStatus === "yes"}
                    onChange={() => setExtStatus("yes")} />
                    Yes
            </label>
            <label className='flex items-center justify-center hover:cursor-pointer'>
                <input
                    type="radio"
                    value="no"
                    checked={extStatus === "no"}
                    onChange={() => setExtStatus("no")} />
                    No
            </label>
        </div>
        <div className='flex justify-center mt-8'>
            <button class="bg-blue-500 text-white text-sm font-bold py-1 px-2 shadow-lg shadow-opacity-50 hover:bg-blue-700 hover:py-2 hover:px-3 rounded-md mr-3" onClick={handleCancel}>Cancel</button>
            <button class="bg-blue-500 text-white text-sm font-bold py-1 px-2 shadow-lg shadow-opacity-50 hover:bg-blue-700 hover:py-2 hover:px-3 rounded-md" onClick={handleSubmit}>Submit</button>
        </div>
        </div>
  )
}

export default MaintExtinguisherInspection