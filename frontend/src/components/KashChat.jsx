import React, { useState } from 'react';
import { Bot, Send, Flame, Sparkles, Smile, ShieldAlert, Zap } from 'lucide-react';

export default function KashChat({ onSendMessage }) {
  const [inputMsg, setInputMsg] = useState('');
  const [selectedMode, setSelectedMode] = useState('roast');
  const [chatHistory, setChatHistory] = useState([
    {
      sender: 'kash',
      text: "🐼 *Kash adjusts gold sunglasses*: Yo Soham! I'm Kash the Red Panda, your sassy AI finance mentor. Ask me anything or click below for a savage roast of your spending!",
      mood: 'excited'
    }
  ]);
  const [loading, setLoading] = useState(false);

  const quickPrompts = [
    "🔥 Roast my recent purchases 💀",
    "🚀 How do I reach F.I.R.E. faster?",
    "⚠️ Should I take a payday loan for iPhone?",
    "📊 Explain 50/30/20 budgeting rule"
  ];

  const handleSend = async (textToSend) => {
    const msg = textToSend || inputMsg;
    if (!msg.trim()) return;

    // Add User message
    const userEntry = { sender: 'user', text: msg };
    setChatHistory(prev => [...prev, userEntry]);
    if (!textToSend) setInputMsg('');

    setLoading(true);

    try {
      const res = await onSendMessage(msg, selectedMode);
      if (res?.response) {
        setChatHistory(prev => [...prev, { sender: 'kash', text: res.response, mood: res.mood || 'sassy' }]);
      }
    } catch (err) {
      setChatHistory(prev => [...prev, { sender: 'kash', text: "🐼 Kash is crunching numbers! Ask me again in a moment.", mood: 'neutral' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      
      {/* Kash Header Card */}
      <div className="glass-panel glass-glow-gold" style={{
        padding: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <img 
            src="/kash_red_panda.jpg" 
            alt="Kash Red Panda" 
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '16px',
              border: '2px solid #ffb700',
              boxShadow: '0 0 20px rgba(255,183,0,0.4)',
              objectFit: 'cover'
            }}
          />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h2 className="font-heading" style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff' }}>
                Kash the Red Panda
              </h2>
              <span className="badge-tag badge-gold">AI MENTOR</span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Sassy AI chatbot celebrating your savings & roasting your bad spending decisions
            </p>
          </div>
        </div>

        {/* Mode Selector */}
        <div style={{ display: 'flex', gap: '8px', background: 'rgba(0,0,0,0.4)', padding: '4px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>
          <button
            onClick={() => setSelectedMode('roast')}
            style={{
              padding: '6px 12px',
              borderRadius: '8px',
              border: 'none',
              fontSize: '0.8rem',
              fontWeight: 700,
              cursor: 'pointer',
              background: selectedMode === 'roast' ? '#ff3366' : 'transparent',
              color: selectedMode === 'roast' ? '#fff' : 'var(--text-muted)'
            }}
          >
            🔥 Roast Mode
          </button>
          <button
            onClick={() => setSelectedMode('mentor')}
            style={{
              padding: '6px 12px',
              borderRadius: '8px',
              border: 'none',
              fontSize: '0.8rem',
              fontWeight: 700,
              cursor: 'pointer',
              background: selectedMode === 'mentor' ? '#00f2fe' : 'transparent',
              color: selectedMode === 'mentor' ? '#07080d' : 'var(--text-muted)'
            }}
          >
            🎓 Mentor Mode
          </button>
        </div>
      </div>

      {/* Chat Messages Box */}
      <div className="glass-panel" style={{
        padding: '24px',
        minHeight: '420px',
        maxHeight: '550px',
        display: 'flex',
        flexDirection: 'column',
        justify: 'space-between'
      }}>
        
        {/* Messages Container */}
        <div style={{
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          paddingRight: '8px',
          marginBottom: '20px'
        }}>
          {chatHistory.map((chat, idx) => {
            const isKash = chat.sender === 'kash';
            return (
              <div 
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: isKash ? 'flex-start' : 'flex-end',
                  gap: '12px'
                }}
              >
                {isKash && (
                  <img 
                    src="/kash_red_panda.jpg" 
                    alt="Kash" 
                    style={{ width: '36px', height: '36px', borderRadius: '10px', objectFit: 'cover' }} 
                  />
                )}
                
                <div style={{
                  maxWidth: '75%',
                  padding: '14px 18px',
                  borderRadius: isKash ? '4px 16px 16px 16px' : '16px 4px 16px 16px',
                  background: isKash 
                    ? 'rgba(255, 183, 0, 0.08)' 
                    : 'linear-gradient(135deg, #00f2fe 0%, #00c6ff 100%)',
                  border: isKash ? '1px solid rgba(255, 183, 0, 0.25)' : 'none',
                  color: isKash ? '#fff' : '#07080d',
                  fontSize: '0.9rem',
                  lineHeight: 1.5,
                  boxShadow: isKash ? '0 4px 15px rgba(255, 183, 0, 0.08)' : '0 4px 15px rgba(0, 242, 254, 0.2)'
                }}>
                  {chat.text}
                </div>
              </div>
            );
          })}

          {loading && (
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <img src="/kash_red_panda.jpg" alt="Kash" style={{ width: '36px', height: '36px', borderRadius: '10px' }} />
              <div style={{ background: 'rgba(255,183,0,0.1)', padding: '12px 18px', borderRadius: '12px', color: '#ffb700', fontSize: '0.85rem' }}>
                🐼 Kash is typing a response...
              </div>
            </div>
          )}
        </div>

        {/* Quick Prompts & Input Row */}
        <div>
          {/* Quick Prompts Bar */}
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '12px' }}>
            {quickPrompts.map((qp, i) => (
              <button
                key={i}
                onClick={() => handleSend(qp)}
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: '20px',
                  padding: '6px 14px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: '#94a3b8',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#ffb700'; e.currentTarget.style.color = '#fff'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = '#94a3b8'; }}
              >
                {qp}
              </button>
            ))}
          </div>

          {/* Chat Form */}
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            style={{ display: 'flex', gap: '10px' }}
          >
            <input 
              type="text" 
              placeholder="Ask Kash about your budget, loans, or F.I.R.E. goals..."
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              style={{
                flex: 1,
                background: 'rgba(0,0,0,0.4)',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: '12px',
                padding: '12px 16px',
                color: '#fff',
                fontSize: '0.9rem',
                outline: 'none'
              }}
            />
            <button 
              type="submit" 
              className="btn-gold"
              disabled={loading}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '12px 20px' }}
            >
              <Send size={16} />
              <span>Ask</span>
            </button>
          </form>
        </div>

      </div>

    </div>
  );
}
