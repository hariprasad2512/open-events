import { useState } from 'react';

const RAW_LOGS = [
  `[00:48:22] FETCH GET https://aroundu.in/city/hyderabad HTTP/1.1 200 OK (214ms)`,
  `[00:48:23] BRIGHT_DATA_COLLECTOR: Extracted 42 event cards from AroundU DOM`,
  `[00:48:23] HEALTH_VALIDATOR: Schema check PASS [title: OK, date: OK, area: OK]`,
  `[00:48:24] PARSER: Extracted "LITJAM Hyderabad: Pyaar & Dosti Jam" -> Venue: Jammin Junction`,
  `[00:48:24] DEDUP_ENGINE: Matching title against SQLite cache... 1 duplicate merged`,
  `[00:48:25] DB_SYNC: 38 unique events written to sqlite:///OpenEvents.db`,
  `[00:48:25] DIGEST_GEN: Weekly digest updated for Hyderabad (9 categories active)`
];

export default function ScraperTelemetryWidget() {
  const [activePlatform, setActivePlatform] = useState('AroundU');
  const [isRunningSim, setIsRunningSim] = useState(false);
  const [logOffset, setLogOffset] = useState(RAW_LOGS.length);

  const handleRunSim = () => {
    setIsRunningSim(true);
    setLogOffset(2);
    const interval = setInterval(() => {
      setLogOffset((prev) => {
        if (prev >= RAW_LOGS.length) {
          clearInterval(interval);
          setIsRunningSim(false);
          return RAW_LOGS.length;
        }
        return prev + 1;
      });
    }, 400);
  };

  return (
    <div className="telemetry-widget-card">
      <div className="telemetry-widget-header">
        <div className="header-status-pill">
          <span className={`status-dot ${isRunningSim ? 'pulsing-yellow' : 'active-green'}`} />
          <span>{isRunningSim ? 'SCRAPING IN PROGRESS' : 'COLLECTOR ENGINE IDLE'}</span>
        </div>
        <div className="platform-selectors">
          {['AroundU', 'FullHyd', 'HydHub'].map((p) => (
            <button
              key={p}
              onClick={() => setActivePlatform(p)}
              className={`platform-btn ${activePlatform === p ? 'active' : ''}`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="telemetry-grid">
        {/* Metric 1 */}
        <div className="telemetry-metric-box">
          <span className="metric-label">Active Scraper Node</span>
          <span className="metric-value text-cyan">{activePlatform}</span>
          <span className="metric-sub">Bright Data Scraper Studio</span>
        </div>

        {/* Metric 2 */}
        <div className="telemetry-metric-box">
          <span className="metric-label">Validation Health</span>
          <span className="metric-value text-emerald">99.8%</span>
          <span className="metric-sub">Self-healing fallback armed</span>
        </div>

        {/* Metric 3 */}
        <div className="telemetry-metric-box">
          <span className="metric-label">Processed Events</span>
          <span className="metric-value text-violet">248 Events</span>
          <span className="metric-sub">Hyderabad metropolitan area</span>
        </div>

        {/* Metric 4 */}
        <div className="telemetry-metric-box">
          <span className="metric-label">API Latency</span>
          <span className="metric-value text-amber">14ms</span>
          <span className="metric-sub">FastAPI async endpoint</span>
        </div>
      </div>

      {/* Live Terminal Log Box */}
      <div className="telemetry-terminal-box">
        <div className="terminal-top">
          <span className="terminal-dots">
            <span className="dot red" />
            <span className="dot yellow" />
            <span className="dot green" />
          </span>
          <span className="terminal-title">scraper_collector_stdout.log</span>
          <button
            onClick={handleRunSim}
            disabled={isRunningSim}
            className="terminal-run-btn"
          >
            {isRunningSim ? 'Executing Scraper...' : '▶ Re-run Live Telemetry Simulation'}
          </button>
        </div>
        <div className="terminal-body">
          {RAW_LOGS.slice(0, logOffset).map((line, idx) => (
            <div key={idx} className="terminal-line">
              <span className="log-arrow">❯</span> {line}
            </div>
          ))}
          {isRunningSim && (
            <div className="terminal-line typing">
              <span className="log-arrow">❯</span> [STREAM] Fetching DOM nodes...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
