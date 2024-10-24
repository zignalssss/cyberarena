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

  const randType = ["Password Spraying","Privilege Escalation","Phishing or Social_Engineering","MITM_Attack","Malware,Zero_Day_Exploit"];
  const randDefence = ["Strong Password,Account Lockout,MFA","OS Version,MFA,Least Privilege,Access Control Monitoring","Knowledge Level","VPN,DNSSEC,MFA","Anti-Malware Version,Firewall","IDS/IPS,OS Version,Network Segmentation"];

  const [open, setOpen] = useState(false);

  // Function to open the modal
  const openModal = () => setOpen(true);

  // Function to close the modal
  const closeModal = () => setOpen(false);


  const [selectedOptions, setSelectedOptions] = useState(Array(5).fill(''));
  const [allCard, setAllCard] = useState([]);
  const [countCard, setCountCard] = useState(160);
  const [protectStack, setProtectStack] = useState([])
  const [showPopup, setShowPopup] = useState(false); 
  const [currentIndex, setCurrentIndex] = useState(0);
  const [teamEventCards, setTeamEventCards] = useState([
    [], [], [], [], [], []
  ])
  const [teamActiveEventCards, setTeamActiveEventCards] = useState([
    [], [], [], [], [], []
  ])

  const [teamProtectCards, setTeamProtectCards] = useState([
    [], [], [], [], [], []
  ])

  const [teamDatas,setTeamDatas] = useState([
    {}, {}, {}, {}, {} , {}
  ])

  const handleNext = () => {
    if (currentIndex < protectStack.length - 1) {
      setCurrentIndex(currentIndex + 1); // Move to the next item
    }
  };

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

  const postDataLevel = async () => {
    try {
        const response = await axios.post('/api/team/updateteam', {
        teamId: 0,
        teamData : dataLevel,
        // teamProtectCard: [] // Empty array for teamevent
        });

        //console.log('Response:', response.data);  // Handle successful response
    } catch (error) {
        console.error('Error posting data:', error);  // Handle error
    }
  };

  const postData = async (index, list) => {
    try {
      const response = await axios.post('/api/team/updateteam', {
        teamId: index,
        teamEventCards: list
        // teamProtectCard: [] // Empty array for teamevent
      });

      //console.log('Response:', response.data);  // Handle successful response
    } catch (error) {
      console.error('Error posting data:', error);  // Handle error
    }
  };

  const getProtect = async (index) => {
    try {
      let tmpData = {}
      const response = await axios.get(`/api/team/getteamdetial?teamId=${index}`);
      tmpData = response.data.data.teamData;
      tmpData['teamAntiVirus'] = response.data.data.teamAntiVirus;
      tmpData['teamOs'] = response.data.data.teamOs;
      let tmps = teamDatas;
      tmps[index] = tmpData;
      console.log(`Loading.... team ${index} data`);
      console.log(tmps)
      setTeamDatas(tmps);
      return response.data.data.teamProtectCard;  // Return the protect card for the team
    } catch (error) {
      setError(error);  // Handle errors
      return null;  // Return null if an error occurs
    }
  };
  
  const fetchAllProtectCards = async () => {
    const protectCardsCopy = [...teamProtectCards];  // Copy the current state array
  
    // Fetch protect card for each index (1 to 5)
    for (let i = 1; i <= 5; i++) {
      const protectCard = await getProtect(i);  // Await the fetch for each index
      if (protectCard !== null) {
        protectCardsCopy[i] = protectCard;  // Update the copy of the state array
      }
    }
  
    setTeamProtectCards(protectCardsCopy);  // Update state with the new array after all fetches
  };
  

  const delData = async (teamIndex, data) => {
    try {
      const response = await axios.post('/api/team/deleteteamcard', {
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
    postDataLevel();
  }, [dataLevel])

  useEffect(() => {
    // Making a request to an external API
    axios.get('/api/card/getcard')
      .then(response => {
        setAllCard(response.data); // Set the data from the API
        // console.log(response.data);
      })
      .catch(error => {
        setError(error); // Handle errors
      });
  }, []);
  // console.log("This is TEAM DATA:")
  // console.log(teamEventCards);
  useEffect(() => {
    if (allCard.data) {
      const newTeamEventCards = [...teamEventCards]; // Create a copy of teamEventCards
      for (let i = 0; i < 6; i++) {
        let randDomIndex = Math.floor(Math.random() * countCard);
        if (allCard.data) {
          let newElemet = allCard.data[randDomIndex];
          let news = [...newTeamEventCards[i]]; // Copy the individual team's event cards array

          // console.log(`Before: ${newElemet.Turn}`);
          if (newElemet.Turn == -1) {
            let ranTurn = Math.floor(Math.random() * 4)+1;
            let randIntType = Math.floor(Math.random()*5);
            newElemet.Type = randType[randIntType];
            newElemet.Defence = randDefence[randIntType];
            newElemet.Turn = ranTurn;
          }
          // newElemet.Turn = newElemet.Turn + turn;
          newElemet['start_turn'] = turn;

          let tmplist = newElemet.Defence.split(',');
          tmplist.forEach((data) => {
            if(data === 'Knowledge Level'){
              // let ranLevel = Math.floor(Math.random() * (dataLevel.Knowledge - 1)) + 1;
              newElemet['version_check'] =  -1;
            }
            else if(data === 'OS Version'){
              // let ranLevel = Math.floor(Math.random() * (dataLevel[teamDatas[i]?.teamOs] - 1)) + 1;
              newElemet['version_check'] =  -1;
            }
            else if(data === 'Anti-Malware Version'){
              // let ranLevel = Math.floor(Math.random() * (dataLevel[teamDatas[i]?.teamAntiVirus] - 1)) + 1;
              newElemet['version_check'] =  -1;
            }
          })
          // console.log(`After: ${newElemet.Turn}`);
          news.push(newElemet);
          newTeamEventCards[i] = news; // Update the specific team list with the new element
        }
      }
      // console.log("NEW DATA:")
      // console.log(newTeamEventCards)
      setTeamEventCards(newTeamEventCards); // Update the state with the new copy
      fetchAllProtectCards();
    }

  }, [turn]);

  const closePopup = () => {
    setShowPopup(false);  // Close the popup
  };

  useEffect(() => {
    // console.log("ACTIVATE:!")

    for (let i = 0; i < 6; i++) {
      // console.log("TEAM EVENT ADD")
      // console.log(teamEventCards[i])
      postData(i, teamEventCards[i]);
    }
  }, [teamEventCards])

  useEffect(() => {
    // Whenever protectStack changes, check if length > 0 and show popup
    console.log("Stack is not Empty!!")
    if (protectStack.length > 0) {
      setShowPopup(true);  // Show popup when protectStack has items
    } else {
      setShowPopup(false); // Hide popup when protectStack is empty
    }
  }, [protectStack]);

  useEffect(() => {
    for (let i = 1; i < 6; i++) {
      let arr = [];  // Temporary array for each team
      console.log(`Team : ${i}`);
      
      teamEventCards[i].forEach((element) => {
        let ls = element.Defence.split(",");
        console.log(`Team : ${i} Protect By:`);
        let status = false;
        let protectList = []
        
        ls.forEach((checker) => {
          
          // Assuming teamProtectCards[i] is an array
          const found = teamProtectCards[i].find((checking) => checker === checking);
          
          if (found) {
            console.log(found);
            protectList.push(found);
            console.log(element['protectBy']);  // Logging correct protectBy
            element['teamId'] = i;
            status = true;
            
          }
        });
        // Loop through `ls` just once
        ls.forEach((checking) => {

                  // let ranLevel = Math.floor(Math.random() * (dataLevel[teamDatas[i]?.teamAntiVirus] - 1)) + 1;
              // let ranLevel = Math.floor(Math.random() * (dataLevel[teamDatas[i]?.teamOs] - 1)) + 1;

          if ("Knowledge Level" === checking && !status) {
            const foundLevelKnowledge = checking;
            let ranLevel = element['version_check'];
            console.log("Check Version")
            console.log(ranLevel);
            if(ranLevel === -1){
              ranLevel = Math.floor(Math.random() * (dataLevel.Knowledge - 1)) + 1;
            }
            // Ensure `teamDatas` and `Knowledge` exist
            if (teamDatas && teamDatas.Knowledge >= ranLevel) {
              console.log(foundLevelKnowledge);
              protectList.push(`"Knowledge Level : ${ranLevel}`);
              element['teamId'] = i;
              status = true;
            }
          }

          if ("OS Version" === checking && !status) {
            const foundOsVersion = checking;
            // let ranLevel = Math.floor(Math.random() * (dataLevel[teamDatas[i]?.teamOs] - 1)) + 1;
            let ranLevel = element['version_check'];
            console.log("Check Version")
            console.log(ranLevel);

            if(ranLevel === -1){
              ranLevel = Math.floor(Math.random() * (dataLevel[teamDatas[i]?.teamOs] - 1)) + 1;
            }
            // Ensure `teamDatas` and `OS_Version` exist
            if (teamDatas[i] && teamDatas[i].OS_Version >= ranLevel) {
              console.log(foundOsVersion);
              protectList.push(`${teamDatas[i].teamOs} : ${ranLevel}`);
              element['teamId'] = i;
              status = true;
            }
          }

          if ("Anti-Malware Version" === checking && !status) {
            const foundAnitVersion = checking;
            // let ranLevel = Math.floor(Math.random() * (dataLevel[teamDatas[i]?.teamAntiVirus] - 1)) + 1;
            console.log("Check Version")

            let ranLevel = element['version_check'];
            console.log(ranLevel);
            if(ranLevel === -1){
              ranLevel = Math.floor(Math.random() * (dataLevel[teamDatas[i]?.teamAntiVirus] - 1)) + 1;
            }
            // Ensure `teamDatas` and `Anti_Virus_Version` exist
            if (teamDatas[i] && teamDatas[i].Anti_Virus_Version >= ranLevel) {
              console.log(foundAnitVersion);
              protectList.push(`${teamDatas[i].teamAntiVirus} : ${ranLevel}`);
              element['teamId'] = i;
              status = true;
            }
          }
        });

        if(status){
          console.log("protectList");
          console.log(protectList);
          element['protectBy'] = protectList;
          arr.push(element);  // Collect elements for this team
          console.log(arr)
          setProtectStack(prevStack => [...prevStack, element]);
          delData(i, element);  // Assuming this function processes and removes data
        }
      });
    
      // Append all elements for this team to the protectStack
    }    
  }, [teamProtectCards,turn])

  useEffect(() => {
    let newActive = teamActiveEventCards.map(arr => [...arr]); // Create a deep copy
    for (let i = 0; i < 6; i++) {
      //console.log(`Team : ${i} EiEi`);
      teamEventCards[i].forEach((element) => {
        if (element.Turn+element['start_turn'] === turn) {
          newActive[i].push(element); // Add element to the copy
          delData(i, element)
        }
      });
    }
    // console.log("newActive")
    setTeamActiveEventCards(newActive); // Update the state with the new copy
    // console.log(newActive)
  }, [teamEventCards]);


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
  const handleRemoveElement = (teamIndex) => {
    let memberIndex = 0;
    console.log(`Remove Member: ${memberIndex} from Team: ${teamIndex}`);
    // Create a deep copy of the 2D array
    let tmp = teamActiveEventCards.map(team => [...team]);
    // Remove the specific element from the sub-array
    tmp[teamIndex].splice(memberIndex, 1);
    // Update the state with the modified 2D array
    setTeamActiveEventCards(tmp);
  };
  
  

  const handleClosePopUp = () => {
    setShowPopup(false);
    setProtectStack([]);
    setCurrentIndex(0);
  }

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
                        {/* {console.log(`Team : ${index} Size : ${element.length} Data : ${element[0].Name}`)} */}
                        {/* <img src={element[0].ImageURL} onClick={() => { handSetPopup(element[0]) }} /> */}
                        <img className="rounded-md" src={element[0].ImageURL} onClick={() => {document.getElementById('my_modal_1').showModal();handSetPopup(element[0])}} />
                        <button onClick={() => handleRemoveElement(index)} className='bg-red-400 text-white rounded-md'>{'x'}</button>
                      </div>
                    }
                  </div>
                ))
              }

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
              <div className='bg-white flex flex-col items-center p-5 rounded-md text-black'>
                {/* <div>All Teams</div> */}
                {/* <img src='https://i.ibb.co/BPbs6Yq/37.jpg' alt="Card" className="w-96" /> */}
                <img src={zoomDisplay.ImageURL} alt="Card" className="w-96" />
                {<h1>Type : {zoomDisplay.Type}</h1>}
                <h1>List of Protect Cards </h1>
                <p>{ zoomDisplay.Defence}</p>
                {/* <div className="grid grid-cols-3 gap-2">
                  {zoomDisplay.Defence.split(',').map((element, index) => (
                    <div key={index} className="p-3 text-center">{element}</div>
                  ))}
                </div> */}
                {zoomDisplay.IsRoundStack === 1 && <div className='text-black'>จำนวนรอบที่การ์ดใบนี้ทำงาน : {Math.abs(zoomDisplay.start_turn-turn)}</div>}
                {/* {<div>{zoomDisplay.Turn} {zoomDisplay.start_turn}</div>} */}
                {/* <div className='flex justify-between gap-8 text-xl mt-4'>
                    <h1>C: -45</h1>
                    <h1>I: -35</h1>
                    <h1>A: -25</h1>
                  </div> */}
              </div>
            </div>
          </dialog>

           {/* Popup component */}
          <Popup open={showPopup} onClose={handleClosePopUp} modal closeOnDocumentClick>
            <div className="relative w-full max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
              {/* Modal action (Close button) */}
              <div className="absolute top-2 right-2">
                <button
                  className="btn btn-sm bg-red-500 text-white hover:bg-red-600 p-2 rounded-full"
                  onClick={handleClosePopUp}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Modal content */}
              <div className="flex flex-col items-center p-5 text-black">
                {protectStack.length > 0 && (
                  <>
                    <h1 className='text-black text-2xl'>{`Team : ${protectStack[currentIndex].teamId}`}</h1>
                    <img
                      src={protectStack[currentIndex].ImageURL}
                      alt="Card"
                      className="w-96 mb-4"
                    />
                    {<h1>Type : {protectStack[currentIndex].Type}</h1>}
                    <div className='text-black text-xl'>Protect By</div>
                    <div className='text-black'> {
                      <div className='flex flex-row-3 gap-4'>
                        {protectStack[currentIndex].protectBy[0]}
                      </div>
                      }</div>
                    <p className="text-gray-700 mb-4">
                      You are viewing item {currentIndex + 1} of {protectStack.length}
                    </p>
                    {protectStack[currentIndex].IsRoundStack === 1 && <div className='text-black'>จำนวนรอบที่การ์ดใบนี้ทำงานก่อนโดนป้องกัน : {Math.abs(protectStack[currentIndex].start_turn-turn)}</div>}
                    {/* {console.log(protectStack[currentIndex].protectBy)} */}
                    {/* Next button */}
                    <button
                      className={`btn btn-primary ${currentIndex === protectStack.length - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                      onClick={handleNext}
                      disabled={currentIndex === protectStack.length - 1}
                    >
                      Next
                    </button>
                  </>
                )}
              </div>
            </div>
          </Popup>





        </div>
        <div className='row-span-3 grid grid-cols-5 gap-5'>
          <Team id={1} turn={turn} stackSize={teamEventCards[1].length} />
          <Team id={2} turn={turn} stackSize={teamEventCards[2].length} />
          <Team id={3} turn={turn} stackSize={teamEventCards[3].length} />
          <Team id={4} turn={turn} stackSize={teamEventCards[4].length} />
          <Team id={5} turn={turn} stackSize={teamEventCards[5].length} />
        </div>
      </div>
    </div>
  );
}
