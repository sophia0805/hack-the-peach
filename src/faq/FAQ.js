import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../logo.png';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
      >
        <span className="font-medium text-lg text-left">{question}</span>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-gray-500" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-500" />
        )}
      </button>
      {isOpen && (
        <div className="p-4 bg-gray-50 rounded-b-lg mt-1">
          <p className="text-gray-700">{answer}</p>
        </div>
      )}
    </div>
  );
};

const Faq = () => {
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
    const faqData = [
    {
      question: "What is Hack The Peach?",
      answer: "Hack The Peach is a 48-hour hackathon taking place in downtown Atlanta. It's an opportunity for students to collaborate, learn, and build innovative projects in a fun and supportive environment."
    },
    {
      question: "Who can participate?",
      answer: ""
    },
    {
      question: "What should I bring?",
      answer: ""
    },
    {
      question: "Is there a cost to participate?",
      answer: ""
    },
    {
      question: "How are teams formed?",
      answer: ""
    },
    {
      question: "Will there be prizes?",
      answer: ""
    }
  ];

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
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-1xl font-bold text-center mb-12">Frequently Asked Questions</h1>
        <div className="space-y-6">
          {faqData.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </div>
    </>
  );
};
export default Faq