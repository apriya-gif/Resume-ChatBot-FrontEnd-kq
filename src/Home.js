import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CORE_SKILLS, WORK_EXPERIENCE, PROJECTS } from './data';
import './App.css';

function Home() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "Hi! I'm Ameesha's AI assistant. I can tell you about her distributed systems work, full-stack skills, or education. What would you like to know?",
      isComplete: true
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [contactForm, setContactForm] = useState({ email: '', message: '' });
  const [isContactLoading, setIsContactLoading] = useState(false);
  const [contactStatus, setContactStatus] = useState('');

  const chatEndRef = useRef(null);
  const appRef = useRef(null);

  const API_URL = 'https://he2h5bvbwg.execute-api.us-east-1.amazonaws.com/Prod/ask';
  const CONTACT_URL = 'https://he2h5bvbwg.execute-api.us-east-1.amazonaws.com/Prod/contact';

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (appRef.current) {
        const rect = appRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        appRef.current.style.setProperty('--mouse-x', `${x}px`);
        appRef.current.style.setProperty('--mouse-y', `${y}px`);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToBottom = () => {
    setTimeout(() => {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }, 50);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const typewriterEffect = (fullText, messageIndex) => {
    let currentText = '';
    let currentIndex = 0;

    const typeInterval = setInterval(() => {
      if (currentIndex < fullText.length) {
        currentText += fullText[currentIndex];
        currentIndex++;
        setMessages(prev => prev.map((msg, idx) =>
          idx === messageIndex ? { ...msg, text: currentText, isComplete: false } : msg
        ));
      } else {
        setMessages(prev => prev.map((msg, idx) =>
          idx === messageIndex ? { ...msg, isComplete: true } : msg
        ));
        clearInterval(typeInterval);
      }
    }, 15);
    return typeInterval;
  };

  const sendMessage = async (messageText = inputValue) => {
    const text = messageText.trim();
    if (!text) return;

    const userMessage = { sender: 'user', text, isComplete: true };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: text })
      });

      const data = await response.json();
      const botResponseText = data.response || data.error || 'No response received';

      const emptyBotMessage = { sender: 'bot', text: '', isComplete: false };

      setMessages(prev => {
        const newMessages = [...prev, emptyBotMessage];
        const messageIndex = newMessages.length - 1;
        setTimeout(() => typewriterEffect(botResponseText, messageIndex), 200);
        return newMessages;
      });

    } catch (error) {
      console.error('Error:', error);
      const errorText = 'Sorry, I encountered an error. Please try again.';
      setMessages(prev => [...prev, { sender: 'bot', text: errorText, isComplete: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    if (!contactForm.email || !contactForm.message) return;

    setIsContactLoading(true);
    setContactStatus('');

    try {
      const response = await fetch(CONTACT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Portfolio Visitor',
          email: contactForm.email,
          message: contactForm.message
        })
      });

      if (response.ok) {
        setContactStatus('Sent!');
        setContactForm({ email: '', message: '' });
        setTimeout(() => setContactStatus(''), 3000);
      } else {
        setContactStatus('Error');
      }
    } catch (error) {
      setContactStatus('Error');
    } finally {
      setIsContactLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const quickQuestions = [
    "Experience?",
    "Projects?",
    "Tech Stack?",
    "Education?"
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="app-container" ref={appRef}>
      <div className="animated-bg"></div>

      <div className="bento-grid">

        {/* 1. Profile Card */}
        <div className="bento-card profile-card">
          <div className="profile-content">
            <div className="profile-social-top">
              <a href="https://github.com/apriya-gif" target="_blank" rel="noreferrer" className="social-icon">
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
              </a>
              <a href="https://linkedin.com/in/ameesha-priya-2a773a136/" target="_blank" rel="noreferrer" className="social-icon">
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
            </div>

            <div className="profile-image-container">
              <img src="https://ui-avatars.com/api/?name=Ameesha+Priya&background=2997ff&color=fff&size=128" alt="Ameesha" className="profile-img" />
              <div className="status-indicator"></div>
            </div>
            <div className="profile-text">
              <h1>Ameesha Priya</h1>
              <h2>Software Engineer</h2>
              <p className="bio">4+ years building scalable distributed systems & AI solutions. Ex-Bank of America, Sheetz.</p>
            </div>
            <button 
              className="resume-btn" onClick={() => window.open('https://docs.google.com/document/d/1h4Mkc8n_ZUDJJKsL7KmamJwt0TX_tgOXXOBQdN33rls/', '_blank')}
            >
              Download Resume
            </button>

            <div className="profile-contact-form">
              <h3>Get in Touch</h3>
              <form onSubmit={handleContactSubmit}>
                <input
                  type="email"
                  placeholder="Email"
                  value={contactForm.email}
                  onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                  required
                />
                <textarea
                  placeholder="Message"
                  rows="2"
                  value={contactForm.message}
                  onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                  required
                />
                <button type="submit" disabled={isContactLoading}>
                  {isContactLoading ? '...' : contactStatus || 'Send'}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* 2. Chat Interface */}
        <div className="bento-card chat-card">
          <div className="chat-header">
            <div className="chat-status">
              <span className="dot"></span>
              <span>AI Assistant Online</span>
            </div>
          </div>

          <div className="chat-messages">
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.sender}`}>
                {message.sender === 'bot' && <div className="bot-icon">AI</div>}
                <div className="message-bubble">
                  {message.text}
                  {!message.isComplete && <span className="cursor">|</span>}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="message bot">
                <div className="bot-icon">AI</div>
                <div className="message-bubble loading">
                  <span>.</span><span>.</span><span>.</span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <div className="chat-input-area">
            <div className="quick-actions">
              {quickQuestions.map((q, i) => (
                <button key={i} onClick={() => sendMessage(q)} disabled={isLoading}>{q}</button>
              ))}
            </div>
            <div className="input-wrapper">
              <input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything..."
                disabled={isLoading}
              />
              <button className="send-btn" onClick={() => sendMessage()} disabled={isLoading || !inputValue.trim()}>
                →
              </button>
            </div>
          </div>
        </div>

        {/* 3. Skills Card with TOC */}
        <div className="bento-card skills-card">
          <h3>Core Skills</h3>
          <div className="skills-content">
            {CORE_SKILLS.map((skill, i) => (
              <span key={i} className="skill-tag">{skill}</span>
            ))}
          </div>

          <div className="toc-section">
            <h4>On this page</h4>
            <button onClick={() => scrollToSection('work-section')} className="toc-link">
              Work Experience
            </button>
            <button onClick={() => scrollToSection('projects-section')} className="toc-link">
              Featured Projects
            </button>
          </div>
        </div>

        {/* 4. Work Experience */}
        <div id="work-section" className="bento-card work-card">
          <h3>Work Experience</h3>
          <div className="work-list">
            {WORK_EXPERIENCE.map((job, index) => (
              <div key={index} className="work-item clickable" onClick={() => navigate(`/blog/${job.id}`)}>
                <div className="work-header">
                  <span className="work-company">{job.company}</span>
                  <span className="work-period">{job.period}</span>
                </div>
                <div className="work-role">{job.role}</div>
                <p className="work-desc">{job.description}</p>
                <span className="read-more">Read more →</span>
              </div>
            ))}
          </div>
        </div>

        {/* 5. Featured Projects */}
        <div id="projects-section" className="bento-card projects-card">
          <h3>Featured Projects</h3>
          <div className="projects-grid">
            {PROJECTS.map((project, index) => (
              <div key={index} className="project-item clickable" onClick={() => navigate(`/blog/${project.id}`)}>
                <div className="project-img" style={{ backgroundImage: `url(${project.image})` }}></div>
                <div className="project-info">
                  <span className="project-cat">{project.category}</span>
                  <h4>{project.title}</h4>
                  <p>{project.description}</p>
                  <span className="read-more">Read more →</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default Home;
