import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const SupervisorPage = () => {

  let [extinguishers, setextinguishers] = useState([])
  let [selectedExtinguishers, setSelectedExtinguishers] = useState([])
  let [inspectors, setInspectors] = useState([])
  let [selectedInspector, setSelectedInspector] = useState([])
  let [username, setUsername] = useState('')
  const [refreshData, setRefreshData] = useState(false);
  let {authTokens} = useContext(AuthContext)

  const navigate = useNavigate()

  useEffect(() => {
    getExtinguishers()
  }, [])

  useEffect(() => {
    getInspectors()
  }, [])


  const getExtinguishers = async () => {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/extinguishers', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + String(authTokens.access),
      },
    });
    if (!response.ok) {
      throw new Error('Failed to retrieve extinguishers');
    }
    const data = await response.json();
    const assignedExtinguisherIds = await getExtinguishersInAssignments();
    const unassignedExtinguishers = data.filter((extinguisher) => !assignedExtinguisherIds.includes(extinguisher.ext_id));
    setextinguishers(unassignedExtinguishers);
  } catch (error) {
    console.error(error);
  }
};


const getExtinguishersInAssignments = async () => {
  const response = await fetch(
    'http://127.0.0.1:8000/api/inspAssignments/',
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + String(authTokens.access),
      },
    }
  );
  const data = await response.json();
  console.log(data)
  return data.map((assignment) => assignment.ext_id);
};


  const getInspectors = async() => {
    const response = await fetch('http://127.0.0.1:8000/api/staff/', {
      method: 'GET',
      headers: {
        'Content-Type':'application/json',
        'Authorization':'Bearer ' + String(authTokens.access)
      }
    })
    let data = await response.json()
    setInspectors(data.filter((inspector) => inspector.emp_type_id === 'Isp'))
  }
  

  const handleExtinguisherSelect = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions);
    const selectedExtinguishers = selectedOptions.map(option => extinguishers.find(extinguisher => extinguisher.ext_id === option.value));
    setSelectedExtinguishers(selectedExtinguishers);
  };


const handleInspectorSelect = (inspector) => {
  setSelectedInspector(inspector);
  setUsername(inspector.username);
};


    const handleSendSelectedExtinguishers = async () => {
  if (selectedExtinguishers.length === 0 || !selectedInspector) {
    alert('Please select at least 1 extinguisher and inspector');
    return;
  }

  const data = {
    // username: selectedInspector.username,
    username: selectedInspector.username,
  //   assignments: {
  //     extinguishers: selectedExtinguishers.map(ext => ext.ext_id)
  //   }
  // };
    assignments: {
      extinguishers: selectedExtinguishers.map(extId => {
      const extinguisher = extinguishers.find(ext => ext.ext_id === extId);
      return extinguisher ? extinguisher.ext_id : null;
    })
  }
}


  // console.log(data);

  try {
    const response = await fetch('http://127.0.0.1:8000/api/inspAssignments/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + String(authTokens.access)
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      window.alert('Send Successful');
      // navigate('/supervisorpage')
      setSelectedExtinguishers([]);
      setSelectedInspector(null);
      setUsername('');
      setRefreshData(true);
      // navigate('/supervisorpage')
      // window.location.reload();
    } else {
      console.error(response);
      alert('Failed');
    }
  } catch (error) {
    console.error(error);
    alert('Failed to send data');
  }
};

  useEffect(() => {
    if (refreshData) {
      getExtinguishers();
      getInspectors();
      setRefreshData(false);
    }
  }, [refreshData]);


    const handleCancelSelection = () => {
      setSelectedExtinguishers([]);
      setSelectedInspector(null);
      // window.location.reload();
    };


  return (
    <div>

    <div>
      <h1 className='text-3xl font-bold mb-8'>
      Supervisor Page
      </h1>
      </div>
    <div>
      <h3 className='text-2xl font-bold mb-2'>
      Extinguisher Status
      </h3>
      </div>
      <select className='text-black text-lg' multiple value={selectedExtinguishers} onChange={(e) => setSelectedExtinguishers(Array.from(e.target.selectedOptions, (option) => option.value))}>
  {extinguishers.map((extinguisher, id) => (
    <option key={id} value={extinguisher.ext_id} disabled={extinguisher.status_id === "2"}>
      Extinguisher: {extinguisher.ext_id} | Box: {extinguisher.box_id} {extinguisher.status_id === "1" ? "Good" : "Bad"}
    </option>
  ))}
</select>

    <section>
      <div>
      <h3 className='mt-5 mb-3'>
      Inspectors
      </h3>
      </div>
      <ul className='flex items-center justify-center gap-4 mb-4'>
        
        {inspectors.map((inspector, id) => (
          <li className='hover:cursor-pointer' key={id}>
            <input type='radio' name='inspector' value={inspector.id} onChange={() => handleInspectorSelect(inspector)} />
            {inspector.username.charAt(0).toUpperCase() + inspector.username.slice(1)}
          </li>
        ))}
      </ul>
    </section>
    <div>
    <button class="bg-blue-500 text-white text-sm font-bold py-1 px-2 shadow-lg shadow-opacity-50 hover:bg-blue-700 hover:py-2 hover:px-3 rounded-md mr-3" onClick={handleCancelSelection}>Cancel</button>
    <button class="bg-blue-500 text-white text-sm font-bold py-1 px-2 shadow-lg shadow-opacity-50 hover:bg-blue-700 hover:py-2 hover:px-3 rounded-md" onClick={handleSendSelectedExtinguishers}>Submit</button>
    </div>
    </div>
  )
}

export default SupervisorPage