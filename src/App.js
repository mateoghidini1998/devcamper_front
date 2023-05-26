
import './App.css';

import { useSelector } from 'react-redux';


import Dashboard from './components/ui/Dashboard';
import FormContainer from './components/ui/FormContainer';


function App() {

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <div className='app'>
      {!isAuthenticated ? <FormContainer /> : <Dashboard />}
    </div>
  );
}

export default App;
