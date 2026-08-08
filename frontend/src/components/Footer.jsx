import React from 'react';
import { Sparkles, ShieldCheck, Globe, Heart } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export default function Footer({ onNavigate }) {
  const handleNav = (tab) => {
    sounds.playClick();
    onNavigate(tab);
  };

  return (
    <footer style={{
      marginTop: '60px',
      borderTop: '1px solid rgba(255, 255, 255, 0.08)',
      background: 'rgba(5, 6, 10, 0.95)',
      padding: '40px 16px 24px 16px'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '30px' }}>
        
        {/* Top Footer Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '30px' }}>
          
          {/* Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <div style={{
                width: '34px',
                height: '34px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #ffc72c 0%, #7000ff 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Sparkles size={18} color="#fff" />
              </div>
              <span className="font-heading" style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff' }}>
                F.I.R.E. <span className="gradient-text-gold">WORKS</span>
              </span>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: '320px' }}>
              Next-generation personal finance & wealth compounding platform built for Gen-Z financial independence.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading" style={{ fontSize: '0.9rem', fontWeight: 700, color: '#fff', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Platform Navigation
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.82rem' }}>
              <span onClick={() => handleNav('home')} style={{ color: 'var(--text-muted)', cursor: 'pointer' }} onMouseEnter={(e) => e.target.style.color = '#ffc72c'} onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}>Home / Overview</span>
              <span onClick={() => handleNav('dashboard')} style={{ color: 'var(--text-muted)', cursor: 'pointer' }} onMouseEnter={(e) => e.target.style.color = '#ffc72c'} onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}>Finance Dashboard</span>
              <span onClick={() => handleNav('dungeon')} style={{ color: 'var(--text-muted)', cursor: 'pointer' }} onMouseEnter={(e) => e.target.style.color = '#ffc72c'} onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}>Credit Dungeon Mini-Game</span>
              <span onClick={() => handleNav('kash')} style={{ color: 'var(--text-muted)', cursor: 'pointer' }} onMouseEnter={(e) => e.target.style.color = '#ffc72c'} onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}>Kash AI Red Panda</span>
            </div>
          </div>

          {/* Tools & Features */}
          <div>
            <h4 className="font-heading" style={{ fontSize: '0.9rem', fontWeight: 700, color: '#fff', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              AI & Security Tools
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.82rem' }}>
              <span onClick={() => handleNav('aihub')} style={{ color: 'var(--text-muted)', cursor: 'pointer' }} onMouseEnter={(e) => e.target.style.color = '#00f0ff'} onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}>Receipt OCR Scanner</span>
              <span onClick={() => handleNav('aihub')} style={{ color: 'var(--text-muted)', cursor: 'pointer' }} onMouseEnter={(e) => e.target.style.color = '#00f0ff'} onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}>Fraud Anomaly Detector</span>
              <span onClick={() => handleNav('investments')} style={{ color: 'var(--text-muted)', cursor: 'pointer' }} onMouseEnter={(e) => e.target.style.color = '#00f0ff'} onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}>Investments & Wealth Hub</span>
              <span onClick={() => handleNav('fire')} style={{ color: 'var(--text-muted)', cursor: 'pointer' }} onMouseEnter={(e) => e.target.style.color = '#00f0ff'} onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}>F.I.R.E. Compounding Lab</span>
            </div>
          </div>

          {/* Platform Info */}
          <div>
            <h4 className="font-heading" style={{ fontSize: '0.9rem', fontWeight: 700, color: '#fff', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Engine Status
            </h4>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              <div>System: <strong style={{ color: '#00f0ff' }}>F.I.R.E. Engine v2.0</strong></div>
              <div>Telemetry: <strong style={{ color: '#ffc72c' }}>0ms Latency Active</strong></div>
              <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '6px', color: '#10b981', fontWeight: 600 }}>
                <ShieldCheck size={16} /> Verified Security Core
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div style={{
          paddingTop: '20px',
          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
          display: 'flex',
          justify: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          fontSize: '0.78rem',
          color: 'var(--text-muted)'
        }}>
          <div>
            © 2026 F.I.R.E. WORKS. All rights reserved.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            Built with <Heart size={14} color="#ff2a6d" fill="#ff2a6d" /> for Gen-Z Financial Freedom
          </div>
        </div>

      </div>
    </footer>
  );
}
