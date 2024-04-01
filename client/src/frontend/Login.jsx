import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import "../css/Login.css"

function Login() {
  const navigate = useNavigate();
  const [isLogedIn, setIslogedin] = useState(false);
  const [isauthMessage,setauthMessage] = useState(false);
  const [formData, setFormData] = useState({
    clientid: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://192.168.1.10:3004/clientlogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIslogedin(true);

        // Navigate to the desired route
        const { clientid } = await response.json();
        console.log('API Response:', clientid);
        sessionStorage.setItem('clientid', clientid.clientId);
        // Log the clientid to ensure it's received correctly
        console.log('Received clientid:', clientid);
        navigate(`/dashboard/${clientid}`);
      } else {
        // Handle non-OK responses
        console.error('Login error', response.statusText);
        const result = await response.json();
        setauthMessage(result.message);
        // const {message} = await response.json();
      }
    } catch (error) {
      // Handle network or other errors
      console.error('Login error', error);
    }
  };

  if (!isLogedIn) {
    console.log('Not logged in');
  }

  return (
    <div className="login-container">
        <div className='left-div'>
            <form className="login-form" method='post' onSubmit={handleSubmit}>
            {isauthMessage && <p className='Auth-error-message'>{isauthMessage}</p>}
                <h2>Login</h2>
                <label htmlFor="clientid">Client ID:</label>
                <input type="text" id="clientid" name="clientid" value={formData.clientid} onChange={handleChange} required/>
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required/>
                <button type="submit" className='login-btn'>Login</button>
            </form>
        </div>
        <div className='right-div'></div>
    </div>
  )
}

export default Login