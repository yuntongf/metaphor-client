import React, { useEffect, useState, useMemo} from 'react';
import './SearchResults.css';
import http from '../services/HttpServices';
import Details from './Details';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Icon } from '@mui/material';

const SearchResults = ({ results, handleAddEvent}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [details, setDetails] = useState([]);
    
    useEffect(
    () => {
        const fetchData = async () => {
            const promises = results.map(async (result) => {
              const response = await http.get(`/event?id=${result.id}`);
              return response;
            });
        
            const responseData = await Promise.all(promises);
            setDetails(responseData);
          };
        
          fetchData();
    }, [results]
    )
    

    // for (const result in results) {
    //   getDetails(result.id);
    // }
  
    const handleNext = () => {
      if (currentIndex < results.length - 1) {
        setCurrentIndex(currentIndex + 1);
      }
    };
  
    const handlePrev = () => {
      if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      }
    };
  
    const handleCardClick = (url) => {
      window.open(url, '_blank'); // Open the URL in a new tab
    };
  
    const formatScore = (score) => {
      return score.toFixed(2); // Format the score with two decimal places
    };
  
    return (
      <div className="component-viewer">
        <h1>Search Results 🦄</h1>
        {results.length > 0 ? (
          <div className="card-container">
            <button
              className="prev-button"
              onClick={handlePrev}
              disabled={currentIndex === 0}
            >
              <ArrowBackIosNewIcon/>
            </button>
            <div className="card">
              <div className="badge">{formatScore(results[currentIndex].score)}</div>
              <div onClick={() => handleCardClick(results[currentIndex].url)}>
                <h3 style={{margin: '10px'}}>
                    {`${results[currentIndex].title}`}
                </h3>
              </div>
              <p></p>
              {details.length > 0 ? <Details details={details} currentIndex={currentIndex} handleAddEvent={handleAddEvent}/>
              : <div> loading details for you... </div>}
            </div>
            <button
              className="next-button"
              onClick={handleNext}
              disabled={currentIndex === results.length - 1}
            >
              <ArrowForwardIosIcon/>
            </button>
          </div>
        ) : (
          <p>No components to display.</p>
        )}
      </div>
    );
  };
export default SearchResults;
