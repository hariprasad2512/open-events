import React, { useState } from 'react';
import { LightningIcon, DatabaseIcon, SourceIcon } from './Icons.jsx';

export default function TriggerPanel({ isOpen, onClose, onTriggerScrape, activeJob }) {
  const [target, setTarget] = useState('FullHyd');
  const [injectErrors, setInjectErrors] = useState(false);

  if (!isOpen) return null;

  const handleRun = () => {
    onTriggerScrape(target, injectErrors);
  };

  return (
    <div className="trigger-modal-overlay">
      <div className="trigger-modal-card">
        <div className="modal-header">
          <div className="modal-title-group">
            <LightningIcon className="w-5 h-5 text-gold-accent inline-block mr-2" />
            <h2 className="modal-title font-serif">Bright Data Scraper Console</h2>
          </div>
          <button onClick={onClose} className="modal-close-btn">×</button>
        </div>

        <div className="modal-body">
          <div className="form-group">
            <label className="form-label">TARGET PLATFORM FEED</label>
            <select
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              className="form-select"
            >
              <option value="FullHyd">FullHyd Collector (c_mt4huvzfl8yupcmb6)</option>
              <option value="HighApe">HighApe Collector (c_mt4no7jl2hsz0xq1t)</option>
              <option value="AroundU">AroundU Collector (c_mt4nus5z1nhju2014n)</option>
              <option value="HydHub">HydHub Custom Feed</option>
            </select>
          </div>

          <div className="form-group checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={injectErrors}
                onChange={(e) => setInjectErrors(e.target.checked)}
                className="form-checkbox"
              />
              <span>Simulate Self-Healing Pipeline Faults (Error Injection)</span>
            </label>
          </div>

          <button onClick={handleRun} className="execute-trigger-btn">
            <LightningIcon className="w-4 h-4 inline-block mr-2" />
            Trigger Live Scrape Job →
          </button>

          {/* Active Job Telemetry */}
          {activeJob && (
            <div className="active-job-telemetry-box">
              <div className="telemetry-row">
                <span className="telemetry-label">JOB IDENTIFIER:</span>
                <span className="telemetry-val font-mono">{activeJob.job_id}</span>
              </div>
              <div className="telemetry-row">
                <span className="telemetry-label">STATUS:</span>
                <span className={`status-badge ${activeJob.status.toLowerCase()}`}>
                  {activeJob.status}
                </span>
              </div>
              {activeJob.log && (
                <pre className="telemetry-log-output">{activeJob.log}</pre>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
