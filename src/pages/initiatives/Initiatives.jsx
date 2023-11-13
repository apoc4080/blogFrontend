// Initiatives.js

import React from 'react';
import './Initiatives.css';
import { initiatives } from './info';

const Initiatives = () => {
  return (
    <div className="initiatives-page">
      <div className="initiatives-container">
        <h2>Significant Initiatives</h2>
        {initiatives.map((initiative, index) => (
          <div key={index} className="initiative-card">
            <h3>{initiative.name}</h3>
            <div className="initiative-details">
              <div className="initiative-details-left">
                <p dangerouslySetInnerHTML={{ __html: initiative.description }}></p>
                <div className="initiative-links">
                  {initiative.facebook && <a href={initiative.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>}
                  {initiative.website && <a href={initiative.website} target="_blank" rel="noopener noreferrer">Website</a>}
                </div>
              </div>
              <div className="initiative-details-right">
                <img src={initiative.photo} alt={initiative.name} className="initiative-photo" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Initiatives;
