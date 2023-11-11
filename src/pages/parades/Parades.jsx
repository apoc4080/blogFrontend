// ParadesPage.jsx
import React from 'react';
import { paradeData } from "./info";
import './Parades.css'; // Import the styles

const ParadesPage = () => {
  return (
    <div className="parades-page">
      <h1>LGBTQ Parades in India</h1>
      <ul className="parade-list">
        {paradeData.map((parade, index) => (
          <li key={parade.id} className="parade-item">
            <span className="parade-number">{index + 1}</span>
            <div className="parade-details">
              <a
                href={parade.website}
                target='_blank'
                rel='noopener noreferrer'
                className="parade-link"
              >
                <h3>{parade.name}</h3>
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ParadesPage;
