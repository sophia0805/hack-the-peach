import React from 'react'
import { useNavigate } from 'react-router-dom';

import logo from '../logo.png';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const goHome=()=>{
    navigate('/home');
  }
  const goAbout=()=>{
    navigate('/about');
  }
  const goSchedule=()=>{
    navigate('/schedule');
  }
  const goSponsors=()=>{
    navigate('/sponsors');
  }
  const goFaq=()=>{
    navigate('/faq');
  }

  return (
    <>
    <nav className="navbar">
    <a href="#" className="logo-container" onClick={goHome}>  
      <img src={logo} className="peach" alt="logo" />
    </a>
    <div className="nav-links">
        <a className="text cursor" onClick={goAbout}>About</a>
        <a className="text cursor" onClick={goSchedule}>Schedule</a>
        <a className="text cursor" onClick={goSponsors}>Sponsors</a>
        <a className="text cursor" onClick={goFaq}>FAQ</a>
    </div>
    </nav>

    <div className="App">
      <header className="App-header">
        <h1>Hack The Peach</h1>

      </header>
    </div>
    </>
  )
}

export default Home