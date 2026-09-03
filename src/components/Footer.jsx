import React, { useState } from 'react';
import { Activity, Mail, Heart, ArrowRight } from 'lucide-react';

export default function Footer({ onStartJourney }) {
  const [pilotEmail, setPilotEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmitPilot = (e) => {
    e.preventDefault();
    if (pilotEmail) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setPilotEmail('');
      }, 4000);
    }
  };

  return (
    <footer style={{ backgroundColor: '#0D100F', color: '#FAF8F5', paddingTop: '90px', paddingBottom: '50px', position: 'relative', overflow: 'hidden' }}>
      
      {/* Subtle Glow */}
      <div style={{ position: 'absolute', top: 0, right: 0, width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(31,61,56,0.3) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div className="editorial-container">
        
        {/* 14 — FINAL CTA: "Give Every Patient More Time To Be Heard." */}
        <div style={{
          background: 'linear-gradient(135deg, #183530 0%, #10211E 100%)',
          borderRadius: '32px',
          padding: '56px 40px',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          boxShadow: '0 24px 60px rgba(0, 0, 0, 0.4)',
          marginBottom: '70px',
          textAlign: 'center',
          maxWidth: '1080px',
          margin: '0 auto 70px'
        }}>
          
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 18px', borderRadius: '9999px', backgroundColor: 'rgba(255, 255, 255, 0.1)', color: 'var(--c-cyan)', fontFamily: 'var(--font-lemon)', fontSize: '10px', letterSpacing: '0.14em', marginBottom: '24px' }}>
            <Heart style={{ width: '13px', height: '13px', color: '#D96B50' }} />
            <span>14 — HUMAN-CENTERED HEALTHCARE AI</span>
          </div>

          {/* Single-Line Desktop Final CTA */}
          <h2 className="section-title heading-single-line" style={{
            fontSize: 'clamp(2.2rem, 4.4vw, 4.2rem)',
            fontWeight: 400,
            color: '#FFFFFF',
            marginBottom: '20px'
          }}>
            “Give Every Patient More Time To Be Heard.”
          </h2>

          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(0.95rem, 1.6vw, 1.2rem)',
            color: 'rgba(255, 255, 255, 0.82)',
            maxWidth: '720px',
            margin: '0 auto 36px',
            lineHeight: 1.6
          }}>
            Deploy MediKiosk in your outpatient network to eliminate OPD history-taking bottlenecks, reduce physician burnout, and ensure no clinical symptom goes unnoticed.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '36px' }}>
            <button
              onClick={onStartJourney}
              className="btn-editorial-primary"
            >
              <span>TEST INTERACTIVE INTAKE</span>
              <ArrowRight style={{ width: '16px', height: '16px', color: '#1F3D38' }} />
            </button>
          </div>

          {/* Pilot Inquiry Form */}
          <div style={{ paddingTop: '24px', borderTop: '1px solid rgba(255, 255, 255, 0.1)', maxWidth: '440px', margin: '0 auto' }}>
            <form onSubmit={handleSubmitPilot} style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <input
                type="email"
                required
                value={pilotEmail}
                onChange={(e) => setPilotEmail(e.target.value)}
                placeholder="Hospital / Clinic Administration Email"
                style={{
                  flex: 1,
                  minWidth: '220px',
                  padding: '12px 18px',
                  borderRadius: '9999px',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: '#FFFFFF',
                  fontSize: '11px',
                  outline: 'none'
                }}
              />
              <button
                type="submit"
                style={{
                  padding: '12px 22px',
                  borderRadius: '9999px',
                  backgroundColor: 'var(--c-cyan)',
                  color: '#111413',
                  fontFamily: 'var(--font-lemon)',
                  fontSize: '11px',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                {isSubmitted ? 'Sent!' : 'Request Pilot'}
              </button>
            </form>
            {isSubmitted && (
              <p style={{ fontSize: '10px', color: '#52B788', marginTop: '8px', fontFamily: 'var(--font-lemon)' }}>
                ✓ Clinical briefing kit dispatched.
              </p>
            )}
          </div>

        </div>

        {/* Footer Brand Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '36px', paddingBottom: '48px', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', fontSize: '11px', color: 'rgba(255, 255, 255, 0.7)' }}>
          
          <div style={{ gridColumn: 'span 2' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
              <div style={{ width: '34px', height: '34px', borderRadius: '10px', backgroundColor: 'var(--c-teal)', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF' }}>
                <Activity style={{ width: '16px', height: '16px', color: 'var(--c-cyan)' }} />
              </div>
              <span style={{ fontFamily: 'var(--font-sagull)', fontSize: '26px', fontWeight: 'bold', color: '#FFFFFF' }}>
                MEDIKIOSK
              </span>
            </div>
            <p style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.6)', lineHeight: 1.6, maxWidth: '380px', marginBottom: '10px' }}>
              An intelligent physical clinical intake and triage station engineered for high-volume outpatient departments. Digitizing medical narratives into structured clinical intelligence before consultation begins.
            </p>
            <span style={{ fontFamily: 'var(--font-lemon)', fontSize: '9px', color: 'var(--c-cyan)' }}>
              Engineered for Global Healthcare Outpatient Workflows
            </span>
          </div>

          <div>
            <span style={{ fontFamily: 'var(--font-lemon)', fontSize: '10px', color: '#FFFFFF', display: 'block', marginBottom: '12px' }}>Platform</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <a href="#story" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>01 Problem</a>
              <a href="#opportunity" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>02 Opportunity</a>
              <a href="#patient-journey" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>03 Patient Journey</a>
              <a href="#ayush" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>04 AYUSH Mode</a>
              <a href="#abdm-privacy" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>05 ABDM & Privacy</a>
            </div>
          </div>

          <div>
            <span style={{ fontFamily: 'var(--font-lemon)', fontSize: '10px', color: '#FFFFFF', display: 'block', marginBottom: '12px' }}>Compliance</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '10px' }}>
              <span>• ABDM Level-3 Sandbox Architecture</span>
              <span>• HL7 FHIR R4 Schema Standard</span>
              <span>• ISO 13485 Medical Devices Engineering</span>
              <span>• DPDP Act Zero-Retention Compliance</span>
            </div>
          </div>

          <div>
            <span style={{ fontFamily: 'var(--font-lemon)', fontSize: '10px', color: '#FFFFFF', display: 'block', marginBottom: '12px' }}>Contact</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', fontSize: '11px' }}>
              <span>clinical@medikiosk.ai</span>
              <span>Outpatient Systems Group</span>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div style={{ paddingTop: '24px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '14px', fontSize: '10px', color: 'rgba(255, 255, 255, 0.4)', fontFamily: 'var(--font-lemon)' }}>
          <span>© 2026 MediKiosk Health Systems. All rights reserved.</span>
          <div style={{ display: 'flex', gap: '20px' }}>
            <span>Prototype Demonstration Mode</span>
            <span>Zero-Retention Privacy Policy</span>
            <span>Clinical Verification Terms</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
