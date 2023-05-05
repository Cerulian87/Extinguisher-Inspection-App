import React, { useState, useEffect, useContext } from 'react';
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
        const response = await fetch(`http://127.0.0.1:8000/api/maintExtinguisher/${ext_id}/`, {
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
            console.error(`Failed to update extinguisher status: ${response.status}`)
        }
    } catch (err) {
        console.error('Error updating extinguisher status:', err)
    }
}}


  return (
    <div>
        <div>
            <h1>
                Maintainer's Inspection of Ext: {ext_id}
            </h1>
        </div>
        <div>
            <p>Has the Extinguisher been replaced?</p>
            <label>
                <input
                    type="radio"
                    value="yes"
                    checked={extStatus === "yes"}
                    onChange={() => setExtStatus("yes")} />
                    Yes
            </label>
            <label>
                <input
                    type="radio"
                    value="no"
                    checked={extStatus === "no"}
                    onChange={() => setExtStatus("no")} />
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

export default MaintExtinguisherInspection