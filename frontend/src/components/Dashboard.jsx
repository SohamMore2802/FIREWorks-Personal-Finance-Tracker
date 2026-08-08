import React, { useState } from 'react';
import { 
  Chart as ChartJS, 
  ArcElement, 
  Tooltip, 
  Legend, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  BarElement,
  Title
} from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';
import { 
  Wallet, 
  TrendingUp, 
  TrendingDown, 
  PiggyBank, 
  Target, 
  Search, 
  Trash2, 
  CreditCard, 
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  Zap,
  CheckCircle2,
  PieChart,
  ShieldCheck,
  Download
} from 'lucide-react';
import { sounds } from '../utils/soundEffects';

ChartJS.register(
  ArcElement, 
  Tooltip, 
  Legend, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  BarElement,
  Title
);

export default function Dashboard({ 
  stats, 
  recentTransactions, 
  goals, 
  onDeleteTransaction, 
  onOpenQuickAdd, 
  onDepositGoal 
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [depositModalGoal, setDepositModalGoal] = useState(null);
  const [depositAmount, setDepositAmount] = useState('1000');
  const [upiSuccessMsg, setUpiSuccessMsg] = useState('');

  // 50/30/20 Budget Splitter Calculations
  const income = stats?.monthlyIncome || 85000;
  const needsBudget = Math.round(income * 0.50);
  const wantsBudget = Math.round(income * 0.30);
  const savingsBudget = Math.round(income * 0.20);

  const needsSpent = (stats?.categoryBreakdown?.Housing || 18000) + (stats?.categoryBreakdown?.Health || 2500);
  const wantsSpent = (stats?.categoryBreakdown?.Dining || 1450) + (stats?.categoryBreakdown?.["Tech & Subscriptions"] || 3200);
  const savingsSpent = (stats?.categoryBreakdown?.Investments || 9050);

  // Doughnut Chart Data
  const categoryLabels = stats?.categoryBreakdown ? Object.keys(stats.categoryBreakdown) : ['Housing', 'Dining', 'Tech & Subscriptions', 'Investments', 'Health'];
  const categoryValues = stats?.categoryBreakdown ? Object.values(stats.categoryBreakdown) : [18000, 1450, 3200, 9050, 2500];

  const doughnutData = {
    labels: categoryLabels,
    datasets: [
      {
        data: categoryValues,
        backgroundColor: [
          '#ffc72c',
          '#ff2a6d',
          '#00f0ff',
          '#10b981',
          '#7000ff',
          '#f59e0b'
        ],
        borderColor: '#05060a',
        borderWidth: 3,
        hoverOffset: 6
      }
    ]
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 350 },
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#94a3b8',
          font: { family: 'Plus Jakarta Sans', size: 11, weight: '600' },
          padding: 12
        }
      },
      tooltip: {
        backgroundColor: 'rgba(12,15,26,0.95)',
        borderColor: 'rgba(255,255,255,0.15)',
        borderWidth: 1,
        titleColor: '#fff',
        bodyColor: '#ffc72c',
        padding: 10,
        callbacks: {
          label: (ctx) => ` ${ctx.label}: ₹${ctx.raw.toLocaleString()}`
        }
      }
    }
  };

  const cashflowData = {
    labels: ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
    datasets: [
      {
        label: 'Income (₹)',
        data: [75000, 80000, 82000, 85000, 85000, stats?.monthlyIncome || 85000],
        backgroundColor: 'rgba(16, 185, 129, 0.85)',
        borderRadius: 6
      },
      {
        label: 'Expenses (₹)',
        data: [42000, 39000, 36000, 38500, 35000, stats?.monthlyExpenses || 34200],
        backgroundColor: 'rgba(255, 42, 109, 0.85)',
        borderRadius: 6
      }
    ]
  };

  const cashflowOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 350 },
    plugins: {
      legend: {
        position: 'top',
        labels: { color: '#94a3b8', font: { family: 'Plus Jakarta Sans', weight: '600' } }
      }
    },
    scales: {
      x: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.03)' } },
      y: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.03)' } }
    }
  };

  const categoriesList = ['All', 'Housing', 'Dining', 'Tech & Subscriptions', 'Investments', 'Health', 'Salary'];
  const filteredTransactions = recentTransactions.filter(t => {
    const matchesCat = selectedCategory === 'All' || t.category === selectedCategory;
    const matchesSearch = t.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (t.merchant && t.merchant.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const handleExportReport = () => {
    sounds.playSuccess();
    const reportData = {
      generatedAt: new Date().toISOString(),
      platform: "F.I.R.E. WORKS Platform",
      stats: stats,
      goals: goals,
      transactions: recentTransactions
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(reportData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `FIRE_Works_Financial_Report_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleDepositSubmit = (e) => {
    e.preventDefault();
    if (depositModalGoal && depositAmount) {
      sounds.playSuccess();
      onDepositGoal(depositModalGoal.id, depositAmount);
      setUpiSuccessMsg(`✅ UPI Payment of ₹${depositAmount} successful! Goal updated.`);
      setTimeout(() => {
        setUpiSuccessMsg('');
        setDepositModalGoal(null);
        setDepositAmount('1000');
      }, 1200);
    }
  };

  const handleDelete = (id) => {
    sounds.playClick();
    onDeleteTransaction(id);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Live System Status Ticker */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justify: 'space-between',
        background: 'rgba(16, 185, 129, 0.06)',
        border: '1px solid rgba(16, 185, 129, 0.2)',
        borderRadius: '12px',
        padding: '8px 16px',
        fontSize: '0.78rem',
        color: '#10b981',
        fontWeight: 600
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="live-pulse" />
          <span>REAL-TIME TELEMETRY: High-Speed Node REST Sync Active (0ms Latency Engine)</span>
        </div>
        <span style={{ color: 'var(--text-muted)', fontSize: '0.72rem' }}>August 2026 Live Session</span>
      </div>

      {/* 1. Top Summary Metrics Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        
        {/* Net Worth */}
        <div className="glass-panel glass-glow-gold" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700 }}>NET WORTH</span>
            <Wallet color="#ffc72c" size={18} />
          </div>
          <div className="font-heading" style={{ fontSize: '1.8rem', fontWeight: 900, color: '#fff' }}>
            ₹{(stats?.netWorth || 193300).toLocaleString()}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '6px', fontSize: '0.75rem', color: '#10b981', fontWeight: 700 }}>
            <ArrowUpRight size={14} />
            <span>+14.2% compounding growth</span>
          </div>
        </div>

        {/* Monthly Income */}
        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700 }}>MONTHLY INCOME</span>
            <TrendingUp color="#10b981" size={18} />
          </div>
          <div className="font-heading" style={{ fontSize: '1.8rem', fontWeight: 900, color: '#10b981' }}>
            ₹{(stats?.monthlyIncome || 85000).toLocaleString()}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '6px' }}>
            Salary & Freelance Cashflow
          </div>
        </div>

        {/* Monthly Expenses */}
        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700 }}>MONTHLY EXPENSES</span>
            <TrendingDown color="#ff2a6d" size={18} />
          </div>
          <div className="font-heading" style={{ fontSize: '1.8rem', fontWeight: 900, color: '#ff2a6d' }}>
            ₹{(stats?.monthlyExpenses || 34200).toLocaleString()}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '6px', fontSize: '0.75rem', color: '#10b981', fontWeight: 700 }}>
            <ArrowDownRight size={14} />
            <span>-8.5% optimized budget</span>
          </div>
        </div>

        {/* Savings Rate */}
        <div className="glass-panel glass-glow-cyan" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700 }}>SAVINGS RATE</span>
            <PiggyBank color="#00f0ff" size={18} />
          </div>
          <div className="font-heading" style={{ fontSize: '1.8rem', fontWeight: 900, color: '#00f0ff' }}>
            {stats?.savingsRate || 59.8}%
          </div>
          <div style={{ fontSize: '0.75rem', color: '#00f0ff', marginTop: '6px', fontWeight: 700 }}>
            🚀 Gen-Z Benchmark: Top 5%
          </div>
        </div>

      </div>

      {/* 2. 50/30/20 ENVELOPE BUDGET SPLITTER */}
      <div className="glass-panel glass-glow-gold" style={{ padding: '22px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h3 className="font-heading" style={{ fontSize: '1.15rem', fontWeight: 800, color: '#fff' }}>
                50/30/20 Smart Budget Splitter
              </h3>
              <span className="badge-tag badge-gold">SMART ENVELOPES</span>
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Envelope budget targets based on ₹{income.toLocaleString()} monthly income</p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
          
          {/* Needs 50% */}
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 800, marginBottom: '6px' }}>
              <span style={{ color: '#ffc72c' }}>50% Needs (Rent/Food)</span>
              <span style={{ color: '#fff' }}>₹{needsSpent.toLocaleString()} / ₹{needsBudget.toLocaleString()}</span>
            </div>
            <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.08)', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: `${Math.min(100, Math.round((needsSpent/needsBudget)*100))}%`, height: '100%', background: '#ffc72c', borderRadius: '4px' }} />
            </div>
            <div style={{ fontSize: '0.72rem', color: '#10b981', marginTop: '6px', fontWeight: 700 }}>
              Under Budget (₹{(needsBudget - needsSpent).toLocaleString()} Remaining)
            </div>
          </div>

          {/* Wants 30% */}
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 800, marginBottom: '6px' }}>
              <span style={{ color: '#00f0ff' }}>30% Wants (Dining/Fun)</span>
              <span style={{ color: '#fff' }}>₹{wantsSpent.toLocaleString()} / ₹{wantsBudget.toLocaleString()}</span>
            </div>
            <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.08)', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: `${Math.min(100, Math.round((wantsSpent/wantsBudget)*100))}%`, height: '100%', background: '#00f0ff', borderRadius: '4px' }} />
            </div>
            <div style={{ fontSize: '0.72rem', color: '#10b981', marginTop: '6px', fontWeight: 700 }}>
              Healthy Spending (₹{(wantsBudget - wantsSpent).toLocaleString()} Remaining)
            </div>
          </div>

          {/* Savings 20% */}
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 800, marginBottom: '6px' }}>
              <span style={{ color: '#10b981' }}>20%+ Savings & SIPs</span>
              <span style={{ color: '#fff' }}>₹{savingsSpent.toLocaleString()} / ₹{savingsBudget.toLocaleString()}</span>
            </div>
            <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.08)', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: `${Math.min(100, Math.round((savingsSpent/savingsBudget)*100))}%`, height: '100%', background: '#10b981', borderRadius: '4px' }} />
            </div>
            <div style={{ fontSize: '0.72rem', color: '#10b981', marginTop: '6px', fontWeight: 700 }}>
              Target Exceeded! 🔥 (+₹{(savingsSpent - savingsBudget).toLocaleString()} Extra Invested)
            </div>
          </div>

        </div>
      </div>

      {/* 3. Analytics Charts Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '20px' }}>
        
        {/* Doughnut Chart */}
        <div className="glass-panel" style={{ padding: '22px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h3 className="font-heading" style={{ fontSize: '1.1rem', fontWeight: 800 }}>Category Spending</h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Breakdown for August 2026</p>
            </div>
            <span className="badge-tag badge-gold">Chart.js Engine</span>
          </div>
          <div style={{ height: '250px', position: 'relative' }}>
            <Doughnut data={doughnutData} options={doughnutOptions} />
          </div>
        </div>

        {/* Bar Chart */}
        <div className="glass-panel" style={{ padding: '22px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h3 className="font-heading" style={{ fontSize: '1.1rem', fontWeight: 800 }}>Monthly Cashflow Stream</h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Income vs Expenses comparison</p>
            </div>
            <span className="badge-tag badge-cyan">6-Month Velocity</span>
          </div>
          <div style={{ height: '250px' }}>
            <Bar data={cashflowData} options={cashflowOptions} />
          </div>
        </div>

      </div>

      {/* 4. Savings Goals & Instant UPI Gateway */}
      <div className="glass-panel" style={{ padding: '22px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h3 className="font-heading" style={{ fontSize: '1.2rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Target color="#ffc72c" size={20} />
              Savings & Investment Goals
            </h3>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Automated micro-saving targets for Gen-Z wealth compounding</p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          {goals?.map(goal => {
            const pct = Math.min(100, Math.round((goal.current / goal.target) * 100));
            return (
              <div key={goal.id} style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '16px',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                justify: 'space-between',
                gap: '12px'
              }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 800 }}>{goal.title}</h4>
                    <span className="badge-tag badge-cyan" style={{ fontSize: '0.65rem' }}>{goal.category}</span>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Target: {goal.deadline}</div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '6px' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Progress ({pct}%)</span>
                    <span style={{ fontWeight: 800, color: '#ffc72c' }}>
                      ₹{goal.current.toLocaleString()} / ₹{goal.target.toLocaleString()}
                    </span>
                  </div>
                  <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.08)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{
                      width: `${pct}%`,
                      height: '100%',
                      background: 'linear-gradient(90deg, #ffc72c 0%, #00f0ff 100%)',
                      borderRadius: '4px',
                      transition: 'width 0.4s ease'
                    }} />
                  </div>
                </div>

                <button 
                  className="btn-outline" 
                  onClick={() => { sounds.playClick(); setDepositModalGoal(goal); }}
                  style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '8px', fontSize: '0.8rem' }}
                >
                  <CreditCard size={14} color="#00f0ff" />
                  <span>UPI Quick Deposit</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. Transactions Ledger */}
      <div className="glass-panel" style={{ padding: '22px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '14px' }}>
          <div>
            <h3 className="font-heading" style={{ fontSize: '1.2rem', fontWeight: 800 }}>Income & Expense Ledger</h3>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Real-time transaction history with AI categorization</p>
          </div>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
            <button 
              className="btn-outline"
              onClick={handleExportReport}
              style={{ fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 12px' }}
            >
              <Download size={14} color="#00f0ff" />
              <span>Export Report</span>
            </button>

            <div style={{ position: 'relative', minWidth: '180px' }}>
              <Search size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                type="text" 
                placeholder="Search ledger..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  background: 'rgba(0,0,0,0.3)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: '10px',
                  padding: '8px 12px 8px 34px',
                  color: '#fff',
                  fontSize: '0.82rem',
                  outline: 'none'
                }}
              />
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{
                background: 'rgba(0,0,0,0.3)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '10px',
                padding: '8px 12px',
                color: '#fff',
                fontSize: '0.82rem',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              {categoriesList.map(c => <option key={c} value={c} style={{ background: '#05060a' }}>{c}</option>)}
            </select>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '10px 14px' }}>Title & Merchant</th>
                <th style={{ padding: '10px 14px' }}>Category</th>
                <th style={{ padding: '10px 14px' }}>Date</th>
                <th style={{ padding: '10px 14px', textAlign: 'right' }}>Amount</th>
                <th style={{ padding: '10px 14px', textAlign: 'center' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)' }}>
                    No matching transactions found.
                  </td>
                </tr>
              ) : (
                filteredTransactions.map(tx => {
                  const isIncome = tx.type === 'income';
                  return (
                    <tr key={tx.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                      <td style={{ padding: '10px 14px' }}>
                        <div style={{ fontWeight: 700, color: '#fff' }}>{tx.title}</div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{tx.merchant || 'Direct'}</div>
                      </td>
                      <td style={{ padding: '10px 14px' }}>
                        <span className="badge-tag badge-purple" style={{ fontSize: '0.68rem' }}>
                          {tx.category}
                        </span>
                      </td>
                      <td style={{ padding: '10px 14px', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                        {tx.date}
                      </td>
                      <td style={{ padding: '10px 14px', textAlign: 'right', fontWeight: 800, color: isIncome ? '#10b981' : '#ff2a6d' }}>
                        {isIncome ? '+' : '-'}₹{tx.amount.toLocaleString()}
                      </td>
                      <td style={{ padding: '10px 14px', textAlign: 'center' }}>
                        <button 
                          onClick={() => handleDelete(tx.id)}
                          style={{
                            background: 'transparent',
                            border: 'none',
                            color: '#ff2a6d',
                            cursor: 'pointer',
                            padding: '4px',
                            opacity: 0.75
                          }}
                          title="Delete transaction"
                        >
                          <Trash2 size={15} />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* UPI Deposit Modal */}
      {depositModalGoal && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.85)',
          backdropFilter: 'blur(6px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 100, padding: '16px'
        }}>
          <div className="glass-panel glass-glow-cyan" style={{ maxWidth: '420px', width: '100%', padding: '24px' }}>
            <h3 className="font-heading" style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '6px' }}>
              UPI Instant Savings Gateway
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '14px' }}>
              Add funds directly to <strong style={{ color: '#ffc72c' }}>{depositModalGoal.title}</strong>
            </p>

            {upiSuccessMsg ? (
              <div style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid #10b981', color: '#10b981', padding: '14px', borderRadius: '12px', textAlign: 'center', fontWeight: 800 }}>
                {upiSuccessMsg}
              </div>
            ) : (
              <form onSubmit={handleDepositSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px', display: 'block' }}>Deposit Amount (₹)</label>
                  <input 
                    type="number"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    style={{
                      width: '100%',
                      background: 'rgba(0,0,0,0.4)',
                      border: '1px solid rgba(0, 240, 255, 0.4)',
                      borderRadius: '10px',
                      padding: '10px 14px',
                      color: '#fff',
                      fontSize: '1.1rem',
                      fontWeight: 800,
                      outline: 'none'
                    }}
                    required
                  />
                </div>

                <div style={{ background: 'rgba(0,240,255,0.08)', padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(0,240,255,0.2)', fontSize: '0.75rem', color: '#00f0ff' }}>
                  💳 Linked VPA: member@upi • Zero Gateway Fee
                </div>

                <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                  <button type="button" className="btn-outline" onClick={() => setDepositModalGoal(null)} style={{ flex: 1 }}>
                    Cancel
                  </button>
                  <button type="submit" className="btn-cyber" style={{ flex: 1 }}>
                    Authorize UPI Pay
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
