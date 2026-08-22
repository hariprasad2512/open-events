import { useState } from 'react';

const DEDUP_SAMPLES = [
  {
    id: 'sample-1',
    title: 'LITJAM Hyderabad: Pyaar & Dosti Jam',
    category: 'Music',
    date: '2026-08-23',
    time: '17:00',
    venue: 'Jammin Junction Bar & Kitchen',
    area: 'Jubilee Hills',
    matchScore: 98.4,
    sourceA: {
      platform: 'AroundU',
      rawTitle: 'LITJAM Hyderabad: Pyaar Aur Yaari Ka Musical Night',
      price: '₹349',
      url: 'https://aroundu.in/plan/hyd-litjam-63B3E'
    },
    sourceB: {
      platform: 'FullHyd Events',
      rawTitle: 'LitJam Music Evening Hyderabad',
      price: '₹350',
      url: 'https://events.fullhyderabad.com/litjam-music'
    }
  },
  {
    id: 'sample-2',
    title: "Entrepreneur's Mixer Hyderabad",
    category: 'Talks & Meetups',
    date: '2026-08-29',
    time: '17:00',
    venue: 'Madhapur Executive Hub',
    area: 'Madhapur',
    matchScore: 96.8,
    sourceA: {
      platform: 'AroundU',
      rawTitle: "Entrepreneur's Mixer (Hyderabad)",
      price: '₹500',
      url: 'https://aroundu.in/plan/hyd-entrepreneur-s-BFBD1'
    },
    sourceB: {
      platform: 'HydHub',
      rawTitle: 'Hyderabad Founders & Business Mixer',
      price: '₹500',
      url: 'https://hydhub.in/events/entrepreneurs-mixer'
    }
  }
];

export default function DeduplicationVisualizer() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [isMerged, setIsMerged] = useState(true);

  const sample = DEDUP_SAMPLES[selectedIdx];

  return (
    <div className="dedup-visualizer-card">
      <div className="dedup-card-header">
        <div className="dedup-header-left">
          <span className="telemetry-badge">[FUZZY_MATCH_ENGINE // RAPID_FUZZ_V3]</span>
          <h3 className="dedup-title">Multi Source Deduplication Matrix</h3>
        </div>
        <div className="dedup-controls">
          {DEDUP_SAMPLES.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setSelectedIdx(i)}
              className={`dedup-tab-btn ${selectedIdx === i ? 'active' : ''}`}
            >
              Event #{i + 1}
            </button>
          ))}
          <button
            onClick={() => setIsMerged(!isMerged)}
            className="dedup-toggle-btn"
          >
            {isMerged ? 'View Unmerged Sources' : 'View Merged Canonical'}
          </button>
        </div>
      </div>

      <div className="dedup-card-body">
        {!isMerged ? (
          /* Split View showing raw unmerged platform entries */
          <div className="dedup-split-grid">
            <div className="raw-source-box source-a">
              <div className="source-box-header">
                <span className="source-tag aroundu">AroundU payload</span>
                <span className="source-confidence">Raw Entry #104</span>
              </div>
              <h4 className="raw-title">{sample.sourceA.rawTitle}</h4>
              <div className="raw-meta-grid">
                <span>Date: {sample.date}</span>
                <span>Time: {sample.time}</span>
                <span>Price: {sample.sourceA.price}</span>
              </div>
              <p className="raw-url">{sample.sourceA.url}</p>
            </div>

            <div className="dedup-vs-badge">
              <span className="vs-circle">VS</span>
              <span className="match-pct">{sample.matchScore}% Match</span>
            </div>

            <div className="raw-source-box source-b">
              <div className="source-box-header">
                <span className="source-tag fullhyd">{sample.sourceB.platform} payload</span>
                <span className="source-confidence">Raw Entry #89</span>
              </div>
              <h4 className="raw-title">{sample.sourceB.rawTitle}</h4>
              <div className="raw-meta-grid">
                <span>Date: {sample.date}</span>
                <span>Time: {sample.time}</span>
                <span>Price: {sample.sourceB.price}</span>
              </div>
              <p className="raw-url">{sample.sourceB.url}</p>
            </div>
          </div>
        ) : (
          /* Merged Canonical View */
          <div className="dedup-canonical-box">
            <div className="canonical-badge-row">
              <span className="canonical-tag">✦ Single Verified Canonical Event</span>
              <span className="confidence-chip">Similarity Score: {sample.matchScore}%</span>
            </div>

            <div className="canonical-content">
              <div className="canonical-main">
                <span className="canonical-category">{sample.category}</span>
                <h3 className="canonical-title">{sample.title}</h3>
                <div className="canonical-details-row">
                  <span>📅 {sample.date} at {sample.time}</span>
                  <span>📍 {sample.venue}, {sample.area}</span>
                  <span>💳 {sample.sourceA.price}</span>
                </div>
              </div>

              <div className="canonical-sources-linked">
                <span className="linked-label">De-duplicated across {2} distinct sources:</span>
                <div className="sources-chips">
                  <a href={sample.sourceA.url} target="_blank" rel="noreferrer" className="chip aroundu">
                    AroundU ↗
                  </a>
                  <a href={sample.sourceB.url} target="_blank" rel="noreferrer" className="chip fullhyd">
                    {sample.sourceB.platform} ↗
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="dedup-card-footer">
        <span className="footer-telemetry">✦ Algorithm: token_set_ratio threshold ≥ 85.0</span>
        <span className="footer-telemetry">✦ Auto Normalization: Standard ISO dates + area resolution</span>
      </div>
    </div>
  );
}
