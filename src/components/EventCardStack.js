import React, { useEffect, useState } from 'react';
import "./EventCardStack.css";

function EventCard({ similar }) {
    return (
      <div className="event-card">
        <h3 className="event-info-value">{similar.title}</h3>
        <div className="event-info">
          <div className="event-info-label">Author</div>
          <div className="event-info-value">{similar.author}</div>
        </div>
  
        <div className="event-info">
          <div className="event-info-label">Extract</div>
          <div className="event-info-value">{similar.extract}</div>
        </div>
  
        <div className="event-info">
          <div className="event-info-label">Published Date</div>
          <div className="event-info-value">{similar.published_date}</div>
        </div>
  
        <div className="event-info">
          <div className="event-info-label">Similarity Score</div>
          <div className="event-info-value">{similar.score.toFixed(3)}</div>
        </div>
      </div>
    );
  }
  
  export default function EventCardStack({ similars }) {
    const handleCardClick = (url) => {
      window.open(url, '_blank');
    }

    return (
      <div className="">
        <h2>Similar sources</h2>
        {similars.length == 0 && <div>loading similar sources for you...</div>}
        {similars.map((similar, index) => (
          <div onClick={() => handleCardClick(similar.url)}>
            <EventCard key={index} similar={similar}/>
          </div>
        ))}
      </div>
    );
  }