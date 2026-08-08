import React, { useState, useEffect, useCallback } from 'react';
import LiveTickerBanner from './components/LiveTickerBanner';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import CreditDungeon from './components/CreditDungeon';
import KashChat from './components/KashChat';
import AIHub from './components/AIHub';
import SubscriptionsHub from './components/SubscriptionsHub';
import ForecastPage from './components/ForecastPage';
import DebtPlannerPage from './components/DebtPlannerPage';
import SquadChallenges from './components/SquadChallenges';
import InvestmentsHub from './components/InvestmentsHub';
import AcademyPage from './components/AcademyPage';
import FireCalculator from './components/FireCalculator';
import BadgeStoryModal from './components/BadgeStoryModal';
import QuickAddModal from './components/QuickAddModal';
import AuthPage from './components/AuthPage';
import Footer from './components/Footer';

const API_BASE = 'http://localhost:5000/api';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [user, setUser] = useState(null);

  const [dashboardData, setDashboardData] = useState({
    user: null,
    stats: { netWorth: 193300, creditScore: 750, monthlyIncome: 85000, monthlyExpenses: 34200, savingsRate: 59.8, fireScore: 82, categoryBreakdown: { Housing: 18000, Dining: 1450, "Tech & Subscriptions": 3200, Investments: 9050, Health: 2500 } },
    recentTransactions: [
      { id: 6, title: "SIP Index Fund Investment", amount: 9050, type: "expense", category: "Investments", date: "2026-08-06", merchant: "Groww Mutual Funds" },
      { id: 5, title: "Gym Membership", amount: 2500, type: "expense", category: "Health", date: "2026-08-05", merchant: "FitFlex Club" },
      { id: 4, title: "Cloud Hosting & API Dev", amount: 3200, type: "expense", category: "Tech & Subscriptions", date: "2026-08-04", merchant: "Vercel / AWS" },
      { id: 3, title: "Gourmet Coffee & Brunch", amount: 1450, type: "expense", category: "Dining", date: "2026-08-03", merchant: "Artisan Roasters" },
      { id: 2, title: "Apartment Rent & Utilities", amount: 18000, type: "expense", category: "Housing", date: "2026-08-02", merchant: "Skyline Apts" },
      { id: 1, title: "Tech Corp Salary", amount: 85000, type: "income", category: "Salary", date: "2026-08-01", merchant: "Acme Corp" }
    ],
    goals: [
      { id: 1, title: "Emergency Safety Net (6 Mo)", target: 150000, current: 110000, category: "Security", deadline: "2026-12-31" },
      { id: 2, title: "MacBook Pro M3 Max", target: 220000, current: 165000, category: "Tech", deadline: "2026-10-15" },
      { id: 3, title: "Japan Cyberpunk Tour ✈️", target: 180000, current: 85000, category: "Travel", deadline: "2027-04-01" }
    ]
  });

  const [dungeonData, setDungeonData] = useState({
    playerHp: 100, maxPlayerHp: 100, bossHp: 850, maxBossHp: 1000,
    bossName: "The Debt Kraken 🐙", currentDebt: 45000, creditScore: 750, level: 3, xp: 420, streak: 5,
    scenarios: [
      {
        id: "s1",
        question: "Should you take a Payday Loan of ₹50,000 at 36% APR to buy the new iPhone 16 Pro?",
        options: [
          { text: "Take the Payday Loan 📱", impactScore: -80, debtDelta: 50000, message: "Ouch! Payday loan interest crushed your credit score by 80 points!" },
          { text: "Save monthly in a 12% SIP fund 📈", impactScore: +35, debtDelta: 0, message: "Smart Gen-Z move! Credit score increased by 35 points!" },
          { text: "Buy a refurbished model with cash 💸", impactScore: +15, debtDelta: 0, message: "Prudent choice! No debt added." }
        ]
      },
      {
        id: "s2",
        question: "You received a ₹25,000 bonus. How do you allocate it?",
        options: [
          { text: "Pay off high-interest debt immediately ⚔️", impactScore: +50, debtDelta: -25000, message: "Critical Strike! Boss took 25,000 damage and debt reduced!" },
          { text: "Blow it on a weekend VIP club trip 🍾", impactScore: -40, debtDelta: 10000, message: "Kash roasts you: 'VIBES ARE HIGH, BALANCE IS LOW 💀'." },
          { text: "Split 50% Debt / 50% Investments 🎯", impactScore: +30, debtDelta: -12500, message: "Balanced financial mastery!" }
        ]
      }
    ]
  });

  const [fraudAlerts, setFraudAlerts] = useState([
    { id: "f1", title: "Unusual Micro-Transaction", location: "Las Vegas, NV (VPN Detected)", amount: 1499, merchant: "CryptoSpin Casino", status: "flagged", time: "10 mins ago" },
    { id: "f2", title: "Duplicate Subscription Charge", location: "Online Payment", amount: 799, merchant: "Streaming Plus LLC", status: "flagged", time: "1 hour ago" }
  ]);

  const [isQuickAddOpen, setIsQuickAddOpen] = useState(false);
  const [isBadgeStoryOpen, setIsBadgeStoryOpen] = useState(false);

  const fetchAllData = useCallback(async () => {
    try {
      const [dashRes, dungRes, fraudRes] = await Promise.all([
        fetch(`${API_BASE}/dashboard`),
        fetch(`${API_BASE}/dungeon`),
        fetch(`${API_BASE}/fraud/alerts`)
      ]);
      if (dashRes.ok) {
        const d = await dashRes.json();
        setDashboardData(prev => ({ ...d }));
        if (d.user) setUser(d.user);
      }
      if (dungRes.ok) setDungeonData(await dungRes.json());
      if (fraudRes.ok) setFraudAlerts(await fraudRes.json());
    } catch (e) {}
  }, []);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  const handleAuthSuccess = (authData) => {
    if (authData.user) {
      setUser(authData.user);
      setDashboardData(prev => ({
        ...prev,
        user: authData.user,
        stats: authData.stats || prev.stats
      }));
    }
  };

  const handleLogout = () => {
    fetch(`${API_BASE}/auth/logout`, { method: 'POST' }).catch(() => {});
    setUser(null);
  };

  const handleAddTransaction = (txData) => {
    const newTx = {
      id: Date.now(),
      title: txData.title,
      amount: Number(txData.amount),
      type: txData.type || 'expense',
      category: txData.category === 'Auto-Detect' ? 'Dining' : txData.category,
      date: new Date().toISOString().split('T')[0],
      merchant: txData.merchant || 'Direct Pay'
    };

    setDashboardData(prev => {
      const updatedTxs = [newTx, ...prev.recentTransactions];
      const isInc = newTx.type === 'income';
      const newIncome = isInc ? prev.stats.monthlyIncome + newTx.amount : prev.stats.monthlyIncome;
      const newExp = !isInc ? prev.stats.monthlyExpenses + newTx.amount : prev.stats.monthlyExpenses;
      const newNet = prev.stats.netWorth + (isInc ? newTx.amount : -newTx.amount);
      const savRate = newIncome > 0 ? Number((((newIncome - newExp) / newIncome) * 100).toFixed(1)) : 0;

      const catBreakdown = { ...prev.stats.categoryBreakdown };
      if (!isInc) {
        catBreakdown[newTx.category] = (catBreakdown[newTx.category] || 0) + newTx.amount;
      }

      return {
        ...prev,
        recentTransactions: updatedTxs,
        stats: { ...prev.stats, monthlyIncome: newIncome, monthlyExpenses: newExp, netWorth: newNet, savingsRate: savRate, categoryBreakdown: catBreakdown }
      };
    });

    fetch(`${API_BASE}/transactions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(txData)
    }).catch(() => {});
  };

  const handleDeleteTransaction = (id) => {
    setDashboardData(prev => {
      const target = prev.recentTransactions.find(t => t.id === id);
      if (!target) return prev;

      const filtered = prev.recentTransactions.filter(t => t.id !== id);
      const isInc = target.type === 'income';
      const newIncome = isInc ? Math.max(0, prev.stats.monthlyIncome - target.amount) : prev.stats.monthlyIncome;
      const newExp = !isInc ? Math.max(0, prev.stats.monthlyExpenses - target.amount) : prev.stats.monthlyExpenses;
      const newNet = prev.stats.netWorth - (isInc ? target.amount : -target.amount);

      return {
        ...prev,
        recentTransactions: filtered,
        stats: { ...prev.stats, monthlyIncome: newIncome, monthlyExpenses: newExp, netWorth: newNet }
      };
    });

    fetch(`${API_BASE}/transactions/${id}`, { method: 'DELETE' }).catch(() => {});
  };

  const handleDepositGoal = (goalId, amount) => {
    const amt = Number(amount);
    setDashboardData(prev => {
      const updatedGoals = prev.goals.map(g => g.id === goalId ? { ...g, current: g.current + amt } : g);
      const goalObj = prev.goals.find(g => g.id === goalId);
      const newTx = {
        id: Date.now(),
        title: `UPI Deposit to ${goalObj ? goalObj.title : 'Goal'}`,
        amount: amt,
        type: "expense",
        category: "Investments",
        date: new Date().toISOString().split('T')[0],
        merchant: "UPI Auto-Pay"
      };

      return {
        ...prev,
        goals: updatedGoals,
        recentTransactions: [newTx, ...prev.recentTransactions]
      };
    });

    fetch(`${API_BASE}/goals/${goalId}/deposit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: amt })
    }).catch(() => {});
  };

  const handleDungeonAction = async (actionPayload) => {
    if (actionPayload.moveType === 'battle') {
      const damage = Math.floor(Math.random() * 80) + 120;
      setDungeonData(prev => {
        const newBossHp = Math.max(0, prev.bossHp - damage);
        const newDebt = Math.max(0, prev.currentDebt - damage * 50);
        return { ...prev, bossHp: newBossHp, currentDebt: newDebt, xp: prev.xp + 50 };
      });
    }

    try {
      const res = await fetch(`${API_BASE}/dungeon/action`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(actionPayload)
      });
      const data = await res.json();
      if (data.dungeon) setDungeonData(data.dungeon);
      return data;
    } catch (err) {
      return { message: "⚔️ Strike landed! Dealt heavy damage to Debt Monster." };
    }
  };

  const handleKashChat = async (message, mode) => {
    try {
      const res = await fetch(`${API_BASE}/kash/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, mode })
      });
      return await res.json();
    } catch (err) {
      return {
        response: `🐼 *Kash adjusts gold sunglasses*: I see your net worth growing! Keep investing in index funds!`,
        mood: "sassy"
      };
    }
  };

  const handleScanReceipt = async () => {
    const sampleReceipt = {
      title: "Starbucks Cyber Coffee",
      amount: 650,
      category: "Dining",
      merchant: "Starbucks BKC",
      items: ["Caramel Macchiato", "Avocado Toast"]
    };

    handleAddTransaction(sampleReceipt);

    return {
      success: true,
      parsed: sampleReceipt,
      confidence: "99.4%"
    };
  };

  const handleResolveFraud = (id, action) => {
    setFraudAlerts(prev => prev.map(f => f.id === id ? { ...f, status: action === 'block' ? 'blocked' : 'approved' } : f));
    fetch(`${API_BASE}/fraud/resolve`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, action })
    }).catch(() => {});
  };

  const handleCalculateFire = async (payload) => {
    try {
      const res = await fetch(`${API_BASE}/fire/calculate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      return await res.json();
    } catch (err) {
      const target = payload.annualExpense * 25;
      const timeline = [];
      let bal = payload.currentSavings;
      for (let a = payload.currentAge; a <= 60; a++) {
        timeline.push({ age: a, balance: Math.round(bal), target });
        bal = (bal + payload.monthlyContribution * 12) * (1 + payload.returnRate / 100);
      }
      return { targetFireNumber: target, fireAge: payload.targetAge, timeline };
    }
  };

  const unreadFraudCount = fraudAlerts.filter(f => f.status === 'flagged').length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      
      {/* Live Stream Telemetry Banner */}
      <LiveTickerBanner />

      {/* Navbar */}
      <Navbar 
        activeTab={activeTab}
        setActiveTab={(tab) => {
          if (tab === 'social') setIsBadgeStoryOpen(true);
          else setActiveTab(tab);
        }}
        stats={dashboardData.stats}
        fraudCount={unreadFraudCount}
        user={user}
        onLogout={handleLogout}
        onOpenQuickAdd={() => setIsQuickAddOpen(true)}
      />

      {/* Main Canvas */}
      <main style={{ flex: 1, maxWidth: '1400px', width: '100%', margin: '0 auto', padding: '0 16px' }}>
        
        {activeTab === 'home' && (
          <LandingPage onNavigate={(tab) => setActiveTab(tab)} />
        )}

        {activeTab === 'dashboard' && (
          <Dashboard 
            stats={dashboardData.stats}
            recentTransactions={dashboardData.recentTransactions}
            goals={dashboardData.goals}
            onDeleteTransaction={handleDeleteTransaction}
            onOpenQuickAdd={() => setIsQuickAddOpen(true)}
            onDepositGoal={handleDepositGoal}
          />
        )}

        {activeTab === 'auth' && (
          <AuthPage 
            onAuthSuccess={handleAuthSuccess}
            onNavigate={(tab) => setActiveTab(tab)}
          />
        )}

        {activeTab === 'dungeon' && (
          <CreditDungeon 
            dungeon={dungeonData}
            onPerformAction={handleDungeonAction}
          />
        )}

        {activeTab === 'kash' && (
          <KashChat 
            onSendMessage={handleKashChat}
          />
        )}

        {activeTab === 'aihub' && (
          <AIHub 
            fraudAlerts={fraudAlerts}
            onResolveFraud={handleResolveFraud}
            onScanReceipt={handleScanReceipt}
          />
        )}

        {activeTab === 'subscriptions' && (
          <SubscriptionsHub 
            onDeleteTransaction={handleDeleteTransaction}
          />
        )}

        {activeTab === 'forecast' && (
          <ForecastPage 
            stats={dashboardData.stats}
          />
        )}

        {activeTab === 'debt' && (
          <DebtPlannerPage />
        )}

        {activeTab === 'squad' && (
          <SquadChallenges />
        )}

        {activeTab === 'investments' && (
          <InvestmentsHub 
            onDepositGoal={handleDepositGoal}
          />
        )}

        {activeTab === 'academy' && (
          <AcademyPage />
        )}

        {activeTab === 'fire' && (
          <FireCalculator 
            onCalculateFire={handleCalculateFire}
          />
        )}

      </main>

      {/* Footer */}
      <Footer onNavigate={(tab) => setActiveTab(tab)} />

      {/* Modals */}
      {isQuickAddOpen && (
        <QuickAddModal 
          onClose={() => setIsQuickAddOpen(false)}
          onAddTransaction={handleAddTransaction}
        />
      )}

      {isBadgeStoryOpen && (
        <BadgeStoryModal 
          user={user}
          stats={dashboardData.stats}
          onClose={() => setIsBadgeStoryOpen(false)}
        />
      )}

    </div>
  );
}
