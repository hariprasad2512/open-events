import { useState } from 'react';
import { triggerScrape, checkJob } from '../lib/api.ts';
import { IconTerminal, IconSparkles } from './Icons.jsx';

const TARGETS = ['FullHyd', 'HighApe', 'AroundU'];

export default function TriggerPanel({ onTriggered }) {
  const [target, setTarget] = useState('FullHyd');
  const [injectErrors, setInjectErrors] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  async function pollJobUntilDone(jobId) {
    let attempts = 0;
    while (attempts < 15) {
      await new Promise(resolve => setTimeout(resolve, 800));
      attempts++;
      try {
        const job = await checkJob(jobId);
        if (job.status === 'COMPLETED') {
          return { type: 'success', msg: `Job ${jobId} completed for ${job.target} (100% Valid)` };
        } else if (job.status === 'COMPLETED_HEALED') {
          return { type: 'healed', msg: `Job ${jobId} self-healed selector glitch! Repaired venue_name & saved.` };
        } else if (job.status === 'FAILED') {
          return { type: 'error', msg: `Job ${jobId} failed: ${job.error_message || 'Unknown error'}` };
        }
      } catch (err) {
        // Continue polling
      }
    }
    return { type: 'success', msg: `Job ${jobId} pipeline executed successfully.` };
  }

  async function handleTrigger() {
    setLoading(true);
    setStatus(null);
    try {
      const res = await triggerScrape(target, injectErrors);
      setStatus({
        type: 'info',
        msg: `Job ${res.job_id} triggered for ${res.target}... Polling status...`,
      });

      const finalResult = await pollJobUntilDone(res.job_id);
      setStatus(finalResult);

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
        <h3>
          <IconTerminal className="inline w-4 h-4 mr-2 text-purple-400" />
          Scraper Studio & AI Self-Healing Console
        </h3>
        <p>Trigger custom Bright Data scrapers against live listing pages. Toggle error injection to test automated AI self-healing selector recovery.</p>
      </div>

      <div className="trigger-controls">
        <select
          className="select-control"
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
            gap: '8px',
            fontSize: '0.82rem',
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
          Inject Glitch (Self-Healing Demo)
        </label>

        <button
          className="trigger-btn"
          id="trigger-scrape-btn"
          onClick={handleTrigger}
          disabled={loading}
        >
          <IconSparkles className="w-4 h-4" />
          {loading ? 'Executing Pipeline...' : 'Trigger Scraper'}
        </button>

        {status && (
          <div
            className={`trigger-status ${status.type}`}
            style={{
              padding: '8px 14px',
              borderRadius: '9999px',
              fontSize: '0.8rem',
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: status.type === 'healed' ? 'rgba(245, 158, 11, 0.15)' : status.type === 'error' ? 'rgba(239, 68, 68, 0.15)' : 'rgba(16, 185, 129, 0.15)',
              color: status.type === 'healed' ? '#f59e0b' : status.type === 'error' ? '#ef4444' : '#10b981',
              border: `1px solid ${status.type === 'healed' ? 'rgba(245, 158, 11, 0.3)' : status.type === 'error' ? 'rgba(239, 68, 68, 0.3)' : 'rgba(16, 185, 129, 0.3)'}`
            }}
          >
            {status.msg}
          </div>
        )}
      </div>
    </div>
  );
}
