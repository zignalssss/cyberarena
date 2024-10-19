// pages/index.js
"use client"
import { useState } from 'react';
import Team from './component/Team';

export default function Home() {

  const options = [
    "MFA",
    "Strong Password",
    "Data Backup",
    "IDS/IPS",
    "Account Lockout",
    "VPN",
    "Secure DNS",
    "DNSSEC",
    "Input and Output Encoding",
    "CSP",
    "DNS Filtering",
    "ORM",
    "Prepared Statements",
    "Access Control Monitoring",
    "Least Privilege",
    "SID Regeneration",
    "Session Timeout",
    "Encryption",
    "Strict Session",
    "Regular password changes",
    "Input Validation and Sanitization",
    "Firewall",
    "Establish Clear IT Policies"
  ];

  const [selectedOptions, setSelectedOptions] = useState(Array(5).fill(''));
  const [addedTechnologies, setAddedTechnologies] = useState(Array(5).fill([])); // Stores the added technologies

  // Handle option change for a specific team
  const handleSelectChange = (index) => (event) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[index] = event.target.value;
    setSelectedOptions(newSelectedOptions);
  };

  // Handle adding the selected technology to the team
  const handleAdd = async (index) => {
    const selectedTechnology = selectedOptions[index];

    // POST data to an API
    try {
      const res = await fetch('/api/team/updatedefcard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          team: index + 1,
          technology: selectedTechnology,
        }),
      });

      const data = await res.json();
      console.log(data.message);

      if (res.ok) {
        // Update added technologies for the specific team
        const newAddedTechnologies = [...addedTechnologies];
        newAddedTechnologies[index] = [
          ...newAddedTechnologies[index],
          selectedTechnology
        ];

        setAddedTechnologies(newAddedTechnologies);

        // Clear the selected option
        setSelectedOptions((prev) => {
          const newSelectedOptions = [...prev];
          newSelectedOptions[index] = '';
          return newSelectedOptions;
        });
      }
    } catch (error) {
      console.error('Error adding technology:', error);
    }
  };

  return (
    <div className="h-dvh grid grid-rows-4 bg-gray-100 p-8">
      {/* Main container */}
      <div className="grid grid-cols-3 row-span-2 gap-4">
        
        {/* Center Card */}
        <div className="col-span-1 flex justify-center items-center">
          <div className="w-40 h-60 bg-purple-600 text-white flex items-center justify-center">
            <span className="text-black">Card</span>
          </div>
        </div>
        
        {/* Team Manager + List */}
        <div className="col-span-1 bg-white shadow-lg p-4">
          <h2 className="text-xl font-bold text-black">Global Event</h2>
          <ul className="mt-4 text-black">
            <li className="flex justify-between">
              <span>Knowledge Level</span>
              <span>0 +</span>
            </li>
            <li className="flex justify-between">
              <span>Norton</span>
              <span>0 +</span>
            </li>
            <li className="flex justify-between">
              <span>Bitdefender</span>
              <span>0 +</span>
            </li>
            <li className="flex justify-between">
              <span>Avira Antivirus</span>
              <span>0 +</span>
            </li>
            <li className="flex justify-between">
              <span>McAfee</span>
              <span>0 +</span>
            </li>
            <li className="flex justify-between">
              <span>Windows</span>
              <span>0 +</span>
            </li>
            <li className="flex justify-between">
              <span>Linux</span>
              <span>0 +</span>
            </li>
          </ul>
        </div>

        {/* Right Panel */}
        <div className="col-span-1 flex justify-center">
          <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded">
            Next Turn
          </button>
        </div>
      </div>
      <div className='row-span-2 grid grid-cols-5 gap-5'>
        <Team />
        <Team />
        <Team />
        <Team />
        <Team />
      </div>
    </div>
  );
}
