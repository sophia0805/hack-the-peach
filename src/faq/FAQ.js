import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../logo.png';
import { ChevronDown, ChevronUp } from 'lucide-react';
import './FAQ.css';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);

  return (
    <div className="faq-item">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="faq-question"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${question.replace(/\s+/g, '-').toLowerCase()}`}
      >
        <span>{question}</span>
        {isOpen ? (
          <ChevronUp className="chevron" aria-hidden="true" />
        ) : (
          <ChevronDown className="chevron" aria-hidden="true" />
        )}
      </button>
      {isOpen && (
        <div 
          id={`faq-answer-${question.replace(/\s+/g, '-').toLowerCase()}`}
          ref={contentRef}
          className="faq-answer"
        >
          <p>{answer}</p>
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
      answer: "Any current college or university student can participate, regardless of major or experience level. High school students may also participate with parental consent. We welcome beginners and experienced hackers alike!"
    },
    {
      question: "What should I bring?",
      answer: "Please bring your laptop, charger, student ID, and any personal items you'll need for the weekend (toiletries, sleeping bag, etc.). We'll provide meals, snacks, and a comfortable hacking space with WiFi and power outlets."
    },
    {
      question: "Is there a cost to participate?",
      answer: "No! Hack The Peach is completely free to attend. We provide meals, snacks, swag, and a great learning experience at no cost to participants, thanks to our generous sponsors."
    },
    {
      question: "How are teams formed?",
      answer: "Teams can have up to 4 members. You're welcome to form your own team beforehand or find teammates during our team formation event at the start of the hackathon. We'll have activities to help you meet other participants and form teams based on shared interests."
    },
    {
      question: "Will there be prizes?",
      answer: "Yes! We have over $5,000 in prizes across various categories including Best Overall Hack, Most Innovative, Best Social Impact, Best Beginner Hack, and several sponsor-specific challenge prizes. Specific prize details will be announced at the opening ceremony."
    }
  ];

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <a 
            href="#" 
            className="logo-container" 
            onClick={() => goToPage('home')}
            aria-label="Home"
          >
            <img src={logo} className="peach" alt="Hack The Peach logo" />
          </a>
          <div className="nav-links">
            {Object.entries(navLinks).slice(1).map(([key, path]) => (
              <a
                key={key}
                className="nav-link"
                onClick={() => goToPage(key)}
              >
                {key}
              </a>
            ))}
          </div>
        </div>
      </nav>
      
      <div className="faq-container">
        <div className="faq-content">
          <h1 className="faq-title">Frequently Asked Questions</h1>
          <p className="faq-subtitle">Everything you need to know about Hack The Peach</p>
          <div className="faq-list">
            {faqData.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Faq;