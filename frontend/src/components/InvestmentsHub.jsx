import React, { useState } from 'react';
import { Doughnut, Line } from 'react-chartjs-2';
import { TrendingUp, DollarSign, PieChart, ShieldAlert, ArrowUpRight, ArrowDownRight, Sparkles, RefreshCw, Zap } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export default function InvestmentsHub({ onDepositGoal }) {
  const [selectedAsset, setSelectedAsset] = useState('sip');

  const assetAllocation = {
    labels: ['Gen-Z Index SIP', 'US Tech Equity', 'Digital Assets', 'Gold & Debt', 'Emergency Cash'],
    datasets: [
      {
        data: [45000, 25000, 15000, 10000, 15000],
        backgroundColor: ['#ffc72c', '#00f0ff', '#7000ff', '#10b981', '#ff2a6d'],
        borderWidth: 2,
        borderColor: '#05060a'
      }
    ]
  };

  const marketTickers = [
    { symbol: 'NIFTY 50', price: '₹24,850.40', change: '+1.2%', isUp: true },
    { symbol: 'GEN-Z INDEX', price: '₹14,210.80', change: '+3.4%', isUp: true },
    { symbol: 'S&P 500', price: '$5,420.15', change: '+0.8%', isUp: true },
    { symbol: 'BITCOIN', price: '$64,250.00', change: '-1.1%', isUp: false },
    { symbol: 'GOLD (10g)', price: '₹72,400.00', change: '+0.4%', isUp: true }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Live Market Marquee Ticker */}
      <div style={{
        background: 'rgba(0, 240, 255, 0.05)',
        border: '1px solid rgba(0, 240, 255, 0.2)',
        borderRadius: '14px',
        padding: '10px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        overflowX: 'auto',
        fontSize: '0.82rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#00f0ff', fontWeight: 800, whiteSpace: 'nowrap' }}>
          <span className="live-pulse" /> LIVE MARKETS:
        </div>
        {marketTickers.map((m, idx) => (
          <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', whiteSpace: 'nowrap' }}>
            <span style={{ fontWeight: 700, color: '#fff' }}>{m.symbol}</span>
            <span style={{ color: 'var(--text-muted)' }}>{m.price}</span>
            <span style={{ fontWeight: 800, color: m.isUp ? '#10b981' : '#ff2a6d', display: 'inline-flex', alignItems: 'center' }}>
              {m.isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />} {m.change}
            </span>
          </div>
        ))}
      </div>

      {/* Header Banner */}
      <div className="glass-panel glass-glow-gold" style={{ padding: '28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span className="badge-tag badge-gold">WEALTH & ASSETS</span>
              <span className="badge-tag badge-cyan">PORTFOLIO ENGINE</span>
            </div>
            <h2 className="font-heading" style={{ fontSize: '1.85rem', fontWeight: 900, marginTop: '8px', color: '#fff' }}>
              Investments & <span className="gradient-text-gold">Asset Allocation Hub</span>
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Real-time portfolio metrics, index SIP auto-investing, and Gen-Z risk balancer
            </p>
          </div>
          <TrendingUp size={42} color="#ffc72c" />
        </div>
      </div>

      {/* Grid: Doughnut Breakdown + Asset Classes */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '20px' }}>
        
        {/* Doughnut Asset Breakdown */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 className="font-heading" style={{ fontSize: '1.15rem', fontWeight: 800 }}>Portfolio Asset Allocation</h3>
            <span className="badge-tag badge-green">Target: Balanced</span>
          </div>

          <div style={{ height: '250px', position: 'relative' }}>
            <Doughnut 
              data={assetAllocation} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { position: 'bottom', labels: { color: '#94a3b8', font: { size: 11 } } }
                }
              }} 
            />
          </div>
        </div>

        {/* SIP Auto-Invest Quick Action */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h3 className="font-heading" style={{ fontSize: '1.15rem', fontWeight: 800, color: '#fff' }}>
                Automated SIP Index Fund
              </h3>
              <span className="badge-tag badge-cyan">12.4% Expected Return</span>
            </div>

            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '20px' }}>
              Building compounding wealth requires systematic monthly index investing. Allocate ₹5,000/mo into low-cost NIFTY 50 index funds automatically.
            </p>

            <div style={{ background: 'rgba(255,199,44,0.08)', border: '1px solid rgba(255,199,44,0.3)', borderRadius: '14px', padding: '16px', marginBottom: '20px' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>CURRENT INVESTED VALUE</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#ffc72c' }}>₹1,10,000</div>
              <div style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 700, marginTop: '4px' }}>
                ▲ +₹19,500 total profit returns (+21.5%)
              </div>
            </div>
          </div>

          <button 
            className="btn-gold" 
            onClick={() => { sounds.playSuccess(); onDepositGoal(1, 5000); }}
            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px' }}
          >
            <Sparkles size={16} />
            <span>Instant ₹5,000 SIP Deposit</span>
          </button>
        </div>

      </div>

    </div>
  );
}
