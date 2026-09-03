import React, { useState } from 'react';
import { AlertCircle, Sparkles, ArrowRight, Clock, FileText, CheckCircle2 } from 'lucide-react';

export default function PatientStorySection({ onStartJourney }) {
  const [viewMode, setViewMode] = useState('transformed'); // 'raw' or 'transformed'

  return (
    <div>
      {/* ========================================================================= */}
      {/* 01 — PROBLEM: EVERY PATIENT HAS A STORY */}
      {/* ========================================================================= */}
      <section id="story" className="editorial-section" style={{ backgroundColor: 'var(--c-warm-white)', borderBottom: '1px solid var(--c-border)' }}>
        
        {/* Background Editorial Watermark */}
        <div style={{
          position: 'absolute',
          top: '30px',
          right: '40px',
          fontSize: '220px',
          fontFamily: 'var(--font-sagull)',
          fontWeight: 300,
          color: 'rgba(31, 61, 56, 0.03)',
          lineHeight: 1,
          userSelect: 'none',
          pointerEvents: 'none'
        }}>
          01
        </div>

        <div className="editorial-container">
          
          {/* Section Header */}
          <div style={{ maxWidth: '960px', marginBottom: '56px' }}>
            <div className="section-kicker">
              <span>01 — THE OPD BOTTLENECK</span>
            </div>
            {/* Single-Line Desktop Heading */}
            <h2 className="section-title heading-single-line">
              Every Patient Has A Story.
            </h2>
            <p className="section-subtitle">
              In high-volume hospital outpatient departments, patients carry decades of complex medical history inside plastic bags—unindexed prescriptions, faded thermal receipts, and lab reports from multiple facilities.
            </p>
          </div>

          {/* Layered Cards Composition of Fragmented Patient Data */}
          <div className="grid-12" style={{ marginBottom: '56px', alignItems: 'stretch' }}>
            
            {/* Card A: Scanned Crumpled Prescription */}
            <div className="col-4 editorial-card" style={{ padding: '32px', transform: 'rotate(-1deg)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '12px', borderBottom: '1px solid var(--c-border)', marginBottom: '16px' }}>
                <span style={{ fontFamily: 'var(--font-lemon)', fontSize: '10px', color: 'var(--c-coral)' }}>Prior Handwritten Prescription</span>
                <span style={{ fontFamily: 'monospace', fontSize: '11px', color: '#84908C' }}>Historical Record</span>
              </div>
              <p style={{ fontFamily: 'var(--font-human)', fontSize: '24px', color: '#1A365D', lineHeight: 1.3, marginBottom: '16px' }}>
                “Tab Telmisartan 40mg OD, Atorva 20mg HS... patient reports chest heaviness on walking.”
              </p>
              <div style={{ fontSize: '12px', color: '#57605D', paddingTop: '12px', borderTop: '1px dashed var(--c-border)' }}>
                Attending Physician • Outpatient Clinic (Unindexed paper record)
              </div>
            </div>

            {/* Card B: Laboratory Metabolic Panel in Polybag */}
            <div className="col-4 editorial-card" style={{ padding: '32px', backgroundColor: 'var(--c-cream)', transform: 'rotate(1deg)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '12px', borderBottom: '1px solid var(--c-border)', marginBottom: '16px' }}>
                <span style={{ fontFamily: 'var(--font-lemon)', fontSize: '10px', color: 'var(--c-teal)' }}>Diagnostic Laboratory Panel</span>
                <span style={{ fontFamily: 'monospace', fontSize: '10px', color: '#D96B50', fontWeight: 'bold' }}>Unreviewed Flag</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontFamily: 'monospace', fontSize: '12px', marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 10px', backgroundColor: '#FFFFFF', borderRadius: '8px' }}>
                  <span>Fasting Glucose</span>
                  <span style={{ color: '#D96B50', fontWeight: 'bold' }}>154 mg/dL [HIGH]</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 10px', backgroundColor: '#FFFFFF', borderRadius: '8px' }}>
                  <span>HbA1c Glycated Hgb</span>
                  <span style={{ color: '#D96B50', fontWeight: 'bold' }}>7.9 % [HIGH]</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 10px', backgroundColor: '#FFFFFF', borderRadius: '8px' }}>
                  <span>Serum Creatinine</span>
                  <span style={{ color: 'var(--c-teal)', fontWeight: 'bold' }}>1.12 mg/dL [NORM]</span>
                </div>
              </div>
              <div style={{ fontSize: '12px', color: '#57605D' }}>
                Reference Diagnostic Center • Buried under multiple past lab sheets
              </div>
            </div>

            {/* Card C: The Human Voice & Patient Quote */}
            <div className="col-4 doctor-note" style={{ padding: '32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '10px', borderBottom: '1px solid rgba(234, 179, 8, 0.4)', marginBottom: '16px' }}>
                <span style={{ fontFamily: 'var(--font-lemon)', fontSize: '10px', color: '#854D0E' }}>Patient Spoken Narrative</span>
                <span style={{ fontFamily: 'monospace', fontSize: '10px', color: '#854D0E' }}>Mother Tongue</span>
              </div>
              <p style={{ fontFamily: 'var(--font-human)', fontSize: '24px', color: '#1E3A8A', lineHeight: 1.35, marginBottom: '16px' }}>
                “डॉक्टर साहब, 3 दिन से सीने में बहुत भारीपन लग रहा है... आज सुबह सीढ़ियां चढ़ते समय बाएँ कंधे तक दर्द खिंचने लगा और ठंडा पसीना आने लगा।”
              </p>
              <div style={{ fontSize: '12px', color: '#854D0E', fontWeight: 600 }}>
                Spoken narrative in waiting lounge • Captured in vernacular dialect
              </div>
            </div>

          </div>

          {/* Editorial Pull Quote Spread */}
          <div style={{
            padding: '44px 52px',
            borderRadius: '32px',
            backgroundColor: 'var(--c-teal)',
            color: '#FFFFFF',
            boxShadow: '0 20px 50px rgba(31, 61, 56, 0.25)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <span style={{
              fontFamily: 'var(--font-sagull)',
              fontStyle: 'italic',
              fontSize: 'clamp(1.4rem, 2.6vw, 2.4rem)',
              color: '#FAF8F5',
              lineHeight: 1.25,
              display: 'block',
              maxWidth: '980px',
              marginBottom: '20px'
            }}>
              “The clinical bottleneck in OPD is not medical expertise. It is the four-minute cognitive rush to extract a coherent clinical narrative from scattered paper before the examination even begins.”
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontFamily: 'var(--font-lemon)', fontSize: '11px', color: 'var(--c-cyan)', letterSpacing: '0.14em' }}>
              <span>HEALTHCARE OUTPATIENT WORKFLOW</span>
              <span>•</span>
              <span>AVERAGE CONSULTATION: 3.8 MINUTES</span>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 02 — OPPORTUNITY: WHAT IF THE STORY ARRIVED BEFORE THE PATIENT? */}
      {/* ========================================================================= */}
      <section id="opportunity" className="editorial-section" style={{ backgroundColor: 'var(--c-cream)' }}>
        
        {/* Background Editorial Watermark */}
        <div style={{
          position: 'absolute',
          top: '30px',
          right: '40px',
          fontSize: '220px',
          fontFamily: 'var(--font-sagull)',
          fontWeight: 300,
          color: 'rgba(31, 61, 56, 0.03)',
          lineHeight: 1,
          userSelect: 'none',
          pointerEvents: 'none'
        }}>
          02
        </div>

        <div className="editorial-container">
          
          {/* Header with Single-Line Desktop Title */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '28px', marginBottom: '56px' }}>
            <div style={{ maxWidth: '820px' }}>
              <div className="section-kicker">
                <span>02 — THE METAMORPHOSIS</span>
              </div>
              <h2 className="section-title heading-single-line">
                What If The Story Arrived Before The Patient?
              </h2>
            </div>

            {/* Interactive Switcher */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px',
              borderRadius: '9999px',
              backgroundColor: '#FFFFFF',
              border: '1px solid var(--c-border)',
              boxShadow: '0 4px 16px rgba(0,0,0,0.05)'
            }}>
              <button
                onClick={() => setViewMode('raw')}
                style={{
                  padding: '10px 22px',
                  borderRadius: '9999px',
                  fontFamily: 'var(--font-lemon)',
                  fontSize: '11px',
                  border: 'none',
                  cursor: 'pointer',
                  backgroundColor: viewMode === 'raw' ? '#D96B50' : 'transparent',
                  color: viewMode === 'raw' ? '#FFFFFF' : '#57605D',
                  transition: 'all 0.25s ease'
                }}
              >
                Fragmented Raw Inputs
              </button>
              <button
                onClick={() => setViewMode('transformed')}
                style={{
                  padding: '10px 22px',
                  borderRadius: '9999px',
                  fontFamily: 'var(--font-lemon)',
                  fontSize: '11px',
                  border: 'none',
                  cursor: 'pointer',
                  backgroundColor: viewMode === 'transformed' ? 'var(--c-teal)' : 'transparent',
                  color: viewMode === 'transformed' ? '#FFFFFF' : '#57605D',
                  transition: 'all 0.25s ease'
                }}
              >
                Synthesized Clinical Intelligence
              </button>
            </div>
          </div>

          {/* Dynamic Transformation Card Canvas */}
          <div className="editorial-card" style={{ padding: '48px' }}>
            
            {viewMode === 'raw' ? (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#D96B50', paddingBottom: '16px', borderBottom: '1px solid var(--c-border)', marginBottom: '24px' }}>
                  <AlertCircle style={{ width: '20px', height: '20px' }} />
                  <h3 style={{ fontFamily: 'var(--font-lemon)', fontSize: '13px' }}>Unstructured Input State (Before MediKiosk)</h3>
                </div>

                <div className="grid-12">
                  <div className="col-4" style={{ padding: '24px', borderRadius: '20px', backgroundColor: 'var(--c-warm-white)', border: '1px solid var(--c-border)' }}>
                    <span style={{ fontFamily: 'var(--font-lemon)', fontSize: '10px', color: '#84908C', display: 'block', marginBottom: '8px' }}>Unheard Narrative</span>
                    <p style={{ fontFamily: 'var(--font-human)', fontSize: '20px', color: '#1A365D', lineHeight: 1.35 }}>
                      Patient speaks in vernacular dialect for 4 minutes with emotional digressions. Key cardiac red flags are buried in conversational pauses.
                    </p>
                  </div>

                  <div className="col-4" style={{ padding: '24px', borderRadius: '20px', backgroundColor: 'var(--c-warm-white)', border: '1px solid var(--c-border)' }}>
                    <span style={{ fontFamily: 'var(--font-lemon)', fontSize: '10px', color: '#84908C', display: 'block', marginBottom: '8px' }}>Unread Contraindications</span>
                    <p style={{ fontFamily: 'monospace', fontSize: '12px', color: '#D96B50', lineHeight: 1.6 }}>
                      Allergy: Sulfa drugs documented in 2019 at another facility. If unreviewed, high risk of contraindicated prescription.
                    </p>
                  </div>

                  <div className="col-4" style={{ padding: '24px', borderRadius: '20px', backgroundColor: 'var(--c-warm-white)', border: '1px solid var(--c-border)' }}>
                    <span style={{ fontFamily: 'var(--font-lemon)', fontSize: '10px', color: '#84908C', display: 'block', marginBottom: '8px' }}>Physician Burden</span>
                    <p style={{ fontSize: '13px', color: '#57605D', lineHeight: 1.6 }}>
                      Physicians must manually type demographics, ICD-10 diagnostic codes, and repetitive questions while heavy patient volume waits outside.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '12px', paddingBottom: '16px', borderBottom: '1px solid var(--c-border)', marginBottom: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--c-teal)' }}>
                    <Sparkles style={{ width: '20px', height: '20px', color: 'var(--c-cyan)' }} />
                    <h3 style={{ fontFamily: 'var(--font-lemon)', fontSize: '13px' }}>MediKiosk Synthesized State (Ready in 15 Seconds)</h3>
                  </div>
                  <span style={{ padding: '6px 14px', borderRadius: '9999px', backgroundColor: 'rgba(82, 183, 136, 0.15)', color: '#2D6A4F', fontFamily: 'var(--font-lemon)', fontSize: '11px' }}>
                    SOAP Briefing Verified • ESI 2 Priority Flag
                  </span>
                </div>

                <div className="grid-12" style={{ marginBottom: '24px' }}>
                  <div className="col-3" style={{ padding: '20px', borderRadius: '20px', backgroundColor: 'var(--c-warm-white)', border: '1px solid var(--c-border)' }}>
                    <span style={{ fontFamily: 'var(--font-lemon)', fontSize: '10px', color: 'var(--c-teal)', display: 'block', marginBottom: '6px' }}>Chief Complaint</span>
                    <p style={{ fontFamily: 'var(--font-sagull)', fontSize: '20px', fontWeight: 'bold', color: '#111413' }}>Retrosternal Heaviness</p>
                    <span style={{ fontSize: '12px', color: '#57605D', display: 'block', marginTop: '4px' }}>Exertion-triggered, radiating to left shoulder</span>
                  </div>

                  <div className="col-3" style={{ padding: '20px', borderRadius: '20px', backgroundColor: 'rgba(217, 107, 80, 0.12)', border: '1px solid rgba(217, 107, 80, 0.25)' }}>
                    <span style={{ fontFamily: 'var(--font-lemon)', fontSize: '10px', color: '#D96B50', display: 'block', marginBottom: '6px' }}>Critical Allergy Alert</span>
                    <p style={{ fontSize: '14px', fontWeight: 'bold', color: '#D96B50' }}>Sulfa Drugs (Contraindicated)</p>
                    <span style={{ fontSize: '12px', color: '#57605D', display: 'block', marginTop: '4px' }}>Extracted from 2019 discharge record</span>
                  </div>

                  <div className="col-3" style={{ padding: '20px', borderRadius: '20px', backgroundColor: 'var(--c-warm-white)', border: '1px solid var(--c-border)' }}>
                    <span style={{ fontFamily: 'var(--font-lemon)', fontSize: '10px', color: 'var(--c-teal)', display: 'block', marginBottom: '6px' }}>Vitals Telemetry</span>
                    <p style={{ fontSize: '16px', fontWeight: 'bold', color: '#111413' }}>BP 146/92 • SpO2 97%</p>
                    <span style={{ fontSize: '12px', color: '#57605D', display: 'block', marginTop: '4px' }}>Recorded via Kiosk sensors</span>
                  </div>

                  <div className="col-3" style={{ padding: '20px', borderRadius: '20px', backgroundColor: 'var(--c-teal)', color: '#FFFFFF' }}>
                    <span style={{ fontFamily: 'var(--font-lemon)', fontSize: '10px', color: 'var(--c-cyan)', display: 'block', marginBottom: '6px' }}>Physician Action</span>
                    <p style={{ fontSize: '15px', fontWeight: 'bold', color: '#FFFFFF' }}>Stat 12-lead ECG</p>
                    <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', display: 'block', marginTop: '4px' }}>Triage escort notified</span>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '16px' }}>
                  <button
                    onClick={onStartJourney}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', color: 'var(--c-teal)', fontFamily: 'var(--font-lemon)', fontSize: '12px', cursor: 'pointer', fontWeight: 'bold' }}
                  >
                    <span>TEST THE COMPLETE PATIENT INTAKE JOURNEY</span>
                    <ArrowRight style={{ width: '16px', height: '16px' }} />
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>
      </section>
    </div>
  );
}
