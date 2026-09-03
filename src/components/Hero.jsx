import React from 'react';
import { ChevronRight, Stethoscope } from 'lucide-react';

export default function Hero({ onStartJourney, onExplorePhysician }) {
  return (
    <section className="hero-wrapper">
      {/* 
        FULLSCREEN CINEMATIC MP4 VIDEO BACKGROUND
        Edge-to-edge, absolute inset 0, object-fit: cover, loop, muted, playsInline.
        Public Asset: /videos/GENERATE_IT.mp4
      */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="hero-video-bg"
      >
        <source src="/videos/GENERATE_IT.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Subtle Film Grading Overlays (for text contrast only) */}
      <div className="hero-film-overlay" />
      <div className="hero-vignette" />

      {/* Hero Content Sitting Directly on Top of the Video */}
      <div className="hero-content-container">
        
        {/* Kicker Label */}
        <div className="hero-kicker-pill">
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#52B788', display: 'inline-block' }}></span>
          <span>AI CLINICAL INTAKE PLATFORM</span>
        </div>

        {/* Single-Line Desktop Editorial Headline */}
        <h1 className="hero-headline heading-single-line">
          Turn Patient Stories Into <em>Clinical Intelligence.</em>
        </h1>

        {/* Refined Supporting Text */}
        <p className="hero-subtext">
          MediKiosk captures patient history, digitizes medical records and prepares a structured clinical summary before consultation.
        </p>

        {/* Action Buttons */}
        <div className="hero-buttons-row">
          <button
            onClick={onStartJourney}
            className="btn-editorial-primary"
          >
            <span>START PATIENT JOURNEY</span>
            <ChevronRight style={{ width: '16px', height: '16px', color: '#1F3D38' }} />
          </button>

          <button
            onClick={onExplorePhysician}
            className="btn-editorial-glass"
          >
            <Stethoscope style={{ width: '16px', height: '16px', color: '#79BFBC' }} />
            <span>EXPLORE PHYSICIAN EXPERIENCE</span>
          </button>
        </div>

        {/* Telemetry Ticker */}
        <div className="hero-ticker-row">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#52B788' }}></span>
            <span>14 Indian Languages</span>
          </div>
          <span style={{ opacity: 0.35 }}>•</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#52B788' }}></span>
            <span>ABDM / ABHA Architecture</span>
          </div>
          <span style={{ opacity: 0.35 }}>•</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#52B788' }}></span>
            <span>Zero Physician Typing</span>
          </div>
        </div>

      </div>
    </section>
  );
}
