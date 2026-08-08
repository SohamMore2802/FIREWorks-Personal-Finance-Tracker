const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Initial state / Database
let users = [];
let currentUser = null;

let state = {
  user: null,
  transactions: [
    { id: 1, title: "Tech Corp Salary", amount: 85000, type: "income", category: "Salary", date: "2026-08-01", merchant: "Acme Corp" },
    { id: 2, title: "Apartment Rent & Utilities", amount: 18000, type: "expense", category: "Housing", date: "2026-08-02", merchant: "Skyline Apts" },
    { id: 3, title: "Gourmet Coffee & Brunch", amount: 1450, type: "expense", category: "Dining", date: "2026-08-03", merchant: "Artisan Roasters" },
    { id: 4, title: "Cloud Hosting & API Dev", amount: 3200, type: "expense", category: "Tech & Subscriptions", date: "2026-08-04", merchant: "Vercel / AWS" },
    { id: 5, title: "Gym Membership", amount: 2500, type: "expense", category: "Health", date: "2026-08-05", merchant: "FitFlex Club" },
    { id: 6, title: "SIP Index Fund Investment", amount: 9050, type: "expense", category: "Investments", date: "2026-08-06", merchant: "Groww Mutual Funds" }
  ],
  goals: [
    { id: 1, title: "Emergency Safety Net (6 Mo)", target: 150000, current: 110000, category: "Security", deadline: "2026-12-31" },
    { id: 2, title: "MacBook Pro M3 Max", target: 220000, current: 165000, category: "Tech", deadline: "2026-10-15" },
    { id: 3, title: "Japan Cyberpunk Tour ✈️", target: 180000, current: 85000, category: "Travel", deadline: "2027-04-01" }
  ],
  dungeon: {
    playerHp: 100,
    maxPlayerHp: 100,
    bossHp: 850,
    maxBossHp: 1000,
    bossName: "The Debt Kraken 🐙",
    currentDebt: 45000,
    creditScore: 750,
    level: 3,
    xp: 420,
    streak: 5,
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
  },
  fraudAlerts: [
    { id: "f1", title: "Unusual Micro-Transaction", location: "Las Vegas, NV (VPN Detected)", amount: 1499, merchant: "CryptoSpin Casino", status: "flagged", time: "10 mins ago" },
    { id: "f2", title: "Duplicate Subscription Charge", location: "Online Payment", amount: 799, merchant: "Streaming Plus LLC", status: "flagged", time: "1 hour ago" }
  ]
};

function getAggregatedStats() {
  const totalIncome = state.transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
  const totalExpenses = state.transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
  const savings = totalIncome - totalExpenses;
  const savingsRate = totalIncome > 0 ? ((savings / totalIncome) * 100).toFixed(1) : 0;

  const categories = {};
  state.transactions.filter(t => t.type === 'expense').forEach(t => {
    categories[t.category] = (categories[t.category] || 0) + t.amount;
  });

  return {
    netWorth: (currentUser?.netWorth || 142500) + savings,
    creditScore: currentUser?.creditScore || 750,
    monthlyIncome: totalIncome,
    monthlyExpenses: totalExpenses,
    savingsRate: Number(savingsRate),
    fireScore: currentUser?.fireScore || 82,
    categoryBreakdown: categories
  };
}

// AUTHENTICATION APIs
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  const found = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
  if (!found) {
    const demoUser = {
      id: `u-${Date.now()}`,
      name: email.split('@')[0],
      email: email,
      password: password,
      handle: `@${email.split('@')[0]}`,
      team: 'F.I.R.E. Member',
      creditScore: 750,
      netWorth: 142500,
      monthlyIncome: 85000,
      monthlyExpenses: 34200,
      fireScore: 82
    };
    users.push(demoUser);
    currentUser = demoUser;
    state.user = demoUser;

    return res.json({
      success: true,
      user: demoUser,
      token: `token-${demoUser.id}-${Date.now()}`,
      stats: getAggregatedStats()
    });
  }

  currentUser = found;
  state.user = found;

  res.json({
    success: true,
    user: found,
    token: `token-${found.id}-${Date.now()}`,
    stats: getAggregatedStats()
  });
});

app.post('/api/auth/register', (req, res) => {
  const { name, email, password, handle } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: "Name, email, and password are required." });
  }

  const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    return res.status(400).json({ error: "Account with this email already exists. Please log in." });
  }

  const newUser = {
    id: `u-${Date.now()}`,
    name,
    email,
    password,
    handle: handle ? (handle.startsWith('@') ? handle : `@${handle}`) : `@${name.toLowerCase().replace(/\s+/g, '')}`,
    team: 'F.I.R.E. Member',
    creditScore: 750,
    netWorth: 100000,
    monthlyIncome: 65000,
    monthlyExpenses: 22000,
    fireScore: 80
  };

  users.push(newUser);
  currentUser = newUser;
  state.user = newUser;

  res.json({
    success: true,
    user: newUser,
    token: `token-${newUser.id}-${Date.now()}`,
    stats: getAggregatedStats()
  });
});

app.post('/api/auth/logout', (req, res) => {
  currentUser = null;
  state.user = null;
  res.json({ success: true, message: "Logged out successfully." });
});

// DYNAMIC REAL-TIME TELEMETRY FEED
app.get('/api/live/stream', (req, res) => {
  const tickers = [
    { symbol: 'NIFTY 50', price: (24850 + (Math.random() * 20 - 10)).toFixed(2), change: '+1.25%', isUp: true },
    { symbol: 'GEN-Z INDEX', price: (14210 + (Math.random() * 15 - 7)).toFixed(2), change: '+3.40%', isUp: true },
    { symbol: 'S&P 500', price: (5420 + (Math.random() * 10 - 5)).toFixed(2), change: '+0.85%', isUp: true },
    { symbol: 'BITCOIN', price: (64250 + (Math.random() * 150 - 75)).toFixed(2), change: '-0.95%', isUp: false }
  ];

  const userName = currentUser ? currentUser.name : "F.I.R.E. User";
  const fireScore = currentUser ? currentUser.fireScore : 82;

  const recentEvents = [
    `⚡ User @sam_invests allocated ₹5,000 to Index SIP`,
    `🛡️ Vision AI blocked fraud micro-transaction in Mumbai`,
    `⚔️ Debt Kraken Boss took 240 damage from extra repayment`,
    `🔥 ${userName} reached ${fireScore}% F.I.R.E. Score`,
    `📈 Gen-Z Mutual Index Fund up +2.4% today`
  ];

  res.json({
    timestamp: new Date().toISOString(),
    activeUsers: 1420 + Math.floor(Math.random() * 50),
    tickers,
    event: recentEvents[Math.floor(Math.random() * recentEvents.length)]
  });
});

// REST APIs
app.get('/api/dashboard', (req, res) => {
  res.json({
    user: currentUser,
    stats: getAggregatedStats(),
    recentTransactions: state.transactions.slice(-6).reverse(),
    goals: state.goals,
    fraudCount: state.fraudAlerts.filter(f => f.status === 'flagged').length
  });
});

app.get('/api/transactions', (req, res) => {
  const { category, search } = req.query;
  let filtered = [...state.transactions];
  if (category && category !== 'All') {
    filtered = filtered.filter(t => t.category === category);
  }
  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(t => t.title.toLowerCase().includes(q) || t.merchant.toLowerCase().includes(q));
  }
  res.json(filtered.reverse());
});

app.post('/api/transactions', (req, res) => {
  const { title, amount, type, category, merchant } = req.body;
  if (!title || !amount) {
    return res.status(400).json({ error: "Title and amount are required." });
  }

  let autoCat = category;
  if (!autoCat || autoCat === "Auto-Detect") {
    const lower = title.toLowerCase() + " " + (merchant || "").toLowerCase();
    if (lower.includes("coffee") || lower.includes("food") || lower.includes("swiggy") || lower.includes("zomato") || lower.includes("restaurant") || lower.includes("dining")) {
      autoCat = "Dining";
    } else if (lower.includes("rent") || lower.includes("electric") || lower.includes("utility") || lower.includes("home")) {
      autoCat = "Housing";
    } else if (lower.includes("aws") || lower.includes("vercel") || lower.includes("netflix") || lower.includes("spotify") || lower.includes("cloud")) {
      autoCat = "Tech & Subscriptions";
    } else if (lower.includes("sip") || lower.includes("invest") || lower.includes("stock") || lower.includes("crypto") || lower.includes("mutual")) {
      autoCat = "Investments";
    } else if (lower.includes("salary") || lower.includes("freelance") || lower.includes("payment")) {
      autoCat = "Salary";
    } else {
      autoCat = "General & Shopping";
    }
  }

  const newTx = {
    id: Date.now(),
    title,
    amount: Number(amount),
    type: type || "expense",
    category: autoCat,
    date: new Date().toISOString().split('T')[0],
    merchant: merchant || "Direct Pay"
  };

  state.transactions.push(newTx);
  res.json({ success: true, transaction: newTx, stats: getAggregatedStats() });
});

app.delete('/api/transactions/:id', (req, res) => {
  const id = Number(req.params.id);
  state.transactions = state.transactions.filter(t => t.id !== id);
  res.json({ success: true, stats: getAggregatedStats() });
});

app.get('/api/goals', (req, res) => {
  res.json(state.goals);
});

app.post('/api/goals', (req, res) => {
  const { title, target, category, deadline } = req.body;
  const newGoal = {
    id: Date.now(),
    title,
    target: Number(target),
    current: 0,
    category: category || "General",
    deadline: deadline || "2027-01-01"
  };
  state.goals.push(newGoal);
  res.json({ success: true, goal: newGoal });
});

app.post('/api/goals/:id/deposit', (req, res) => {
  const id = Number(req.params.id);
  const { amount } = req.body;
  const goal = state.goals.find(g => g.id === id);
  if (!goal) return res.status(404).json({ error: "Goal not found" });

  goal.current += Number(amount);
  
  state.transactions.push({
    id: Date.now(),
    title: `UPI Deposit to ${goal.title}`,
    amount: Number(amount),
    type: "expense",
    category: "Investments",
    date: new Date().toISOString().split('T')[0],
    merchant: "UPI Auto-Pay"
  });

  res.json({ success: true, goal, upiRef: "UPI-" + Math.floor(100000000 + Math.random() * 900000000) });
});

app.post('/api/kash/chat', (req, res) => {
  const { message, mode } = req.body;
  const text = (message || "").toLowerCase();
  const stats = getAggregatedStats();
  const userName = currentUser ? currentUser.name : "F.I.R.E. Saver";

  let response = "";
  let mood = "neutral";

  if (text.includes("roast") || text.includes("spend") || text.includes("buying")) {
    mood = "sassy";
    response = `🔥 *Kash adjusts gold sunglasses*: Let me look at your ledger, ${userName}... You spent ₹${stats.monthlyExpenses} this month! You bought coffee 3 times this week while talking about retiring by 35. Bro, cold brew isn't an investment asset! 💀`;
  } else if (text.includes("fire") || text.includes("retire") || text.includes("financial independence")) {
    mood = "excited";
    response = `🚀 *Kash high-fives you*: Your F.I.R.E. score is currently **${stats.fireScore}/100**! With your current savings rate of **${stats.savingsRate}%**, you are on track to achieve Financial Independence in **7.4 years**! Keep investing in SIPs and dodge high-interest loans in the Credit Dungeon! 🏆`;
  } else if (text.includes("loan") || text.includes("credit") || text.includes("debt")) {
    mood = "warning";
    response = `⚠️ *Kash steps in*: Payday loans at 30%+ APR are literal traps designed by financial monsters. Always clear high-interest debt first before adding luxury splurges. Head to the Credit Dungeon tab to test your decision skills!`;
  } else if (text.includes("upi") || text.includes("pay") || text.includes("goal")) {
    mood = "happy";
    response = `💳 *Kash nod*: Use our instant UPI simulator to chip away at your goals! Micro-deposits of ₹500/day beat buying random gadgets every single time.`;
  } else {
    mood = "happy";
    response = `🐼 *Kash the Red Panda*: Hey ${userName}! I'm tracking your net worth of ₹${stats.netWorth.toLocaleString()} live. What financial target are we conquering today? Ask me to roast your budget or run F.I.R.E. scenarios!`;
  }

  res.json({ response, mood, stats });
});

app.post('/api/ocr/scan', (req, res) => {
  const sampleReceipts = [
    { title: "Starbucks Cyber Coffee", amount: 650, category: "Dining", merchant: "Starbucks BKC", items: ["Caramel Macchiato", "Avocado Toast"] },
    { title: "Apple Store Accessory", amount: 4900, category: "Tech & Subscriptions", merchant: "Apple Store BKC", items: ["MagSafe Wallet", "USB-C Braided Cable"] },
    { title: "Supermarket Organic Groceries", amount: 2850, category: "Dining", merchant: "Nature's Basket", items: ["Almond Milk", "Organic Oats", "Berries"] }
  ];

  const randomReceipt = sampleReceipts[Math.floor(Math.random() * sampleReceipts.length)];
  
  const newTx = {
    id: Date.now(),
    title: randomReceipt.title,
    amount: randomReceipt.amount,
    type: "expense",
    category: randomReceipt.category,
    date: new Date().toISOString().split('T')[0],
    merchant: randomReceipt.merchant
  };

  state.transactions.push(newTx);

  res.json({
    success: true,
    parsed: randomReceipt,
    transaction: newTx,
    confidence: "99.4%"
  });
});

app.get('/api/fraud/alerts', (req, res) => {
  res.json(state.fraudAlerts);
});

app.post('/api/fraud/resolve', (req, res) => {
  const { id, action } = req.body;
  state.fraudAlerts = state.fraudAlerts.map(f => {
    if (f.id === id) {
      return { ...f, status: action === 'block' ? 'blocked' : 'approved' };
    }
    return f;
  });
  res.json({ success: true, alerts: state.fraudAlerts });
});

app.get('/api/dungeon', (req, res) => {
  res.json(state.dungeon);
});

app.post('/api/dungeon/action', (req, res) => {
  const { moveType, scenarioId, optionIndex } = req.body;

  if (moveType === "battle") {
    const damage = Math.floor(Math.random() * 80) + 120;
    state.dungeon.bossHp = Math.max(0, state.dungeon.bossHp - damage);
    state.dungeon.currentDebt = Math.max(0, state.dungeon.currentDebt - damage * 50);
    state.dungeon.xp += 50;

    let bossMsg = "";
    if (state.dungeon.bossHp === 0) {
      state.dungeon.bossHp = 1000;
      state.dungeon.level += 1;
      state.dungeon.creditScore += 25;
      if (currentUser) currentUser.creditScore += 25;
      bossMsg = "🎉 YOU DEFEATED THE DEBT KRAKEN! Credit Score +25 & Level Up!";
    } else {
      bossMsg = `💥 Critical Strike! You dealt ${damage} damage to Debt Krax! Remaining Debt: ₹${state.dungeon.currentDebt.toLocaleString()}`;
    }

    return res.json({ success: true, dungeon: state.dungeon, message: bossMsg });
  }

  if (scenarioId !== undefined && optionIndex !== undefined) {
    const sc = state.dungeon.scenarios.find(s => s.id === scenarioId);
    if (sc) {
      const opt = sc.options[optionIndex];
      state.dungeon.creditScore += opt.impactScore;
      if (currentUser) {
        currentUser.creditScore = Math.max(300, Math.min(850, currentUser.creditScore + opt.impactScore));
      }
      state.dungeon.currentDebt = Math.max(0, state.dungeon.currentDebt + opt.debtDelta);

      return res.json({ success: true, dungeon: state.dungeon, message: opt.message });
    }
  }

  res.status(400).json({ error: "Invalid action" });
});

app.post('/api/fire/calculate', (req, res) => {
  const { currentAge = 22, targetAge = 35, currentSavings = 140000, monthlyContribution = 45000, returnRate = 12, annualExpense = 400000 } = req.body;

  const targetFireNumber = annualExpense * 25;
  let age = currentAge;
  let balance = currentSavings;
  const timeline = [];

  while (age <= 60) {
    timeline.push({ age, balance: Math.round(balance), target: targetFireNumber });
    balance = (balance + monthlyContribution * 12) * (1 + returnRate / 100);
    if (balance >= targetFireNumber && !req.fireReachedAge) {
      req.fireReachedAge = age;
    }
    age++;
  }

  res.json({
    targetFireNumber,
    yearsToFire: (req.fireReachedAge ? req.fireReachedAge - currentAge : "15+"),
    fireAge: req.fireReachedAge || "50+",
    timeline
  });
});

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`⚡ PIXXELHACK 2.0 Backend Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;
