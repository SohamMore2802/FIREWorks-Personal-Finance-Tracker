import React, { useState } from 'react';
import { RefreshCw, Zap, ShieldAlert, CheckCircle2, AlertTriangle, Calendar, Scissors, CreditCard, Sparkles } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export default function SubscriptionsHub({ onDeleteTransaction }) {
  const [subscriptions, setSubscriptions] = useState([
    { id: 1, name: 'Cloud Hosting & AWS Dev', cost: 3200, billingCycle: 'Monthly', category: 'Tech', renewalDate: '2026-08-15', status: 'active' },
    { id: 2, title: 'Gym & Fitness Club', cost: 2500, billingCycle: 'Monthly', category: 'Health', renewalDate: '2026-08-20', status: 'active' },
    { id: 3, name: '4K Ultra Streaming Plus', cost: 799, billingCycle: 'Monthly', category: 'Entertainment', renewalDate: '2026-08-12', status: 'flagged' },
    { id: 4, name: 'AI Assistant Pro Plan', cost: 1499, billingCycle: 'Monthly', category: 'Tech', renewalDate: '2026-08-28', status: 'active' },
    { id: 5, name: 'Premium Music Hi-Fi', cost: 299, billingCycle: 'Monthly', category: 'Entertainment', renewalDate: '2026-08-18', status: 'active' }
  ]);

  const [cancelledCount, setCancelledCount] = useState(0);

  const handleCancelSub = (id) => {
    sounds.playSuccess();
    setSubscriptions(prev => prev.map(s => s.id === id ? { ...s, status: 'cancelled' } : s));
    setCancelledCount(prev => prev + 1);
  };

  const totalMonthlyCost = subscriptions
    .filter(s => s.status !== 'cancelled')
    .reduce((sum, s) => sum + s.cost, 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header Banner */}
      <div className="glass-panel glass-glow-gold" style={{ padding: '28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span className="badge-tag badge-gold">BILL OPTIMIZER</span>
              <span className="badge-tag badge-cyan">ROCKET MONEY COMPETITOR FEATURE</span>
            </div>
            <h2 className="font-heading" style={{ fontSize: '1.85rem', fontWeight: 900, marginTop: '8px', color: '#fff' }}>
              Subscriptions & <span className="gradient-text-gold">Recurring Bill Optimizer</span>
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Auto-detect recurring charges, eliminate unused subscriptions, and save money every month.
            </p>
          </div>
          <RefreshCw size={42} color="#ffc72c" />
        </div>
      </div>

      {/* Overview Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700 }}>ACTIVE SUBSCRIPTIONS</div>
          <div className="font-heading" style={{ fontSize: '1.8rem', fontWeight: 900, color: '#00f0ff', marginTop: '4px' }}>
            {subscriptions.filter(s => s.status !== 'cancelled').length} Active
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700 }}>TOTAL RECURRING COST</div>
          <div className="font-heading" style={{ fontSize: '1.8rem', fontWeight: 900, color: '#ff2a6d', marginTop: '4px' }}>
            ₹{totalMonthlyCost.toLocaleString()}/mo
          </div>
        </div>

        <div className="glass-panel glass-glow-cyan" style={{ padding: '20px' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700 }}>ANNUAL SAVINGS POTENTIAL</div>
          <div className="font-heading" style={{ fontSize: '1.8rem', fontWeight: 900, color: '#10b981', marginTop: '4px' }}>
            ₹{(totalMonthlyCost * 12).toLocaleString()}/yr
          </div>
        </div>
      </div>

      {/* Subscription List */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <h3 className="font-heading" style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff', marginBottom: '16px' }}>
          Detected Active Subscriptions & Bills
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {subscriptions.map(sub => {
            const isCancelled = sub.status === 'cancelled';
            return (
              <div 
                key={sub.id}
                style={{
                  background: isCancelled ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${isCancelled ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.1)'}`,
                  borderRadius: '16px',
                  padding: '16px',
                  display: 'flex',
                  justify: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '12px',
                  opacity: isCancelled ? 0.5 : 1
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#fff' }}>{sub.name || sub.title}</h4>
                    <span className="badge-tag badge-purple" style={{ fontSize: '0.65rem' }}>{sub.category}</span>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    Renews: {sub.renewalDate} • {sub.billingCycle}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1.1rem', fontWeight: 900, color: isCancelled ? 'var(--text-muted)' : '#ff2a6d' }}>
                      ₹{sub.cost.toLocaleString()}/mo
                    </div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Auto-Debit</div>
                  </div>

                  {!isCancelled ? (
                    <button 
                      onClick={() => handleCancelSub(sub.id)}
                      style={{
                        background: 'rgba(255,42,109,0.12)',
                        border: '1px solid #ff2a6d',
                        color: '#ff2a6d',
                        borderRadius: '10px',
                        padding: '8px 14px',
                        fontSize: '0.78rem',
                        fontWeight: 800,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <Scissors size={14} /> Cancel Sub
                    </button>
                  ) : (
                    <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#10b981' }}>
                      CANCELLED ✅
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
