import React from 'react';

export default function AboutUsPage() {
  return (
    <div className="sv-page" style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '1rem'
    }}>
      
      {/* Main Glassmorphism Card */}
      <div style={{
        maxWidth: '850px', 
        width: '90%', 
        margin: '0 auto', 
        padding: '4rem', 
        position: 'relative',
        background: 'rgba(10, 14, 40, 0.45)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '24px',
        boxShadow: '0 24px 64px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.1), 0 0 80px rgba(255, 255, 255, 0.03)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
      }}>
        
        {/* Decorative HUD Reticles */}
        <span className="font-mono" style={{ position: 'absolute', top: 20, left: 20, color: 'rgba(255,255,255,0.2)', fontSize: '1rem', lineHeight: 1 }}>+</span>
        <span className="font-mono" style={{ position: 'absolute', top: 20, right: 20, color: 'rgba(255,255,255,0.2)', fontSize: '1rem', lineHeight: 1 }}>+</span>
        <span className="font-mono" style={{ position: 'absolute', bottom: 20, left: 20, color: 'rgba(255,255,255,0.2)', fontSize: '1rem', lineHeight: 1 }}>+</span>
        <span className="font-mono" style={{ position: 'absolute', bottom: 20, right: 20, color: 'rgba(255,255,255,0.2)', fontSize: '1rem', lineHeight: 1 }}>+</span>

        {/* Header Section */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h1 className="sv-page-title font-serif" style={{ fontSize: '4.5rem', margin: '0 0 2rem 0', background: 'linear-gradient(to right, #ffffff, #9ca3af)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            TeamX
          </h1>
          <p className="sv-page-desc font-mono" style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.7)', margin: '0', lineHeight: 1.8 }}>
            For this <a href="https://www.wemakedevs.org/hackathons/scrape-verse" target="_blank" rel="noreferrer" style={{ color: '#e5e7eb', textDecoration: 'none', borderBottom: '1px solid rgba(255, 255, 255, 0.3)', paddingBottom: '2px', transition: 'all 0.2s ease' }} onMouseEnter={(e) => e.currentTarget.style.borderBottomColor = '#ffffff'} onMouseLeave={(e) => e.currentTarget.style.borderBottomColor = 'rgba(255, 255, 255, 0.3)'}>hackathon</a>, we built <strong>OpenEvents</strong>—an autonomous, self-healing data pipeline that solves the problem of scattered city events. We engineered custom web scrapers using Bright Data to continuously extract leisure events from multiple independent platforms across Hyderabad. 
            <br/><br/>
            Our backend ingests this raw data, applies fuzzy string matching (Levenshtein distance) to eliminate cross-posted duplicates, and normalizes it into a unified schema. The result is a clean, real-time cultural digest of the city, served through a high-performance React dashboard.
          </p>
        </div>

        {/* Team LinkedIn Links */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem', flexWrap: 'wrap' }}>
          <a href="https://linkedin.com/in/pranavsinghpatil" target="_blank" rel="noreferrer" style={{ color: '#e5e7eb', textDecoration: 'none', border: '1px solid rgba(255, 255, 255, 0.15)', padding: '0.6rem 1.2rem', borderRadius: '8px', background: 'rgba(255, 255, 255, 0.03)', fontSize: '0.85rem', transition: 'all 0.2s ease' }} className="font-mono" onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)'; }} onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)'; }}>
            PRANAV SINGH PATIL ↗
          </a>
          <a href="https://linkedin.com/in/hariprasad-anuganti" target="_blank" rel="noreferrer" style={{ color: '#e5e7eb', textDecoration: 'none', border: '1px solid rgba(255, 255, 255, 0.15)', padding: '0.6rem 1.2rem', borderRadius: '8px', background: 'rgba(255, 255, 255, 0.03)', fontSize: '0.85rem', transition: 'all 0.2s ease' }} className="font-mono" onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)'; }} onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)'; }}>
            HARIPRASAD ANUGANTI ↗
          </a>
          <a href="https://linkedin.com/in/vivekpatil017" target="_blank" rel="noreferrer" style={{ color: '#e5e7eb', textDecoration: 'none', border: '1px solid rgba(255, 255, 255, 0.15)', padding: '0.6rem 1.2rem', borderRadius: '8px', background: 'rgba(255, 255, 255, 0.03)', fontSize: '0.85rem', transition: 'all 0.2s ease' }} className="font-mono" onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)'; }} onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)'; }}>
            VIVEK PATIL ↗
          </a>
        </div>

      </div>
    </div>
  );
}
