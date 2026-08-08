import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { BookOpen, Award, CheckCircle2, HelpCircle, Trophy, Sparkles, ArrowRight, RotateCcw } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export default function AcademyPage() {
  const [activeLesson, setActiveLesson] = useState(0);
  const [quizIdx, setQuizIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const lessons = [
    {
      title: "The 50/30/20 Budgeting Rule",
      tag: "Budgeting 101",
      duration: "3 min read",
      summary: "Allocate 50% of income to Needs (rent, food), 30% to Wants (dining, hobbies), and 20% to Savings & Investments."
    },
    {
      title: "Credit Score Mastery (750+ Strategy)",
      tag: "Credit Health",
      duration: "4 min read",
      summary: "Keep credit utilization below 30%, never miss a payment deadline, and avoid taking high APR payday loans."
    },
    {
      title: "The Power of Compounding & Index Funds",
      tag: "Investing",
      duration: "5 min read",
      summary: "Investing ₹5,000/month at a 12% return for 20 years turns ₹12 Lakhs into ₹49.9 Lakhs due to compound interest."
    }
  ];

  const quizQuestions = [
    {
      q: "What percentage of monthly income should ideally be allocated to Savings & Investments under the 50/30/20 rule?",
      options: ["10%", "20%", "30%", "50%"],
      correct: 1
    },
    {
      q: "What is the recommended maximum credit card utilization ratio to maintain a 750+ credit score?",
      options: ["Below 30%", "Below 80%", "100%", "It doesn't matter"],
      correct: 0
    },
    {
      q: "Why are high-interest payday loans dangerous for Gen Z?",
      options: ["They increase credit score", "30%+ APR leads to debt traps", "They give free cash", "No reason"],
      correct: 1
    }
  ];

  const handleAnswer = (optionIdx) => {
    sounds.playClick();
    const currentQ = quizQuestions[quizIdx];
    if (optionIdx === currentQ.correct) {
      sounds.playSuccess();
      setScore(prev => prev + 100);
    }
    if (quizIdx + 1 < quizQuestions.length) {
      setQuizIdx(prev => prev + 1);
    } else {
      setQuizFinished(true);
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    }
  };

  const restartQuiz = () => {
    sounds.playClick();
    setQuizIdx(0);
    setScore(0);
    setQuizFinished(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header Banner */}
      <div className="glass-panel glass-glow-purple" style={{ padding: '28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span className="badge-tag badge-purple">GEN-Z ACADEMY</span>
              <span className="badge-tag badge-gold">EARN XP & BADGES</span>
            </div>
            <h2 className="font-heading" style={{ fontSize: '1.85rem', fontWeight: 900, marginTop: '8px', color: '#fff' }}>
              Financial Literacy <span className="gradient-text-cyber">Academy & Quizzes</span>
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Master budgeting, credit scores, and compounding wealth through bite-sized lessons
            </p>
          </div>
          <BookOpen size={42} color="#c77dff" />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '20px' }}>
        
        {/* Bite-sized Lessons Cards */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 className="font-heading" style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles color="#ffc72c" size={20} />
            Interactive Bite-Sized Lessons
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {lessons.map((l, idx) => (
              <div 
                key={idx}
                onClick={() => { sounds.playClick(); setActiveLesson(idx); }}
                style={{
                  background: activeLesson === idx ? 'rgba(255,199,44,0.1)' : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${activeLesson === idx ? '#ffc72c' : 'rgba(255,255,255,0.08)'}`,
                  borderRadius: '14px',
                  padding: '16px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span className="badge-tag badge-cyan" style={{ fontSize: '0.65rem' }}>{l.tag}</span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{l.duration}</span>
                </div>
                <h4 style={{ fontSize: '0.98rem', fontWeight: 800, color: '#fff', marginBottom: '6px' }}>{l.title}</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{l.summary}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Live Quiz Game Widget */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 className="font-heading" style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Trophy color="#00f0ff" size={20} />
                Financial Master Quiz
              </h3>
              <span className="badge-tag badge-gold">XP SCORE: {score}</span>
            </div>

            {!quizFinished ? (
              <div style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '18px' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                  QUESTION {quizIdx + 1} OF {quizQuestions.length}
                </div>

                <h4 style={{ fontSize: '0.98rem', fontWeight: 700, color: '#fff', lineHeight: 1.5, marginBottom: '16px' }}>
                  {quizQuestions[quizIdx].q}
                </h4>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {quizQuestions[quizIdx].options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => handleAnswer(i)}
                      style={{
                        textAlign: 'left',
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '10px',
                        padding: '12px 14px',
                        color: '#fff',
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.borderColor = '#00f0ff'}
                      onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '30px 20px', background: 'rgba(16,185,129,0.1)', border: '1px solid #10b981', borderRadius: '16px' }}>
                <Trophy size={48} color="#10b981" style={{ marginBottom: '12px' }} />
                <h4 className="font-heading" style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', marginBottom: '6px' }}>
                  Quiz Master Completed!
                </h4>
                <p style={{ fontSize: '0.85rem', color: '#10b981', fontWeight: 700, marginBottom: '20px' }}>
                  You earned +{score} XP points towards your F.I.R.E. Master Badge!
                </p>

                <button className="btn-gold" onClick={restartQuiz} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                  <RotateCcw size={16} /> Retry Quiz
                </button>
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
