import React from 'react';
import ReactDOM from 'react-dom';

import {BrowserRouter,Routes,Route} from "react-router-dom";
import './index.css';
import Dashboard from './frontend/Dashboard';
import Login from './frontend/Login';
// import reportWebVitals from './reportWebVitals';

export default function Index() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard/:clientid" element={<Dashboard/>}></Route>
        <Route path="/client-login" element={<Login/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}
ReactDOM.render(<Index />, document.getElementById('root'));