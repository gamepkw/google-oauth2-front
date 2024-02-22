import React, { useState } from 'react';
import axios from 'axios';

import Loader from '../components/Loader';
import ButtonComponent from '../components/Button';

import '../styles/PageLayout.css';
import '../styles/Button.css';

const Main = () => {

  const [connectionError, setConnectionError] = useState('');

  const [isRequestTimedOut, setIsRequestTimedOut] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogInWithGoogle = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setIsLoading(true);
    try {
      const response = await axios.get('http://localhost:9090/login-google', {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      setTimeout(() => {
        console.log('Redirect user to:', response.data);
        window.location.replace(response.data);
        localStorage.setItem('oauthProvider', 'google');
        setIsLoading(false);
      }, 3000);


    } catch (error: any) {
      console.error('Error logging in:', error);
      setIsRequestTimedOut(true);
    }
  };

  const handleLogInWithGoogleImplicit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const clientId = '515592365350-fef5525j3kdk1bgoqtbrt1nl4jnjg57d.apps.googleusercontent.com';
    const redirectUri = encodeURIComponent('http://localhost:3001/home');
    const responseType = 'token';
    const scope = encodeURIComponent('https://www.googleapis.com/auth/userinfo.email');
    const state = 'gamepkw';
    const googleOAuthUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}&state=${state}`;
    
    setIsLoading(true);
    setTimeout(() => {
      console.log('Redirect user to:', googleOAuthUrl);
      window.location.replace(googleOAuthUrl);
      localStorage.setItem('oauthProvider', 'google-implicit');
      setIsLoading(false);
    }, 3000);

  };

  const handleLogInWithGithub = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setIsLoading(true);
    try {
      const response = await axios.get('http://localhost:9090/login-github', {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      setTimeout(() => {
        console.log('Redirect user to:', response.data);
        window.location.replace(response.data);
        localStorage.setItem('oauthProvider', 'github');
        setIsLoading(false);
      }, 3000);

    } catch (error: any) {
      console.error('Error logging in:', error);
      setIsRequestTimedOut(true);
    } 
  };

  return (
    
      <div className="page-container">
        <div className="logo-image" style={{ margin: '0 auto' }}>
          <img src="/images/logo/oauth2-logo.png" width="100" height="100" />
        </div>
        {connectionError && <span className="error-message">{connectionError}</span>}
        <ButtonComponent
          children={'Log In With Google'}
          handleButtonClick= {handleLogInWithGoogle}
        />
        <ButtonComponent
          children={'Log In With Google (Implicit)'}
          handleButtonClick= {handleLogInWithGoogleImplicit}
        />
         <ButtonComponent
          children={'Log In With Github'}
          handleButtonClick= {handleLogInWithGithub}
        />
        {isLoading && (
        <Loader
          message='Redirecting'
        />
      )}
      </div>
    
  );
}

export default Main;