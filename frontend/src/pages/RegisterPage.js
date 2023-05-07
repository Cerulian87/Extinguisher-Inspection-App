import React from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {

const navigate = useNavigate();


const handleCancel = () => {
    navigate('/login')
}


  return (
    <div className='flex flex-col items-center'>


<div>
    <h1 class="text-3xl font-bold mb-10">Registration Page</h1>
  </div>
  <div class="w-full max-w-md">
    <form class="grid grid-cols-1 gap-4">
      <div class="flex items-center">
        <label class="mr-16">First Name:</label>
        <input type="text" name="first" class="text-black border border-gray-400 rounded-md py-1 px-3 w-full" />
      </div>
      <div class="flex items-center">
        <label class=" mr-16">Last Name:</label>
        <input type="text" name="last" class="text-black border border-gray-400 rounded-md py-1 px-3 w-full" />
      </div>
      <div class="flex items-center">
        <label class="mr-10">Phone Number:</label>
        <input type="tel" name="phone" class="text-black border border-gray-400 rounded-md py-1 px-3 w-full" />
      </div>
      <div class="flex items-center">
        <label class=" mr-14 mb-6">Address:</label>
        <input type="text" name="address" class="text-black border border-gray-400 rounded-md py-1 px-3 w-full" />
      </div>
        <div class="flex items-center">
        <label class=" mr-14 mb-6">Position:</label>
        <input type="text" name="emp_type" class="text-black border border-gray-400 rounded-md py-1 px-3 w-full" />
      </div>
      <div class="flex items-center">
        <label class=" mr-16 ml-3 mb-6">Email:</label>
        <input type="email" name="email" class="text-black border border-gray-400 rounded-md py-1 px-3 w-full" />
      </div>
      <div class="flex items-center">
        <label class=" mr-10">Password:</label>
        <input type="password" name="password" class="text-black border border-gray-400 rounded-md py-1 px-3 w-full" />
      </div>
      <div class="flex items-center">
        <label class=" mr-5 -ml-3">Re-enter Password:</label>
        <input type="password" name="password" class="text-black border border-gray-400 rounded-md py-1 px-3 w-full" />
      </div>
    </form>
  </div>
  <div class=" justify-center mt-8">
    <button class="bg-blue-500 text-white text-sm font-bold py-1 px-2 shadow-lg shadow-opacity-50 hover:bg-blue-700 hover:py-2 hover:px-3 rounded-md mr-3 mb-5" onClick={handleCancel}>Cancel</button>
    <button class="bg-blue-500 text-white text-sm font-bold py-1 px-2 shadow-lg shadow-opacity-50 hover:bg-blue-700 hover:py-2 hover:px-3 rounded-md mb-5">Submit</button>
  </div>

    </div>
  )
}

export default RegisterPage