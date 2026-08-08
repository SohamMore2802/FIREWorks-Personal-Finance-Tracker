import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Share2, Download, Check, Sparkles, Award, Camera } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export default function BadgeStoryModal({ user, stats, onClose }) {
  const [copied, setCopied] = React.useState(false);

  useEffect(() => {
    sounds.playSuccess();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  }, []);

  const handleCopy = () => {
    sounds.playClick();
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.85)',
      backdropFilter: 'blur(12px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100,
      padding: '16px'
    }}>
      <div style={{
        maxWidth: '400px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '16px'
      }}>
        
        {/* 9:16 Mobile Instagram Story Card */}
        <div style={{
          width: '320px',
          height: '540px',
          borderRadius: '24px',
          background: 'linear-gradient(145deg, #0f1322 0%, #1a0b2e 50%, #05060a 100%)',
          border: '2px solid rgba(255, 199, 44, 0.4)',
          boxShadow: '0 0 40px rgba(255, 199, 44, 0.25)',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          justify: 'space-between',
          alignItems: 'center',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Top Bar */}
          <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#ffc72c', letterSpacing: '1px' }}>
              F.I.R.E. ENGINE
            </span>
            <span style={{ fontSize: '0.75rem', color: '#00f0ff', fontWeight: 700 }}>
              F.I.R.E. WORKS
            </span>
          </div>

          {/* Badge Emblem Visual */}
          <div style={{ position: 'relative' }}>
            <img 
              src="/badge_budget_boss.jpg" 
              alt="Badge Emblem" 
              style={{
                width: '120px',
                height: '120px',
                borderRadius: '60px',
                border: '3px solid #ffc72c',
                boxShadow: '0 0 30px rgba(255,199,44,0.5)',
                objectFit: 'cover'
              }}
            />
            <div style={{
              position: 'absolute',
              bottom: '-10px',
              left: '50%',
              transform: 'translateX(-50%)',
              background: '#ffc72c',
              color: '#05060a',
              fontWeight: 800,
              fontSize: '0.7rem',
              padding: '2px 10px',
              borderRadius: '10px',
              whiteSpace: 'nowrap'
            }}>
              UNLOCKED BADGE
            </div>
          </div>

          {/* Milestone Title */}
          <div>
            <h3 className="font-heading" style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff' }}>
              Budgeting Boss – June 2024
            </h3>
            <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '4px' }}>
              Financial Independence Milestone Achieved
            </p>
          </div>

          {/* Metrics Stats Pills */}
          <div style={{ width: '100%', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
            <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '8px', borderRadius: '12px' }}>
              <div style={{ fontSize: '0.65rem', color: '#94a3b8' }}>CREDIT SCORE</div>
              <div style={{ fontSize: '1rem', fontWeight: 800, color: '#10b981' }}>⚡ {stats?.creditScore || 750}</div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '8px', borderRadius: '12px' }}>
              <div style={{ fontSize: '0.65rem', color: '#94a3b8' }}>SAVINGS RATE</div>
              <div style={{ fontSize: '1rem', fontWeight: 800, color: '#00f0ff' }}>🔥 {stats?.savingsRate || 59.8}%</div>
            </div>
          </div>

          {/* Footer Tag */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', opacity: 0.9 }}>
            <Camera size={14} color="#ff2a6d" />
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#fff' }}>
              {user?.handle || "@fire_works"}
            </span>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>• F.I.R.E. Member</span>
          </div>
        </div>

        {/* Modal Controls Bar */}
        <div style={{ display: 'flex', gap: '10px', width: '320px' }}>
          <button 
            className="btn-gold" 
            onClick={handleCopy}
            style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '0.85rem' }}
          >
            {copied ? <Check size={16} /> : <Share2 size={16} />}
            <span>{copied ? "Copied Link!" : "Share Story"}</span>
          </button>
          
          <button 
            className="btn-outline" 
            onClick={() => { sounds.playClick(); onClose(); }}
            style={{ padding: '10px 16px', fontSize: '0.85rem' }}
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
