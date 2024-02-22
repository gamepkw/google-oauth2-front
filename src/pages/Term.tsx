import { useLocation } from 'react-router-dom';
import '../styles/Scroll.css';

const Term = () => {
  
    const location = useLocation();
    const storedToken = localStorage.getItem('token');
  
    return (
      
        <div className="page-container">
          <div className="logo-image">
            <img src="/images/logo/oauth2-logo.png" width="100" height="100" />
          </div>
          <h3 style={{ textAlign: 'center' }}>Terms of Service</h3>
        <div className="poem">
            <div className="readonly-textbox">
                Welcome to [Your Company]!
    These terms of service outline the rules and regulations for the use of [Your Company]'s Website, located at [Website URL].
    By accessing this website we assume you accept these terms of service. Do not continue to use [Website Name] if you do not agree to take all of the terms and conditions stated on this page.
    The following terminology applies to these Terms of Service, Privacy Statement and Disclaimer Notice and all Agreements: "Client", "You" and "Your" refers to you, the person log on this website and compliant to the Company's terms and conditions. "The Company", "Ourselves", "We", "Our" and "Us", refers to our Company. "Party", "Parties", or "Us", refers to both the Client and ourselves. All terms refer to the offer, acceptance and consideration of payment necessary to undertake the process of our assistance to the Client in the most appropriate manner for the express purpose of meeting the Client's needs in respect of provision of the Company's stated services, in accordance with and subject to, prevailing law of Netherlands. Any use of the above terminology or other words in the singular, plural, capitalization and/or he/she or they, are taken as interchangeable and therefore as referring to same.
    Cookies
    We employ the use of cookies. By accessing [Your Company], you agreed to use cookies in agreement with the [Your Company]'s Privacy Policy.
    Most interactive websites use cookies to let us retrieve the user's details for each visit. Cookies are used by our website to enable the functionality of certain areas to make it easier for people visiting our website. Some of our affiliate/advertising partners may also use cookies.
            </div>
        </div>
        </div>
      
    );
  }
  
  export default Term;