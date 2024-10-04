import React from 'react'
import BannerBackground from "../../Assets/bghome1.jpg";
import BannerImage from "../../Assets/fallopian tube.jpg";
import Navbar from '../Main/Navbar';
const Home = () => {
  return <div className='home-container'>
    <Navbar />
    <div className="home-banner-container">
      <div className="home-bannerImage-container">
        <img src={BannerBackground} alt="" />
      </div>
      <div className="home-text-section">
        <h1 className="primary-heading">
          “A woman’s health is her capital.”
        </h1>
        <p className="primary-text">
          – Harriet Beecher Stowe
        </p>

      </div>
      <div className="home-image-section">
        <img src={BannerImage} alt="" id='iim'
        />
      </div>
    </div>
  </div>;
};

export default Home