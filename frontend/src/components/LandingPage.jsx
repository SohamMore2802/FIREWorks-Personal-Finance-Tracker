import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Award, 
  TrendingUp, 
  Sword, 
  Bot, 
  FileText, 
  Flame, 
  Share2, 
  CheckCircle2,
  Cpu,
  Layers
} from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export default function LandingPage({ onNavigate }) {
  const handleNav = (tab) => {
    sounds.playClick();
    onNavigate(tab);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', paddingBottom: '40px' }}>
      
      {/* 1. HERO SECTION */}
      <section className="glass-panel glass-glow-gold" style={{
        padding: '50px 30px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, rgba(255, 199, 44, 0.08) 0%, rgba(112, 0, 255, 0.1) 50%, rgba(5, 6, 10, 0.95) 100%)'
      }}>
        {/* Floating badge */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }} className="badge-tag badge-gold">
          <Sparkles size={14} /> FINANCIAL INDEPENDENCE, RETIRE EARLY (F.I.R.E.) PLATFORM
        </div>

        <h1 className="font-heading" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontWeight: 900, lineHeight: 1.15, marginBottom: '20px', color: '#fff' }}>
          Reimagining Personal Finance for <span className="gradient-text-gold">Gen Z</span>
        </h1>

        <p style={{ maxWidth: '750px', margin: '0 auto 30px auto', fontSize: 'clamp(0.95rem, 2vw, 1.2rem)', color: 'var(--text-muted)', lineHeight: 1.6 }}>
          An intuitive, full-stack, gamified platform featuring <strong style={{ color: '#ffc72c' }}>F.I.R.E. WORKS</strong>, sassy <strong style={{ color: '#00f0ff' }}>Kash the Red Panda AI</strong>, <strong style={{ color: '#c77dff' }}>Credit Dungeon Boss Battles</strong>, and automated receipt OCR scanner.
        </p>

        {/* CTA Buttons */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <button 
            className="btn-gold" 
            onClick={() => handleNav('dashboard')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '14px 28px', fontSize: '1rem' }}
          >
            <span>Launch Live Dashboard</span>
            <ArrowRight size={18} />
          </button>

          <button 
            className="btn-cyber" 
            onClick={() => handleNav('dungeon')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '14px 28px', fontSize: '1rem' }}
          >
            <Sword size={18} />
            <span>Play Credit Dungeon</span>
          </button>
        </div>

        {/* Hero Live Metrics Ribbon */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '16px',
          marginTop: '40px',
          paddingTop: '30px',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)'
        }}>
          <div>
            <div className="font-heading" style={{ fontSize: '1.6rem', fontWeight: 900, color: '#ffc72c' }}>₹1,93,300</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Net Worth Tracked</div>
          </div>
          <div>
            <div className="font-heading" style={{ fontSize: '1.6rem', fontWeight: 900, color: '#00f0ff' }}>59.8%</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Average Savings Rate</div>
          </div>
          <div>
            <div className="font-heading" style={{ fontSize: '1.6rem', fontWeight: 900, color: '#10b981' }}>750⚡</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Gen-Z Credit Score</div>
          </div>
          <div>
            <div className="font-heading" style={{ fontSize: '1.6rem', fontWeight: 900, color: '#c77dff' }}>99.4%</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>AI OCR Precision</div>
          </div>
        </div>
      </section>

      {/* 2. CORE PLATFORM PILLARS GRID */}
      <section>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <span className="badge-tag badge-cyan">PLATFORM HIGHLIGHTS</span>
          <h2 className="font-heading" style={{ fontSize: '2rem', fontWeight: 800, marginTop: '8px', color: '#fff' }}>
            Designed for Practical Impact & Compounding Growth
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          
          {/* Card 1: Dashboard */}
          <div className="glass-panel" style={{ padding: '24px', cursor: 'pointer' }} onClick={() => handleNav('dashboard')}>
            <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(255,199,44,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
              <TrendingUp color="#ffc72c" size={24} />
            </div>
            <h3 className="font-heading" style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '8px', color: '#fff' }}>
              Income & Expense Dashboard
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '16px' }}>
              Comprehensive monthly tracking, category-wise Chart.js breakdown, cashflow trends, and instant UPI goal deposits.
            </p>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#ffc72c', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              Explore Dashboard <ArrowRight size={14} />
            </span>
          </div>

          {/* Card 2: Credit Dungeon */}
          <div className="glass-panel glass-glow-violet" style={{ padding: '24px', cursor: 'pointer' }} onClick={() => handleNav('dungeon')}>
            <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(112,0,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
              <Sword color="#c77dff" size={24} />
            </div>
            <h3 className="font-heading" style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '8px', color: '#fff' }}>
              Credit Dungeon Mini-Game
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '16px' }}>
              Fight "The Debt Kraken 🐙" boss using Extra Payments, Refinance Shields, and real-world scenario decision quests.
            </p>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#c77dff', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              Play Boss Battle <ArrowRight size={14} />
            </span>
          </div>

          {/* Card 3: Kash AI Chat */}
          <div className="glass-panel" style={{ padding: '24px', cursor: 'pointer' }} onClick={() => handleNav('kash')}>
            <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(0,240,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
              <Bot color="#00f0ff" size={24} />
            </div>
            <h3 className="font-heading" style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '8px', color: '#fff' }}>
              Kash the Red Panda AI
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '16px' }}>
              Sassy AI finance assistant that celebrates your savings wins and roasts bad financial decisions in real-time.
            </p>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#00f0ff', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              Chat with Kash <ArrowRight size={14} />
            </span>
          </div>

          {/* Card 4: AI Hub */}
          <div className="glass-panel" style={{ padding: '24px', cursor: 'pointer' }} onClick={() => handleNav('aihub')}>
            <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(16,185,129,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
              <FileText color="#10b981" size={24} />
            </div>
            <h3 className="font-heading" style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '8px', color: '#fff' }}>
              Receipt OCR & Fraud Shield
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '16px' }}>
              Vision AI receipt parser for instant transaction logging + real-time fraud anomaly detector feed.
            </p>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#10b981', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              Open AI Hub <ArrowRight size={14} />
            </span>
          </div>

        </div>
      </section>

    </div>
  );
}
