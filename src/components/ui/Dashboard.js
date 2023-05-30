import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../slices/authSlice'
import { getBootcamps } from '../../slices/bootcampsSlice';


import './Dashboard.css'

function Dashboard() {

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const bootcamps = useSelector(state => state.bootcamps.bootcamps);
  const loading = useSelector(state => state.bootcamps.loading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBootcamps());
    console.log(bootcamps);
  }, [dispatch])

  const handleLogout = () => {
    dispatch(logoutUser());
    console.log(isAuthenticated)
  };

  if (loading) {
    // Render a loading state if the data is being fetched
    return <div>Loading...</div>;
  }

  return (
    <div className="landing-page">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>Bootcamp & Courses</h2>
        </div>
        <ul className="sidebar-menu">
          <li className="menu-item active">
            <i className="fas fa-user"></i>
            <span>Profile</span>
          </li>
          <li className="menu-item">
            <i className="fas fa-book"></i>
            <span>Bootcamps</span>
          </li>
        </ul>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </aside>
      <main className="content">
        <div className="cards-container">
        {bootcamps.length > 0 ? (
            bootcamps.map((bootcamp) => (
              <div className="bootcamp-card" key={bootcamp._id}>
                <img src={bootcamp.photo} alt="Bootcamp" />
                <h3>{bootcamp.name}</h3>
                <p>{bootcamp.description}</p>
                <a href="/bootcamp">View Details</a>
              </div>
            ))
          ) : (
            <div>No bootcamps found.</div>
          )}
        </div>
      </main>
    </div>
  )
}


export default Dashboard