import React, { useState } from 'react';
import { Cpu, FileText, ShieldAlert, CheckCircle2, AlertOctagon, Upload, Sparkles, RefreshCw } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export default function AIHub({ fraudAlerts, onResolveFraud, onScanReceipt }) {
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);

  const handleScanTrigger = async () => {
    sounds.playLaser();
    setScanning(true);
    setScanResult(null);
    try {
      const res = await onScanReceipt();
      if (res?.parsed) {
        setScanResult(res);
        sounds.playSuccess();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setScanning(false);
    }
  };

  const handleResolve = (id, action) => {
    sounds.playClick();
    onResolveFraud(id, action);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header Banner */}
      <div className="glass-panel glass-glow-cyan" style={{ padding: '28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span className="badge-tag badge-cyan">AI / ML ENGINE</span>
              <span className="badge-tag badge-gold">PIXXELHACK PROTOTYPE</span>
            </div>
            <h2 className="font-heading" style={{ fontSize: '1.85rem', fontWeight: 900, marginTop: '8px', color: '#fff' }}>
              AI Hub: <span className="gradient-text-cyber">Receipt Vision OCR & Anomaly Shield</span>
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Automated expense extraction from paper receipts + Real-time security protection
            </p>
          </div>
          <Cpu size={42} color="#00f0ff" />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '20px' }}>
        
        {/* Receipt OCR Scanner */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '20px' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 className="font-heading" style={{ fontSize: '1.2rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FileText color="#ffc72c" size={20} />
                AI Receipt OCR Parser
              </h3>
              <span className="badge-tag badge-gold">Computer Vision</span>
            </div>

            {/* Dropzone Container */}
            <div style={{
              border: '2px dashed rgba(255, 199, 44, 0.4)',
              borderRadius: '18px',
              padding: '35px 20px',
              textAlign: 'center',
              background: 'rgba(255, 199, 44, 0.03)',
              position: 'relative',
              overflow: 'hidden',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onClick={handleScanTrigger}
            >
              {scanning && <div className="animate-scan-laser" />}

              <Upload size={38} color="#ffc72c" style={{ marginBottom: '12px' }} />
              <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#fff', marginBottom: '4px' }}>
                {scanning ? "Parsing Receipt Image with Vision AI..." : "Click or Drop Receipt Image to Scan"}
              </h4>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Supports JPG, PNG, PDF receipts. AI extracts total, date, & auto-logs transaction.
              </p>
              
              <button 
                className="btn-gold" 
                disabled={scanning}
                style={{ marginTop: '18px', fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
              >
                {scanning ? <RefreshCw size={16} className="animate-spin" /> : <Sparkles size={16} />}
                <span>{scanning ? "Extracting Data..." : "Run OCR Simulator"}</span>
              </button>
            </div>

            {/* Extracted Card */}
            {scanResult && (
              <div style={{
                marginTop: '20px',
                background: 'rgba(16, 185, 129, 0.08)',
                border: '1px solid rgba(16, 185, 129, 0.35)',
                borderRadius: '16px',
                padding: '18px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#10b981', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <CheckCircle2 size={15} /> OCR CONFIDENCE: {scanResult.confidence}
                  </span>
                  <span className="badge-tag badge-green" style={{ fontSize: '0.65rem' }}>Auto-Logged</span>
                </div>
                <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#fff' }}>{scanResult.parsed.title}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Merchant: {scanResult.parsed.merchant}</div>
                <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#ffc72c', marginTop: '6px' }}>
                  ₹{scanResult.parsed.amount.toLocaleString()}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '4px' }}>
                  Items parsed: {scanResult.parsed.items.join(', ')}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Fraud Security Stream */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '20px' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 className="font-heading" style={{ fontSize: '1.2rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldAlert color="#ff2a6d" size={20} />
                Fraud & Anomaly Security Stream
              </h3>
              <span className="badge-tag badge-purple">Real-Time Security</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {fraudAlerts.map(alert => {
                const isBlocked = alert.status === 'blocked';
                const isApproved = alert.status === 'approved';

                return (
                  <div key={alert.id} style={{
                    background: isBlocked ? 'rgba(239, 68, 68, 0.12)' : isApproved ? 'rgba(16, 185, 129, 0.12)' : 'rgba(255, 42, 109, 0.08)',
                    border: `1px solid ${isBlocked ? '#ef4444' : isApproved ? '#10b981' : 'rgba(255, 42, 109, 0.35)'}`,
                    borderRadius: '16px',
                    padding: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <AlertOctagon size={16} color={isBlocked ? '#ef4444' : '#ff2a6d'} />
                          {alert.title}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          {alert.merchant} • {alert.location}
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#ff2a6d' }}>
                          ₹{alert.amount.toLocaleString()}
                        </div>
                        <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{alert.time}</div>
                      </div>
                    </div>

                    {alert.status === 'flagged' ? (
                      <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                        <button 
                          onClick={() => handleResolve(alert.id, 'block')}
                          style={{
                            flex: 1,
                            background: '#ef4444',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '8px',
                            padding: '7px 12px',
                            fontSize: '0.75rem',
                            fontWeight: 800,
                            cursor: 'pointer'
                          }}
                        >
                          ⛔ Block Card & Refund
                        </button>
                        <button 
                          onClick={() => handleResolve(alert.id, 'approve')}
                          className="btn-outline"
                          style={{ flex: 1, padding: '7px 12px', fontSize: '0.75rem' }}
                        >
                          ✅ Authorize Charge
                        </button>
                      </div>
                    ) : (
                      <div style={{ fontSize: '0.75rem', fontWeight: 800, color: isBlocked ? '#ef4444' : '#10b981' }}>
                        STATUS: {alert.status.toUpperCase()}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
