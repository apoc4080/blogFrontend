// GenderStudiesPage.jsx
import React from 'react';
import { genderStudiesData } from './info';
import './Course.css';

const Course = () => {
  return (
    <div className="gender-studies-page page">
      <section className="gender-studies-section">
        <h2>Gender Studies Centres and Courses</h2>
        <ul>
          {genderStudiesData.map((item, index) => (
            <li key={index} className="course-item">
            <h3>{item.name}</h3>
              <div className="course-info">
                <div className="info-left">
                  <p dangerouslySetInnerHTML={{ __html: item.description }} />
                  <br></br>
                  {item.location && <p className="location"><b>Location:</b> {item.location}</p>}
                </div>
                <div className="info-right">
                  {item.facebook && (
                    <a href={item.facebook} target="_blank" rel="noopener noreferrer">
                      Facebook
                    </a>
                  )}
                  {item.website && (
                    <a href={item.website} target="_blank" rel="noopener noreferrer">
                      Website
                    </a>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Course;
