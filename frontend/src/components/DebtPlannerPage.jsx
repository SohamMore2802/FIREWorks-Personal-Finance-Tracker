import React, { useState } from 'react';
import { Sword, Zap, ShieldAlert, Award, Calculator, ArrowRight, CheckCircle2, DollarSign } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export default function DebtPlannerPage() {
  const [strategy, setStrategy] = useState('avalanche'); // 'avalanche' or 'snowball'
  const [extraPayment, setExtraPayment] = useState(5000);

  const debts = [
    { name: 'Credit Card Balance', balance: 25000, apr: 36, minPay: 1200 },
    { name: 'Personal Gadget EMI', balance: 12000, apr: 14, minPay: 800 },
    { name: 'Student Education Loan', balance: 45000, apr: 8.5, minPay: 2200 }
  ];

  // Avalanche: sort by highest APR first (36% -> 14% -> 8.5%)
  // Snowball: sort by lowest balance first (12,000 -> 25,000 -> 45,000)
  const sortedDebts = [...debts].sort((a, b) => {
    if (strategy === 'avalanche') return b.apr - a.apr;
    return a.balance - b.balance;
  });

  const totalDebt = debts.reduce((sum, d) => sum + d.balance, 0);
  const totalMinPay = debts.reduce((sum, d) => sum + d.minPay, 0);

  // Payoff months estimate
  const monthsToPayoff = strategy === 'avalanche' ? 7 : 9;
  const interestSaved = strategy === 'avalanche' ? 14200 : 9800;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header Banner */}
      <div className="glass-panel glass-glow-violet" style={{ padding: '28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span className="badge-tag badge-purple">DEBT FREEDOM</span>
              <span className="badge-tag badge-gold">STRATEGY PLANNER</span>
            </div>
            <h2 className="font-heading" style={{ fontSize: '1.85rem', fontWeight: 900, marginTop: '8px', color: '#fff' }}>
              Debt Payoff Engine: <span className="gradient-text-cyber">Avalanche vs Snowball</span>
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Eliminate debt faster and save thousands in high-APR interest charges
            </p>
          </div>
          <Sword size={42} color="#c77dff" />
        </div>
      </div>

      {/* Strategy Switcher */}
      <div className="glass-panel" style={{ padding: '20px' }}>
        <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#fff', marginBottom: '12px' }}>
          Choose Payoff Strategy:
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px' }}>
          <button
            onClick={() => { sounds.playClick(); setStrategy('avalanche'); }}
            style={{
              padding: '16px', borderRadius: '14px', border: `1px solid ${strategy === 'avalanche' ? '#00f0ff' : 'rgba(255,255,255,0.1)'}`,
              background: strategy === 'avalanche' ? 'rgba(0,240,255,0.12)' : 'rgba(255,255,255,0.03)',
              color: '#fff', textAlign: 'left', cursor: 'pointer'
            }}
          >
            <div style={{ fontWeight: 900, fontSize: '1rem', color: '#00f0ff' }}>⚡ Avalanche Method (Recommended)</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px', lineHeight: 1.5 }}>
              Pay highest interest APR debt first. Saves the maximum money on interest!
            </div>
          </button>

          <button
            onClick={() => { sounds.playClick(); setStrategy('snowball'); }}
            style={{
              padding: '16px', borderRadius: '14px', border: `1px solid ${strategy === 'snowball' ? '#ffc72c' : 'rgba(255,255,255,0.1)'}`,
              background: strategy === 'snowball' ? 'rgba(255,199,44,0.12)' : 'rgba(255,255,255,0.03)',
              color: '#fff', textAlign: 'left', cursor: 'pointer'
            }}
          >
            <div style={{ fontWeight: 900, fontSize: '1rem', color: '#ffc72c' }}>⛄ Snowball Method</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px', lineHeight: 1.5 }}>
              Pay lowest balance debt first. Gives quick psychological momentum wins!
            </div>
          </button>
        </div>
      </div>

      {/* Payoff Stats & Debt Stack */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '20px' }}>
        
        {/* Debts Priority Stack */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <h3 className="font-heading" style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff', marginBottom: '16px' }}>
            Priority Repayment Order ({strategy.toUpperCase()})
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {sortedDebts.map((d, idx) => (
              <div 
                key={idx}
                style={{
                  background: idx === 0 ? 'rgba(255,199,44,0.08)' : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${idx === 0 ? '#ffc72c' : 'rgba(255,255,255,0.08)'}`,
                  borderRadius: '14px',
                  padding: '16px',
                  display: 'flex',
                  justify: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontWeight: 900, color: idx === 0 ? '#ffc72c' : '#94a3b8' }}>#{idx + 1} Target</span>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#fff' }}>{d.name}</h4>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    Min Payment: ₹{d.minPay}/mo • Interest APR: <strong style={{ color: d.apr > 20 ? '#ff2a6d' : '#00f0ff' }}>{d.apr}%</strong>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.1rem', fontWeight: 900, color: '#fff' }}>
                    ₹{d.balance.toLocaleString()}
                  </div>
                  {idx === 0 && (
                    <span className="badge-tag badge-gold" style={{ fontSize: '0.65rem' }}>Attack First ⚔️</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payoff Result Cards */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <h3 className="font-heading" style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff', marginBottom: '16px' }}>
              Payoff Freedom Metrics
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid #10b981', borderRadius: '14px', padding: '16px' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>DEBT FREEDOM TIMELINE</div>
                <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#10b981' }}>
                  {monthsToPayoff} Months 🚀
                </div>
                <div style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 700, marginTop: '2px' }}>
                  100% Debt-Free by March 2027
                </div>
              </div>

              <div style={{ background: 'rgba(0,240,255,0.1)', border: '1px solid #00f0ff', borderRadius: '14px', padding: '16px' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>TOTAL INTEREST SAVED</div>
                <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#00f0ff' }}>
                  ₹{interestSaved.toLocaleString()}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#00f0ff', fontWeight: 700, marginTop: '2px' }}>
                  Saved using {strategy} strategy
                </div>
              </div>
            </div>
          </div>

          <button 
            className="btn-gold" 
            onClick={() => sounds.playSuccess()}
            style={{ width: '100%', marginTop: '20px', padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
          >
            <Zap size={16} />
            <span>Lock In Debt Freedom Plan</span>
          </button>
        </div>

      </div>

    </div>
  );
}
