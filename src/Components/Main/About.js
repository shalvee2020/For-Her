import React from 'react'
import AboutBackground from "../../Assets/bg2whole.jpg";
import AboutBackgroundImage from "../../Assets/aboutus.jpg";
import { BsFillPlayCircleFill } from "react-icons/bs";
const About = () => {
  return (
    <div className="about-section-container" >
      <div className="about-background-image-container">
        <img src={AboutBackground} alt="" />
      </div>
      <div className="about-section-image-container">
        <img src={AboutBackgroundImage} alt="" id='im' />
      </div>
      <div className="about-section-text-container">
        <p className="primary-subheading">About</p>
        <h1 className="primary-heading">
          Health Is An Important Part Of Our Life
        </h1>
        <p className="primary-text">
          Our website is dedicated to tackling the challenges related to women's menstrual health and hygiene.It encompasses a range of features tailored to support women's well-being,including a period tracker,nearest pharmacy and hospitals,and personalized exercise and diet recommendations for managing menstrual-related conditions.
        </p>
        <p className="primary-text">
          Through our platform, we aim to empower women with convenient access to vital information and promoting holistic health.
        </p>
        <div className="about-buttons-container">
          <button className="secondary-button">Learn More</button>
          <button className="watch-video-button">
            <BsFillPlayCircleFill /> Watch Video
          </button>
        </div>
      </div>
    </div>
  );
};

export default About