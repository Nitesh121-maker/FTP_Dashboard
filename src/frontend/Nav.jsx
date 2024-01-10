import React from 'react'
import  "../css/Nav.css";
function Nav() {
  return (
    <div className="nav">
        <nav>
            <h1>Your Website</h1>
            <div class="session-timer">Session: 15:00</div>
            <button class="logout-btn">Logout</button>
        </nav>
    </div>
  )
}

export default Nav