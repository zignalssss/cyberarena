// pages/index.js
"use client"
import { useState } from 'react';
import Team from './component/Team.js';

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
  const [dataLevel,setDataLevel] = useState({
    Knowledge:0,
    Norton:0,
    Bitdefender:0,
    "Avira Antivirus":0,
    McAfee:0,
    Windows:0,
    Linux:0
  })


  const handChangeLevel = (key,operat) => {
    if(operat === '-'){
      setDataLevel(preData => ({
        ...preData,[key] : Math.max(preData[key] - 1,0)
      }))
    }
    else if(operat === '+'){
      setDataLevel(preData => ({
        ...preData,[key] : preData[key] + 1
      }))
    }
  }

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
    <div className="h-dvh ">
      {/* Main container */}
      <div className='grid grid-rows-6 bg-gray-100 p-2 gap-5'>
        <div className="grid grid-cols-3 row-span-3 gap-4">
          
          {/* Center Card */}
          {/* <div className="col-span-1 flex justify-center items-center">
            
          </div> */}
          
          {/* Team Manager + List */}
          <div className="col-span-1 bg-white grid grid-cols-2 shadow-lg p-4">
            <div className='text-black flex flex-col items-center py-5 gap-5'>
              <h1 className='text-2xl'>Global Event</h1>
              {/* <div className="w-40 h-60 bg-purple-600 text-white flex items-center justify-center">
                <h1 className="text-black">Card</h1>
              </div> */}
              <div className='flex flex-col items-center gap-3'>
                <img src="https://i.ibb.co/V94BZC5/1.jpg'" className='w-4/5' />
                <h1>Card Stack : 0</h1>
              </div>
            </div>
            <div className='grid grid-rows-6 gap-1 '>
              {Object.entries(dataLevel).map(([key, value], index) => (
                <div className='text-black flex justify-between items-center'>
                  {key}
                  <div className='flex items-center gap-4'>
                    <button className='btn btn-secondary' onClick={()=>{handChangeLevel(key,'-')}}>-</button>
                    <h1>{value}</h1>
                    <button className='btn btn-secondary' onClick={()=>{handChangeLevel(key,'+')}}>+</button>
                  </div>
                </div>
                
              ))}
            </div>
          </div>
          <div className='col-span-2 bg-white shadow-lg  '>

          </div>
        </div>
        <div className='row-span-3 grid grid-cols-5 gap-5'>
          <Team />
          <Team />
          <Team />
          <Team />
          <Team />
        </div>
      </div>
    </div>
  );
}
