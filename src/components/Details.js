import React, { useEffect, useState } from 'react';
import './Details.css'; // Import a CSS file for styling

const Details = ({ details, currentIndex, handleAddEvent }) => {
  const { title, year, month, day, extra_info } = details[currentIndex].data;

  return (
    <div className="details-container">
      <div className="date">
        <span className="label">Date:</span>
        <span className="date-info">{`${year}/${month}/${day}`}</span>
      </div>
      <div className="about">
        <span className="label">Additional info:</span>
        <p className="about-info">{extra_info}</p>
      </div>
      <button onClick={() => handleAddEvent(title, year, month, day)}>
        add to calender
      </button>
    </div>
  );
};

export default Details;
