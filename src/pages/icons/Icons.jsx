// IconsPage.jsx
import React from 'react';
import {iconsData} from "./info"; // Adjust the path accordingly
import "./Icons.css";

const IconsPage = () => {
  return (
    <div className='icons-page'>
      <h1>LGBT Icons in India</h1>
      <ul className='icon-list'>
        {iconsData.map((icon) => (
          <li key={icon.id} className='icon-item'>
            <img src={icon.photo} alt={icon.name} />
            <div className='icon-details'>
              <h3>{icon.name}</h3>
              <a href={icon.url} target='_blank' rel='noopener noreferrer'>
                View Details
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IconsPage;
