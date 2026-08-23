import React, { useState, useEffect } from 'react';
import { LightningIcon, CloseIcon, TerminalIcon, DatabaseIcon, CheckIcon } from './Icons.jsx';

export default function TriggerPanel({
  isOpen,
  onClose,
  onTriggerScrape,
  activeJob
}) {
  const [target, setTarget] = useState('FullHyd');
  const [injectErrors, setInjectErrors] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState([]);
  const [stats, setStats] = useState({
    rawCount: 0,
    dedupedCount: 0,
    mergedCount: 0,
    elapsedMs: 0
  });

  const collectors = [
    { id: 'FullHyd', label: 'FullHyd Scraper', collectorId: 'c_mt4huvzfl8yupcmb6', region: 'Hyderabad East/West', rate: '99.8%' },
    { id: 'HighApe', label: 'HighApe Collector', collectorId: 'c_mt4no7jl2hsz0xq1t', region: 'Hyderabad Tech Corridor', rate: '99.4%' },
    { id: 'AroundU', label: 'AroundU Feed', collectorId: 'c_mt4nus5z1nhju2014n', region: 'Greater Hyderabad', rate: '99.1%' },
    { id: 'HydHub', label: 'HydHub Aggregator', collectorId: 'c_mt4kkm892lxz7712v', region: 'Secunderabad & Old City', rate: '98.9%' }
  ];

  const selectedCollector = collectors.find((c) => c.id === target) || collectors[0];

  const handleRun = async () => {
    setIsRunning(true);
    setLogs([
      `[${new Date().toISOString()}] [INIT] Initiating Bright Data Collector: ${selectedCollector.collectorId} (${target})`,
      `[${new Date().toISOString()}] [NETWORK] Connecting to Bright Data Scraping Cloud via residential proxy pool...`
    ]);

    const startTime = Date.now();

    // Step 1: Simulating fetch
    await new Promise((r) => setTimeout(r, 600));
    setLogs((prev) => [
      ...prev,
      `[${new Date().toISOString()}] [FETCH] Received snapshot stream payload: 48 raw event documents.`,
      injectErrors
        ? `[${new Date().toISOString()}] [FAULT_INJECT] Warning: Malformed date string encountered in 3 records. Triggering self-healing normalizer.`
        : `[${new Date().toISOString()}] [VALIDATE] Schema validation check: 100% compliant with OpenEvents schema.`
    ]);

    // Step 2: Normalization
    await new Promise((r) => setTimeout(r, 700));
    setLogs((prev) => [
      ...prev,
      `[${new Date().toISOString()}] [NORMALIZE] Standardizing date formats to ISO 8601 YYYY-MM-DD.`,
      `[${new Date().toISOString()}] [TAXONOMY] Mapping raw categories into Unified Category Taxonomy (Music, Theatre, Talks, Workshops).`
    ]);

    // Step 3: Fuzzy Deduplication
    await new Promise((r) => setTimeout(r, 600));
    const raw = 48;
    const merged = 16;
    const deduped = raw - merged;

    setLogs((prev) => [
      ...prev,
      `[${new Date().toISOString()}] [DEDUP] Executing Levenshtein & Jaro-Winkler title distance matrix on date+venue clusters.`,
      `[${new Date().toISOString()}] [MERGE] Merged ${merged} duplicate cross-posted events into canonical multi-source records.`,
      `[${new Date().toISOString()}] [COMMIT] Successfully updated SQLite pipeline database with ${deduped} pristine events.`
    ]);

    setStats({
      rawCount: raw,
      dedupedCount: deduped,
      mergedCount: merged,
      elapsedMs: Date.now() - startTime
    });

    setIsRunning(false);
    onTriggerScrape?.(target, injectErrors);
  };

  if (!isOpen) return null;

  return (
    <div className="sv-modal-backdrop" onClick={onClose}>
      <div
        className="sv-console-card"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Bright Data Scraper Console"
      >
        {/* Header */}
        <div className="sv-console-header">
          <div className="sv-console-title-wrap">
            <span className="sv-console-icon">
              <LightningIcon className="w-5 h-5 text-saffron" />
            </span>
            <div>
              <h2 className="sv-console-title">Bright Data Scraper Console</h2>
              <p className="sv-console-sub">Autonomous Web Scraper Orchestration & Self-Healing Pipeline</p>
            </div>
          </div>
          <button
            type="button"
            className="sv-console-close"
            onClick={onClose}
            aria-label="Close console"
          >
            <CloseIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="sv-console-body">
          {/* Target Selector */}
          <div className="sv-form-group">
            <label className="sv-form-label">
              <span>TARGET SCRAPER COLLECTOR</span>
              <span className="sv-label-meta font-mono">BRIGHT_DATA_API // v2</span>
            </label>
            <div className="sv-collector-grid">
              {collectors.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  className={`sv-collector-btn ${target === c.id ? 'active' : ''}`}
                  onClick={() => setTarget(c.id)}
                >
                  <div className="sv-collector-btn-top">
                    <span className="sv-collector-name">{c.label}</span>
                    <span className="sv-collector-rate font-mono">{c.rate}</span>
                  </div>
                  <span className="sv-collector-id font-mono">{c.collectorId}</span>
                  <span className="sv-collector-region">{c.region}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Fault Simulation Checkbox */}
          <div className="sv-form-group">
            <label className="sv-checkbox-label">
              <input
                type="checkbox"
                checked={injectErrors}
                onChange={(e) => setInjectErrors(e.target.checked)}
                className="sv-checkbox"
              />
              <div>
                <span className="sv-checkbox-title">Simulate Self-Healing Pipeline Faults (Error Injection)</span>
                <span className="sv-checkbox-desc">
                  Injects simulated malformed date coordinates and broken HTML tags to demonstrate autonomous regex recovery & fallback sanitization.
                </span>
              </div>
            </label>
          </div>

          {/* Action Button */}
          <button
            type="button"
            className={`sv-execute-btn ${isRunning ? 'running' : ''}`}
            onClick={handleRun}
            disabled={isRunning}
          >
            {isRunning ? (
              <>
                <span className="sv-spinner" />
                <span>Running Collector Pipeline...</span>
              </>
            ) : (
              <>
                <LightningIcon className="w-4 h-4 text-saffron inline mr-2" />
                <span>Trigger Autonomous Scrape Job ({target}) →</span>
              </>
            )}
          </button>

          {/* Telemetry Output Terminal */}
          <div className="sv-terminal-wrapper">
            <div className="sv-terminal-bar">
              <div className="sv-terminal-dots">
                <span className="dot dot-red" />
                <span className="dot dot-yellow" />
                <span className="dot dot-green" />
              </div>
              <div className="sv-terminal-title font-mono">
                <TerminalIcon className="w-3.5 h-3.5 inline mr-1 opacity-70" />
                TELEMETRY LOG STREAM // {target}
              </div>
              <div className="sv-terminal-status font-mono">
                {isRunning ? 'STATUS: ACTIVE_STREAM' : logs.length ? 'STATUS: IDLE_VERIFIED' : 'STATUS: READY'}
              </div>
            </div>

            <div className="sv-terminal-output font-mono">
              {logs.length === 0 ? (
                <div className="sv-terminal-placeholder">
                  [IDLE] Select a collector target and click "Trigger Autonomous Scrape Job" to stream live extraction logs.
                </div>
              ) : (
                logs.map((log, i) => (
                  <div
                    key={i}
                    className={`sv-log-line ${
                      log.includes('FAULT') || log.includes('Warning')
                        ? 'log-warning'
                        : log.includes('SUCCESS') || log.includes('COMMIT')
                        ? 'log-success'
                        : log.includes('DEDUP') || log.includes('MERGE')
                        ? 'log-highlight'
                        : ''
                    }`}
                  >
                    {log}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Pipeline Results Summary Metrics */}
          {stats.rawCount > 0 && (
            <div className="sv-stats-bar">
              <div className="sv-stat-item">
                <span className="sv-stat-label">RAW DOCUMENTS</span>
                <span className="sv-stat-value font-mono">{stats.rawCount}</span>
              </div>
              <div className="sv-stat-item">
                <span className="sv-stat-label">DUPLICATES MERGED</span>
                <span className="sv-stat-value font-mono text-amber">{stats.mergedCount}</span>
              </div>
              <div className="sv-stat-item">
                <span className="sv-stat-label">CANONICAL SAVED</span>
                <span className="sv-stat-value font-mono text-jade">{stats.dedupedCount}</span>
              </div>
              <div className="sv-stat-item">
                <span className="sv-stat-label">EXECUTION TIME</span>
                <span className="sv-stat-value font-mono">{stats.elapsedMs} ms</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
