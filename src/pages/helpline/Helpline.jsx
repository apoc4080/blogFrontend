// HelplineTable.jsx

import React from 'react';
import { LGBTQHelplinesData } from './info'; // Assuming the data.js file is in the same directory
import './Helpline.css';

const Helpline = () => {
    return (
        <div>
            <h1>LGBTQ India Helplines</h1>
            <table>
                <thead>
                    <tr>
                        <th>Organization</th>
                        <th>Contact</th>
                        <th>Remarks</th>
                    </tr>
                </thead>
                <tbody>
                    {LGBTQHelplinesData.map((helpline, index) => (
                        <tr key={index}>
                            <td>{helpline.organization}</td>
                            <td>{helpline.contact}
                                {helpline.url && (
                                    <React.Fragment>
                                        <br />
                                        <a href={helpline.url}>link</a>
                                    </React.Fragment>
                                )}</td>
                            <td>{helpline.remark}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Helpline;
