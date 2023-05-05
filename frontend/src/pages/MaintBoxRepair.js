import React, { useState, useEffect, useContext } from 'react';
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
    <div>
        <div>
            <h1>Maintainer Box Repair for Box: {box_id}</h1>
        </div>
        <div>
            <p>Has the Box been repaired?</p>
            <label>
                <input
                    type="radio"
                    value="yes"
                    checked={boxStatus === "yes"}
                    onChange={() => setBoxStatus("yes")} />
                    Yes
            </label>
            <label>
                <input
                    type="radio"
                    value="no"
                    checked={boxStatus === "no"}
                    onChange={() => setBoxStatus("no")} />
                    No
            </label>
        </div>
        <div>
            <button onClick={handleCancel}>Cancel</button>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    </div>
  )
}

export default MaintBoxRepair