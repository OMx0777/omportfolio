/* ResumeEnvelope.js */
import React from 'react';

const ResumeEnvelope = ({ onClick }) => {
  return (
    <a 
      href="/OmSathe.pdf" 
      onClick={onClick} 
      className="letter-image" 
      title="Download Resume"
      target="_blank" 
      rel="noopener noreferrer"
    >
      <div className="animated-mail">
        <div className="back-fold"></div>
        <div className="letter">
          <div className="letter-border"></div>
          <div className="letter-text">RESUME</div>
        </div>
        <div className="body"></div>
        <div className="top-fold"></div>
      </div>
    </a>
  );
};

export default ResumeEnvelope;