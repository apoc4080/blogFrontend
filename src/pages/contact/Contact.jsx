// ContactPage.jsx
import React from 'react';
import "./Contact.css"; // Make sure to adjust the path accordingly

const Contact = () => {
  // Assuming you have data for supervisor and team members
  const supervisorData = {
    id: 1,
    name: "Dr. Manju Dhariwal",
    photo: "sup.png", // Replace with actual photo URL
    email: "manju@lnmiit.ac.in",
  };

  const teamMembersData = [
    {
      id: 2,
      name: "Charu Sharma",
      photo: "charu.jpg", // Replace with actual photo URL
      email: "20ucs055@lnmiit.ac.in",
    },
    {
      id: 3,
      name: "Himanshi Rangnani",
      photo: "himanshi.jpg", // Replace with actual photo URL
      email: "20ucs079@lnmiit.ac.in",
    },
    {
      id: 4,
      name: "Subodh",
      photo: "subodh.jpg", // Replace with actual photo URL
      email: "20ucc106@lnmiit.ac.in",
    },
  ];

  return (
    <div className='contact-page'>
      <h1>Our Team</h1>

      {/* Supervisor Section */}
      <div className='supervisor-section'>
        <div key={supervisorData.id} className='card' onClick={() => window.location.href = 'mailto:'+supervisorData.email}>
          <img src={supervisorData.photo} alt={supervisorData.name} />
          <div className='card-details'>
            <h3>{supervisorData.name}</h3>
            <p>Supervisor</p>
          </div>
        </div>
      </div>

      {/* Team Members Section */}
      <div className='team-section'>
        {teamMembersData.map((member) => (
          <div key={member.id} className='card' onClick={() => window.location.href = 'mailto:'+member.email}>
            <img src={member.photo} alt={member.name} />
            <div className='card-details'>
              <h3>{member.name}</h3>
              <p>Team Member</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contact;
