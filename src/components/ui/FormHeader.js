import './FormHeader.css';

function FormHeader({ onFormToggle, activeForm }) {

  const handleSignUp = () => {
    onFormToggle('register');
  }

  const handleSignIn = () => {
    onFormToggle('login');
  }

  return (
    <div className="form-header">
      <button className={`cta_btn ${activeForm === 'register' ? 'active' : ''}`} onClick={handleSignUp}>
        Sign Up
      </button>
      <button className={`cta_btn ${activeForm === 'login' ? 'active' : ''}`} onClick={handleSignIn}>
        Sign In
      </button>
    </div>
  );
}

export default FormHeader;
