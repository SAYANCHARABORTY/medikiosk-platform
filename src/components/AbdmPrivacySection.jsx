import React, { useState } from 'react';
import { Shield, Lock, Trash2, Key, Database, FileCheck, CheckCircle2 } from 'lucide-react';

export default function AbdmPrivacySection() {
  const [sessionPurged, setSessionPurged] = useState(false);
  const [jsonCopied, setJsonCopied] = useState(false);

  const sampleFhirResource = {
    resourceType: "Bundle",
    id: "medikiosk-intake-bundle-001",
    type: "document",
    timestamp: new Date().toISOString(),
    entry: [
      {
        resource: {
          resourceType: "Patient",
          id: "P-4829",
          identifier: [{ system: "https://healthid.ndhm.gov.in", value: "91-4829-1029-4819" }],
          name: [{ text: "Patient #4829" }],
          gender: "male",
          birthDate: "1968-04-12"
        }
      },
      {
        resource: {
          resourceType: "Condition",
          clinicalStatus: { coding: [{ code: "active" }] },
          code: {
            coding: [{ system: "http://snomed.info/sct", code: "29857009", display: "Chest pain" }]
          }
        }
      },
      {
        resource: {
          resourceType: "Observation",
          status: "final",
          code: { text: "Blood Pressure" },
          component: [
            { code: { text: "Systolic" }, valueQuantity: { value: 146, unit: "mmHg" } },
            { code: { text: "Diastolic" }, valueQuantity: { value: 92, unit: "mmHg" } }
          ]
        }
      }
    ]
  };

  const handleTriggerSessionPurge = () => {
    setSessionPurged(true);
    setTimeout(() => {
      setSessionPurged(false);
    }, 4000);
  };

  const handleCopyFhir = () => {
    navigator.clipboard?.writeText(JSON.stringify(sampleFhirResource, null, 2));
    setJsonCopied(true);
    setTimeout(() => setJsonCopied(false), 2000);
  };

  return (
    <section id="abdm-privacy" className="editorial-section" style={{ backgroundColor: 'var(--c-warm-white)', borderTop: '1px solid var(--c-border)' }}>
      <div className="editorial-container">
        
        {/* Header with Single-Line Desktop Title */}
        <div style={{ maxWidth: '960px', marginBottom: '48px' }}>
          <div className="section-kicker">
            <Shield style={{ width: '14px', height: '14px' }} />
            <span>11 — ABDM + PRIVACY ARCHITECTURE</span>
          </div>
          <h2 className="section-title heading-single-line">
            Consent-First Clinical Infrastructure
          </h2>
          <p className="section-subtitle">
            MediKiosk operates as a zero-persistence edge intake device conforming to National Health Authority (NHA) ABDM M1, M2, and M3 standards.
          </p>
        </div>

        {/* 4 Architectural Pillars */}
        <div className="grid-12" style={{ marginBottom: '48px' }}>
          <div className="col-3 editorial-card" style={{ padding: '28px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '12px', backgroundColor: 'var(--c-teal-tint)', color: 'var(--c-teal)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
              <Key style={{ width: '20px', height: '20px' }} />
            </div>
            <h4 style={{ fontFamily: 'var(--font-lemon)', fontSize: '12px', color: '#111413', marginBottom: '6px' }}>ABHA Gateway</h4>
            <p style={{ fontSize: '11px', color: '#57605D', lineHeight: 1.6 }}>
              Links patient longitudinal health records via 14-digit ABHA address and encrypted QR code scan, compliant with Ayushman Bharat standards.
            </p>
          </div>

          <div className="col-3 editorial-card" style={{ padding: '28px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '12px', backgroundColor: 'var(--c-teal-tint)', color: 'var(--c-teal)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
              <Database style={{ width: '20px', height: '20px' }} />
            </div>
            <h4 style={{ fontFamily: 'var(--font-lemon)', fontSize: '12px', color: '#111413', marginBottom: '6px' }}>FHIR R4 Standard</h4>
            <p style={{ fontSize: '11px', color: '#57605D', lineHeight: 1.6 }}>
              Every symptom, vitals measurement, and medication is mapped into standard HL7 FHIR R4 resources ready for hospital EMR interoperability.
            </p>
          </div>

          <div className="col-3 editorial-card" style={{ padding: '28px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '12px', backgroundColor: 'var(--c-teal-tint)', color: 'var(--c-teal)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
              <FileCheck style={{ width: '20px', height: '20px' }} />
            </div>
            <h4 style={{ fontFamily: 'var(--font-lemon)', fontSize: '12px', color: '#111413', marginBottom: '6px' }}>Granular Consent</h4>
            <p style={{ fontSize: '11px', color: '#57605D', lineHeight: 1.6 }}>
              Time-bound, purpose-restricted consent is obtained directly from the patient prior to any document digitization or audio recording.
            </p>
          </div>

          <div className="col-3 editorial-card" style={{ padding: '28px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '12px', backgroundColor: 'var(--c-teal-tint)', color: 'var(--c-teal)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
              <Trash2 style={{ width: '20px', height: '20px' }} />
            </div>
            <h4 style={{ fontFamily: 'var(--font-lemon)', fontSize: '12px', color: '#111413', marginBottom: '6px' }}>Zero-Retention Wipe</h4>
            <p style={{ fontSize: '11px', color: '#57605D', lineHeight: 1.6 }}>
              The physical kiosk never stores patient audio, OCR images, or clinical text on local hardware. RAM is purged the moment the session closes.
            </p>
          </div>
        </div>

        {/* Live FHIR JSON & Memory Wipe Test */}
        <div className="grid-12" style={{ alignItems: 'start' }}>
          
          <div className="col-7" style={{ backgroundColor: '#111413', color: '#FFFFFF', borderRadius: '22px', padding: '28px', fontFamily: 'monospace', fontSize: '11px', boxShadow: '0 20px 50px rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.15)', paddingBottom: '14px', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#52B788' }} />
                <span style={{ fontFamily: 'var(--font-lemon)', fontSize: '10px', color: 'var(--c-cyan)' }}>
                  FHIR R4 Diagnostic Bundle (Prototype Schema Preview)
                </span>
              </div>
              <button
                onClick={handleCopyFhir}
                style={{ padding: '4px 10px', borderRadius: '9999px', backgroundColor: 'rgba(255,255,255,0.1)', color: '#FFFFFF', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-lemon)', fontSize: '8px' }}
              >
                {jsonCopied ? 'Copied!' : 'Copy JSON'}
              </button>
            </div>

            <pre style={{ overflowX: 'auto', lineHeight: 1.5, color: 'var(--c-cyan)', maxHeight: '260px', backgroundColor: 'rgba(0,0,0,0.3)', padding: '14px', borderRadius: '12px' }}>
              {JSON.stringify(sampleFhirResource, null, 2)}
            </pre>
          </div>

          <div className="col-5 editorial-card" style={{ padding: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#D96B50', marginBottom: '12px' }}>
              <Lock style={{ width: '18px', height: '18px' }} />
              <h4 style={{ fontFamily: 'var(--font-lemon)', fontSize: '11px', color: '#111413' }}>
                Kiosk Session Lifecycle Control
              </h4>
            </div>

            <p style={{ fontSize: '11px', color: '#57605D', lineHeight: 1.6, marginBottom: '18px' }}>
              When a patient concludes their intake or walks away from the terminal, volatile memory registers are immediately cleared to ensure complete HIPAA and DPDP compliance.
            </p>

            {sessionPurged ? (
              <div style={{ padding: '12px', borderRadius: '12px', backgroundColor: 'rgba(82, 183, 136, 0.15)', border: '1px solid #52B788', color: '#2D6A4F', fontSize: '11px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px' }}>
                <CheckCircle2 style={{ width: '16px', height: '16px', flexShrink: 0 }} />
                <span>Session Memory Purged: Local RAM registers cleared, encryption keys rotated.</span>
              </div>
            ) : (
              <div style={{ padding: '12px', borderRadius: '12px', backgroundColor: 'var(--c-warm-white)', border: '1px solid var(--c-border)', fontSize: '10px', color: '#57605D', marginBottom: '18px', fontFamily: 'monospace' }}>
                Active Session Token: <strong style={{ color: 'var(--c-teal)' }}>NHA-SESS-9941-X</strong>
              </div>
            )}

            <button
              onClick={handleTriggerSessionPurge}
              className="btn-teal"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <Trash2 style={{ width: '15px', height: '15px', color: 'var(--c-cyan)' }} />
              <span>Trigger Immediate Session Wipe</span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
