import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

import Loader from '../components/Loader';
import ButtonComponent from '../components/Button';
import { formatJson } from '../utils/jsonFormatter';

import '../styles/PageLayout.css';
import '../styles/Button.css';

const Home = () => {

const navigate = useNavigate();

  const [connectionError, setConnectionError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [googleOAuthCallbackRequest, setGoogleOAuthCallbackRequest] = useState({
    authCode: '',
  });

  const [googleOAuthCallbackImplicitRequest, setGoogleOAuthCallbacImplicitRequest] = useState({
    accessToken: '',
  });

  const [githubOAuthCallbackRequest, setGithubOAuthCallbackRequest] = useState({
    authCode: '',
  });

  const [googleOAuthGetNewAccessTokenRequest, setGoogleOAuthGetNewAccessTokenRequest] = useState({
    refreshToken: '',
  });

  const location = useLocation();

  const authServiceBaseUrl = 'http://localhost:9090'
  const userServiceBaseUrl = 'http://localhost:9091'

  const oauthProvider = localStorage.getItem('oauthProvider');

  const [displayRefreshAccessToken, setDisplayRefreshAccessToken] = useState<boolean | null>(null);
  const [refreshAccessTokenResponse, setRefreshAccessTokenResponse] = useState<string | null>(null);
  const [oldAccessToken, setOldAccessToken] = useState<string | null>(null);
  const [newAccessToken, setNewAccessToken] = useState<string | null>(null);

  const [loginUser, setLoginUser] = useState<string | null>(null);
  const [secretContentResponse, setSecretContentResponse] = useState<string | null>(null);
  const [accessTokenDetail, setAccessTokenDetail] = useState<string | null>(null);
//   const [displayRefreshAccessToken, setGetNewAccessToken] = useState<boolean | null>(null);

  const storedToken = localStorage.getItem('token');

  const handleCallBackFromGoogle = async (googleOAuthCallbackRequest: any) => {
    console.log('Exchange auth code for access token');
    try {
      const response = await axios.post(`${authServiceBaseUrl}/callback-google`, googleOAuthCallbackRequest, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      localStorage.setItem('token', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      console.log('Access token:', response.data.accessToken);
      console.log('Refresh token:', response.data.refreshToken);
      setTimeout(() => {
        handleGetMyEmail(response.data.accessToken)
      }, 1000);
      
    } catch (error: any) {
      console.error('error:', error);
      if (error.response.status === 500){
        console.error('Error exchanging code for token:', error);
      }
      
    }
  };

  const handleCallBackFromGoogleImplicit = async (googleOAuthCallbackImplicitRequest: any) => {
    try {
        setTimeout(() => {
            localStorage.setItem('token', googleOAuthCallbackImplicitRequest.accessToken);
            setIsLoading(false);
          }, 1000);
    } catch (error) {
        console.error('Error:', error);
    } finally {
        setIsLoading(false);
    }
};


  const handleCallBackFromGithub = async (githubOAuthCallbackRequest: any) => {
    console.log('Exchange auth code for access token');
    try {
      const response = await axios.post(`${authServiceBaseUrl}/callback-github`, githubOAuthCallbackRequest, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      localStorage.setItem('token', response.data.accessToken);
      console.log('Access token:', response.data.accessToken);
      setTimeout(() => {
        handleGetUsernameGithub(response.data.accessToken)
      }, 1000);
    } catch (error: any) {
      console.error('error:', error);
      if (error.response.status === 500){
        console.error('Error exchanging code for token:', error);
      }
    }
  };

  const handleGetNewAccessToken = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    console.log('Get new access token from refresh token');
    const refreshToken = localStorage.getItem('refreshToken')
    const oldAccessToken = localStorage.getItem('token')
    setIsLoading(true);
    try {
        const response = await axios.post(`${authServiceBaseUrl}/get-new-token`, {refreshToken}, {
            headers: {
            'Content-Type': 'application/json',
            },
        });
            setTimeout(() => {
                setDisplayRefreshAccessToken(true);
                // setRefreshAccessTokenResponse(`Old token: ${oldAccessToken}\n\nNew token: ${response.data}`);
                setOldAccessToken(oldAccessToken);
                setNewAccessToken(response.data);
                localStorage.setItem('token', response.data);
                console.log('Access token:', response.data);
            }, 500);
    } catch (error: any) {
        console.error('error:', error);
        if (error.response.status === 500){
            console.error('Error exchanging code for token:', error);
        }
    } finally{
        setIsLoading(false);
    }
  };

  const handleRevokeAccessToken = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    console.log('Revoke access token');
    const accessToken = localStorage.getItem('token')
    setIsLoading(true);
    try {
      const response = await axios.post(`${authServiceBaseUrl}/revoke-token-google`, {accessToken}, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
        setTimeout(() => {
            console.log('Revoke access token successfully', response);
        }, 1000);
    } catch (error: any) {
      console.error('error:', error);
      if (error.response.status === 500){
        console.error('Error revoke access token:', error);
      }
    } finally{
        setIsLoading(false);
    }
  };

  const handleGetMyEmail = async (token : string) => {
    console.log('Get login user');
    if (loginUser) {
      setLoginUser('');
      return;
    }
    try {
      const response = await axios.get(`${userServiceBaseUrl}/data/get-my-email`, {
        headers: {
          'Content-Type': 'application/json',
          'Oauth-Provider': oauthProvider,
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setLoginUser(response.data);
        console.log('Login user:', response.data);
    }

    } catch (error: any) {
      console.error('error:', error);
      if (error.response.status === 401){
        setLoginUser('No email found');
        console.error('Error get data:', error);
      }
    } finally {
        setIsLoading(false)
    }
  }; 

  const handleGetUsernameGithub = async (token : string) => {
    console.log('Get login user');
    if (loginUser) {
        setLoginUser('');
      return;
    }
    try {
      const response = await axios.get(`${userServiceBaseUrl}/data/get-my-username`, {
        headers: {
          'Content-Type': 'application/json',
          'Oauth-Provider': oauthProvider,
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setLoginUser(response.data);
        console.log('Login user:', response.data);
    }

    } catch (error: any) {
      console.error('error:', error);
      if (error.response.status === 401){
        setLoginUser('No email found');
        console.error('Error get data:', error);
      }
    } finally {
        setIsLoading(false)
    }
  }; 

  const handleGetSecretContent = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (secretContentResponse) {
      setSecretContentResponse('');
      return;
    }
    try {
      const response = await axios.get(`${userServiceBaseUrl}/data/get-secret-content`, {
        headers: {
          'Content-Type': 'application/json',
          'Oauth-Provider': oauthProvider,
          
          Authorization: `Bearer ${storedToken}`,
        },
      });
      if (response.status === 200) {
        setSecretContentResponse(response.data);
        console.log('Content:', response.data);
    }

    } catch (error: any) {
      console.error('error:', error);
      if (error.response.status === 401){
        setSecretContentResponse('You are not allowed to see this secret content\nAccess token may expired or revoked.');
        setDisplayRefreshAccessToken(true);
        console.error('Error get data:', error);
      }
    }
  };
  
  const handleCheckToken = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (accessTokenDetail) {
        setAccessTokenDetail('');
        return;
    }
    setIsLoading(true);
    try {
        const response = await axios.get(`${userServiceBaseUrl}/data/check-token`, {
            headers: {
                'Content-Type': 'application/json',
                'Oauth-Provider': oauthProvider,
                Authorization: `Bearer ${storedToken}`,
            },
        });
        if (response.status === 200) {
            try {
                setAccessTokenDetail(response.data);
                console.log('Access Token Detail:', JSON.parse(JSON.stringify(response.data, null, 2)));
            } catch (error) {
                console.error('Error formatting JSON:', error);
            }
        }
    } catch (error: any) {
        console.error('Error:', error);
        if (error.response && error.response.status === 401) {
            setAccessTokenDetail('Can not check access token detail.\nAccess token may be expired or revoked.');
        }
    } finally {
        setIsLoading(false);
    }
};
  
  const dataFetch = useRef(false);

  useEffect(() => {
    setIsLoading(true);

    if (dataFetch.current) {
      return;
  }

    dataFetch.current = true;
    
    const fetchData = async () => {
        const redirectUrl = window.location.href;
        console.log('Redirect url:',redirectUrl);

        const queryParams = new URLSearchParams(location.search);
        const authCode = queryParams.get('code');
        const fragmentParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = fragmentParams.get('access_token');
    
        if (authCode && oauthProvider === 'google')  {
            console.log('Successfully authenticated with Google - Grant Type: Authorization Code');
            console.log('Authorization code:',authCode);
            const updatedGoogleOAuthCallbackRequest = {
            ...googleOAuthCallbackRequest,
            authCode: authCode, 
            };
            setGoogleOAuthCallbackRequest(updatedGoogleOAuthCallbackRequest);
            handleCallBackFromGoogle(updatedGoogleOAuthCallbackRequest);
        } else if (accessToken && oauthProvider === 'google-implicit') {
            console.log('Successfully authenticated with Google - Grant Type: Implicit');
            console.log('Access token:',accessToken);
            const updatedGoogleOAuthCallbackImplicitRequest = {
            ...googleOAuthCallbackImplicitRequest,
            accessToken: accessToken,
            };
            handleCallBackFromGoogleImplicit(updatedGoogleOAuthCallbackImplicitRequest);
        } else if (authCode && oauthProvider === 'github') {
            console.log('Successfully authenticated with Github - Grant Type: Authorization Code');
            console.log('Authorization code:',authCode);
            const updatedGithubOAuthCallbackRequest = {
            ...githubOAuthCallbackRequest,
            authCode: authCode,
            };
            setGithubOAuthCallbackRequest(updatedGithubOAuthCallbackRequest);
            handleCallBackFromGithub(updatedGithubOAuthCallbackRequest);
        } else {
            console.log('Not redirected from Google.');
        }
    };
  
    fetchData();
    }, [location.search]);

const logout = () => {
    localStorage.removeItem('jwt');
    navigate('/');
};
  

  return (
    
      <div className="page-container">
        <div className="header">
          <div className="logo-image">
            <img src="/images/logo/oauth2-logo.png" width="100" height="100" />
        </div>
            <div className="group-logout">
                <button
                    type="button"
                    onClick={logout}
                    className="logout-button"
                >
                    Log out
                </button>
                {loginUser &&
                    <div className="login-user"><p>Logged in as: {loginUser}</p></div>
                }
            </div>
        </div>
        {connectionError && <span className="error-message">{connectionError}</span>}
        <ButtonComponent
          children={'Check token'}
          handleButtonClick= {handleCheckToken}
        />
        {accessTokenDetail &&
            <div 
                className="readonly-textbox">
                <pre>{JSON.parse(JSON.stringify(accessTokenDetail, null, 2))}</pre>
            </div>
        }
        {oauthProvider === 'google' && (
        <>
            <ButtonComponent
            children={'Revoke token'}
            handleButtonClick={handleRevokeAccessToken}
            />
            <ButtonComponent
            children={'Get new access token'}
            handleButtonClick={handleGetNewAccessToken}
            />
            {displayRefreshAccessToken &&
            <div 
                className="readonly-textbox">
                {/* {refreshAccessTokenResponse} */}
                <strong>Old Access Token:</strong><br/>{oldAccessToken}<br/><br/><strong>New Access Token:</strong><br/>{newAccessToken}
            </div>
        }
        </>
        )}

        {isLoading && (
        <Loader
          message='Loading'
        />
      )}
      </div>
    
  );
}

export default Home;