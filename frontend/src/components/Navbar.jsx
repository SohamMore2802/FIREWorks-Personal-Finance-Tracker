import React, { useState } from 'react';
import { Home, LayoutDashboard, Sword, Bot, Cpu, TrendingUp, Share2, Sparkles, PlusCircle, Volume2, VolumeX, PieChart, BookOpen, UserCheck, LogIn, LogOut, RefreshCw, Users, Activity, ShieldAlert, KeyRound } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export default function Navbar({ activeTab, setActiveTab, stats, fraudCount, user, onLogout, onOpenQuickAdd }) {
  const [isMuted, setIsMuted] = useState(false);

  const toggleSound = () => {
    sounds.muted = !isMuted;
    setIsMuted(!isMuted);
    if (isMuted) sounds.playClick();
  };

  const navItems = [
    { id: 'home', label: 'Home Page', icon: Home },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'auth', label: 'Login / Register', icon: KeyRound, badge: 'Portal' },
    { id: 'dungeon', label: 'Credit Dungeon', icon: Sword, badge: 'Game' },
    { id: 'kash', label: 'Kash AI', icon: Bot, badge: 'Sassy' },
    { id: 'aihub', label: 'AI Scanner', icon: Cpu, alert: fraudCount },
    { id: 'subscriptions', label: 'Bill Optimizer', icon: RefreshCw },
    { id: 'forecast', label: 'AI Forecast', icon: Activity, badge: 'Predict' },
    { id: 'debt', label: 'Debt Freedom', icon: ShieldAlert },
    { id: 'squad', label: 'Squad Challenges', icon: Users },
    { id: 'investments', label: 'Investments', icon: PieChart },
    { id: 'academy', label: 'Academy', icon: BookOpen, badge: 'XP' },
    { id: 'fire', label: 'F.I.R.E. Lab', icon: TrendingUp },
    { id: 'social', label: 'Story Badge', icon: Share2, highlight: true }
  ];

  const handleNavClick = (id) => {
    sounds.playClick();
    setActiveTab(id);
  };

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 50 }} className="glass-panel border-b border-white/10 px-4 py-3 mb-6">
      <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px' }}>
        
        {/* Brand Header */}
        <div 
          onClick={() => handleNavClick('home')}
          style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
        >
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '14px',
            background: 'linear-gradient(135deg, #ffc72c 0%, #7000ff 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 20px rgba(255, 199, 44, 0.45)'
          }}>
            <Sparkles size={22} color="#fff" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="font-heading" style={{ fontSize: '1.3rem', fontWeight: 900, letterSpacing: '-0.5px', color: '#fff' }}>
                F.I.R.E. <span className="gradient-text-gold">WORKS</span>
              </span>
              <span className="badge-tag badge-gold">FINANCE PLATFORM</span>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Gen-Z Financial Independence Engine
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(0,0,0,0.4)', padding: '4px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.08)', overflowX: 'auto' }}>
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '7px 12px',
                  borderRadius: '10px',
                  border: 'none',
                  fontSize: '0.8rem',
                  fontWeight: isActive ? 800 : 600,
                  color: isActive ? '#05060a' : '#94a3b8',
                  background: isActive 
                    ? 'linear-gradient(135deg, #ffc72c 0%, #00f0ff 100%)' 
                    : item.highlight 
                      ? 'rgba(255, 199, 44, 0.12)' 
                      : 'transparent',
                  boxShadow: isActive ? '0 4px 15px rgba(255, 199, 44, 0.3)' : 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                  whiteSpace: 'nowrap'
                }}
              >
                <Icon size={14} color={isActive ? '#05060a' : item.highlight ? '#ffc72c' : 'currentColor'} />
                <span>{item.label}</span>
                {item.badge && (
                  <span style={{ fontSize: '0.6rem', padding: '1px 5px', borderRadius: '6px', background: isActive ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.12)', color: isActive ? '#000' : '#fff' }}>
                    {item.badge}
                  </span>
                )}
                {item.alert > 0 && (
                  <span style={{ background: '#ff2a6d', color: '#fff', fontSize: '0.6rem', fontWeight: 800, padding: '1px 5px', borderRadius: '10px' }}>
                    {item.alert}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* User Stats Pill & Audio & Auth Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          
          <button 
            onClick={toggleSound}
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '12px',
              padding: '8px 10px',
              color: isMuted ? 'var(--text-muted)' : '#ffc72c',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease'
            }}
            title={isMuted ? "Unmute UI Audio FX" : "Mute UI Audio FX"}
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>

          {/* User Account / Auth Button */}
          {user && user.name ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div 
                onClick={() => handleNavClick('auth')}
                style={{
                  background: 'rgba(0,240,255,0.1)',
                  border: '1px solid rgba(0,240,255,0.3)',
                  padding: '6px 12px',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer'
                }}
              >
                <UserCheck size={16} color="#00f0ff" />
                <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#fff' }}>
                  {user.name} <span style={{ fontSize: '0.65rem', color: '#00f0ff' }}>({user.handle})</span>
                </div>
              </div>

              <button
                onClick={onLogout}
                style={{
                  background: 'rgba(255,42,109,0.1)',
                  border: '1px solid rgba(255,42,109,0.3)',
                  borderRadius: '10px',
                  padding: '6px 10px',
                  color: '#ff2a6d',
                  cursor: 'pointer'
                }}
                title="Log Out"
              >
                <LogOut size={15} />
              </button>
            </div>
          ) : (
            <button 
              className="btn-cyber" 
              onClick={() => handleNavClick('auth')}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', fontSize: '0.82rem' }}
            >
              <LogIn size={15} />
              <span>Sign In / Register</span>
            </button>
          )}

          <button 
            className="btn-gold" 
            onClick={() => { sounds.playClick(); onOpenQuickAdd(); }}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', fontSize: '0.82rem' }}
          >
            <PlusCircle size={15} />
            <span>Add Entry</span>
          </button>
        </div>

      </div>
    </header>
  );
}
