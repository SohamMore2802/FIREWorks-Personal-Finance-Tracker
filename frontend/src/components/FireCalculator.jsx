import React, { useState, useEffect } from 'react';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend, 
  Filler 
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { TrendingUp, Calculator, ShieldCheck, Flame, Zap, Award, ShieldAlert, Receipt } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

ChartJS.register(
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend, 
  Filler
);

export default function FireCalculator({ onCalculateFire }) {
  const [currentAge, setCurrentAge] = useState(22);
  const [targetAge, setTargetAge] = useState(35);
  const [currentSavings, setCurrentSavings] = useState(140000);
  const [monthlyContribution, setMonthlyContribution] = useState(45000);
  const [returnRate, setReturnRate] = useState(12);
  const [annualExpense, setAnnualExpense] = useState(400000);

  const [fireResult, setFireResult] = useState(null);

  useEffect(() => {
    runCalculation();
  }, [currentAge, targetAge, currentSavings, monthlyContribution, returnRate, annualExpense]);

  const runCalculation = async () => {
    try {
      const res = await onCalculateFire({
        currentAge,
        targetAge,
        currentSavings,
        monthlyContribution,
        returnRate,
        annualExpense
      });
      if (res) setFireResult(res);
    } catch (err) {
      console.error(err);
    }
  };

  // Tax Saver 80C/80D calculation
  const annualSIP = monthlyContribution * 12;
  const section80CDeduction = Math.min(150000, annualSIP);
  const estimatedTaxSaved = Math.round(section80CDeduction * 0.208); // 20% slab + 4% cess

  const lineChartData = {
    labels: fireResult?.timeline ? fireResult.timeline.map(t => `Age ${t.age}`) : [],
    datasets: [
      {
        label: 'Compounded Net Worth (₹)',
        data: fireResult?.timeline ? fireResult.timeline.map(t => t.balance) : [],
        borderColor: '#00f0ff',
        backgroundColor: 'rgba(0, 240, 255, 0.1)',
        fill: true,
        tension: 0.3,
        pointRadius: 3
      },
      {
        label: 'Target F.I.R.E. Number (₹)',
        data: fireResult?.timeline ? fireResult.timeline.map(t => t.target) : [],
        borderColor: '#ffc72c',
        borderDash: [5, 5],
        pointRadius: 0
      }
    ]
  };

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { labels: { color: '#94a3b8', font: { family: 'Plus Jakarta Sans' } } },
      tooltip: {
        callbacks: {
          label: (context) => ` ${context.dataset.label}: ₹${Number(context.raw).toLocaleString()}`
        }
      }
    },
    scales: {
      x: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.05)' } },
      y: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.05)' } }
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Banner */}
      <div className="glass-panel glass-glow-gold" style={{ padding: '28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span className="badge-tag badge-gold">F.I.R.E. ENGINE</span>
              <span className="badge-tag badge-cyan">TAX SAVER CALCULATOR</span>
            </div>
            <h2 className="font-heading" style={{ fontSize: '1.85rem', fontWeight: 900, marginTop: '8px', color: '#fff' }}>
              F.I.R.E. Lab & <span className="gradient-text-fire">Tax Deductions Estimator</span>
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Project compounding wealth timelines & calculate Section 80C tax savings
            </p>
          </div>
          <Flame size={40} color="#ff2a6d" />
        </div>
      </div>

      {/* Competitor Feature: Section 80C Tax Saver Card */}
      <div className="glass-panel glass-glow-cyan" style={{ padding: '22px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Receipt color="#00f0ff" size={20} />
              <h3 className="font-heading" style={{ fontSize: '1.15rem', fontWeight: 800, color: '#fff' }}>
                Section 80C Tax Savings Estimator
              </h3>
              <span className="badge-tag badge-cyan">TURBOTAX COMPETITOR FEATURE</span>
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Based on ₹{annualSIP.toLocaleString()} annual index SIP investment</p>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>ESTIMATED ANNUAL TAX SAVED</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#10b981' }}>
              ₹{estimatedTaxSaved.toLocaleString()}
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px', fontSize: '0.8rem' }}>
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '10px' }}>
            <span style={{ color: 'var(--text-muted)' }}>Section 80C Limit Used:</span> <strong style={{ color: '#ffc72c' }}>₹{section80CDeduction.toLocaleString()} / ₹1,50,000</strong>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '10px' }}>
            <span style={{ color: 'var(--text-muted)' }}>Eligible Tax Slab:</span> <strong style={{ color: '#00f0ff' }}>20% Slab + 4% Health Cess</strong>
          </div>
        </div>
      </div>

      {/* Sliders + Graph Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '20px' }}>
        
        {/* Controls Card */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <h3 className="font-heading" style={{ fontSize: '1.1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Calculator color="#00f0ff" size={18} />
            Projection Parameters
          </h3>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '4px' }}>
              <span style={{ color: 'var(--text-muted)' }}>Current Age</span>
              <span style={{ fontWeight: 700, color: '#00f0ff' }}>{currentAge} yrs</span>
            </div>
            <input 
              type="range" min="18" max="50" value={currentAge} 
              onChange={(e) => { sounds.playClick(); setCurrentAge(Number(e.target.value)); }}
              style={{ width: '100%', accentColor: '#00f0ff' }}
            />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '4px' }}>
              <span style={{ color: 'var(--text-muted)' }}>Monthly SIP Contribution (₹)</span>
              <span style={{ fontWeight: 700, color: '#ffc72c' }}>₹{monthlyContribution.toLocaleString()}</span>
            </div>
            <input 
              type="range" min="5000" max="200000" step="5000" value={monthlyContribution} 
              onChange={(e) => { sounds.playClick(); setMonthlyContribution(Number(e.target.value)); }}
              style={{ width: '100%', accentColor: '#ffc72c' }}
            />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '4px' }}>
              <span style={{ color: 'var(--text-muted)' }}>Expected Annual Return (%)</span>
              <span style={{ fontWeight: 700, color: '#10b981' }}>{returnRate}%</span>
            </div>
            <input 
              type="range" min="6" max="18" value={returnRate} 
              onChange={(e) => { sounds.playClick(); setReturnRate(Number(e.target.value)); }}
              style={{ width: '100%', accentColor: '#10b981' }}
            />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '4px' }}>
              <span style={{ color: 'var(--text-muted)' }}>Target Annual Expenses (₹)</span>
              <span style={{ fontWeight: 700, color: '#ff2a6d' }}>₹{annualExpense.toLocaleString()}</span>
            </div>
            <input 
              type="range" min="100000" max="1500000" step="50000" value={annualExpense} 
              onChange={(e) => { sounds.playClick(); setAnnualExpense(Number(e.target.value)); }}
              style={{ width: '100%', accentColor: '#ff2a6d' }}
            />
          </div>
        </div>

        {/* Output Metrics & Compounding Chart */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
            <div style={{ background: 'rgba(255,199,44,0.1)', border: '1px solid rgba(255,199,44,0.3)', borderRadius: '12px', padding: '14px', textAlign: 'center' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>TARGET F.I.R.E. CORPUS</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffc72c' }}>
                ₹{((fireResult?.targetFireNumber || 10000000)).toLocaleString()}
              </div>
            </div>

            <div style={{ background: 'rgba(0,240,255,0.1)', border: '1px solid rgba(0,240,255,0.3)', borderRadius: '12px', padding: '14px', textAlign: 'center' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>RETIREMENT AGE REACHED</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#00f0ff' }}>
                Age {fireResult?.fireAge || 35} 🚀
              </div>
            </div>
          </div>

          <div style={{ height: '240px' }}>
            <Line data={lineChartData} options={lineChartOptions} />
          </div>
        </div>

      </div>

    </div>
  );
}
