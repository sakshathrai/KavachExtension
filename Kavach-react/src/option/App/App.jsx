import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [showTerms, setShowTerms] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const handleAgree = () => {
    setAgreed(true);
  };

  return (
    <div className="start-page-container">
      <div className="logo">
        {/* <img src="kavachLogo.png" alt="Logo" /> */}
      </div>
      <h1 className="title">KAVACH</h1>
      <h3 className="subtitle">Fortifying Users Against Digital Deception</h3>
      {!agreed && (
        <>
          <button className="btn" onClick={() => setShowTerms(true)}>View Terms and Conditions</button>
          {showTerms && (
            <div className="terms">
              <h2 className="terms-title">Terms and Conditions</h2>
              <div className="terms-text">
                <p>1. Users implicitly agree to the terms and conditions upon installation and use of the extension</p>
                <p>2. The extension serves the purpose of identifying and analyzing dark patterns prevalent in e-commerce websites, aiding users in understanding potentially manipulative design practices.</p>
                <p>3. In accordance with stringent data protection regulations such as GDPR and CCPA, the extension restricts data collection solely to the URLs of the websites being analyzed. No additional personal data, such as names, email addresses, or payment information, is gathered or stored.</p>
                <p>4. Users provide explicit consent for the collection and processing of website URLs, acknowledging the extension's need for this data to fulfill its functionality.</p>
                <p>5. While every effort is made to ensure accuracy in identifying dark patterns, users should understand that the effectiveness of analysis may vary based on factors such as website complexity and design changes.</p>
                <p>6. The developer holds no liability for any damages resulting from the use of the extension, including but not limited to direct, indirect, incidental, or consequential damages.</p>
              </div>
              <button className="btn" onClick={() => setShowTerms(false)}>Close</button>
            </div>
          )}
          <button className="btn" onClick={handleAgree}>Agree</button>
        </>
      )}
      {agreed && <p className="agreed-text">You have agreed to the terms and conditions.</p>}
    </div>
  );
};

export default App;
