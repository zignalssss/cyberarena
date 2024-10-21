// pages/index.js
"use client"
import Popup from 'reactjs-popup';
import { useEffect, useState } from 'react';
import Team from './component/Team.js';
import axios, { all } from 'axios';
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




  const [open, setOpen] = useState(false);

  // Function to open the modal
  const openModal = () => setOpen(true);

  // Function to close the modal
  const closeModal = () => setOpen(false);


  const [selectedOptions, setSelectedOptions] = useState(Array(5).fill(''));
  const [allCard, setAllCard] = useState([]);
  const [countCard, setCountCard] = useState(160);
  const [teamEventCards, setTeamEventCards] = useState([
    [], [], [], [], [], []
  ])
  const [teamActiveEventCards, setTeamActiveEventCards] = useState([
    [], [], [], [], [], []
  ])
  const [zoomDisplay, setZoomDisplay] = useState({});
  const [turn, setTurn] = useState(1);
  const [addedTechnologies, setAddedTechnologies] = useState(Array(5).fill([])); // Stores the added technologies
  const [centerCards, setCenterCard] = useState([])
  const [dataLevel, setDataLevel] = useState({
    Knowledge: 0,
    Norton: 0,
    Bitdefender: 0,
    "Avira Antivirus": 0,
    McAfee: 0,
    Windows: 0,
    Linux: 0
  })
  const postData = async (index, list) => {
    try {
      const response = await axios.post('http://localhost:3000/api/team/updateteam', {
        teamId: index,
        teamEventCards: list
        // teamProtectCard: [] // Empty array for teamevent
      });

      //console.log('Response:', response.data);  // Handle successful response
    } catch (error) {
      console.error('Error posting data:', error);  // Handle error
    }
  };

  const delData = async (teamIndex, data) => {
    try {
      const response = await axios.post('http://localhost:3000/api/team/deleteteamcard', {
        teamId: teamIndex, // Assuming teamIndex corresponds to the team
        delcard: data
      });

      console.log('Response:', response.data.message);

      // Check if the response contains updated teamEventCards
      if (response.status === 200) {
        const newTeamEventCards = response.data.teamEventCards; // Ensure this is the updated 2D array

        // Update the specific team's event cards if necessary
        setTeamEventCards(prevState => {
          const newState = [...prevState];
          newState[teamIndex] = newTeamEventCards; // Update the specific team
          return newState;
        });
      }
    } catch (error) {
      console.error('Error deleting card:', error);
    }
  };

  useEffect(() => {
    // Making a request to an external API
    axios.get('http://localhost:3000/api/card/getcard')
      .then(response => {
        setAllCard(response.data); // Set the data from the API
        // console.log(response.data);
      })
      .catch(error => {
        setError(error); // Handle errors
      });
  }, []);
  console.log("This is TEAM DATA:")
  console.log(teamEventCards);
  useEffect(() => {
    if (allCard.data) {
      const newTeamEventCards = [...teamEventCards]; // Create a copy of teamEventCards
      for (let i = 0; i < 6; i++) {
        let randDomIndex = Math.floor(Math.random() * countCard);
        if (allCard.data) {
          let newElemet = allCard.data[randDomIndex];
          let news = [...newTeamEventCards[i]]; // Copy the individual team's event cards array

          console.log(`Before: ${newElemet.Turn}`);
          if (newElemet.Turn == -1) {
            let ranTurn = Math.floor(Math.random() * 4);
            newElemet.Turn = ranTurn;
          }
          newElemet.Turn = newElemet.Turn + turn;

          console.log(`After: ${newElemet.Turn}`);
          news.push(newElemet);
          newTeamEventCards[i] = news; // Update the specific team list with the new element
        }
      }
      // console.log("NEW DATA:")
      // console.log(newTeamEventCards)
      setTeamEventCards(newTeamEventCards); // Update the state with the new copy
    }


  }, [turn]);

  useEffect(() => {
    console.log("ACTIVATE:!")

    for (let i = 0; i < 6; i++) {
      // console.log("TEAM EVENT ADD")
      // console.log(teamEventCards[i])
      postData(i, teamEventCards[i]);
    }
  }, [teamEventCards])

  useEffect(() => {
    let newActive = teamActiveEventCards.map(arr => [...arr]); // Create a deep copy
    for (let i = 0; i < 6; i++) {
      //console.log(`Team : ${i} EiEi`);
      teamEventCards[i].forEach((element) => {
        if (element.Turn === turn) {
          newActive[i].push(element); // Add element to the copy
          delData(i, element)
        }
      });
    }
    console.log("newActive")
    setTeamActiveEventCards(newActive); // Update the state with the new copy
    console.log(newActive)
  }, [turn]);


  const handChangeLevel = (keyID, operat) => {
    if (operat === '-') {
      setDataLevel(preData => ({
        ...preData, [keyID]: Math.max(preData[keyID] - 1, 0)
      }))
    }
    else if (operat === '+') {
      setDataLevel(preData => ({
        ...preData, [keyID]: preData[keyID] + 1
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

  const handSetPopup = (data) => {
    openModal();
    console.log("TEST POP-UP")
    console.log(data);
    setZoomDisplay(data)


  }
  const handleRemoveElement = (index) => {
    console.log(`Remove Team : ${index}`)
    setTeamActiveEventCards(prevState =>
      prevState.map((element, i) =>
        i === index && element.length > 0
          ? element.slice(1) // Remove the first element if length > 0
          : element // Keep the same element otherwise
      )
    );
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
              <h1 className='text-2xl font-semibold '>Global Event</h1>
              {/* <div className="w-40 h-60 bg-purple-600 text-white flex items-center justify-center">
                <h1 className="text-black">Card</h1>
              </div> */}
              <div className='flex flex-col items-center gap-3'>
                <img src="https://i.ibb.co/V94BZC5/1.jpg" className='w-4/5 rounded-md' />
                <h1>Card Stack : {teamEventCards[0].length}</h1>
              </div>
            </div>
            <div className='grid gap-2 '>
              {Object.entries(dataLevel).map(([key, value], index) => (
                <div className='text-black flex justify-between items-center'>
                  {key}
                  <div className='flex items-center gap-4'>
                    <button className='btn btn-sm w-10' onClick={() => { handChangeLevel(key, '-') }}>-</button>
                    <h1>{value}</h1>
                    <button className='btn btn-sm w-10' onClick={() => { handChangeLevel(key, '+') }}>+</button>
                  </div>
                </div>

              ))}
            </div>
          </div>
          <div className='col-span-2 bg-white shadow-lg text-black grid grid-rows-11 p-2' >
            <div className='flex justify-between items-center row-span-2 '>
              <h1 className='text-2xl font-semibold '>Active Card</h1>
              <div className='flex items-center gap-5'>
                <h1 className='text-2xl'>Turn : {turn}</h1>
                <button className='btn bg-green-700  text-white' onClick={() => { setTurn(preturn => (preturn + 1)) }}>Next Turn</button>
              </div>
            </div>
            <div className='grid grid-cols-6 row-span-9 gap-2 items-center text-black' >
              {/* Display Active Event Cards */}
              {
                teamActiveEventCards.map((element, index) => (
                  <div key={index}>
                    {element.length === 0 && <img className = "rounded-md" src='https://i.ibb.co/V94BZC5/1.jpg' />}
                    {element.length > 0 &&
                      <div className='flex flex-col'>
                        {console.log(`Team : ${index} Size : ${element.length} Data : ${element[0].Name}`)}
                        {/* <img src={element[0].ImageURL} onClick={() => { handSetPopup(element[0]) }} /> */}
                        <img className="rounded-md" src={element[0].ImageURL} onClick={() => {document.getElementById('my_modal_1').showModal();handSetPopup(element[0])}} />
                        <button onClick={() => handleRemoveElement(index)} className='bg-red-400 text-white rounded-md'>{'x'}</button>
                      </div>
                    }
                  </div>
                ))
              }
              {/* <div className='shadow-2xl flex flex-col items-center' onClick={openModal}>
                <div>All Teams</div>
                <img src='https://i.ibb.co/BPbs6Yq/37.jpg' alt="Card" />
                <div className='flex justify-between gap-2'>
                  <h1>C: -45</h1>
                  <h1>I: -35</h1>
                  <h1>A: -25</h1>
                </div>
              </div> */}
            </div>
          </div>

          {/* Pop-up Modal */}
          <dialog id="my_modal_1" className="modal">
            <div className="">
              <div className="modal-action">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn btn-sm w-20 bg-red-500 text-black hover:text-white btn-square mb-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </form>
              </div>
              <div className='bg-white flex flex-col items-center p-5 rounded-md'>
                {/* <div>All Teams</div> */}
                {/* <img src='https://i.ibb.co/BPbs6Yq/37.jpg' alt="Card" className="w-96" /> */}
                <img src={zoomDisplay.ImageURL} alt="Card" className="w-96" />
                {/* <div className='flex justify-between gap-8 text-xl mt-4'>
                    <h1>C: -45</h1>
                    <h1>I: -35</h1>
                    <h1>A: -25</h1>
                  </div> */}
              </div>
            </div>
          </dialog>


        </div>
        <div className='row-span-3 grid grid-cols-5 gap-5'>
          <Team id={1} turn={turn} stackSize={teamEventCards[0].length} />
          <Team id={2} turn={turn} stackSize={teamEventCards[1].length} />
          <Team id={3} turn={turn} stackSize={teamEventCards[2].length} />
          <Team id={4} turn={turn} stackSize={teamEventCards[3].length} />
          <Team id={5} turn={turn} stackSize={teamEventCards[4].length} />
        </div>
      </div>
    </div>
  );
}
