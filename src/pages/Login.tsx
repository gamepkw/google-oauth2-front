import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/PageLayout.css';
import '../styles/Button.css';
import { Link } from 'react-router-dom';
import UsernameComponent from '../components/Username';
import PasswordComponent from '../components/Password';
import ButtonComponent from '../components/Button';
import Loader from '../components/Loader';

const Login = () => {

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });


  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();
  const [connectionError, setConnectionError] = useState('');
  const [isRequestTimedOut, setIsRequestTimedOut] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // if (name === "username") {
    //   if (!/^\d*$/.test(value)) {
    //     e.preventDefault();
    //     return;
    //   }
    //   if (value.length > 10) {
    //     return;
    //   }
    // }

    if (name === "password") {
      if (value.includes(" ")) {
        return;
      }
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value

    }));

    if (name === "username") {
        setUsernameError('');
        setPasswordError('');
    }

    if (name === "password" && value === "") {
      setPasswordError('');
    }

    if (name === "password") {
      setPasswordError('');
    }

  };

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const jsonData = JSON.stringify(formData);

    if (formData.username === '') {
      console.log('username number can not be empty');
      return;
    }

    if (formData.password === '') {
        console.log('password number can not be empty');
        return;
      }

    setUsernameError('');
    setPasswordError('');
    setConnectionError('');
    setIsLoading(true);
    setIsRequestTimedOut(false);

    try {
      const response = await axios.post('http://localhost:9090/login-google-credential', jsonData, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 5000,
      });

      console.log('Login successfully:', response.status);
      localStorage.setItem('jwt', response.data.token);
      if (response.status === 200) {
          navigate('/home', { state: formData });
      }
    } catch (error: any) {
      
    } finally {
      setIsLoading(false);
    }


  };

  return (


    <div className="page-container">
      <form onSubmit={submit}>
        <div className="logo-image" style={{ margin: '0 auto' }}>
          <img src="/images/logo/oauth2-logo.png" width="100" height="100" />
        </div>
            <UsernameComponent
            formData={formData}
            handleChange={handleChange}
            usernameError={usernameError}
            />
        <div>
          <PasswordComponent
            formData={formData}
            name="password"
            placeholder="Password"
            handleChange={handleChange}
            passwordError={passwordError}
          />
        </div>

        <ButtonComponent
          disabled={
            isLoading ||
            (formData.username === null || formData.username === '') ||
            (formData.password === null || formData.password === '')
          }
          children={isLoading ? 'Logging in...' : 'Login'}
        />

        {isRequestTimedOut && <span className="error-message">{connectionError}</span>}
      </form>
      {isLoading && (
        <Loader
          message='Logging in'
        />
      )}
    </div>

  );

}

export default Login;


