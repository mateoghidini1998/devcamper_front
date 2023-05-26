import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../../slices/authSlice'
import { Navigate} from 'react-router-dom'

import './Register.css'
function Login() {

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ 
    email: '',
    password: ''
    
  });

  const { email, password } = formData;

  const onChange = e => setFormData({
      ...formData, [e.target.name]:e.target.value
  });

  const onSubmit = async e => {
    e.preventDefault();
    dispatch(loginUser({email, password}))
    
  }

  if(isAuthenticated){
    return <Navigate to="/"/>;
  }

  return (
    <div className="form-container">
        <form action="" onSubmit={onSubmit}>
            <div className="field-container">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" value={email} onChange={e => onChange(e)} />
            </div>
            <div className="field-container">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="" value={password} onChange={e => onChange(e)} />
            </div>
            <button className='btn-submit' type="submit">Sign Up</button>
        </form>
    </div>
  )
}

export default Login