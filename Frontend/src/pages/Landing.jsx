import React from 'react';
import "../App.css";
import { FiSend, FiZap, FiShield, FiCode } from 'react-icons/fi';
import { SignInButton } from '@clerk/clerk-react';
import {useNavigate} from "react-router-dom";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Button } from '@mui/material';
export default function Landing() {
    const navigate=useNavigate();
  return (
    <div className='landing'>
      <div className="landing-gradient"> 
        <div className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">
              <span className="gradient-text">IntelliMate</span>: Where Curiosity Meets Clarity
            </h1>
            <p className="hero-subtitle">
              Your intelligent AI companion for instant answers, creative ideas, and productive assistance.
            </p>
            <SignInButton mode="modal" >
                <Button className="primary-cta" variant='contained' style={{background: "#4f46e5"}}>
                    Start Chatting Free 
                </Button> 
            </SignInButton>
          </div>
          <div className="hero-image">
            <div className="chat-demo">
              <div className="chat-message user">How can I boost my productivity?</div>
              <div className="chat-message ai">
                <FiZap className="ai-icon" />
                <div>
                  Try the Pomodoro technique! Work for 25 minutes, then take a 5-minute break. 
                  After 4 cycles, take a longer break. I can help you schedule these...
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="features-section">
        <h2>Why Choose IntelliMate?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <FiZap className="feature-icon" />
            <h3>Lightning Fast</h3>
            <p>Get instant responses to your questions without delays or lag.</p>
          </div>
          <div className="feature-card">
            <FiShield className="feature-icon" />
            <h3>Secure & Private</h3>
            <p>Your conversations are encrypted and never shared with third parties.</p>
          </div>
          <div className="feature-card">
            <FiCode className="feature-icon" />
            <h3>Developer Friendly</h3>
            <p>API access and integration options for power users.</p>
          </div>
        </div>
      </div>

      <div className="testimonials-section">
        <h2>What Users Are Saying</h2>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="testimonial-text">
              "IntelliMate has become my go-to research assistant. It saves me hours every week!"
            </div>
            <div className="testimonial-author">- Sarah, Researcher</div>
          </div>
          <div className="testimonial-card">
            <div className="testimonial-text">
              "The coding help is incredible. It explains concepts better than most tutorials."
            </div>
            <div className="testimonial-author">- Mark, Developer</div>
          </div>
        </div>
      </div>

      <div className="final-cta">
        <h2>Ready to Experience Smarter Conversations?</h2>
        <SignInButton mode="modal" >
                <Button className="primary-cta" variant='contained' style={{background: "#4f46e5"}}>
                    Get Started <ChevronRightIcon/>
                </Button> 
            </SignInButton>
      </div>

      <footer className="landing-footer">
        <div className="footer-logo">IntelliMate</div>
        <div className="footer-links">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Contact</a>
          <a href="#">API</a>
        </div>
        <div className="footer-copyright">© {new Date().getFullYear()} IntelliMate AI</div>
      </footer>
    </div>
  )
}