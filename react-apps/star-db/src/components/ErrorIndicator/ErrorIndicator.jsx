import React from 'react';
import './ErrorIndicator.scss';
import icon from './death-star.png';

const ErrorIndicator = () => {
  return (
    <div className="error-indicator">
      <img src={icon} alt="error icon" className="error__icon"/>
      <span className="boom">BOOM!</span>
      <span>something has gone terribly wrong</span>
      <span>(but we already sent drouds to fix it)</span>
    </div>
  );
};

export default ErrorIndicator;