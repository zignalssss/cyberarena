// pages/index.js
"use client"
import { useState } from 'react';

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
  const [addedTechnologies, setAddedTechnologies] = useState(Array(5).fill([])); // เก็บข้อมูลที่เพิ่มแล้ว

  const handleSelectChange = (index) => (event) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[index] = event.target.value;
    setSelectedOptions(newSelectedOptions);
  };

  const handleAdd = async (index) => {
    const selectedTechnology = selectedOptions[index];

    // POST ข้อมูลไปยัง API
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
        const newAddedTechnologies = [...addedTechnologies];
        newAddedTechnologies[index] = [
          ...newAddedTechnologies[index], 
          selectedTechnology
        ];

        setAddedTechnologies(newAddedTechnologies);
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
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Main container */}
      <div className="grid grid-cols-3 gap-4">
        
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

          {/* Numbered List */}
          {/* <ul className="grid grid-cols-2 gap-2 mt-6 text-black">
            {Array.from({ length: 23 }).map((_, idx) => (
              <li key={idx} className="flex justify-between">
                <span>{idx + 1} :</span>
                <span>Action {idx + 1}</span>
              </li>
            ))}
          </ul> */}
        </div>

        {/* Right Panel */}
        <div className="col-span-1 flex justify-center">
          <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded">
            Next Turn
          </button>
        </div>
      </div>

      {/* Bottom Row (5 Cards) */}
      <div className="flex justify-center space-x-4 mt-8">
        {Array.from({ length: 5 }).map((_, idx) => (
          <div key={idx} className="w-40 h-60 bg-purple-600 text-white flex items-center justify-center shadow-md">
            <span className="text-black">Card {idx + 1}</span>
          </div>
        ))}
      </div>

      {/* Bottom Grid */}
      <div className='grid grid-cols-5 gap-4 mt-8 rounded-md'>
      {Array.from({ length: 5 }).map((_, idx) => (
        <div key={idx} className="bg-white p-4 shadow-lg text-black mb-4">
          <select 
            onChange={handleSelectChange(idx)} 
            value={selectedOptions[idx]} 
            className="select select-success w-full max-w-xs bg-white"
          >
            <option disabled value="">Technology Tools</option>
            {options.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>

          <button 
            className="ml-4 btn btn-secondary" 
            onClick={() => handleAdd(idx)}
            disabled={!selectedOptions[idx]}
          >
            Add
          </button>

          <div className="mt-2">
            <strong>Added Technologies (Team {idx + 1}):</strong>
            <ul>
              {addedTechnologies[idx].map((tech, index) => (
                <li key={index}>{tech}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}

      <button 
        className="mt-4 btn btn-primary"
        onClick={() => console.log("Submit button clicked")}
      >
        Submit
      </button>
    </div>
    </div>
  );
}
