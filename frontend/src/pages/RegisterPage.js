import React from 'react'

const RegisterPage = () => {
  return (
    <div>RegisterPage
        <div>
    <form>
        <label>
            First Name:
            <input type='text' name='first' />
        </label>
        <label>
            Last Name:
            <input type='text' name='last' />
        </label>
        <label>
            Phone Number:
            <input type='tel' name='phone' />
        </label>
        <label>
            Address:
            <input type='text' name='address' />
        </label>
        <label>
            Emp Type:
            <input type='text' name='type' />
        </label>
        <label>
            Email:
            <input type='email' name='email' />
        </label>
        <label>
            Password:
            <input type='password' name='password' />
        </label>
        <label>
            Re-enter Password:
            <input type='password' name='password' />
        </label>
        <div>
        <input type='submit' value='Submit' />
        </div>
    </form>
    </div>
    </div>
  )
}

export default RegisterPage