'use client';

import { useState } from 'react';
import './faq.css';

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const generalQuestions = [
    {
      question: "Venenatis Cras Sed Felis Eget Velit Aliquet Sagittis ?",
      answer: "Nulla facilisi nullam vehicula ipsum. Tristique vitae semper quis lorem nulla ac. Elementum nibh tellus molestie nunc. Lorem ipsum dolor sit amet consectetur adipiscing elit. Duis convallis convallis tellus id interdum velit laoreet id donec ultrices. Gravida neque convallis a cras semper auctor neque vitae tempus quam. Ipsum nunc id cursus mi amet consequat adipiscing elit.\n\nPellentesque eu solidarida ac arci pharetra sagittis. Egestas diam sit in arcu cursus elementum. Convallis a cras semper auctor neque. Mauris sit amet massa non velit ullamcorper lacinia quis vel."
    },
    {
      question: "Quam Adipiscing Vitae Proin Sagittis Nisl Rhoncus ?",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
      question: "Mauris In Aliquam Sem Fringilla Ut Morbi Tincidunt ?",
      answer: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    },
    {
      question: "Morbi Tincidunt Ornare Massa Eget Egestas Purus Viverra ?",
      answer: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
    },
    {
      question: "Netus Et Malesuada Fames Ac Turpis Egestas. Ac ?",
      answer: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    }
  ];

  const servicesQuestions = [
    {
      question: "Sed Faucibus Turpis In Eu Mi Bibendum Neque Egestas ?",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
      question: "Nullam Eget Felis Eget Nunc Lobortis Mattis Aliquam ?",
      answer: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    },
    {
      question: "Aliquam Sagittis Id Consectetur Purus Ut Faucibus Pulvinar ?",
      answer: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
    },
    {
      question: "Amet Commodo Nulla Facilisi Nullam Vehicula Ipsum A Arcu ?",
      answer: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
      question: "Quiaque Sagittis Purus Sit Amet Volutpat Consequat ?",
      answer: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium."
    }
  ];

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-page">
      {/* Hero Section */}
      <div className="faq-hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">Frequently Asked Questions</h1>
          <div className="breadcrumb">
            <span>Home</span>
            <span className="separator">{'>'}</span>
            <span>Pages</span>
            <span className="separator">{'>'}</span>
            <span>FAQ</span>
          </div>
        </div>
      </div>

      {/* FAQ Content */}
      <div className="faq-content">
        {/* Search Bar */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Search Question"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button className="search-button">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M7 13C10.3137 13 13 10.3137 13 7C13 3.68629 10.3137 1 7 1C3.68629 1 1 3.68629 1 7C1 10.3137 3.68629 13 7 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M15 15L11.5 11.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* General Question Section */}
        <div className="faq-section">
          <h2 className="section-title">General Question</h2>
          
          <div className="accordion">
            {generalQuestions.map((item, index) => (
              <div key={index} className="accordion-item">
                <button
                  className={`accordion-header ${openIndex === index ? 'active' : ''}`}
                  onClick={() => toggleAccordion(index)}
                >
                  <span>{item.question}</span>
                  <span className="accordion-icon">
                    {openIndex === index ? '−' : '+'}
                  </span>
                </button>
                {openIndex === index && (
                  <div className="accordion-content">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Services & Warranty Section */}
        <div className="faq-section">
          <h2 className="section-title">Services & Warranty</h2>
          
          <div className="accordion">
            {servicesQuestions.map((item, index) => {
              const globalIndex = index + generalQuestions.length;
              return (
                <div key={globalIndex} className="accordion-item">
                  <button
                    className={`accordion-header ${openIndex === globalIndex ? 'active' : ''}`}
                    onClick={() => toggleAccordion(globalIndex)}
                  >
                    <span>{item.question}</span>
                    <span className="accordion-icon">
                      {openIndex === globalIndex ? '−' : '+'}
                    </span>
                  </button>
                  {openIndex === globalIndex && (
                    <div className="accordion-content">
                      <p>{item.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}