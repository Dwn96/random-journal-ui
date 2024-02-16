import React from 'react';
import './LandingPage.css'; // Import the CSS file

const LandingPage = () => {
  return (
    <div className="landing-page">

      <div className="content">
        <div className="container">
          <div className="info">
            <h1>Discover Journals</h1>
            <p>Explore an ever-unfolding tapestry of thoughts and experiences. Welcome to our journal-sharing platform, where each click reveals a new story, waiting to be explored and shared.</p>
            <button>Start journaling</button>
          </div>
          <div className="image">
            <img src="https://i.postimg.cc/65QxYYzh/001234.png"/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
