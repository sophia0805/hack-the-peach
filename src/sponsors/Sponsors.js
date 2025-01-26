import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../logo.png';

const Sponsors = () => {
  const navLinks = {
    home: '/home',
    about: '/about',
    schedule: '/schedule',
    sponsors: '/sponsors',
    faq: '/faq'
  };
  const navigate = useNavigate();
  const goToPage = (page) => {
    console.log('Navigating to:', page);
    navigate(navLinks[page]);
  };
  return (
    <>
    <nav className="navbar">
      <a href="#" className="logo-container" onClick={() => goToPage('home')}>  
        <img src={logo} className="peach" alt="logo" />
      </a>
      <div className="nav-links">
        <a className={`text`} onClick={() => goToPage('about')}>About</a>
        <a className={`text`} onClick={() => goToPage('schedule')}>Schedule</a>
        <a className={`text`} onClick={() => goToPage('sponsors')}>Sponsors</a>
        <a className={`text`} onClick={() => goToPage('faq')}>FAQ</a>
      </div>
    </nav>
    </>
  )
}

export default Sponsors