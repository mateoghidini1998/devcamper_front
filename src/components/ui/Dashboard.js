import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../slices/authSlice'

function Dashboard() {

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutUser());
    console.log(isAuthenticated)
  };

  return (
    <div>
      <div>Dashboard</div>
      <div>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  )
}

export default Dashboard