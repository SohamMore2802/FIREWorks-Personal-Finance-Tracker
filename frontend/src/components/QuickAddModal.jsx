import React, { useState } from 'react';
import { PlusCircle, Sparkles, X } from 'lucide-react';

export default function QuickAddModal({ onClose, onAddTransaction }) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense');
  const [category, setCategory] = useState('Auto-Detect');
  const [merchant, setMerchant] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const categories = ['Auto-Detect', 'Dining', 'Housing', 'Tech & Subscriptions', 'Investments', 'Health', 'Salary', 'General & Shopping'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !amount) return;

    setSubmitting(true);
    try {
      await onAddTransaction({
        title,
        amount: Number(amount),
        type,
        category,
        merchant
      });
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.85)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100,
      padding: '16px'
    }}>
      <div className="glass-panel glass-glow-gold" style={{ maxWidth: '440px', width: '100%', padding: '24px' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 className="font-heading" style={{ fontSize: '1.25rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <PlusCircle color="#ffb700" size={20} />
            Add Transaction
          </h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          
          {/* Type Switcher */}
          <div style={{ display: 'flex', gap: '8px', background: 'rgba(0,0,0,0.4)', padding: '4px', borderRadius: '10px' }}>
            <button
              type="button"
              onClick={() => setType('expense')}
              style={{
                flex: 1,
                padding: '8px',
                borderRadius: '8px',
                border: 'none',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer',
                background: type === 'expense' ? '#ff3366' : 'transparent',
                color: type === 'expense' ? '#fff' : 'var(--text-muted)'
              }}
            >
              Expense 💸
            </button>
            <button
              type="button"
              onClick={() => setType('income')}
              style={{
                flex: 1,
                padding: '8px',
                borderRadius: '8px',
                border: 'none',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer',
                background: type === 'income' ? '#10b981' : 'transparent',
                color: type === 'income' ? '#fff' : 'var(--text-muted)'
              }}
            >
              Income 💰
            </button>
          </div>

          {/* Title */}
          <div>
            <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px', display: 'block' }}>Transaction Title</label>
            <input 
              type="text" 
              placeholder="e.g. Starbucks Caramel Macchiato" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{
                width: '100%',
                background: 'rgba(0,0,0,0.3)',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: '10px',
                padding: '10px 12px',
                color: '#fff',
                outline: 'none'
              }}
              required
            />
          </div>

          {/* Amount */}
          <div>
            <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px', display: 'block' }}>Amount (₹)</label>
            <input 
              type="number" 
              placeholder="e.g. 650" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={{
                width: '100%',
                background: 'rgba(0,0,0,0.3)',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: '10px',
                padding: '10px 12px',
                color: '#fff',
                fontSize: '1.1rem',
                fontWeight: 700,
                outline: 'none'
              }}
              required
            />
          </div>

          {/* Merchant */}
          <div>
            <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px', display: 'block' }}>Merchant / Source (Optional)</label>
            <input 
              type="text" 
              placeholder="e.g. Starbucks BKC" 
              value={merchant}
              onChange={(e) => setMerchant(e.target.value)}
              style={{
                width: '100%',
                background: 'rgba(0,0,0,0.3)',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: '10px',
                padding: '10px 12px',
                color: '#fff',
                outline: 'none'
              }}
            />
          </div>

          {/* Category */}
          <div>
            <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px', display: 'block' }}>Category (AI Auto-Detect)</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{
                width: '100%',
                background: 'rgba(0,0,0,0.3)',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: '10px',
                padding: '10px 12px',
                color: '#fff',
                outline: 'none'
              }}
            >
              {categories.map(c => <option key={c} value={c} style={{ background: '#07080d' }}>{c}</option>)}
            </select>
          </div>

          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            <button type="button" className="btn-outline" onClick={onClose} style={{ flex: 1 }}>
              Cancel
            </button>
            <button type="submit" className="btn-gold" disabled={submitting} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              <Sparkles size={16} />
              <span>{submitting ? "Logging..." : "Save Entry"}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
