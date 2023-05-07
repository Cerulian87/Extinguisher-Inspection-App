import React, { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';


const ExtinguisherForm = () => {

  let [extinguisher, setExtinguisher] = useState('')
  let [model, setModel] = useState('')

  let {authTokens} = useContext(AuthContext)

  const navigate = useNavigate()

  const handleCancel = () => {
    navigate('/technicianpage')
  }

const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      ext_id: extinguisher,
      status_id: "1",
      model_number: model,
      warehouse_status: 'Pass',
    };

    fetch('http://127.0.0.1:8000/api/addNewExtinguisher/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization':'Bearer '+ String(authTokens.access),
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        navigate('/technicianpage');
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
  };


  return (
    <div class="flex flex-col items-center">

   <div>
    <h1 class="text-3xl font-bold mb-8">Extinguisher Form</h1>
  </div>
  <div class="w-full max-w-md">
    <form class="grid grid-cols-1 gap-4">
      <div class="flex items-center">
        <label class="mr-4">Extinguisher ID:</label>
        <input type="text" name="ext_id" class="text-black border border-gray-400 rounded-md py-1 px-3 w-72" onChange={(e) => setExtinguisher(e.target.value)} />
      </div>
      <div class="flex items-center">
        <label class="mr-4">Model Number:</label>
        <input type="text" name="model_number" class="text-black border border-gray-400 rounded-md py-1 px-3 w-72" onChange={(e) => setModel(e.target.value)} />
      </div>
      <div class="flex items-center">
        <label class="mr-4">Extinguisher Type:</label>
        <input type="text" name="ext_type" class="text-black border border-gray-400 rounded-md py-1 px-3 w-72" />
      </div>
      <div class="flex items-center">
        <label class="ml-12 mr-16">Size:</label>
        <input type="text" name="size" class="text-black border border-gray-400 rounded-md py-1 px-3 w-full" />
      </div>
    </form>
  </div>
  <div class=" justify-center mt-8">
    <button class="bg-blue-500 text-white text-sm font-bold py-1 px-2 shadow-lg shadow-opacity-50 hover:bg-blue-700 hover:py-2 hover:px-3 rounded-md mr-3 mb-5" onClick={handleCancel}>Cancel</button>
    <button class="bg-blue-500 text-white text-sm font-bold py-1 px-2 shadow-lg shadow-opacity-50 hover:bg-blue-700 hover:py-2 hover:px-3 rounded-md" onClick={handleSubmit}>Submit</button>
  </div>
 

    </div>
  )
}

export default ExtinguisherForm