import React, { useState, useEffect } from 'react';
import { Activity, Sparkles, ChevronRight, Menu, X } from 'lucide-react';

export default function Navbar({ onStartKiosk, onOpenDoctor, isAyushMode, onToggleAyush }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`navbar-floating ${scrolled ? 'navbar-scrolled' : 'navbar-transparent'}`}>
      <div className="nav-container">
        
        {/* Brand Logo & Editorial Wordmark */}
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '12px',
            backgroundColor: '#1F3D38',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FAF8F5',
            boxShadow: '0 4px 14px rgba(0, 0, 0, 0.25)'
          }}>
            <Activity style={{ width: '18px', height: '18px', color: '#79BFBC' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{
              fontFamily: 'var(--font-sagull)',
              fontSize: '26px',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              color: scrolled ? '#111413' : '#FFFFFF',
              lineHeight: 1
            }}>
              MEDIKIOSK
            </span>
            <span style={{
              fontFamily: 'var(--font-lemon)',
              fontSize: '8px',
              color: scrolled ? '#57605D' : 'rgba(255, 255, 255, 0.75)',
              marginTop: '3px',
              letterSpacing: '0.12em'
            }}>
              Clinical Intake & Triage
            </span>
          </div>
        </a>

        {/* Live Hospital Status Ticker Pill (Hidden on Mobile) */}
        <div className="nav-status-ticker" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '6px 16px',
          borderRadius: '9999px',
          fontFamily: 'var(--font-lemon)',
          fontSize: '11px',
          letterSpacing: '0.12em',
          backgroundColor: scrolled ? '#F3EFE6' : 'rgba(255, 255, 255, 0.12)',
          color: scrolled ? '#1F3D38' : 'rgba(255, 255, 255, 0.95)',
          border: scrolled ? '1px solid rgba(31, 61, 56, 0.15)' : '1px solid rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(12px)'
        }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#52B788' }}></span>
          <span>ABDM M3 Certified</span>
          <span style={{ opacity: 0.4 }}>•</span>
          <span>FHIR R4 Schema</span>
          <span style={{ opacity: 0.4 }}>•</span>
          <span>Active OPD Deployment</span>
        </div>

        {/* Desktop Nav Links */}
        <nav className="nav-links">
          {[
            { label: 'Problem', href: '#story' },
            { label: 'Opportunity', href: '#opportunity' },
            { label: 'Patient Journey', href: '#patient-journey' },
            { label: 'Physician Suite', href: '#patient-journey' },
            { label: 'AYUSH Mode', href: '#ayush' },
            { label: 'ABDM & Privacy', href: '#abdm-privacy' }
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="nav-link"
              style={{
                color: scrolled ? '#242B28' : 'rgba(255, 255, 255, 0.9)',
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right Actions & Mobile Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          
          {/* AYUSH Switcher Pill */}
          <button
            onClick={onToggleAyush}
            style={{
              padding: '7px 14px',
              borderRadius: '9999px',
              fontFamily: 'var(--font-lemon)',
              fontSize: '10px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              border: isAyushMode ? '1px solid #D96B50' : scrolled ? '1px solid rgba(17, 20, 19, 0.15)' : '1px solid rgba(255, 255, 255, 0.25)',
              backgroundColor: isAyushMode ? '#D96B50' : scrolled ? 'transparent' : 'rgba(255, 255, 255, 0.12)',
              color: isAyushMode ? '#FFFFFF' : scrolled ? '#111413' : '#FFFFFF',
              cursor: 'pointer',
              transition: 'all 0.25s ease'
            }}
          >
            <Sparkles style={{ width: '13px', height: '13px' }} />
            <span>{isAyushMode ? 'AYUSH OPD' : 'Allopathic OPD'}</span>
          </button>

          {/* Primary CTA (Desktop) */}
          <button
            onClick={onStartKiosk}
            className="btn-teal"
            style={{ display: 'none' }}
            id="desktop-cta-btn"
          >
            <span>Start Patient Intake</span>
            <ChevronRight style={{ width: '14px', height: '14px', color: '#79BFBC' }} />
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              padding: '8px',
              borderRadius: '10px',
              border: scrolled ? '1px solid rgba(17, 20, 19, 0.15)' : '1px solid rgba(255, 255, 255, 0.25)',
              backgroundColor: scrolled ? 'transparent' : 'rgba(0, 0, 0, 0.3)',
              color: scrolled ? '#111413' : '#FFFFFF',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X style={{ width: '20px', height: '20px' }} /> : <Menu style={{ width: '20px', height: '20px' }} />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-nav-drawer">
          <a href="#story" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>01 Problem: Every Patient Has A Story</a>
          <a href="#opportunity" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>02 Opportunity: What If The Story Arrived Before?</a>
          <a href="#patient-journey" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>03 Patient Journey & Intake Kiosk</a>
          <a href="#ayush" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>04 AYUSH Dashavidha Pariksha</a>
          <a href="#abdm-privacy" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>05 ABDM & Privacy Architecture</a>
          
          <div style={{ paddingTop: '12px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button
              onClick={() => {
                onStartKiosk();
                setMobileMenuOpen(false);
              }}
              className="btn-teal"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <span>Start Patient Intake</span>
              <ChevronRight style={{ width: '14px', height: '14px' }} />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
