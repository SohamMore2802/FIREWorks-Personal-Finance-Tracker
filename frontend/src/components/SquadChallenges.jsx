import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, Users, Flame, Zap, Award, CheckCircle2, ArrowUpRight, Sparkles } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export default function SquadChallenges() {
  const [joinedChallenges, setJoinedChallenges] = useState([]);

  const leaderboard = [
    { rank: 1, name: 'You', handle: '@fire_works', score: 88, savingsRate: '59.8%', streak: '12wks', badge: '🥇 F.I.R.E. Titan' },
    { rank: 2, name: 'Maya Lin', handle: '@mayasaves', score: 85, savingsRate: '54.2%', streak: '8wks', badge: '🥈 Budget Boss' },
    { rank: 3, name: 'Devon Vance', handle: '@devon_v', score: 82, savingsRate: '51.0%', streak: '6wks', badge: '🥉 Debt Slayer' },
    { rank: 4, name: 'Priya Sharma', handle: '@priyainvests', score: 79, savingsRate: '48.5%', streak: '4wks', badge: '⭐ SIP Master' },
    { rank: 5, name: 'Liam Chen', handle: '@liam_c', score: 76, savingsRate: '45.0%', streak: '3wks', badge: '⭐ Saver' }
  ];

  const challenges = [
    { id: 'c1', title: '30-Day No Food Delivery Challenge', goal: 'Save ₹6,500 on Swiggy/Zomato', reward: '+150 XP & 🏆 Master Badge', participants: '1,420 Gen-Z Savers' },
    { id: 'c2', title: 'SIP Index Rocket 2x Challenge', goal: 'Double monthly mutual fund SIP', reward: '+250 XP & 🔥 FIRE Booster', participants: '980 Investors' },
    { id: 'c3', title: 'Payday Loan Avoidance Squad', goal: 'Maintain 750+ credit score for 60 days', reward: '+200 XP & 🛡️ Shield', participants: '3,100 Members' }
  ];

  const handleJoin = (id) => {
    sounds.playSuccess();
    setJoinedChallenges(prev => [...prev, id]);
    confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 } });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Banner Header */}
      <div className="glass-panel glass-glow-purple" style={{ padding: '28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span className="badge-tag badge-purple">SQUAD & COMMUNITY</span>
              <span className="badge-tag badge-gold">GEN-Z LEADERBOARD</span>
            </div>
            <h2 className="font-heading" style={{ fontSize: '1.85rem', fontWeight: 900, marginTop: '8px', color: '#fff' }}>
              Squad Challenges & <span className="gradient-text-cyber">Saver Leaderboard</span>
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Compete with peers, unlock squad badges, and crush financial targets together
            </p>
          </div>
          <Users size={42} color="#c77dff" />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '20px' }}>
        
        {/* Leaderboard Table */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 className="font-heading" style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Trophy color="#ffc72c" size={20} />
              Gen-Z F.I.R.E. Leaderboard
            </h3>
            <span className="badge-tag badge-gold">Global Ranking</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {leaderboard.map(item => (
              <div 
                key={item.rank}
                style={{
                  background: item.rank === 1 ? 'rgba(255,199,44,0.08)' : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${item.rank === 1 ? '#ffc72c' : 'rgba(255,255,255,0.08)'}`,
                  borderRadius: '14px',
                  padding: '14px 16px',
                  display: 'flex',
                  justify: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ fontSize: '1.1rem', fontWeight: 900, color: item.rank === 1 ? '#ffc72c' : '#94a3b8', width: '24px' }}>
                    #{item.rank}
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, color: '#fff', fontSize: '0.95rem' }}>{item.name}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{item.handle} • {item.badge}</div>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1rem', fontWeight: 900, color: '#00f0ff' }}>
                    🔥 {item.score} F.I.R.E. Score
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#10b981', fontWeight: 700 }}>
                    {item.savingsRate} Savings
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Squad Challenges */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 className="font-heading" style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Zap color="#00f0ff" size={20} />
            Active Squad Challenges
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {challenges.map(c => {
              const isJoined = joinedChallenges.includes(c.id);
              return (
                <div 
                  key={c.id}
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '14px',
                    padding: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px'
                  }}
                >
                  <div>
                    <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#fff' }}>{c.title}</h4>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>{c.goal}</p>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: '#ffc72c' }}>
                    <span>Reward: {c.reward}</span>
                    <span style={{ color: 'var(--text-muted)' }}>{c.participants}</span>
                  </div>

                  {!isJoined ? (
                    <button 
                      className="btn-cyber" 
                      onClick={() => handleJoin(c.id)}
                      style={{ padding: '8px', fontSize: '0.8rem' }}
                    >
                      Accept Squad Challenge 🚀
                    </button>
                  ) : (
                    <div style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid #10b981', color: '#10b981', padding: '8px', borderRadius: '8px', textAlign: 'center', fontWeight: 800, fontSize: '0.8rem' }}>
                      CHALLENGE ACTIVE ✅
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
