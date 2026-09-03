import React, { useState } from 'react';
import { 
  User, Mic, MicOff, Volume2, Shield, QrCode, FileText, CheckCircle, 
  AlertTriangle, ArrowRight, ArrowLeft, RefreshCw, Upload, Edit3, Check, 
  X, Stethoscope, Clock, Heart, Activity, Search, Sparkles, Sliders
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { 
  LANGUAGES, SAMPLE_PATIENTS, CLINICAL_SYMPTOMS_TREE, 
  SAMPLE_DOCUMENTS, MEDICAL_TIMELINE_EVENTS 
} from '../data/mockData';

export default function PatientJourneyKiosk({ isAyushMode }) {
  // Step: 1: IDENTIFY, 2: CONVERSE & ADAPTIVE, 3: SCAN & TIMELINE, 4: CLINICAL SUMMARY, 5: PHYSICIAN COCKPIT
  const [activeStep, setActiveStep] = useState(1);

  // Step 1: IDENTIFY
  const [selectedLang, setSelectedLang] = useState('hi');
  const [selectedPatient, setSelectedPatient] = useState(SAMPLE_PATIENTS[0]);
  const [customAbha, setCustomAbha] = useState('91-4829-1029-4819');
  const [consentGiven, setConsentGiven] = useState(true);
  const [audioGuidePlaying, setAudioGuidePlaying] = useState(false);
  const [isNewPatient, setIsNewPatient] = useState(false);

  // Step 2: CONVERSE
  const [inputMode, setInputMode] = useState('voice');
  const [activeSymptomTree, setActiveSymptomTree] = useState(CLINICAL_SYMPTOMS_TREE[0]);
  const [questionIdx, setQuestionIdx] = useState(0);
  const [conversationAnswers, setConversationAnswers] = useState({
    onset: '1–3 days ago',
    character: 'Heavy pressure / tight squeezing',
    radiation: 'Radiating to left arm & shoulder',
    aggravating: 'Worse with physical walking / stairs',
    associated: 'Cold sweating (diaphoresis)'
  });
  const [isRedFlagTriggered, setIsRedFlagTriggered] = useState(true);

  // Step 3: SCAN
  const [selectedDoc, setSelectedDoc] = useState(SAMPLE_DOCUMENTS[0]);
  const [isScanning, setIsScanning] = useState(false);
  const [scannedDocs, setScannedDocs] = useState([SAMPLE_DOCUMENTS[0], SAMPLE_DOCUMENTS[1]]);

  // Step 4: SUMMARIZE
  const [isEditingDraft, setIsEditingDraft] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [draftSummary, setDraftSummary] = useState({
    chiefComplaint: 'Substernal chest heaviness radiating to left shoulder with diaphoresis for 3 days',
    hpi: '58-year-old male with history of Essential HTN and Dyslipidemia presents with worsening retrosternal squeezing chest pain, precipitated by climbing stairs, accompanied by cold sweating and shortness of breath. No relief with sublingual antacids.',
    pastHistory: 'Essential Hypertension (diagnosed 2021), Dyslipidemia, Coronary Angiography (2023 - non-critical plaques). Appendectomy (2018).',
    allergies: 'Sulfa Drugs (Co-trimoxazole induced maculopapular rash, 2019).',
    medications: 'Tab Telmisartan 40mg OD, Tab Atorvastatin 20mg HS, Tab Aspirin 75mg OD, Tab Metformin 500mg BD.',
    familyHistory: 'Father deceased from Myocardial Infarction at age 52. Mother has Type 2 Diabetes.',
    personalHistory: 'Sedentary desk worker. Non-smoker. Vegetarian diet with irregular meal intervals.',
    ros: 'Cardiovascular: Positive for exertional chest pressure. Respiratory: Positive for mild exertional dyspnea. Gastrointestinal: Negative. Neurological: Negative.',
    abnormalLabs: 'Fasting Blood Sugar: 154 mg/dL (High) | HbA1c: 7.9% (High) | Total Cholesterol: 238 mg/dL (High) | LDL: 152 mg/dL (High).',
    redFlags: 'PRIORITY ROUTE: High-probability acute coronary evaluation required. Patient placed on ESI Level 2 Priority Triage.'
  });

  // Step 5: CONSULT
  const [doctorMarginNote, setDoctorMarginNote] = useState(
    '★ Attending Physician Note: Stat 12-lead ECG obtained in Triage Room 3. Troponin-I sent. Cardiology consultation requested.'
  );

  const handleToggleAudioGuide = () => {
    if ('speechSynthesis' in window) {
      if (audioGuidePlaying) {
        window.speechSynthesis.cancel();
        setAudioGuidePlaying(false);
      } else {
        const text = selectedLang === 'hi'
          ? 'नमस्ते। मेडीकियोस्क में आपका स्वागत है। कृपया अपना आभा नंबर दर्ज करें।'
          : 'Welcome to MediKiosk. Please scan your ABHA health card to begin clinical intake.';
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = selectedLang === 'hi' ? 'hi-IN' : 'en-IN';
        utterance.onend = () => setAudioGuidePlaying(false);
        utterance.onerror = () => setAudioGuidePlaying(false);
        window.speechSynthesis.speak(utterance);
        setAudioGuidePlaying(true);
      }
    } else {
      setAudioGuidePlaying(!audioGuidePlaying);
    }
  };

  const handleSelectDocToScan = (doc) => {
    setSelectedDoc(doc);
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      if (!scannedDocs.some(d => d.id === doc.id)) {
        setScannedDocs([...scannedDocs, doc]);
      }
    }, 1800);
  };

  const handleVerifyAndSave = () => {
    setIsVerified(true);
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#1F3D38', '#79BFBC', '#52B788', '#FAF8F5']
    });
    setTimeout(() => {
      setActiveStep(5);
    }, 1000);
  };

  const steps = [
    { num: 1, title: '01 IDENTIFY', desc: 'ABHA & Language' },
    { num: 2, title: '02 CONVERSE', desc: 'Adaptive AI & Red Flag' },
    { num: 3, title: '03 SCAN', desc: 'OCR & Timeline' },
    { num: 4, title: '04 SUMMARIZE', desc: 'Clinical SOAP Draft' },
    { num: 5, title: '05 CONSULT', desc: 'Physician Suite' }
  ];

  return (
    <section id="patient-journey" className="editorial-section" style={{ backgroundColor: 'var(--c-sand)' }}>
      
      {/* Background Watermark */}
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
        03
      </div>

      <div className="editorial-container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '960px', margin: '0 auto 48px' }}>
          <div className="section-kicker">
            <Activity style={{ width: '14px', height: '14px' }} />
            <span>03 — THE PATIENT JOURNEY</span>
          </div>
          <h2 className="section-title heading-single-line">
            The Interactive Clinical Intake Sequence
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Walk through each phase of the intelligent kiosk workflow: Identify → Converse → Scan → Summarize → Consult.
          </p>
        </div>

        {/* Stepper Navigation Bar */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '24px',
          padding: '10px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
          border: '1px solid var(--c-border)',
          marginBottom: '40px',
          overflowX: 'auto',
          WebkitOverflowScrolling: 'touch'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', minWidth: '760px', gap: '8px' }}>
            {steps.map((s) => {
              const isActive = activeStep === s.num;
              const isPast = activeStep > s.num;
              return (
                <button
                  key={s.num}
                  onClick={() => setActiveStep(s.num)}
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 18px',
                    borderRadius: '16px',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                    backgroundColor: isActive ? 'var(--c-teal)' : isPast ? 'var(--c-teal-tint)' : 'transparent',
                    color: isActive ? '#FFFFFF' : isPast ? 'var(--c-teal)' : '#57605D',
                    boxShadow: isActive ? '0 6px 20px rgba(31, 61, 56, 0.25)' : 'none'
                  }}
                >
                  <div style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--font-lemon)',
                    fontSize: '11px',
                    flexShrink: 0,
                    backgroundColor: isActive ? '#FFFFFF' : isPast ? 'var(--c-teal)' : 'var(--c-beige)',
                    color: isActive ? 'var(--c-teal)' : isPast ? '#FFFFFF' : '#57605D'
                  }}>
                    {isPast ? '✓' : s.num}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontFamily: 'var(--font-lemon)', fontSize: '11px', letterSpacing: '0.1em' }}>
                      {s.title}
                    </span>
                    <span style={{ fontSize: '10px', opacity: isActive ? 0.85 : 0.65 }}>
                      {s.desc}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* STAGE 1: IDENTIFY */}
        {/* ========================================================================= */}
        {activeStep === 1 && (
          <div className="editorial-card" style={{ padding: '48px', maxWidth: '1080px', margin: '0 auto' }}>
            
            {/* Stage Header */}
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '16px', paddingBottom: '24px', borderBottom: '1px solid var(--c-border)', marginBottom: '32px' }}>
              <div>
                <span style={{ fontFamily: 'var(--font-lemon)', fontSize: '10px', color: 'var(--c-teal)', display: 'block', marginBottom: '4px' }}>
                  STAGE 01 • KIOSK RECEPTION TERMINAL
                </span>
                <h3 style={{ fontFamily: 'var(--font-sagull)', fontSize: '34px', color: '#111413', fontWeight: 400 }}>
                  {selectedLang === 'hi' ? 'स्वागत है — अपनी पहचान चुनें' : 'Welcome — Identify Your Record'}
                </h3>
              </div>

              <button
                onClick={handleToggleAudioGuide}
                style={{
                  padding: '10px 20px',
                  borderRadius: '9999px',
                  fontFamily: 'var(--font-lemon)',
                  fontSize: '11px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  border: audioGuidePlaying ? '1px solid #D96B50' : '1px solid var(--c-border)',
                  backgroundColor: audioGuidePlaying ? '#D96B50' : '#FFFFFF',
                  color: audioGuidePlaying ? '#FFFFFF' : 'var(--c-teal)',
                  cursor: 'pointer',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
                }}
              >
                <Volume2 style={{ width: '15px', height: '15px' }} />
                <span>{audioGuidePlaying ? 'आवाज़ बंद करें (Mute)' : 'आवाज़ से सुनें (Audio Guide)'}</span>
              </button>
            </div>

            {/* Language Selection Grid */}
            <div style={{ marginBottom: '36px' }}>
              <label style={{ display: 'block', fontFamily: 'var(--font-lemon)', fontSize: '11px', color: '#57605D', marginBottom: '12px' }}>
                Select Language / अपनी भाषा चुनें
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '12px' }}>
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.id}
                    onClick={() => setSelectedLang(lang.id)}
                    style={{
                      padding: '14px',
                      borderRadius: '16px',
                      border: selectedLang === lang.id ? '2px solid var(--c-teal)' : '1px solid var(--c-border)',
                      backgroundColor: selectedLang === lang.id ? 'var(--c-teal)' : '#FFFFFF',
                      color: selectedLang === lang.id ? '#FFFFFF' : '#111413',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '4px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      boxShadow: selectedLang === lang.id ? '0 6px 20px rgba(31, 61, 56, 0.25)' : 'none'
                    }}
                  >
                    <span style={{ fontSize: '20px' }}>{lang.icon}</span>
                    <span style={{ fontFamily: 'var(--font-lemon)', fontSize: '12px' }}>{lang.native}</span>
                    <span style={{ fontSize: '10px', opacity: 0.7 }}>{lang.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* ABHA / Identity Options */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '36px' }}>
              
              {/* Card 1: Scan / Enter ABHA */}
              <div style={{
                padding: '28px',
                borderRadius: '22px',
                backgroundColor: !isNewPatient ? '#FFFFFF' : 'rgba(255,255,255,0.6)',
                border: !isNewPatient ? '2px solid var(--c-teal)' : '1px solid var(--c-border)',
                boxShadow: !isNewPatient ? '0 10px 30px rgba(0,0,0,0.06)' : 'none'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '12px', backgroundColor: 'var(--c-teal-tint)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--c-teal)' }}>
                      <QrCode style={{ width: '20px', height: '20px' }} />
                    </div>
                    <div>
                      <h4 style={{ fontFamily: 'var(--font-lemon)', fontSize: '12px', color: '#111413' }}>Scan / Enter ABHA</h4>
                      <p style={{ fontSize: '10px', color: '#57605D' }}>14-digit Ayushman Bharat ID</p>
                    </div>
                  </div>
                  <input
                    type="radio"
                    checked={!isNewPatient}
                    onChange={() => setIsNewPatient(false)}
                    style={{ width: '18px', height: '18px', accentColor: 'var(--c-teal)' }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                  <input
                    type="text"
                    value={customAbha}
                    onChange={(e) => setCustomAbha(e.target.value)}
                    placeholder="91-4829-1029-4819"
                    style={{
                      flex: 1,
                      padding: '11px 14px',
                      borderRadius: '12px',
                      border: '1px solid var(--c-border)',
                      fontFamily: 'monospace',
                      fontSize: '12px'
                    }}
                  />
                  <button
                    onClick={() => setCustomAbha('91-4829-1029-4819')}
                    style={{
                      padding: '11px 16px',
                      borderRadius: '12px',
                      border: 'none',
                      backgroundColor: 'var(--c-teal-tint)',
                      color: 'var(--c-teal)',
                      fontFamily: 'var(--font-lemon)',
                      fontSize: '10px',
                      cursor: 'pointer'
                    }}
                  >
                    Autofill
                  </button>
                </div>

                {/* Generic Patient Cards */}
                <div>
                  <span style={{ fontFamily: 'var(--font-lemon)', fontSize: '9px', color: '#84908C', display: 'block', marginBottom: '8px' }}>
                    Or Select Active Intake Profile:
                  </span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {SAMPLE_PATIENTS.map((p) => (
                      <div
                        key={p.id}
                        onClick={() => {
                          setSelectedPatient(p);
                          setCustomAbha(p.abhaId);
                          setIsNewPatient(false);
                        }}
                        style={{
                          padding: '10px 14px',
                          borderRadius: '12px',
                          border: selectedPatient.id === p.id && !isNewPatient ? '1.5px solid var(--c-teal)' : '1px solid var(--c-border)',
                          backgroundColor: selectedPatient.id === p.id && !isNewPatient ? 'var(--c-teal-tint)' : '#FAF8F5',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          cursor: 'pointer',
                          fontSize: '11px'
                        }}
                      >
                        <div>
                          <strong>{p.name}</strong> ({p.age}y / {p.gender})
                          <span style={{ display: 'block', fontFamily: 'monospace', fontSize: '10px', color: '#57605D' }}>{p.abhaId}</span>
                        </div>
                        <span style={{
                          padding: '3px 8px',
                          borderRadius: '9999px',
                          fontFamily: 'var(--font-lemon)',
                          fontSize: '8px',
                          backgroundColor: p.riskCategory === 'HIGH_PRIORITY' ? 'rgba(217, 107, 80, 0.15)' : 'rgba(82, 183, 136, 0.15)',
                          color: p.riskCategory === 'HIGH_PRIORITY' ? '#D96B50' : '#2D6A4F'
                        }}>
                          {p.riskCategory === 'HIGH_PRIORITY' ? 'Priority Flag' : 'Routine'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card 2: New Walk-in Registration */}
              <div style={{
                padding: '28px',
                borderRadius: '22px',
                backgroundColor: isNewPatient ? '#FFFFFF' : 'rgba(255,255,255,0.6)',
                border: isNewPatient ? '2px solid var(--c-teal)' : '1px solid var(--c-border)',
                boxShadow: isNewPatient ? '0 10px 30px rgba(0,0,0,0.06)' : 'none',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '12px', backgroundColor: '#F4F1EA', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#57605D' }}>
                        <User style={{ width: '20px', height: '20px' }} />
                      </div>
                      <div>
                        <h4 style={{ fontFamily: 'var(--font-lemon)', fontSize: '12px', color: '#111413' }}>New Patient Walk-in</h4>
                        <p style={{ fontSize: '10px', color: '#57605D' }}>Generate instant ABHA address</p>
                      </div>
                    </div>
                    <input
                      type="radio"
                      checked={isNewPatient}
                      onChange={() => setIsNewPatient(true)}
                      style={{ width: '18px', height: '18px', accentColor: 'var(--c-teal)' }}
                    />
                  </div>

                  <p style={{ fontSize: '11px', color: '#57605D', lineHeight: 1.6, marginBottom: '18px' }}>
                    MediKiosk creates an instant digital profile and retrieves historical health records via OTP or biometric authentication.
                  </p>

                  <div style={{ padding: '12px 14px', borderRadius: '12px', backgroundColor: 'var(--c-warm-white)', border: '1px solid var(--c-border)', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '10px', color: '#57605D' }}>
                    <Shield style={{ width: '16px', height: '16px', color: '#52B788', flexShrink: 0 }} />
                    <span>ABDM Sandbox Level-3 Consent Architecture</span>
                  </div>
                </div>

                <div style={{ paddingTop: '16px', borderTop: '1px solid var(--c-border)', marginTop: '20px' }}>
                  <label style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '11px', color: '#111413', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={consentGiven}
                      onChange={(e) => setConsentGiven(e.target.checked)}
                      style={{ marginTop: '2px', accentColor: 'var(--c-teal)' }}
                    />
                    <span>
                      I give voluntary consent to audio symptom processing and ABHA record retrieval for today's consultation.
                    </span>
                  </label>
                </div>
              </div>

            </div>

            {/* Step 1 Footer Action */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '20px', borderTop: '1px solid var(--c-border)' }}>
              <span style={{ fontSize: '11px', color: '#84908C' }}>
                Terminal: OPD-RECEPTION-01 • Active Session
              </span>
              <button
                onClick={() => setActiveStep(2)}
                disabled={!consentGiven}
                className="btn-teal"
              >
                <span>PROCEED TO CONVERSE</span>
                <ArrowRight style={{ width: '15px', height: '15px' }} />
              </button>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* STAGE 2: CONVERSE & ADAPTIVE HISTORY */}
        {/* ========================================================================= */}
        {activeStep === 2 && (
          <div className="editorial-card" style={{ padding: '48px', maxWidth: '1080px', margin: '0 auto' }}>
            
            {/* Header */}
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '16px', paddingBottom: '20px', borderBottom: '1px solid var(--c-border)', marginBottom: '28px' }}>
              <div>
                <span style={{ fontFamily: 'var(--font-lemon)', fontSize: '10px', color: 'var(--c-teal)', display: 'block', marginBottom: '4px' }}>
                  STAGE 02 • CONVERSATIONAL AI & ADAPTIVE HISTORY
                </span>
                <h3 style={{ fontFamily: 'var(--font-sagull)', fontSize: '34px', color: '#111413', fontWeight: 400 }}>
                  Adaptive Clinical Inquiry
                </h3>
              </div>

              <div style={{ display: 'flex', gap: '6px', padding: '4px', borderRadius: '9999px', backgroundColor: '#FFFFFF', border: '1px solid var(--c-border)' }}>
                <button
                  onClick={() => setInputMode('voice')}
                  style={{
                    padding: '8px 18px',
                    borderRadius: '9999px',
                    border: 'none',
                    fontFamily: 'var(--font-lemon)',
                    fontSize: '11px',
                    backgroundColor: inputMode === 'voice' ? 'var(--c-teal)' : 'transparent',
                    color: inputMode === 'voice' ? '#FFFFFF' : '#57605D',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <Mic style={{ width: '14px', height: '14px' }} />
                  <span>Voice Mode</span>
                </button>
                <button
                  onClick={() => setInputMode('touch')}
                  style={{
                    padding: '8px 18px',
                    borderRadius: '9999px',
                    border: 'none',
                    fontFamily: 'var(--font-lemon)',
                    fontSize: '11px',
                    backgroundColor: inputMode === 'touch' ? 'var(--c-teal)' : 'transparent',
                    color: inputMode === 'touch' ? '#FFFFFF' : '#57605D',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <Sliders style={{ width: '14px', height: '14px' }} />
                  <span>Touch Selection</span>
                </button>
              </div>
            </div>

            {/* POTENTIAL CLINICAL RED FLAG STATE (PRIORITY TRIAGE) */}
            {isRedFlagTriggered && (
              <div style={{
                marginBottom: '32px',
                padding: '22px 26px',
                borderRadius: '22px',
                backgroundColor: 'rgba(217, 107, 80, 0.12)',
                border: '2px solid #D96B50',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '16px'
              }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '12px', backgroundColor: '#D96B50', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                  <AlertTriangle style={{ width: '20px', height: '20px' }} />
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                    <span style={{ fontFamily: 'var(--font-lemon)', fontSize: '11px', color: '#D96B50', letterSpacing: '0.1em' }}>
                      POTENTIAL CLINICAL RED FLAG DETECTED
                    </span>
                    <span style={{ padding: '2px 8px', borderRadius: '9999px', backgroundColor: '#D96B50', color: '#FFFFFF', fontFamily: 'var(--font-lemon)', fontSize: '8px' }}>
                      ESI Level 2 Priority Triage
                    </span>
                  </div>
                  <p style={{ fontSize: '12px', color: '#57605D', lineHeight: 1.6 }}>
                    Patient reports retrosternal chest heaviness radiating to left shoulder with cold diaphoresis. System has placed patient on priority clinical escort route. <strong style={{ color: '#111413' }}>(Triage routing only — NOT an autonomous diagnosis).</strong>
                  </p>
                </div>
              </div>
            )}

            {/* Q&A and Voice Grid */}
            <div className="grid-12" style={{ marginBottom: '32px' }}>
              
              {/* Questioning Tree */}
              <div className="col-7" style={{ padding: '28px', borderRadius: '22px', backgroundColor: '#FFFFFF', border: '1px solid var(--c-border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <span style={{ fontFamily: 'var(--font-lemon)', fontSize: '10px', color: '#84908C' }}>
                    Question {questionIdx + 1} of {activeSymptomTree.questions.length}
                  </span>
                  <span style={{ fontFamily: 'var(--font-lemon)', fontSize: '10px', color: 'var(--c-teal)' }}>
                    {Math.round(((questionIdx + 1) / activeSymptomTree.questions.length) * 100)}% Complete
                  </span>
                </div>
                <div style={{ width: '100%', height: '5px', borderRadius: '9999px', backgroundColor: 'var(--c-cream)', overflow: 'hidden', marginBottom: '24px' }}>
                  <div style={{ height: '100%', width: `${((questionIdx + 1) / activeSymptomTree.questions.length) * 100}%`, backgroundColor: 'var(--c-teal)', transition: 'width 0.3s ease' }} />
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <span style={{ fontFamily: 'var(--font-lemon)', fontSize: '9px', color: 'var(--c-teal)', display: 'block', marginBottom: '4px' }}>
                    {activeSymptomTree.category} History Taking
                  </span>
                  <h4 style={{ fontFamily: 'var(--font-sagull)', fontSize: '24px', color: '#111413', fontWeight: 400, lineHeight: 1.2, marginBottom: '4px' }}>
                    {activeSymptomTree.questions[questionIdx].text}
                  </h4>
                  <p style={{ fontFamily: 'var(--font-human)', fontSize: '19px', color: '#57605D', fontStyle: 'italic' }}>
                    "{activeSymptomTree.questions[questionIdx].textHi}"
                  </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
                  {activeSymptomTree.questions[questionIdx].options.map((opt, oIdx) => {
                    const currentQKey = activeSymptomTree.questions[questionIdx].id;
                    const isSelected = conversationAnswers[currentQKey] === opt;
                    return (
                      <button
                        key={oIdx}
                        onClick={() => setConversationAnswers({ ...conversationAnswers, [currentQKey]: opt })}
                        style={{
                          padding: '12px 16px',
                          borderRadius: '12px',
                          border: isSelected ? '1.5px solid var(--c-teal)' : '1px solid var(--c-border)',
                          backgroundColor: isSelected ? 'var(--c-teal)' : '#FAF8F5',
                          color: isSelected ? '#FFFFFF' : '#111413',
                          textAlign: 'left',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          fontSize: '12px',
                          cursor: 'pointer'
                        }}
                      >
                        <span>{opt}</span>
                        {isSelected && <Check style={{ width: '15px', height: '15px', color: 'var(--c-cyan)' }} />}
                      </button>
                    );
                  })}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '14px', borderTop: '1px solid var(--c-border)' }}>
                  <button
                    onClick={() => setQuestionIdx(Math.max(0, questionIdx - 1))}
                    disabled={questionIdx === 0}
                    style={{ background: 'none', border: 'none', fontFamily: 'var(--font-lemon)', fontSize: '10px', color: '#57605D', cursor: 'pointer', opacity: questionIdx === 0 ? 0.3 : 1 }}
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => {
                      if (questionIdx < activeSymptomTree.questions.length - 1) {
                        setQuestionIdx(questionIdx + 1);
                      }
                    }}
                    className="btn-teal"
                    style={{ padding: '9px 18px', fontSize: '10px' }}
                  >
                    {questionIdx === activeSymptomTree.questions.length - 1 ? 'Answers Saved' : 'Next Question'}
                  </button>
                </div>
              </div>

              {/* Acoustic Voice Engine Box */}
              <div className="col-5" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ padding: '24px', borderRadius: '22px', backgroundColor: '#FFFFFF', border: '1px solid var(--c-border)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#D96B50', animation: 'pulse 1.5s infinite' }} />
                      <span style={{ fontFamily: 'var(--font-lemon)', fontSize: '10px', color: '#111413' }}>Speech-to-Text Pipeline</span>
                    </div>
                    <span style={{ fontFamily: 'var(--font-lemon)', fontSize: '8px', color: '#84908C', backgroundColor: 'var(--c-cream)', padding: '2px 6px', borderRadius: '6px' }}>
                      HealthLLM
                    </span>
                  </div>

                  {/* Pulsing Audio Waveform */}
                  <div style={{ height: '54px', backgroundColor: 'var(--c-teal)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', padding: '0 16px', marginBottom: '14px' }}>
                    {[40, 80, 55, 95, 65, 100, 50, 85, 75, 90, 45, 80, 60, 75].map((h, idx) => (
                      <span
                        key={idx}
                        className="wave-bar"
                        style={{ width: '3.5px', height: `${h}%`, backgroundColor: 'var(--c-cyan)', borderRadius: '9999px', animationDelay: `${idx * 0.08}s` }}
                      />
                    ))}
                  </div>

                  {/* Vernacular Transcript */}
                  <div style={{ padding: '14px', borderRadius: '12px', backgroundColor: 'var(--c-warm-white)', border: '1px solid var(--c-border)', marginBottom: '12px' }}>
                    <span style={{ fontFamily: 'var(--font-lemon)', fontSize: '8px', color: '#84908C', display: 'block', marginBottom: '4px' }}>
                      Real-time Hindi Transcript:
                    </span>
                    <p style={{ fontFamily: 'var(--font-human)', fontSize: '18px', color: '#1A365D', lineHeight: 1.3 }}>
                      "डॉक्टर साहब, 3 दिन से सीने में बहुत भारीपन लग रहा है... आज सुबह सीढ़ियां चढ़ते समय बाएँ कंधे तक दर्द खिंचने लगा और ठंडा पसीना आने लगा।"
                    </p>
                  </div>

                  <div style={{ padding: '12px', borderRadius: '12px', backgroundColor: 'var(--c-teal-tint)', fontSize: '10px', color: 'var(--c-teal)' }}>
                    <span style={{ fontFamily: 'var(--font-lemon)', fontSize: '8px', display: 'block', marginBottom: '4px' }}>
                      Extracted Clinical Tokens:
                    </span>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', fontFamily: 'monospace' }}>
                      <span style={{ padding: '2px 6px', borderRadius: '4px', backgroundColor: '#FFFFFF' }}>Pain: Retrosternal</span>
                      <span style={{ padding: '2px 6px', borderRadius: '4px', backgroundColor: '#FFFFFF' }}>Radiation: L. Arm</span>
                      <span style={{ padding: '2px 6px', borderRadius: '4px', backgroundColor: '#FFFFFF' }}>Diaphoresis: True</span>
                      <span style={{ padding: '2px 6px', borderRadius: '4px', backgroundColor: '#D96B50', color: '#FFFFFF' }}>Triage: Acute</span>
                    </div>
                  </div>
                </div>

                {/* Vitals Telemetry */}
                <div style={{ padding: '22px', borderRadius: '22px', backgroundColor: 'var(--c-teal)', color: '#FFFFFF' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span style={{ fontFamily: 'var(--font-lemon)', fontSize: '10px', color: 'var(--c-cyan)' }}>Kiosk Vitals Telemetry</span>
                    <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#52B788' }}></span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <div style={{ padding: '10px', borderRadius: '10px', backgroundColor: 'rgba(255,255,255,0.1)' }}>
                      <span style={{ fontFamily: 'var(--font-lemon)', fontSize: '8px', opacity: 0.7, display: 'block' }}>Blood Pressure</span>
                      <span style={{ fontFamily: 'var(--font-sagull)', fontSize: '22px', fontWeight: 'bold' }}>146 / 92</span>
                      <span style={{ fontSize: '9px', color: '#D96B50', display: 'block' }}>Stage II HTN</span>
                    </div>
                    <div style={{ padding: '10px', borderRadius: '10px', backgroundColor: 'rgba(255,255,255,0.1)' }}>
                      <span style={{ fontFamily: 'var(--font-lemon)', fontSize: '8px', opacity: 0.7, display: 'block' }}>SpO2 Oxygen</span>
                      <span style={{ fontFamily: 'var(--font-sagull)', fontSize: '22px', fontWeight: 'bold' }}>97 %</span>
                      <span style={{ fontSize: '9px', color: '#52B788', display: 'block' }}>Adequate</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Step 2 Footer */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '20px', borderTop: '1px solid var(--c-border)' }}>
              <button
                onClick={() => setActiveStep(1)}
                style={{ background: 'none', border: 'none', fontFamily: 'var(--font-lemon)', fontSize: '10px', color: '#57605D', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <ArrowLeft style={{ width: '15px', height: '15px' }} />
                <span>Back to Identify</span>
              </button>

              <button
                onClick={() => setActiveStep(3)}
                className="btn-teal"
              >
                <span>PROCEED TO DOCUMENT SCAN</span>
                <ArrowRight style={{ width: '15px', height: '15px' }} />
              </button>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* STAGE 3: SCAN, OCR & MEDICAL TIMELINE */}
        {/* ========================================================================= */}
        {activeStep === 3 && (
          <div className="editorial-card" style={{ padding: '48px', maxWidth: '1080px', margin: '0 auto' }}>
            
            {/* Header */}
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '16px', paddingBottom: '20px', borderBottom: '1px solid var(--c-border)', marginBottom: '28px' }}>
              <div>
                <span style={{ fontFamily: 'var(--font-lemon)', fontSize: '10px', color: 'var(--c-teal)', display: 'block', marginBottom: '4px' }}>
                  STAGE 03 • DOCUMENT INTELLIGENCE & OCR
                </span>
                <h3 style={{ fontFamily: 'var(--font-sagull)', fontSize: '34px', color: '#111413', fontWeight: 400 }}>
                  Digitize Paper Records & Lab Reports
                </h3>
              </div>
              <span style={{ fontFamily: 'var(--font-lemon)', fontSize: '10px', color: '#57605D' }}>
                Pipeline: UPLOAD → SCAN → EXTRACT → STRUCTURE
              </span>
            </div>

            {/* Document Selector */}
            <div style={{ marginBottom: '28px' }}>
              <label style={{ display: 'block', fontFamily: 'var(--font-lemon)', fontSize: '10px', color: '#57605D', marginBottom: '10px' }}>
                Select Medical Document to OCR Scan:
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
                {SAMPLE_DOCUMENTS.map((doc) => {
                  const isSelected = selectedDoc.id === doc.id;
                  const isScanned = scannedDocs.some(d => d.id === doc.id);
                  return (
                    <div
                      key={doc.id}
                      onClick={() => handleSelectDocToScan(doc)}
                      style={{
                        padding: '16px',
                        borderRadius: '16px',
                        border: isSelected ? '2px solid var(--c-teal)' : '1px solid var(--c-border)',
                        backgroundColor: isSelected ? '#FFFFFF' : 'rgba(255,255,255,0.7)',
                        cursor: 'pointer',
                        boxShadow: isSelected ? '0 8px 24px rgba(0,0,0,0.06)' : 'none'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '10px', backgroundColor: 'var(--c-teal-tint)', color: 'var(--c-teal)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <FileText style={{ width: '16px', height: '16px' }} />
                        </div>
                        {isScanned && (
                          <span style={{ padding: '2px 8px', borderRadius: '9999px', backgroundColor: 'rgba(82, 183, 136, 0.15)', color: '#2D6A4F', fontFamily: 'var(--font-lemon)', fontSize: '8px' }}>
                            OCR Synced
                          </span>
                        )}
                      </div>
                      <h4 style={{ fontFamily: 'var(--font-lemon)', fontSize: '11px', color: '#111413', marginBottom: '2px' }}>{doc.name}</h4>
                      <span style={{ fontSize: '10px', color: '#84908C', display: 'block' }}>{doc.facility}</span>
                      <span style={{ fontFamily: 'monospace', fontSize: '9px', color: '#57605D' }}>{doc.date}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Scanner Viewport & Extracted Entities */}
            <div className="grid-12" style={{ marginBottom: '36px', alignItems: 'start' }}>
              
              {/* Laser Scanner Viewport */}
              <div className="col-6" style={{
                backgroundColor: '#111413',
                borderRadius: '22px',
                padding: '22px',
                position: 'relative',
                overflow: 'hidden',
                color: '#FFFFFF',
                minHeight: '320px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}>
                {isScanning && (
                  <div className="animate-laser" style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    height: '3px',
                    background: 'linear-gradient(90deg, transparent, var(--c-cyan), transparent)',
                    boxShadow: '0 0 16px var(--c-cyan)',
                    zIndex: 20
                  }} />
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.15)', paddingBottom: '10px' }}>
                  <span style={{ fontFamily: 'var(--font-lemon)', fontSize: '10px', color: 'var(--c-cyan)' }}>
                    {isScanning ? 'Multi-Modal OCR Active...' : 'Document Scanned'}
                  </span>
                  <span style={{ fontFamily: 'monospace', fontSize: '9px', color: 'rgba(255,255,255,0.6)' }}>{selectedDoc.type}</span>
                </div>

                <div style={{ margin: '16px 0', padding: '16px', borderRadius: '14px', backgroundColor: '#FFFFFF', color: '#111413', fontFamily: 'monospace', fontSize: '11px', lineHeight: 1.5 }}>
                  <div style={{ borderBottom: '1px solid #eee', paddingBottom: '6px', marginBottom: '6px', display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                    <span>{selectedDoc.facility}</span>
                    <span>{selectedDoc.date}</span>
                  </div>
                  <p><strong>PATIENT:</strong> Patient #4829 (58 / M)</p>
                  {selectedDoc.extracted.diagnosis && <p><strong>DX:</strong> {selectedDoc.extracted.diagnosis}</p>}
                  {selectedDoc.extracted.medications && <p><strong>RX:</strong> Tab Telmisartan 40mg OD, Atorvastatin 20mg HS</p>}
                  {selectedDoc.extracted.allergies && <p style={{ color: '#D96B50', fontWeight: 'bold' }}><strong>ALLERGY:</strong> {selectedDoc.extracted.allergies}</p>}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '10px', color: 'rgba(255,255,255,0.6)' }}>
                  <span>Confidence: 99.4%</span>
                  <button
                    onClick={() => handleSelectDocToScan(selectedDoc)}
                    style={{ background: 'none', border: 'none', color: 'var(--c-cyan)', fontFamily: 'var(--font-lemon)', fontSize: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                  >
                    <RefreshCw style={{ width: '12px', height: '12px' }} />
                    <span>Rescan</span>
                  </button>
                </div>
              </div>

              {/* Extracted Structured Entities */}
              <div className="col-6" style={{ padding: '22px', borderRadius: '22px', backgroundColor: '#FFFFFF', border: '1px solid var(--c-border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '10px', borderBottom: '1px solid var(--c-border)', marginBottom: '14px' }}>
                  <h4 style={{ fontFamily: 'var(--font-lemon)', fontSize: '11px', color: '#111413' }}>Extracted Clinical Entities</h4>
                  <span style={{ fontSize: '10px', color: '#52B788', fontWeight: 'bold' }}>FHIR R4 Synced</span>
                </div>

                {selectedDoc.id === 'doc_lab_report' ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {SAMPLE_DOCUMENTS[1].extracted.investigations.map((inv, i) => (
                      <div
                        key={i}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          padding: '7px 10px',
                          borderRadius: '8px',
                          backgroundColor: inv.status === 'HIGH' ? 'rgba(217, 107, 80, 0.12)' : '#FAF8F5',
                          color: inv.status === 'HIGH' ? '#D96B50' : '#111413',
                          fontSize: '11px',
                          fontWeight: inv.status === 'HIGH' ? 'bold' : 'normal'
                        }}
                      >
                        <span>{inv.test}</span>
                        <span style={{ fontFamily: 'monospace' }}>{inv.value} ({inv.ref})</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ padding: '12px', borderRadius: '12px', backgroundColor: 'var(--c-warm-white)', border: '1px solid var(--c-border)', fontSize: '11px' }}>
                      <span style={{ fontFamily: 'var(--font-lemon)', fontSize: '9px', color: '#84908C', display: 'block', marginBottom: '3px' }}>Active Meds & Dosage:</span>
                      <p>• <strong>Telmisartan 40 mg</strong> — Once daily (Morning)</p>
                      <p>• <strong>Atorvastatin 20 mg</strong> — Once daily (Night)</p>
                      <p>• <strong>Aspirin 75 mg</strong> — Once daily (Lunch)</p>
                    </div>

                    <div style={{ padding: '12px', borderRadius: '12px', backgroundColor: 'rgba(217, 107, 80, 0.12)', border: '1px solid rgba(217, 107, 80, 0.25)', fontSize: '11px' }}>
                      <span style={{ fontFamily: 'var(--font-lemon)', fontSize: '9px', color: '#D96B50', display: 'block', marginBottom: '3px' }}>Drug Allergy Flag:</span>
                      <strong style={{ color: '#D96B50' }}>Sulfa Drugs (Erythematous rash in 2019)</strong>
                    </div>

                    <div style={{ padding: '12px', borderRadius: '12px', backgroundColor: 'var(--c-teal-tint)', fontSize: '11px', color: 'var(--c-teal)' }}>
                      <span style={{ fontFamily: 'var(--font-lemon)', fontSize: '9px', display: 'block', marginBottom: '3px' }}>Past Cardiac Procedure:</span>
                      <span>Coronary Angiography (2023) — Non-critical CAD. Normal EF (58%).</span>
                    </div>
                  </div>
                )}
              </div>

            </div>

            {/* Medical Timeline */}
            <div style={{ padding: '28px', borderRadius: '22px', backgroundColor: '#FFFFFF', border: '1px solid var(--c-border)', marginBottom: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                <Clock style={{ width: '16px', height: '16px', color: 'var(--c-teal)' }} />
                <h4 style={{ fontFamily: 'var(--font-lemon)', fontSize: '11px', color: '#111413' }}>
                  Automated Longitudinal Medical Timeline (2019 — Present)
                </h4>
              </div>

              <div style={{ borderLeft: '2px solid rgba(31, 61, 56, 0.2)', paddingLeft: '20px', marginLeft: '10px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {MEDICAL_TIMELINE_EVENTS.map((evt, idx) => (
                  <div key={idx} style={{ position: 'relative' }}>
                    <div style={{ position: 'absolute', left: '-27px', top: '2px', width: '12px', height: '12px', borderRadius: '50%', backgroundColor: evt.color, border: '2px solid #FFFFFF' }} />
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                      <span style={{ fontFamily: 'monospace', fontSize: '11px', fontWeight: 'bold', color: 'var(--c-teal)' }}>{evt.date}</span>
                      <span style={{ padding: '2px 8px', borderRadius: '9999px', fontFamily: 'var(--font-lemon)', fontSize: '8px', backgroundColor: `${evt.color}20`, color: evt.color }}>{evt.badge}</span>
                      <span style={{ fontSize: '10px', color: '#84908C' }}>• {evt.facility}</span>
                    </div>
                    <h5 style={{ fontFamily: 'var(--font-lemon)', fontSize: '12px', color: '#111413', marginBottom: '2px' }}>{evt.event}</h5>
                    <p style={{ fontSize: '11px', color: '#57605D' }}>{evt.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 3 Footer */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '20px', borderTop: '1px solid var(--c-border)' }}>
              <button
                onClick={() => setActiveStep(2)}
                style={{ background: 'none', border: 'none', fontFamily: 'var(--font-lemon)', fontSize: '10px', color: '#57605D', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <ArrowLeft style={{ width: '15px', height: '15px' }} />
                <span>Back to Conversational Intake</span>
              </button>

              <button
                onClick={() => setActiveStep(4)}
                className="btn-teal"
              >
                <span>GENERATE CLINICAL SUMMARY</span>
                <ArrowRight style={{ width: '15px', height: '15px' }} />
              </button>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* STAGE 4: CLINICAL SUMMARY */}
        {/* ========================================================================= */}
        {activeStep === 4 && (
          <div className="editorial-card" style={{ padding: '48px', maxWidth: '1080px', margin: '0 auto' }}>
            
            {/* Warning Banner */}
            <div style={{
              marginBottom: '32px',
              padding: '20px 24px',
              borderRadius: '22px',
              backgroundColor: 'rgba(217, 107, 80, 0.12)',
              border: '2px solid #D96B50',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '14px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '12px', backgroundColor: '#D96B50', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-lemon)', fontSize: '16px', flexShrink: 0 }}>
                  !
                </div>
                <div>
                  <h4 style={{ fontFamily: 'var(--font-lemon)', fontSize: '11px', color: '#111413', letterSpacing: '0.1em' }}>
                    AI-GENERATED DRAFT — PHYSICIAN VERIFICATION REQUIRED
                  </h4>
                  <p style={{ fontSize: '11px', color: '#57605D', marginTop: '2px' }}>
                    This clinical synthesis was compiled automatically from patient spoken responses and OCR records. Treating physician retains final diagnostic authority.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsEditingDraft(!isEditingDraft)}
                style={{
                  padding: '9px 18px',
                  borderRadius: '9999px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--c-border)',
                  fontFamily: 'var(--font-lemon)',
                  fontSize: '10px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Edit3 style={{ width: '13px', height: '13px' }} />
                <span>{isEditingDraft ? 'Preview Draft' : 'Edit Draft'}</span>
              </button>
            </div>

            {/* Document Content */}
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '22px', padding: '36px', border: '1px solid var(--c-border)', marginBottom: '28px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '14px', paddingBottom: '18px', borderBottom: '1px solid var(--c-border)', marginBottom: '24px' }}>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-sagull)', fontSize: '30px', fontWeight: 'bold', color: 'var(--c-teal)' }}>
                    MediKiosk Pre-Consultation Summary
                  </h3>
                  <div style={{ fontSize: '11px', color: '#57605D', marginTop: '3px' }}>
                    Patient: <strong>{selectedPatient.name}</strong> ({selectedPatient.age}y / {selectedPatient.gender}) • <span style={{ fontFamily: 'monospace' }}>ABHA: {customAbha}</span>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span style={{ padding: '5px 12px', borderRadius: '9999px', backgroundColor: 'rgba(217, 107, 80, 0.15)', color: '#D96B50', fontFamily: 'var(--font-lemon)', fontSize: '9px' }}>
                    ESI Level 2 Priority Triage
                  </span>
                  <span style={{ fontSize: '10px', color: '#84908C', display: 'block', marginTop: '3px' }}>Intake Timestamp: 09:14 AM</span>
                </div>
              </div>

              {/* 10 Clinical Sections */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', fontSize: '12px' }}>
                
                <div style={{ padding: '14px', borderRadius: '14px', backgroundColor: 'var(--c-warm-white)', border: '1px solid var(--c-border)' }}>
                  <span style={{ fontFamily: 'var(--font-lemon)', fontSize: '9px', color: 'var(--c-teal)', display: 'block', marginBottom: '3px' }}>1. Chief Complaint</span>
                  {isEditingDraft ? (
                    <input
                      type="text"
                      value={draftSummary.chiefComplaint}
                      onChange={(e) => setDraftSummary({ ...draftSummary, chiefComplaint: e.target.value })}
                      style={{ width: '100%', padding: '7px 10px', borderRadius: '8px', border: '1px solid #ccc' }}
                    />
                  ) : (
                    <p style={{ fontWeight: 'bold', fontSize: '14px' }}>{draftSummary.chiefComplaint}</p>
                  )}
                </div>

                <div>
                  <span style={{ fontFamily: 'var(--font-lemon)', fontSize: '9px', color: '#84908C', display: 'block', marginBottom: '3px' }}>2. History of Present Illness (HPI - OLDCARTS)</span>
                  {isEditingDraft ? (
                    <textarea
                      rows={3}
                      value={draftSummary.hpi}
                      onChange={(e) => setDraftSummary({ ...draftSummary, hpi: e.target.value })}
                      style={{ width: '100%', padding: '7px 10px', borderRadius: '8px', border: '1px solid #ccc' }}
                    />
                  ) : (
                    <p style={{ color: '#57605D', lineHeight: 1.6 }}>{draftSummary.hpi}</p>
                  )}
                </div>

                <div>
                  <span style={{ fontFamily: 'var(--font-lemon)', fontSize: '9px', color: '#84908C', display: 'block', marginBottom: '3px' }}>3. Past Medical & Surgical History</span>
                  <p style={{ color: '#57605D', lineHeight: 1.6 }}>{draftSummary.pastHistory}</p>
                </div>

                <div style={{ padding: '14px', borderRadius: '14px', backgroundColor: 'rgba(217, 107, 80, 0.12)', border: '1px solid rgba(217, 107, 80, 0.25)' }}>
                  <span style={{ fontFamily: 'var(--font-lemon)', fontSize: '9px', color: '#D96B50', display: 'block', marginBottom: '3px' }}>4. Drug & Allergy History (CRITICAL)</span>
                  <p style={{ color: '#D96B50', fontWeight: 'bold' }}>{draftSummary.allergies}</p>
                  <p style={{ fontSize: '11px', color: '#57605D', marginTop: '3px' }}>Current Meds: {draftSummary.medications}</p>
                </div>

                <div className="grid-12">
                  <div className="col-6" style={{ padding: '12px', borderRadius: '12px', backgroundColor: 'var(--c-warm-white)', border: '1px solid var(--c-border)' }}>
                    <span style={{ fontFamily: 'var(--font-lemon)', fontSize: '9px', color: '#84908C', display: 'block', marginBottom: '3px' }}>5. Family History</span>
                    <p style={{ color: '#57605D' }}>{draftSummary.familyHistory}</p>
                  </div>
                  <div className="col-6" style={{ padding: '12px', borderRadius: '12px', backgroundColor: 'var(--c-warm-white)', border: '1px solid var(--c-border)' }}>
                    <span style={{ fontFamily: 'var(--font-lemon)', fontSize: '9px', color: '#84908C', display: 'block', marginBottom: '3px' }}>6. Personal History</span>
                    <p style={{ color: '#57605D' }}>{draftSummary.personalHistory}</p>
                  </div>
                </div>

                <div>
                  <span style={{ fontFamily: 'var(--font-lemon)', fontSize: '9px', color: '#84908C', display: 'block', marginBottom: '3px' }}>7. Review of Systems (ROS)</span>
                  <p style={{ color: '#57605D' }}>{draftSummary.ros}</p>
                </div>

                <div>
                  <span style={{ fontFamily: 'var(--font-lemon)', fontSize: '9px', color: '#84908C', display: 'block', marginBottom: '3px' }}>8. Prior Investigations (Lab Flags)</span>
                  <p style={{ fontFamily: 'monospace', color: '#D96B50' }}>{draftSummary.abnormalLabs}</p>
                </div>

                <div style={{ padding: '14px', borderRadius: '14px', backgroundColor: 'var(--c-teal)', color: '#FFFFFF' }}>
                  <span style={{ fontFamily: 'var(--font-lemon)', fontSize: '9px', color: 'var(--c-cyan)', display: 'block', marginBottom: '3px' }}>9 & 10. Important Findings & Red Flags</span>
                  <p style={{ color: 'rgba(255,255,255,0.9)', lineHeight: 1.6 }}>{draftSummary.redFlags}</p>
                </div>

              </div>
            </div>

            {/* Clinician Action Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '14px', paddingTop: '16px', borderTop: '1px solid var(--c-border)' }}>
              <button
                onClick={() => setActiveStep(3)}
                style={{ background: 'none', border: 'none', fontFamily: 'var(--font-lemon)', fontSize: '10px', color: '#57605D', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <ArrowLeft style={{ width: '15px', height: '15px' }} />
                <span>Back to Documents</span>
              </button>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => alert('Summary rejected. Case marked for manual intake.')}
                  style={{ padding: '10px 20px', borderRadius: '9999px', border: '1px solid rgba(217, 107, 80, 0.4)', color: '#D96B50', backgroundColor: 'transparent', fontFamily: 'var(--font-lemon)', fontSize: '10px', cursor: 'pointer' }}
                >
                  REJECT DRAFT
                </button>

                <button
                  onClick={() => setIsEditingDraft(!isEditingDraft)}
                  style={{ padding: '10px 20px', borderRadius: '9999px', border: '1px solid var(--c-border)', color: '#111413', backgroundColor: '#FFFFFF', fontFamily: 'var(--font-lemon)', fontSize: '10px', cursor: 'pointer' }}
                >
                  {isEditingDraft ? 'FINISH EDITING' : 'EDIT DRAFT'}
                </button>

                <button
                  onClick={handleVerifyAndSave}
                  className="btn-teal"
                >
                  <Check style={{ width: '15px', height: '15px' }} />
                  <span>VERIFY & SAVE TO EMR</span>
                </button>
              </div>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* STAGE 5: PHYSICIAN SUITE & COCKPIT */}
        {/* ========================================================================= */}
        {activeStep === 5 && (
          <div className="editorial-card" style={{ padding: '48px', maxWidth: '1080px', margin: '0 auto' }}>
            
            {/* Header */}
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '16px', paddingBottom: '20px', borderBottom: '1px solid var(--c-border)', marginBottom: '28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '14px', backgroundColor: 'var(--c-teal)', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Stethoscope style={{ width: '22px', height: '22px', color: 'var(--c-cyan)' }} />
                </div>
                <div>
                  <span style={{ fontFamily: 'var(--font-lemon)', fontSize: '9px', color: 'var(--c-teal)', display: 'block', marginBottom: '3px' }}>
                    STAGE 05 • PHYSICIAN SUITE & CLINICAL COCKPIT
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-sagull)', fontSize: '32px', color: '#111413', fontWeight: 400 }}>
                    Pre-Consultation Briefing (15 Seconds)
                  </h3>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ padding: '6px 14px', borderRadius: '9999px', backgroundColor: 'rgba(82, 183, 136, 0.15)', color: '#2D6A4F', fontFamily: 'var(--font-lemon)', fontSize: '10px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <CheckCircle style={{ width: '14px', height: '14px' }} />
                  <span>EMR Verified</span>
                </div>
                <button
                  onClick={() => setActiveStep(1)}
                  style={{ padding: '7px 14px', borderRadius: '9999px', border: '1px solid var(--c-border)', backgroundColor: '#FFFFFF', fontFamily: 'var(--font-lemon)', fontSize: '10px', cursor: 'pointer' }}
                >
                  New Intake
                </button>
              </div>
            </div>

            {/* Cockpit Content */}
            <div className="grid-12" style={{ marginBottom: '28px', alignItems: 'start' }}>
              
              {/* Doctor Visual & Sticky Margin Note */}
              <div className="col-4" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ borderRadius: '22px', overflow: 'hidden', border: '3px solid #FFFFFF', boxShadow: '0 8px 24px rgba(0,0,0,0.08)', position: 'relative' }}>
                  <img
                    src="/assets/images/medikiosk_doctor_consult.jpg"
                    alt="Physician reviewing MediKiosk summary"
                    style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                  />
                  <div style={{ position: 'absolute', bottom: '8px', left: '8px', backgroundColor: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(8px)', padding: '4px 8px', borderRadius: '6px', fontSize: '9px', color: '#FFFFFF', fontFamily: 'var(--font-lemon)' }}>
                    Attending Physician Console
                  </div>
                </div>

                {/* Doctor Margin Note (Handwritten Human Accent) */}
                <div className="doctor-note">
                  <div style={{ fontFamily: 'var(--font-lemon)', fontSize: '9px', color: '#854D0E', marginBottom: '4px' }}>
                    Physician Margin Note (Human Accent):
                  </div>
                  <textarea
                    rows={3}
                    value={doctorMarginNote}
                    onChange={(e) => setDoctorMarginNote(e.target.value)}
                    style={{ width: '100%', background: 'transparent', border: 'none', resize: 'none', outline: 'none', fontFamily: 'var(--font-human)', fontSize: '19px', color: '#1E3A8A', lineHeight: 1.3 }}
                  />
                  <span style={{ fontSize: '9px', color: '#854D0E', display: 'block', marginTop: '3px' }}>
                    Editable clinical impression
                  </span>
                </div>
              </div>

              {/* Physician Quick Summary */}
              <div className="col-8" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                
                <div style={{ padding: '20px', borderRadius: '18px', backgroundColor: '#FFFFFF', border: '1px solid var(--c-border)', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '14px' }}>
                  <div>
                    <h4 style={{ fontFamily: 'var(--font-sagull)', fontSize: '22px', fontWeight: 'bold', color: '#111413' }}>
                      {selectedPatient.name}
                    </h4>
                    <p style={{ fontSize: '11px', color: '#57605D' }}>
                      {selectedPatient.age} Yrs • {selectedPatient.gender} • Blood Group {selectedPatient.bloodGroup}
                    </p>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontFamily: 'var(--font-lemon)', fontSize: '8px', color: '#84908C', display: 'block' }}>Triage Classification</span>
                      <span style={{ fontFamily: 'var(--font-lemon)', fontSize: '10px', color: '#D96B50' }}>ESI Level 2 Priority</span>
                    </div>
                    <div style={{ textAlign: 'right', borderLeft: '1px solid var(--c-border)', paddingLeft: '16px' }}>
                      <span style={{ fontFamily: 'var(--font-lemon)', fontSize: '8px', color: '#84908C', display: 'block' }}>Vitals Status</span>
                      <span style={{ fontFamily: 'var(--font-lemon)', fontSize: '10px', color: 'var(--c-teal)' }}>BP 146/92 • HR 84</span>
                    </div>
                  </div>
                </div>

                <div style={{ padding: '20px', borderRadius: '18px', backgroundColor: '#FFFFFF', border: '1px solid var(--c-border)' }}>
                  <span style={{ fontFamily: 'var(--font-lemon)', fontSize: '9px', color: 'var(--c-teal)', display: 'block', marginBottom: '6px' }}>
                    Executive Clinical Briefing
                  </span>
                  <p style={{ fontSize: '12px', color: '#111413', lineHeight: 1.6, marginBottom: '14px' }}>
                    Patient presents with <strong>3-day history of worsening substernal heaviness</strong> radiating to left shoulder on climbing stairs with diaphoresis. Prior angiogram in 2023 showed non-critical plaque. Recent labs indicate poorly controlled diabetes (HbA1c 7.9%) and LDL 152 mg/dL.
                  </p>

                  <div className="grid-12" style={{ borderTop: '1px solid var(--c-border)', paddingTop: '12px', fontSize: '11px' }}>
                    <div className="col-6" style={{ padding: '10px', borderRadius: '10px', backgroundColor: 'rgba(217, 107, 80, 0.12)' }}>
                      <strong style={{ color: '#D96B50', display: 'block', marginBottom: '2px', fontFamily: 'var(--font-lemon)', fontSize: '9px' }}>Critical Allergy Alert:</strong>
                      <span style={{ color: '#57605D' }}>Sulfa Drugs (Contraindicated)</span>
                    </div>
                    <div className="col-6" style={{ padding: '10px', borderRadius: '10px', backgroundColor: 'var(--c-teal-tint)' }}>
                      <strong style={{ color: 'var(--c-teal)', display: 'block', marginBottom: '2px', fontFamily: 'var(--font-lemon)', fontSize: '9px' }}>Immediate Action:</strong>
                      <span style={{ color: '#57605D' }}>12-lead ECG, hs-cTnI, adjust Statin</span>
                    </div>
                  </div>
                </div>

                <div style={{ padding: '20px', borderRadius: '18px', backgroundColor: '#FFFFFF', border: '1px solid var(--c-border)' }}>
                  <span style={{ fontFamily: 'var(--font-lemon)', fontSize: '9px', color: '#57605D', display: 'block', marginBottom: '6px' }}>
                    Reconciled Current Medications (Digitized via MediKiosk OCR)
                  </span>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', fontSize: '11px', fontFamily: 'monospace' }}>
                    <div style={{ padding: '7px 10px', borderRadius: '8px', backgroundColor: 'var(--c-warm-white)', display: 'flex', justifyContent: 'space-between' }}>
                      <span>Telmisartan 40mg</span>
                      <span style={{ color: '#84908C' }}>OD (Morn)</span>
                    </div>
                    <div style={{ padding: '7px 10px', borderRadius: '8px', backgroundColor: 'var(--c-warm-white)', display: 'flex', justifyContent: 'space-between' }}>
                      <span>Metformin 500mg</span>
                      <span style={{ color: '#84908C' }}>BD (Meals)</span>
                    </div>
                    <div style={{ padding: '7px 10px', borderRadius: '8px', backgroundColor: 'var(--c-warm-white)', display: 'flex', justifyContent: 'space-between' }}>
                      <span>Atorvastatin 20mg</span>
                      <span style={{ color: '#84908C' }}>HS (Night)</span>
                    </div>
                    <div style={{ padding: '7px 10px', borderRadius: '8px', backgroundColor: 'var(--c-warm-white)', display: 'flex', justifyContent: 'space-between' }}>
                      <span>Aspirin 75mg</span>
                      <span style={{ color: '#84908C' }}>OD (Lunch)</span>
                    </div>
                  </div>
                </div>

              </div>

            </div>

            {/* Stage 5 Action */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '20px', borderTop: '1px solid var(--c-border)' }}>
              <button
                onClick={() => setActiveStep(4)}
                style={{ background: 'none', border: 'none', fontFamily: 'var(--font-lemon)', fontSize: '10px', color: '#57605D', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <ArrowLeft style={{ width: '15px', height: '15px' }} />
                <span>View Full SOAP Record</span>
              </button>

              <button
                onClick={() => alert('Consultation started. Patient called into Consultation Room.')}
                className="btn-teal"
              >
                <User style={{ width: '15px', height: '15px' }} />
                <span>CALL PATIENT INTO CONSULTATION ROOM</span>
              </button>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
