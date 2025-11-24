import React from 'react';

const ResumeEnvelope = ({ onClick }) => {
  return (
    /* The envelope container acting as a link */
    <a 
      href="./OmSathe.pdf" 
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
          
          {/* Text inside the letter */}
          <div className="letter-text">RESUME</div>
          <div className="letter-subtext">OM SATHE</div>

          <div className="letter-stamp">
            <div className="letter-stamp-inner"></div>
          </div>
        </div>
        <div className="top-fold"></div>
        <div className="body"></div>
        <div className="left-fold"></div>
      </div>
      <div className="shadow"></div>
    </a>
  );
};

export default ResumeEnvelope;