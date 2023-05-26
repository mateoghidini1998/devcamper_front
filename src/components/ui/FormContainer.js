import React, { useState } from 'react';
import './FormContainer.css';
import FormHeader from './FormHeader';
import Register from '../auth/Register';
import Login from '../auth/Login';


function FormContainer() {
  const [activeForm, setActiveForm] = useState('register');



  return (
    <div className="form-container">
      <FormHeader onFormToggle={setActiveForm} activeForm={activeForm} />
      {activeForm === 'register' ? <Register/> : <Login/>}
      
    </div>
  );
}

export default FormContainer;
