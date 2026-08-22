import { useEffect, useRef, useState } from 'react';

export default function TaglineReveal() {
  const sectionRef = useRef(null);
  const [activeWordIndex, setActiveWordIndex] = useState(-1);

  const text = "City leisure events continuously gathered, parsed, deduplicated, and delivered into a single verified stream.";
  const words = text.split(' ');

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    let observer;
    let handleScroll;

    // Use IntersectionObserver to start scroll ratio tracking when in view
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            handleScroll = () => {
              const rect = el.getBoundingClientRect();
              const windowHeight = window.innerHeight;
              
              // Calculate how far through the element we have scrolled (0 to 1)
              const start = windowHeight * 0.85;
              const end = windowHeight * 0.25;
              const current = rect.top;
              
              let progress = (start - current) / (start - end);
              progress = Math.max(0, Math.min(1, progress));
              
              const wordIdx = Math.floor(progress * words.length);
              setActiveWordIndex(wordIdx);
            };

            window.addEventListener('scroll', handleScroll, { passive: true });
            handleScroll();
          } else {
            if (handleScroll) {
              window.removeEventListener('scroll', handleScroll);
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(el);

    return () => {
      if (observer) observer.disconnect();
      if (handleScroll) window.removeEventListener('scroll', handleScroll);
    };
  }, [words.length]);

  return (
    <section ref={sectionRef} className="tagline-reveal-section">
      <div className="tagline-container">
        <div className="tagline-badge">[CORE PROMISE // HYD REALTIME]</div>
        <p className="tagline-text">
          {words.map((word, idx) => {
            const isLit = idx <= activeWordIndex;
            return (
              <span
                key={idx}
                className={`tagline-word ${isLit ? 'is-lit' : ''}`}
                style={{
                  transitionDelay: `${(idx % 4) * 20}ms`
                }}
              >
                {word}{' '}
              </span>
            );
          })}
        </p>
        <div className="tagline-meta-row">
          <span className="tagline-stat">✦ 3 Active Web Platforms</span>
          <span className="tagline-stat">✦ Fuzzy Record Matching</span>
          <span className="tagline-stat">✦ Zero Storage Bloat</span>
        </div>
      </div>
    </section>
  );
}
