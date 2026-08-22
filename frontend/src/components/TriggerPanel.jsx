import { useState } from 'react';
import { triggerScrape } from '../lib/api.ts';

const TARGETS = ['FullHyd', 'HydHub', 'AroundU'];

export default function TriggerPanel({ onTriggered }) {
  const [target, setTarget] = useState('FullHyd');
  const [injectErrors, setInjectErrors] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // null | { type: 'success'|'error', msg: string }

  async function handleTrigger() {
    setLoading(true);
    setStatus(null);
    try {
      const res = await triggerScrape(target, injectErrors);
      setStatus({
        type: 'success',
        msg: `Job ${res.job_id} triggered for ${res.target}`,
      });
      if (onTriggered) onTriggered(res);
    } catch (err) {
      setStatus({ type: 'error', msg: err.message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="trigger-panel" id="trigger-panel">
      <div className="trigger-info">
        <h3>🚀 Trigger Live Scrape</h3>
        <p>Fire a Bright Data collection run against a source. Uses local fixture data for demo.</p>
      </div>

      <div className="trigger-controls">
        <select
          className="trigger-select"
          value={target}
          onChange={e => setTarget(e.target.value)}
          id="trigger-target-select"
          aria-label="Select scrape target"
        >
          {TARGETS.map(t => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>

        <label
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.78rem',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
          }}
        >
          <input
            type="checkbox"
            checked={injectErrors}
            onChange={e => setInjectErrors(e.target.checked)}
            id="inject-errors-checkbox"
            style={{ accentColor: 'var(--accent-purple)', cursor: 'pointer' }}
          />
          Inject Errors (demo)
        </label>

        <button
          className="trigger-btn"
          id="trigger-scrape-btn"
          onClick={handleTrigger}
          disabled={loading}
        >
          {loading ? '⏳ Triggering...' : '⚡ Trigger'}
        </button>

        {status && (
          <span className={`trigger-status ${status.type}`}>
            {status.type === 'success' ? '✓' : '✗'} {status.msg}
          </span>
        )}
      </div>
    </div>
  );
}
