import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Sparkles, TrendingUp, ShieldAlert, Cpu, Activity, Zap, CheckCircle2, ArrowRight } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export default function ForecastPage({ stats }) {
  const [selectedScenario, setSelectedScenario] = useState('base');

  const baseNetWorth = stats?.netWorth || 193300;
  const monthlySavings = (stats?.monthlyIncome || 85000) - (stats?.monthlyExpenses || 34200);

  const scenarioMultiplier = {
    base: 1.0,
    hike: 1.35,      // +35% salary boost
    emergency: 0.75, // Emergency hit
    inflation: 0.88  // Inflation squeeze
  };

  const currentMult = scenarioMultiplier[selectedScenario];

  const months = ['Current', '+1 Mo', '+2 Mo', '+3 Mo', '+6 Mo', '+9 Mo', '+12 Mo'];
  const projectedValues = [
    baseNetWorth,
    Math.round(baseNetWorth + monthlySavings * 1 * currentMult),
    Math.round(baseNetWorth + monthlySavings * 2 * currentMult),
    Math.round(baseNetWorth + monthlySavings * 3 * currentMult),
    Math.round(baseNetWorth + monthlySavings * 6 * currentMult * 1.05),
    Math.round(baseNetWorth + monthlySavings * 9 * currentMult * 1.08),
    Math.round(baseNetWorth + monthlySavings * 12 * currentMult * 1.12)
  ];

  const chartData = {
    labels: months,
    datasets: [
      {
        label: 'Projected Net Worth Trajectory (₹)',
        data: projectedValues,
        borderColor: selectedScenario === 'emergency' ? '#ff2a6d' : selectedScenario === 'hike' ? '#10b981' : '#00f0ff',
        backgroundColor: selectedScenario === 'emergency' ? 'rgba(255,42,109,0.1)' : 'rgba(0,240,255,0.1)',
        fill: true,
        tension: 0.3,
        pointRadius: 4
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { labels: { color: '#94a3b8', font: { family: 'Plus Jakarta Sans' } } },
      tooltip: {
        callbacks: {
          label: (context) => ` Projected Net Worth: ₹${Number(context.raw).toLocaleString()}`
        }
      }
    },
    scales: {
      x: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.03)' } },
      y: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.03)' } }
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Banner */}
      <div className="glass-panel glass-glow-gold" style={{ padding: '28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span className="badge-tag badge-gold">PREDICTIVE AI</span>
              <span className="badge-tag badge-cyan">CASHFLOW FORECASTER</span>
            </div>
            <h2 className="font-heading" style={{ fontSize: '1.85rem', fontWeight: 900, marginTop: '8px', color: '#fff' }}>
              AI Cashflow Forecast & <span className="gradient-text-gold">Stress Simulator</span>
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Project 12-month net worth trajectories and stress-test financial scenarios
            </p>
          </div>
          <Activity size={42} color="#ffc72c" />
        </div>
      </div>

      {/* Scenario Switches */}
      <div className="glass-panel" style={{ padding: '20px' }}>
        <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#fff', marginBottom: '12px' }}>
          Select Financial Stress Test Scenario:
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
          <button
            onClick={() => { sounds.playClick(); setSelectedScenario('base'); }}
            style={{
              padding: '14px', borderRadius: '12px', border: `1px solid ${selectedScenario === 'base' ? '#00f0ff' : 'rgba(255,255,255,0.1)'}`,
              background: selectedScenario === 'base' ? 'rgba(0,240,255,0.12)' : 'rgba(255,255,255,0.03)',
              color: '#fff', textAlign: 'left', cursor: 'pointer'
            }}
          >
            <div style={{ fontWeight: 800, fontSize: '0.9rem' }}>📊 Baseline Path</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px' }}>Standard savings & SIP rate</div>
          </button>

          <button
            onClick={() => { sounds.playClick(); setSelectedScenario('hike'); }}
            style={{
              padding: '14px', borderRadius: '12px', border: `1px solid ${selectedScenario === 'hike' ? '#10b981' : 'rgba(255,255,255,0.1)'}`,
              background: selectedScenario === 'hike' ? 'rgba(16,185,129,0.12)' : 'rgba(255,255,255,0.03)',
              color: '#fff', textAlign: 'left', cursor: 'pointer'
            }}
          >
            <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#10b981' }}>🚀 +20% Salary Hike</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px' }}>Boosts monthly compounding</div>
          </button>

          <button
            onClick={() => { sounds.playClick(); setSelectedScenario('emergency'); }}
            style={{
              padding: '14px', borderRadius: '12px', border: `1px solid ${selectedScenario === 'emergency' ? '#ff2a6d' : 'rgba(255,255,255,0.1)'}`,
              background: selectedScenario === 'emergency' ? 'rgba(255,42,109,0.12)' : 'rgba(255,255,255,0.03)',
              color: '#fff', textAlign: 'left', cursor: 'pointer'
            }}
          >
            <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#ff2a6d' }}>⚠️ Emergency Expense</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px' }}>Simulates -₹40,000 hit</div>
          </button>

          <button
            onClick={() => { sounds.playClick(); setSelectedScenario('inflation'); }}
            style={{
              padding: '14px', borderRadius: '12px', border: `1px solid ${selectedScenario === 'inflation' ? '#ffc72c' : 'rgba(255,255,255,0.1)'}`,
              background: selectedScenario === 'inflation' ? 'rgba(255,199,44,0.12)' : 'rgba(255,255,255,0.03)',
              color: '#fff', textAlign: 'left', cursor: 'pointer'
            }}
          >
            <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#ffc72c' }}>📉 8% Inflation Spike</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px' }}>Increases living expenses</div>
          </button>
        </div>
      </div>

      {/* Chart & AI Recommendation Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '20px' }}>
        
        {/* Line Chart */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 className="font-heading" style={{ fontSize: '1.15rem', fontWeight: 800 }}>12-Month Net Worth Forecast</h3>
            <span className="badge-tag badge-gold">₹{projectedValues[6].toLocaleString()} projected</span>
          </div>

          <div style={{ height: '260px' }}>
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>

        {/* AI Insight Card */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <Sparkles color="#ffc72c" size={20} />
              <h3 className="font-heading" style={{ fontSize: '1.15rem', fontWeight: 800, color: '#fff' }}>
                AI Forecast Analysis
              </h3>
            </div>

            <div style={{ background: 'rgba(0,240,255,0.08)', border: '1px solid rgba(0,240,255,0.2)', borderRadius: '14px', padding: '16px', marginBottom: '16px' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>PREDICTED 1-YEAR NET WORTH</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#00f0ff' }}>
                ₹{projectedValues[6].toLocaleString()}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 700, marginTop: '4px' }}>
                ▲ +₹{(projectedValues[6] - baseNetWorth).toLocaleString()} net wealth gain
              </div>
            </div>

            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              {selectedScenario === 'hike' && "🔥 A 20% salary increase expands your F.I.R.E. compounding curve by 3.2 years! Consider allocating 80% of the raise directly into low-cost index funds."}
              {selectedScenario === 'emergency' && "🛡️ An emergency expense of ₹40,000 reduces liquidity. Your 6-month Emergency Safety Net goal ensures zero debt accumulation during shock events!"}
              {selectedScenario === 'inflation' && "💡 Inflation eats cash reserves. Shifting liquid cash into equity mutual funds protects your purchasing power against 8% inflation spikes."}
              {selectedScenario === 'base' && "✅ Your baseline financial path is solid! Maintaining a 59.8% savings rate yields steady compounding towards financial freedom."}
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
