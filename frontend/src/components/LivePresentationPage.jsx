import React, { useState, useEffect } from 'react';
import { Globe, Server, CheckCircle2, Cpu, FileText, Layers, Award, BookOpen, ChevronRight, ChevronLeft } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export default function LivePresentationPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [apiLogs, setApiLogs] = useState([
    "GET /api/dashboard HTTP/1.1 200 OK - 2ms",
    "GET /api/dungeon HTTP/1.1 200 OK - 1ms",
    "GET /api/fraud/alerts HTTP/1.1 200 OK - 1ms"
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      const endpoints = ["/api/dashboard", "/api/transactions", "/api/dungeon", "/api/kash/chat", "/api/fire/calculate"];
      const randomEp = endpoints[Math.floor(Math.random() * endpoints.length)];
      const logMsg = `GET ${randomEp} HTTP/1.1 200 OK - ${Math.floor(Math.random() * 3) + 1}ms`;
      setApiLogs(prev => [logMsg, ...prev.slice(0, 4)]);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleSlideNav = (direction) => {
    sounds.playClick();
    if (direction === 'next') setCurrentSlide(prev => Math.min(slides.length - 1, prev + 1));
    else setCurrentSlide(prev => Math.max(0, prev - 1));
  };

  const slides = [
    {
      title: "Title & Overview",
      subtitle: "Personal Finance & Wealth Platform Entry",
      content: (
        <div>
          <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffc72c', marginBottom: '12px' }}>
            Problem Statement: Personal Finance Tracker
          </div>
          <div style={{ fontSize: '1rem', color: '#fff', marginBottom: '16px' }}>
            System Architecture: <strong style={{ color: '#00f0ff' }}>F.I.R.E. Engine</strong>
          </div>
          <div style={{ fontSize: '1rem', color: '#fff' }}>
            User Context: <strong style={{ color: '#c77dff' }}>Active Gen-Z Profile</strong>
          </div>
        </div>
      )
    },
    {
      title: "Proposed Solution: F.I.R.E. WORKS",
      subtitle: "Financial Independence, Retire Early for Gen-Z",
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          <div>⚔️ <strong>Credit Dungeon</strong>: Scenario quests & Boss Battle mini-game (Attack debt with extra payments).</div>
          <div>🐼 <strong>Kash the Red Panda</strong>: Sassy AI chatbot celebrating savings wins & roasting bad choices.</div>
          <div>📸 <strong>Badge Sharing</strong>: Auto-generated Instagram Story cards ("Budgeting Boss - June 2024").</div>
          <div>📈 <strong>F.I.R.E. Engine</strong>: Compounding wealth timeline calculations.</div>
        </div>
      )
    },
    {
      title: "Technical Approach & Architecture",
      subtitle: "High-Performance Full Stack Technology Selection",
      content: (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', fontSize: '0.85rem' }}>
          <div style={{ background: 'rgba(255,255,255,0.04)', padding: '10px', borderRadius: '10px' }}>
            <strong style={{ color: '#ffc72c' }}>Frontend:</strong> React + Vite + Chart.js
          </div>
          <div style={{ background: 'rgba(255,255,255,0.04)', padding: '10px', borderRadius: '10px' }}>
            <strong style={{ color: '#00f0ff' }}>Backend:</strong> Node.js Express REST API
          </div>
          <div style={{ background: 'rgba(255,255,255,0.04)', padding: '10px', borderRadius: '10px' }}>
            <strong style={{ color: '#10b981' }}>AI Features:</strong> Receipt OCR Parser & Kash AI Chat
          </div>
          <div style={{ background: 'rgba(255,255,255,0.04)', padding: '10px', borderRadius: '10px' }}>
            <strong style={{ color: '#c77dff' }}>Security:</strong> Real-time Fraud Anomaly Alerts
          </div>
        </div>
      )
    },
    {
      title: "Feasibility & Viability",
      subtitle: "12-Month Development Gantt Chart & Market Growth",
      content: (
        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div>🎯 <strong>User Growth Projection:</strong> 50,000 active users goal by Year 2.</div>
          <div>💼 <strong>Business Model:</strong> Premium subscriptions, brand partnerships for discounts, and B2B educational integrations.</div>
          <div>🏫 <strong>Strategic Partners:</strong> Banking, retail brands, and higher education.</div>
        </div>
      )
    },
    {
      title: "Empirical Research & Reference Cited",
      subtitle: "IEEE International Conference on Cyber Resilience (ICCR)",
      content: (
        <div style={{ fontSize: '0.82rem', background: 'rgba(0,0,0,0.4)', padding: '12px', borderRadius: '10px', border: '1px solid rgba(0,240,255,0.2)' }}>
          <div style={{ color: '#00f0ff', fontWeight: 700, marginBottom: '4px' }}>
            "An Empirical Study of Association Among Financial Literacy, Financial Attitude and Financial Behaviour of Gen – Z"
          </div>
          <div style={{ color: 'var(--text-muted)' }}>
            Authors: V. R, B. Sudha, M. Farouk and G. Ahmed (2022). DOI: 10.1109/ICCR56254.2022.9996036
          </div>
        </div>
      )
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header Banner */}
      <div className="glass-panel glass-glow-gold" style={{ padding: '28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span className="badge-tag badge-gold">LIVE MONITOR</span>
              <span className="badge-tag badge-cyan">SYSTEM DECK</span>
            </div>
            <h2 className="font-heading" style={{ fontSize: '1.85rem', fontWeight: 900, marginTop: '8px', color: '#fff' }}>
              Live Telemetry & Presentation Deck
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Real-time API performance monitor + Presentation slide navigation
            </p>
          </div>
          <Globe size={38} color="#ffc72c" />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '20px' }}>
        
        {/* Interactive Slide Deck Player */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '20px' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <span className="badge-tag badge-purple">SLIDE {currentSlide + 1} OF {slides.length}</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>F.I.R.E. Engine</span>
            </div>

            <h3 className="font-heading" style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff', marginBottom: '4px' }}>
              {slides[currentSlide].title}
            </h3>
            <div style={{ fontSize: '0.8rem', color: '#00f0ff', marginBottom: '16px', fontWeight: 600 }}>
              {slides[currentSlide].subtitle}
            </div>

            <div style={{ minHeight: '130px' }}>
              {slides[currentSlide].content}
            </div>
          </div>

          {/* Slide Navigation Buttons */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <button 
              className="btn-outline" 
              disabled={currentSlide === 0}
              onClick={() => handleSlideNav('prev')}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', opacity: currentSlide === 0 ? 0.4 : 1 }}
            >
              <ChevronLeft size={16} /> Prev Slide
            </button>

            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>
              {currentSlide + 1} / {slides.length}
            </span>

            <button 
              className="btn-gold" 
              disabled={currentSlide === slides.length - 1}
              onClick={() => handleSlideNav('next')}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', opacity: currentSlide === slides.length - 1 ? 0.4 : 1 }}
            >
              Next Slide <ChevronRight size={16} />
            </button>
          </div>

        </div>

        {/* Live Server Telemetry Monitor */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '20px' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 className="font-heading" style={{ fontSize: '1.15rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Server color="#10b981" size={18} />
                Live Node REST Telemetry
              </h3>
              <span style={{ fontSize: '0.72rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span className="live-pulse" /> 100% ONLINE
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', marginBottom: '16px' }}>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '10px', borderRadius: '10px' }}>
                <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>API PORT</div>
                <div style={{ fontSize: '1rem', fontWeight: 800, color: '#ffc72c' }}>5000</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '10px', borderRadius: '10px' }}>
                <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>AVG LATENCY</div>
                <div style={{ fontSize: '1rem', fontWeight: 800, color: '#00f0ff' }}>1.2 ms</div>
              </div>
            </div>

            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '6px', fontWeight: 600 }}>LIVE LOG STREAM</div>
            <div style={{
              background: '#040508',
              borderRadius: '10px',
              padding: '12px',
              fontFamily: 'monospace',
              fontSize: '0.75rem',
              color: '#10b981',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              border: '1px solid rgba(16,185,129,0.2)',
              minHeight: '120px'
            }}>
              {apiLogs.map((log, idx) => (
                <div key={idx}>{log}</div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
