import { useEffect, useState } from 'react';
import axios, { all } from 'axios';
export default function Team(props) {

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

    const antiVirus = ["Norton", "Bitdefender", "Avira Antivirus", "McAfee"];
    const os = ["Windows", "Linux"];

    const [optionsProtect, setOptionsProtect] = useState(options);
    const [teamOptions, setTeamOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState("");
    const [selectedAntiVirus, setSelectedAntiVirus] = useState("");
    const [selectedOS, setSelectedOS] = useState("");
    const [eventCards,setEventCards] = useState([])
    const [countCards,setCountCards] = useState(0)
    const [teamData, setTeamData] = useState({
        Knowledge: 0,
        OS_Version: 0,
        Anti_Virus_Version: 0
    });


    const postDataLevel = async () => {
        try {
            const response = await axios.post('http://cyberarena.vercel.app/api/team/updateteam', {
            teamId: props.id,
            teamData : teamData,
            teamOs : selectedOS,
            teamAntiVirus : selectedAntiVirus
            // teamProtectCard: [] // Empty array for teamevent
            });

            //console.log('Response:', response.data);  // Handle successful response
        } catch (error) {
            console.error('Error posting data:', error);  // Handle error
        }
    };

    const postDataProtect = async () => {
        try {
            const response = await axios.post('http://cyberarena.vercel.app/api/team/updateteam', {
            teamId: props.id,
            teamProtectCard : teamOptions
            // teamProtectCard: [] // Empty array for teamevent
            });

            //console.log('Response:', response.data);  // Handle successful response
        } catch (error) {
            console.error('Error posting data:', error);  // Handle error
        }
    };

    useEffect(() => {
        postDataLevel();
        // console.log("EIEI")
        // console.log(selectedAntiVirus)
        // console.log(selectedOS)
    }, [selectedAntiVirus,selectedOS,teamData])

    useEffect(() => {
        console.log(`Team : ${props.id}`)
        console.log(teamOptions)
        postDataProtect();
    } , [teamOptions])

    // useEffect(() => {
    //     axios.get(`http://cyberarena.vercel.app/api/team/getteamdetial?teamId=${props.id}`)
    //   .then(response => {
    //     setTeamData(response.data.data.teamEventCards); // Set the data from the API
    //     console.log(response.data.data.teamEventCards);
    //     setCountCards(response.data.data.teamEventCards.length)

    //   })
    //   .catch(error => {
    //     setError(error); // Handle errors
    //   });
    // },[props.turn])

    useEffect(() => {
        setCountCards(props.stackSize);
    }, [props.stackSize])


    // Handle option selection
    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
    };

    // Handle adding the selected option to teamOptions array
    const handleAdd = () => {
        if (selectedOption && !teamOptions.includes(selectedOption)) {
            setTeamOptions([...teamOptions, selectedOption]);
            setSelectedOption(""); // Reset selection
        }
    };

    // Handle removing the selected option from teamOptions array
    const handleRemove = (item) => {
        setTeamOptions(teamOptions.filter(option => option !== item));
    };

    const increment = (data) => {
        setTeamData(prevData => ({
            ...prevData,
            [data]: prevData[data] + 1
        }));
        console.log(teamData)
    };
    
    const decrement = (data) => {
        setTeamData(prevData => ({
            ...prevData,
            [data]: prevData[data] > 0 ? prevData[data] - 1 : 0
        }));
    };


    return (
        <div className="bg-white p-2 shadow-lg text-black mb-4 h-full w-full grid grid-rows-7 gap-1">
            {/* Technology Tools Selector */}
            <div className='grid grid-cols-3 row-span-1'>
                <select
                    value={selectedOption}
                    onChange={handleSelectChange}
                    className="select select-success w-full max-w-xs bg-white col-span-2"
                >
                    <option disabled value="">Technology Tools</option>
                    {optionsProtect.map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                    ))}
                </select>

                <button
                    className="ml-4 btn btn-secondary col-span-1"
                    onClick={handleAdd}
                    disabled={!selectedOption || teamOptions.includes(selectedOption)}
                >
                    Add
                </button>
            </div>

            {/* Scrollable teamOptions array */}
            <div className="row-span-3 grid grid-cols-2">
                <div className='flex flex-col justify-center items-center gap-3'>
                    <img src='https://i.ibb.co/V94BZC5/1.jpg' className='w-20 rounded-md'></img>
                    <h1>Card Stack : {countCards}</h1>
                </div>
                <div className={`grid grid-cols-1 gap-2  overflow-y-auto h-40`}>
                    {teamOptions.map((item, index) => (
                        <div key={index} className="flex justify-between items-center bg-green-100 px-2 py-1 rounded-lg">
                            <div className='text-xs'>{item}</div>
                            <button onClick={() => handleRemove(item)}>x</button>
                        </div>
                    ))}
                </div>
            </div>

             {/* Team Data Section */}
             <div className='row-span-3 grid grid-rows-3'>
                <div className="row-span-1 grid grid-cols-2 items-center gap-2">
                    <label className="block text-sm ">Knowledge Level:</label>
                    <div className="flex items-center space-x-4">
                        <button className="btn btn-secondary" onClick={() => decrement("Knowledge")}>-</button>
                        <div>{teamData.Knowledge}</div>
                        <button className="btn btn-secondary" onClick={() => increment("Knowledge")}>+</button>
                    </div>
                </div>

                <div className='row-span-1 grid grid-cols-2 items-center gap-2'>
                    <select
                        className="select select-success w-full max-w-xs bg-white"
                        value={selectedAntiVirus} onChange={(e) => setSelectedAntiVirus(e.target.value)}
                    >
                        <option disabled value="">Select Antivirus</option>
                        {antiVirus.map((av, index) => (
                            <option key={index} value={av} onSelect={() => {setSelectedAntiVirus(av)}}>{av}</option>
                        ))}
                    </select>
                    <div className="flex items-center space-x-4">
                        <button className="btn btn-secondary" onClick={() => decrement("Anti_Virus_Version")}>-</button>
                        <div>{teamData.Anti_Virus_Version}</div>
                        <button className="btn btn-secondary" onClick={() => increment("Anti_Virus_Version")}>+</button>
                    </div>
                </div>

                <div className="row-span-1 grid grid-cols-2 items-center gap-2">
                    <select value={selectedOS} onChange={(e) => setSelectedOS(e.target.value)} className='select select-success w-full max-w-xs bg-white'>
                        <option disabled value="">
                            Select OS
                        </option>
                        {os.map((osOption, index) => (
                            <option key={index} value={osOption}>
                            {osOption}
                            </option>
                        ))}
                    </select>
                    <div className="flex items-center space-x-4 ">
                        <button className="btn btn-secondary" onClick={() => decrement("OS_Version")}>-</button>
                        <div>{teamData.OS_Version}</div>
                        <button className="btn btn-secondary" onClick={() => increment("OS_Version")}>+</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
