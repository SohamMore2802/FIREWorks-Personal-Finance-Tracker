import React, { useState, useEffect } from 'react';
import { ArrowUpRight, ArrowDownRight, Radio, Activity, Sparkles } from 'lucide-react';

export default function LiveTickerBanner() {
  const [streamData, setStreamData] = useState({
    activeUsers: 1445,
    event: "⚡ Real-time telemetry feed active",
    tickers: [
      { symbol: 'NIFTY 50', price: '24,850.40', change: '+1.25%', isUp: true },
      { symbol: 'GEN-Z INDEX', price: '14,210.80', change: '+3.40%', isUp: true },
      { symbol: 'S&P 500', price: '5,420.15', change: '+0.85%', isUp: true },
      { symbol: 'BITCOIN', price: '64,250.00', change: '-0.95%', isUp: false }
    ]
  });

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch('http://localhost:5000/api/live/stream');
        if (res.ok) {
          const d = await res.json();
          setStreamData(d);
        }
      } catch (e) {}
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      background: 'rgba(5, 6, 10, 0.92)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      padding: '8px 16px',
      fontSize: '0.78rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '16px',
      overflowX: 'auto'
    }}>
      {/* Live Stream Status & Dynamic Event */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', whiteSpace: 'nowrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#00f0ff', fontWeight: 800 }}>
          <span className="live-pulse" /> LIVE STREAM:
        </div>
        <span style={{ color: '#fff', fontWeight: 700 }}>{streamData.event}</span>
      </div>

      {/* Dynamic Fluctuate Tickers */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', whiteSpace: 'nowrap' }}>
        <div style={{ color: 'var(--text-muted)', fontSize: '0.72rem' }}>
          🟢 <strong style={{ color: '#10b981' }}>{streamData.activeUsers}</strong> Active Savers
        </div>

        {streamData.tickers?.map((t, idx) => (
          <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontWeight: 800, color: '#94a3b8' }}>{t.symbol}:</span>
            <span style={{ fontWeight: 700, color: '#fff' }}>₹{t.price}</span>
            <span style={{ fontWeight: 800, color: t.isUp ? '#10b981' : '#ff2a6d', display: 'inline-flex', alignItems: 'center' }}>
              {t.isUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />} {t.change}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
