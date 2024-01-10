import React from 'react'
import Nav from "./Nav"
import  "../css/Dashboard.css";
function Dashboard() {
  return (
    <>
      <Nav/>
      <div id="dashboard">
        <div id="search">
            <label for="searchInput">Search: </label>
            <input type="text" name="" id="" />
        </div>

        <table>
            <thead>
                <tr>
                    <th>Select</th>
                    <th>S.No</th>
                    <th>Data Type</th>
                    <th>Mnth Name</th>
                    <th>Year</th>
                    <th>File Name</th>
                    <th>Upload Date</th>
                    <th>Status</th>
                    <th>Is Downloaded</th>
                    <th>Download</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
         
            <tr>
                <td><input type="checkbox"/></td>
                <td>1</td>
                <td>Example Type</td>
                <td>January</td>
                <td>2022</td>
                <td>example_file.txt</td>
                <td>2022-01-15</td>
                <td>Completed</td>
                <td>Yes</td>
                <td><button class="btn">Download</button></td>
                <td><button class="btn btn-danger">Delete</button></td>
            </tr>

            <tr>
                <td><input type="checkbox"/></td>
                <td>2</td>
                <td>Another Type</td>
                <td>February</td>
                <td>2022</td>
                <td>another_file.txt</td>
                <td>2022-02-20</td>
                <td>Pending</td>
                <td>No</td>
                <td><button class="btn">Download</button></td>
                <td><button class="btn btn-danger">Delete</button></td>
            </tr>

            <tr>
                <td><input type="checkbox"/></td>
                <td>3</td>
                <td>Test Type</td>
                <td>March</td>
                <td>2022</td>
                <td>test_file.txt</td>
                <td>2022-03-10</td>
                <td>In Progress</td>
                <td>Yes</td>
                <td><button class="btn">Download</button></td>
                <td><button class="btn btn-danger">Delete</button></td>
            </tr>

            <tr>
                <td><input type="checkbox"/></td>
                <td>4</td>
                <td>Sample Type</td>
                <td>April</td>
                <td>2022</td>
                <td>sample_file.txt</td>
                <td>2022-04-05</td>
                <td>Failed</td>
                <td>No</td>
                <td><button class="btn">Download</button></td>
                <td><button class="btn btn-danger">Delete</button></td>
             </tr>
            </tbody>
        </table>
    </div>
    </>
  )
}

export default Dashboard