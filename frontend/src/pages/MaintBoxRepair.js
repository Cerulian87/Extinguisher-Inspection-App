import React, { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';


const MaintBoxRepair = () => {

    let [boxStatus, setBoxStatus] = useState('')
    let {authTokens} = useContext(AuthContext)

    const navigate = useNavigate()
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const box_id = searchParams.get('box_id')

    const handleCancel = () => {
        navigate('/maintainerpage')
    }

    const handleSubmit = async () => {
        if (window.confirm('Are you sure you want to submit the inspection?')) {
        try {
            let status_id = boxStatus === "yes" ? "1" : "2";
            const response = await fetch(`http://127.0.0.1:8000/api/box/${box_id}/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type':'application/json',
                    'Authorization':'Bearer ' + String(authTokens.access)
                },
                body: JSON.stringify({
                    status_id,
                })
            });
            if (response.ok) {
                navigate('/maintainerpage');
            } else {
                console.error(`Failed to update box status: ${response.status}`)
            }
        } catch (err) {
            console.error('Error updating box status:', err)
        }
    }}


  return (
    <div className='items-center'>
        <div>
            <h1 className='text-3xl font-bold mb-8'>Maintainer Box Repair for Box:<span className=' bg-gradient-to-br from-violet-500 to-blue-700 absolute rounded transform rotate-3'>{box_id}</span></h1>
        </div>
        <div>
            <p class='font-medium'>Has the Box been repaired?</p>
            <label className='flex items-center justify-center hover:cursor-pointer'>
                <input
                    type="radio"
                    value="yes"
                    checked={boxStatus === "yes"}
                    onChange={() => setBoxStatus("yes")} />
                    Yes
            </label>
            <label className='flex items-center justify-center hover:cursor-pointer'>
                <input
                    type="radio"
                    value="no"
                    checked={boxStatus === "no"}
                    onChange={() => setBoxStatus("no")} />
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

export default MaintBoxRepair