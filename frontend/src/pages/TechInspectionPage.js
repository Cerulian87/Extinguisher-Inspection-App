import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

const TechInspectionPage = () => {

    let [extinguishers, setExtinguishers] = useState([])
    let {authTokens} = useContext(AuthContext)

    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search)
    const ext_id = searchParams.get('ext_id')

  return (
    <div>
        <div>
            <h1>
            Technician Extinguisher Inspection
            </h1>
            </div>
            <div>
                <h3>
                    Inspection for Warehouse Extinguisher: {ext_id}
                </h3>
            </div>
            <div>
                <p>Have all warehouse inspections successfully passed?</p>
                <button>Yes</button>
                <button>No</button>
            </div>
        </div>
  )
}

export default TechInspectionPage