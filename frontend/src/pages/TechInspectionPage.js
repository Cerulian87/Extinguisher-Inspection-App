import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

const TechInspectionPage = () => {

    let [extinguishers, setExtinguishers] = useState([])
    let [status, setStatus] = useState('')
    let {authTokens} = useContext(AuthContext)

    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search)
    const ext_id = searchParams.get('ext_id')

    const handleCancel = () => {
        navigate('/technicianpage')
    }

    const handleSubmit = async () => {
  if (window.confirm('Are you sure you want to submit the inspection?')) {
    try {
        let warehouse_status = status === "Pass" ? 'Pass' : "Fail";
        const response = await fetch(`http://127.0.0.1:8000/api/warehouseInspections/${ext_id}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type':'application/json',
                'Authorization':'Bearer ' + String(authTokens.access)
            },
            body: JSON.stringify({
                warehouse_status,
            })
        });
        if (response.ok) {
            console.log(warehouse_status)
            navigate('/technicianpage');
        } else {
            console.error(`Failed to update extinguisher status: ${response.status}`)
        }
    } catch (err) {
        console.error('Error updating extinguisher status:', err)
    }
}}

  return (
    <div className='items-center'>
        <div>
            <h1 className='text-3xl font-bold mb-8'>
            Technician Extinguisher Inspection
            </h1>
            </div>
            <div>
                <h3 className='text-2xl font-bold mb-8'>
                    Inspection for Warehouse Extinguisher:<span className=' bg-gradient-to-br from-violet-500 to-blue-700 absolute rounded transform rotate-3'>{ext_id}</span>
                </h3>
               
            </div>
            <div>
                <p className='font-medium'>Have all warehouse inspections successfully passed or was the extinguisher successfully repaired?</p>
            </div>
            <div>
                 <label className='flex items-center justify-center hover:cursor-pointer'>
                <input
                    type="radio"
                    value="Pass"
                    checked={status === "Pass"}
                    onChange={() => setStatus("Pass")} />
                    Yes
                </label>
                <label className='flex items-center justify-center hover:cursor-pointer'>
                <input
                    type="radio"
                    value="Fail"
                    checked={status === "Fail"}
                    onChange={() => setStatus("Fail")} />
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

export default TechInspectionPage