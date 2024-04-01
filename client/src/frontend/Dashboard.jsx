import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from "./Nav"
import  "../css/Dashboard.css";
import { useLocation,useParams  } from 'react-router-dom';
import axios from 'axios';
function Dashboard({ handleLogout }) {
    const [clientName, setClientName] = useState('');
    const { clientid } = useParams();
    console.log(clientid);
    const [fileData, setFileData] = useState([]);
    const [fileName, setFileName] = useState('');
    const [isDownloading, setIsDownloading] = useState(false);
    console.log('Dashboard clientid:', clientid);
    // const [fileMonth, setFileMonth] = useState('');
    const [fileMonth, setFileMonth] = useState({
        month : ''
    })
    const handleSelect = (e) =>{
      setFileMonth({...fileMonth,[e.target.name]: e.target.value});
    }
    const [monthData, setMonthData] = useState([]);

    // Search Data
    const handleSearch =  async(e) =>{
      e.preventDefault();
      if(!fileMonth.month){
        alert("Please select a month");
        return;
      }
      try {
            const res = await fetch(`http://192.168.1.10:3004/search/${clientid}/${fileMonth}`, {
               method: 'POST',
               headers:{
                'Content-Type':'application/json'
               },
               body: JSON.stringify(fileMonth),
            });
            if (res.ok) {
              const monthData = await res.json();
              setMonthData(monthData);
              console.log("Month data",monthData);
            }
            else{
              throw new Error('Server response not ok');
            }
          } catch (error) {
          console.log(`Error! ${error}`);
        };
    }
    // Get Client Data
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(`http://192.168.1.10:3004/getFileData/${clientid}`);
          if (response.ok) {
            const data = await response.json();
            console.log('Data',data);
            if (data.length > 0) {
              const file_name = data[0].file_name; // Access the first object in the array
              const client_name = data[0].name;
              console.log('Data from server:', client_name);
              console.log('File Name:', file_name);
              setClientName(client_name);
              setFileData(data);
              setFileName(file_name);
            } else {
              console.error('No data received from the server');
            }
          } else {
            console.error('Error fetching file data');
          }
        } catch (error) {
          console.error('Error fetching file data:', error);
        }
      };
    
      fetchData();
    }, []);
    // Download Data
    const handleDownload = async (clientid, file_name) => {
      console.log('Working');
      try {
        // Make a request to the download endpoint
        setIsDownloading(true);
       
        console.log("File_Name",file_name);
        const file_Name = file_name;
        console.log("File_Name ",file_name);
        
        const response = await axios.get(`http://192.168.1.10:3004/download/${clientid}/${encodeURIComponent(file_Name)}`, {
          responseType: 'blob',
        });
    
        // Create a download link and trigger the download
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', file_Name);
        document.body.appendChild(link);
        link.click();
        setIsDownloading(false);
      } catch (error) {
        console.error('Error downloading file:', error);
      }
    };
  


    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    

    // const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check if the user is logged in
        const clientId = sessionStorage.getItem('clientid');
        setIsLoggedIn(!!clientId);
    }, []);

    // useEffect(() => {
    //     // Redirect to login page if user is not logged in
    //     if (!isLoggedIn) {
    //         navigate('/client-login');
    //     }
    // }, [isLoggedIn, navigate]);
  return (
    <>
    { isLoggedIn&&
      <><Nav handleLogout={handleLogout} />
          <h3 className='welcome-user'>Welcome {clientName}</h3><div id="dashboard">
          {isDownloading &&
            <div className="download-loader">
              <div className="loader"></div>
              <h3>Downloading...</h3>
            </div>}

          <div id="search">
            <form action="" method="post" onSubmit={handleSearch}>
              <label for="searchInput">Search: </label>
              <select className='searchinput' name='month' value={fileMonth.month} onChange={handleSelect}>
                <option value="">Select Month</option>
                {months.map((month, index) => (
                  <option key={index} value={month}>{month}</option>
                ))}
              </select>
              <button className='search-btn' type='submit'>Start Search</button>
            </form>
          </div>

          {fileData && monthData.length === 0 && (
            <div className="clients">
              <table>
                <thead>
                  <tr>
                    <th>Select</th>
                    <th>S.No</th>
                    <th>Data Type</th>
                    <th>Month Name</th>
                    <th>Year</th>
                    <th>File Name</th>
                    <th>Upload Date</th>
                    {/* <th>Status</th> */}
                    <th>Download</th>
                  </tr>
                </thead>
                <tbody>
                  {fileData.map((data, index) => (
                    <tr key={index}>
                      <td><input type="checkbox" /></td>
                      <td>{index + 1}</td>
                      <td>{data.filetype}</td>
                      <td>{data.file_month}</td>
                      <td>{data.upload_year}</td>
                      <td>{data.file_name}</td>
                      <td>{new Date(data.upload_date).toLocaleDateString()}</td>
                      {/* <td>{data.status}</td> */}
                      <td>  <button
                        className="btn"
                        onClick={() => handleDownload(clientid, data.file_name)}
                        disabled={isDownloading}
                      >
                        Download
                      </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {monthData.length > 0 && (
            <div className="search-result">
              <h3>Search Result</h3>
              <table>
                <thead>
                  <tr>
                    <th>Select</th>
                    <th>S.No</th>
                    <th>Data Type</th>
                    <th>Month Name</th>
                    <th>Year</th>
                    <th>File Name</th>
                    <th>Upload Date</th>
                    {/* <th>Status</th> */}
                    <th>Download</th>
                  </tr>
                </thead>
                <tbody>
                  {monthData.map((data, index) => (
                    <tr key={index}>
                      <td><input type="checkbox" /></td>
                      <td>{index + 1}</td>
                      <td>{data.filetype}</td>
                      <td>{data.file_month}</td>
                      <td>{data.upload_year}</td>
                      <td>{data.file_name}</td>
                      <td>{new Date(data.upload_date).toLocaleDateString()}</td>
                      {/* <td>{data.status}</td> */}
                      <td>
                        <button
                          className="btn"
                          onClick={() => handleDownload(clientid, data.file_name)}
                          disabled={isDownloading}
                        >
                          Download
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div></>
     }
    </>
  )
}

export default Dashboard