import React, { useState } from 'react'
//import AboutBackground from "../../Assets/bg2whole.jpg";
import AboutBackground from "../../Assets/bg2whole.jpg";
import './Home2.css';
import Data from './data.json';
const Home2 = () => {
  const [selectedInfo, setSelectedInfo] = useState(null);

  const handleClick = (id) => {
    const info = Data.find(item => item.id === id);
    setSelectedInfo(info);
  };
  return (
    <div>
      <div className="about-background-image-container">
        <img src={AboutBackground} alt="" />
      </div>
      <h1 className='hed'> </h1>
      <div className='dabba'>
        <button onClick={() => handleClick(2)}>PCOS/PCOD</button>
        <button onClick={() => handleClick(3)}>Irregular Period</button>
        <button onClick={() => handleClick(1)}>PMS</button>
      </div>
      <div className="overlay">

        <div className='content'>


          {selectedInfo && (
            <div>
              <h2>{selectedInfo.Disorder}</h2>
              <h3>Remedies:</h3>
              <div className="photocard-container">
                {selectedInfo.Remedies.map((remedy, index) => (
                  <div className="photocard" key={index}>
                    <strong>{remedy.Name}</strong>: {remedy.Description}
                  </div>
                ))}
              </div>

              <h3>Diet Suggestions:</h3>
              <div className="photocard-container">
                {selectedInfo.DietSuggestions.map((suggestion, index) => (
                  <div className="photocard" key={index}>
                    {suggestion}
                  </div>
                ))}
              </div>





              <h3>Exercise Video URLs:</h3>
              <div className="video-container">
                {selectedInfo.ExerciseVideoURLs.map((url, index) => (
                  <div className="video-item" key={index}>
                    <a href={url} target="_blank" rel="noopener noreferrer">
                      <img className="video-thumbnail" src={`https://img.youtube.com/vi/${url.split('/').pop()}/0.jpg} alt={Video ${index + 1}`} />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>

  );
};

export default Home2