import React from 'react'
import Calendar from "../../Assets/calendar.jpg";
import PCOS from "../../Assets/fallotubepcos.jpg";
import Pharmacy from "../../Assets/pharmacy.jpg";

const Work = () => {
  const workInfoData = [
    {
      image: Calendar,
      title: "Period Calendar",
      text: "Track your period dates with us",
    },
    {
      image: PCOS,
      title: "PCOS/PCOD Detector",
      text: "Refer us for the best diet and exrcise suggestion to folllow ",
    },
    {
      image: Pharmacy,
      title: "Pharmacy/Hospitals",
      text: "Get to know your nearest hospitals!!",
    },
  ];

  return (
    <div className="work-section-wrapper">
      <div className="work-section-top">
        <p className="primary-subheading"></p>
        <h1 className="primary-heading">How It Works</h1>
        <p className="primary-text">
          Our website helps you to track your next period,gives you the best suggestions needed and access your nearset doctors easily!
        </p>
      </div>
      <div className="work-section-bottom">
        {workInfoData.map((data) => (
          <div className="work-section-info" key={data.title}>
            <div className="info-boxes-img-container">
              <img src={data.image} alt="" />
            </div>
            <h2>{data.title}</h2>
            <p>{data.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Work