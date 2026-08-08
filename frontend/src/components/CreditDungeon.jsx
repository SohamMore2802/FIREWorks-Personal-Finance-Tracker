import React, { useState } from 'react';
import { Sword, Shield, Zap, Flame, Award, HelpCircle, RefreshCw, Trophy, AlertTriangle } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export default function CreditDungeon({ dungeon, onPerformAction }) {
  const [activeScenarioIdx, setActiveScenarioIdx] = useState(0);
  const [battleLog, setBattleLog] = useState([
    "⚔️ Dungeon Master: Welcome to Credit Dungeon Level 3! The Debt Kraken is lurking!"
  ]);

  const scenarios = dungeon?.scenarios || [];
  const currentScenario = scenarios[activeScenarioIdx];

  const handleBattleMove = async (moveName) => {
    sounds.playStrike();
    const res = await onPerformAction({ moveType: 'battle', moveName });
    if (res?.message) {
      setBattleLog(prev => [res.message, ...prev.slice(0, 4)]);
      if (res.message.includes("DEFEATED")) sounds.playSuccess();
    }
  };

  const handleScenarioOption = async (optionIdx) => {
    if (!currentScenario) return;
    sounds.playClick();
    const res = await onPerformAction({ 
      scenarioId: currentScenario.id, 
      optionIndex: optionIdx 
    });
    if (res?.message) {
      setBattleLog(prev => [`📜 ${res.message}`, ...prev.slice(0, 4)]);
      if (res.message.includes("Smart Gen-Z move")) sounds.playSuccess();
    }
    if (scenarios.length > 0) {
      setActiveScenarioIdx((activeScenarioIdx + 1) % scenarios.length);
    }
  };

  const bossHpPct = Math.round(((dungeon?.bossHp || 850) / (dungeon?.maxBossHp || 1000)) * 100);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Banner Header */}
      <div className="glass-panel glass-glow-violet" style={{
        padding: '28px',
        background: 'linear-gradient(135deg, rgba(112, 0, 255, 0.22) 0%, rgba(5, 6, 10, 0.95) 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span className="badge-tag badge-purple">CREDIT DUNGEON MINIGAME</span>
              <span className="badge-tag badge-gold">LEVEL {dungeon?.level || 3}</span>
            </div>
            <h2 className="font-heading" style={{ fontSize: '1.85rem', fontWeight: 900, marginTop: '8px', color: '#fff' }}>
              Boss Battle: <span className="gradient-text-fire">{dungeon?.bossName || "The Debt Kraken 🐙"}</span>
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Attack high-interest debt with extra payments, refinance shields, and financial discipline!
            </p>
          </div>

          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div style={{ textAlign: 'center', background: 'rgba(0,0,0,0.5)', padding: '12px 18px', borderRadius: '14px', border: '1px solid rgba(255,199,44,0.3)' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>CREDIT SCORE</div>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#ffc72c' }}>⚡ {dungeon?.creditScore || 750}</div>
            </div>
            <div style={{ textAlign: 'center', background: 'rgba(0,0,0,0.5)', padding: '12px 18px', borderRadius: '14px', border: '1px solid rgba(255,42,109,0.3)' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>TOTAL DEBT MONSTER</div>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#ff2a6d' }}>₹{(dungeon?.currentDebt || 45000).toLocaleString()}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Gaming Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '20px' }}>
        
        {/* Boss Stage */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '20px' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontWeight: 800, fontSize: '1.05rem', color: '#ff2a6d', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Flame size={18} />
                {dungeon?.bossName || "The Debt Kraken 🐙"}
              </span>
              <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-muted)' }}>
                {dungeon?.bossHp || 850} / {dungeon?.maxBossHp || 1000} HP
              </span>
            </div>

            {/* Boss HP Bar */}
            <div style={{ width: '100%', height: '14px', background: 'rgba(255,255,255,0.08)', borderRadius: '8px', overflow: 'hidden', marginBottom: '20px' }}>
              <div style={{
                width: `${bossHpPct}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #ff2a6d 0%, #ffc72c 100%)',
                borderRadius: '8px',
                transition: 'width 0.4s ease'
              }} />
            </div>

            {/* Boss Canvas */}
            <div style={{
              width: '100%',
              height: '210px',
              borderRadius: '16px',
              backgroundImage: 'url(/debt_boss_monster.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              position: 'relative',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
              padding: '12px',
              boxShadow: '0 0 35px rgba(255,42,109,0.25) inset'
            }}>
              <div style={{
                background: 'rgba(5,6,10,0.88)',
                backdropFilter: 'blur(8px)',
                padding: '6px 16px',
                borderRadius: '20px',
                border: '1px solid rgba(255,42,109,0.4)',
                fontSize: '0.78rem',
                fontWeight: 800,
                color: '#ff2a6d'
              }}>
                🐙 Weakness: High Interest Lump-Sum Extra Payments
              </div>
            </div>
          </div>

          {/* Combat Actions */}
          <div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '8px', fontWeight: 700 }}>SELECT YOUR FINANCIAL STRIKE:</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
              <button 
                className="btn-gold" 
                onClick={() => handleBattleMove('extra_payment')}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', padding: '12px 8px', fontSize: '0.78rem' }}
              >
                <Sword size={18} />
                <span>Extra Payment</span>
                <span style={{ fontSize: '0.62rem', opacity: 0.85 }}>High Damage</span>
              </button>

              <button 
                className="btn-cyber" 
                onClick={() => handleBattleMove('refinance_shield')}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', padding: '12px 8px', fontSize: '0.78rem' }}
              >
                <Shield size={18} />
                <span>Refinance Shield</span>
                <span style={{ fontSize: '0.62rem', opacity: 0.85 }}>Lower Interest</span>
              </button>

              <button 
                className="btn-outline" 
                onClick={() => handleBattleMove('budget_strike')}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', padding: '12px 8px', fontSize: '0.78rem', borderColor: '#c77dff', color: '#c77dff' }}
              >
                <Zap size={18} />
                <span>Budget Strike</span>
                <span style={{ fontSize: '0.62rem', opacity: 0.85 }}>Crit Hit</span>
              </button>
            </div>
          </div>
        </div>

        {/* Quest Decisions */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h3 className="font-heading" style={{ fontSize: '1.15rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <HelpCircle color="#00f0ff" size={18} />
                Scenario Decision Quest
              </h3>
              <span className="badge-tag badge-cyan">Quest #{activeScenarioIdx + 1}</span>
            </div>

            {currentScenario ? (
              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '16px', marginBottom: '16px' }}>
                <p style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff', lineHeight: 1.5, marginBottom: '16px' }}>
                  "{currentScenario.question}"
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {currentScenario.options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleScenarioOption(idx)}
                      style={{
                        textAlign: 'left',
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '10px',
                        padding: '12px 14px',
                        color: '#fff',
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.borderColor = '#00f0ff'}
                      onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
                    >
                      {opt.text}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '20px' }}>
                All scenario quests completed! Refresh for more.
              </div>
            )}
          </div>

          {/* Combat Log */}
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '6px', fontWeight: 700 }}>DUNGEON COMBAT LOG</div>
            <div style={{
              background: '#040508',
              borderRadius: '10px',
              padding: '10px 12px',
              fontFamily: 'monospace',
              fontSize: '0.75rem',
              color: '#00f0ff',
              maxHeight: '110px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
              border: '1px solid rgba(0,240,255,0.2)'
            }}>
              {battleLog.map((log, i) => (
                <div key={i}>{log}</div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
