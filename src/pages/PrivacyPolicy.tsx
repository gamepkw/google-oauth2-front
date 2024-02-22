import { useLocation } from 'react-router-dom';

const PrivacyPolicy = () => {
  
    const location = useLocation();
    const storedToken = localStorage.getItem('token');
  
    return (
      
        <div className="page-container">
          <div className="logo-image">
            <img src="/images/logo/oauth2-logo.png" width="100" height="100" />
          </div>
          <h3 style={{ textAlign: 'center' }}>Privacy Policy</h3>
        <div 
            className="readonly-textbox">
            [Your Company Name] ("us", "we", or "our") operates the [Your Website or App Name] website and [mobile application name] mobile application (the "Service").
This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.
We use your data to provide and improve the Service. By using the Service, you agree to the collection
        </div>
        </div>
      
    );
  }
  
  export default PrivacyPolicy;