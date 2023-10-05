import React, { useEffect, useState } from 'react';
import './Details.css'; // Import a CSS file for styling
import http from '../services/HttpServices';
import Modal from 'react-modal';
import EventCardStack from './EventCardStack';

const modalStyle = {
  content: {
      top: "50%",
      left: "75%",
      right: "5%",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "white",
      width: 400,
      height: 500
    },
}

const Details = ({ details, currentIndex, handleAddEvent }) => {
  var { title, url, year, month, day, extra_info } = details[currentIndex].data;
  const [similars, setSimilars] = useState([]);
  const [showSimilars, setShowSimilars] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // useEffect(() => {
  //   url = details[currentIndex].data.url;
  // },[currentIndex]);

  const handleShowSimilars = () => {
    console.log(title);
    setIsModalOpen(true);
    http.post(`/rec`, {"url": url})
    .then(res => {
      console.log(res.data);
      setSimilars(res.data);
    })
  }

  return (
    <div className="details-container">
      <div className="date">
        <span className="label">Date:</span>
        <span className="date-info">{`${year}/${month}/${day}`}</span>
      </div>
      <div className="about">
        <span className="label">Additional info:</span>
        <p className="about-info" style={{height:'200px', overflow: 'auto'}}>{extra_info}</p>
      </div>
      <button onClick={() => handleAddEvent(title, year, month, day)} style={{backgroundColor: 'rgb(67, 115, 168)', color: '#fff'}}>
        add to calender
      </button>
      <button onClick={() => handleShowSimilars()}>show similar sources</button>
      <Modal isOpen={isModalOpen} style={modalStyle} onRequestClose={() => setIsModalOpen(false)}>
          <EventCardStack similars={similars}/>
      </Modal>
    </div>
  );
};

export default Details;
