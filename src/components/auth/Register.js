import { useState } from 'react'
import './Register.css'
import { registerUser } from '../../slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function Register() {

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const dispatch = useDispatch();

    const [ formData, setFormData ] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })

    const { name, email, password, password2 } = formData;

    const onChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});

    const onSubmit = (e) => {
        e.preventDefault();
        if (password !== password2) {
          console.log('Passwords do not match');
        } else {
          const newUser = {
            name: formData.name,
            email: formData.email,
            password: formData.password,
          };
          dispatch(registerUser(newUser));
          console.log(newUser);
        }
        
      };

    if(isAuthenticated){
        return <Navigate to="/"/>;
    }

  return (
    <div className="form-container">
        <form action="" className='form' onSubmit={e => onSubmit(e)}>
            <div className="field-container">
                <label htmlFor="name">Name</label>
                <input 
                type="text" 
                name="name"
                value={name}
                onChange={e => onChange(e)}
                />
            </div>
            <div className="field-container">
                <label htmlFor="email">Email</label>
                <input 
                type="email" 
                name="email"
                value={email}
                onChange={e => onChange(e)} 
                />
            </div>
            <div className="field-container">
                <label htmlFor="password">Password</label>
                <input 
                type="password" 
                name="password" 
                id="" 
                value={password}
                onChange={e => onChange(e)}
                />
            </div>
            <div className="field-container">
                <label htmlFor="password2">Confirm Password</label>
                <input 
                type="password" 
                name="password2" 
                value={password2}
                onChange={e => onChange(e)}
                />
            </div>
            <button className='btn-submit' type="submit" >Sign Up</button>
        </form>
    </div>
  )
}

export default Register