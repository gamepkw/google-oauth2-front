import React, { useState, useEffect } from 'react';
import '../styles/Loader.css';

function Dots() {
  const [dotCount, setDotCount] = useState<number>(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setDotCount((count) => (count % 3) + 1); // Cycle from 1 to 2 to 3
    }, 200); // Change every 1 second

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dots">
      <span className={`dot ${dotCount >= 1 ? '' : 'dot2'}`}>.</span>
      <span className={`dot ${dotCount >= 2 ? '' : 'dot2'}`}>.</span>
      <span className={`dot ${dotCount >= 3 ? '' : 'dot3'}`}>.</span>
    </div>
  );
}

interface LoaderProps {
  message: string;
}

const Loader: React.FC<LoaderProps> = ({ message }) => {
  return (
    <div className="loader-overlay">
      <div className="loader-container">
        <div className="loader"></div>
        <p>
          {message}
          <Dots />
        </p>
      </div>
    </div>
  );
};

export default Loader;
