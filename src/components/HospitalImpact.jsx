import React, { useState } from 'react';
import { TrendingUp, Clock, Users, Building, ShieldCheck } from 'lucide-react';

export default function HospitalImpact() {
  const [dailyPatients, setDailyPatients] = useState(650);
  const [doctorChambers, setDoctorChambers] = useState(18);

  const minutesSavedDaily = dailyPatients * 2.5;
  const hoursSavedMonthly = Math.round((minutesSavedDaily * 26) / 60);
  const waitReductionPct = Math.min(74, Math.round(50 + (dailyPatients / 3000) * 20));
  const capacityUplift = Math.round(dailyPatients * 0.22);

  return (
    <section className="editorial-section" style={{ backgroundColor: 'var(--c-warm-white)', borderTop: '1px solid var(--c-border)' }}>
      <div className="editorial-container">
        
        {/* Header with Single-Line Desktop Title */}
        <div style={{ maxWidth: '960px', marginBottom: '48px' }}>
          <div className="section-kicker">
            <TrendingUp style={{ width: '14px', height: '14px' }} />
            <span>QUANTIFIABLE CLINICAL IMPACT</span>
          </div>
          <h2 className="section-title heading-single-line">
            Transforming Hospital Economics & Care Depth
          </h2>
          <p className="section-subtitle">
            Real metrics recorded across multi-speciality hospitals and high-density outpatient departments.
          </p>
        </div>

        {/* 4 Stat Cards */}
        <div className="grid-12" style={{ marginBottom: '56px' }}>
          <div className="col-3 editorial-card" style={{ padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <span style={{ fontFamily: 'var(--font-sagull)', fontSize: '56px', fontWeight: 'bold', color: 'var(--c-teal)', lineHeight: 1, marginBottom: '14px' }}>-68%</span>
            <div>
              <h4 style={{ fontFamily: 'var(--font-lemon)', fontSize: '11px', color: '#111413', marginBottom: '4px' }}>OPD Wait Time Drop</h4>
              <p style={{ fontSize: '11px', color: '#57605D' }}>Corridor waiting delay dropped from 48 to 15 minutes.</p>
            </div>
          </div>

          <div className="col-3 editorial-card" style={{ padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <span style={{ fontFamily: 'var(--font-sagull)', fontSize: '56px', fontWeight: 'bold', color: 'var(--c-teal)', lineHeight: 1, marginBottom: '14px' }}>4.2x</span>
            <div>
              <h4 style={{ fontFamily: 'var(--font-lemon)', fontSize: '11px', color: '#111413', marginBottom: '4px' }}>Physician Consult Depth</h4>
              <p style={{ fontSize: '11px', color: '#57605D' }}>Consultation time dedicated to physical exam and counseling.</p>
            </div>
          </div>

          <div className="col-3 editorial-card" style={{ padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <span style={{ fontFamily: 'var(--font-sagull)', fontSize: '56px', fontWeight: 'bold', color: 'var(--c-teal)', lineHeight: 1, marginBottom: '14px' }}>99.4%</span>
            <div>
              <h4 style={{ fontFamily: 'var(--font-lemon)', fontSize: '11px', color: '#111413', marginBottom: '4px' }}>ABHA Record Linkage</h4>
              <p style={{ fontSize: '11px', color: '#57605D' }}>Seamless sync with National Health Authority digital lockers.</p>
            </div>
          </div>

          <div className="col-3 editorial-card" style={{ padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <span style={{ fontFamily: 'var(--font-sagull)', fontSize: '56px', fontWeight: 'bold', color: 'var(--c-teal)', lineHeight: 1, marginBottom: '14px' }}>0</span>
            <div>
              <h4 style={{ fontFamily: 'var(--font-lemon)', fontSize: '11px', color: '#111413', marginBottom: '4px' }}>Physician Typing</h4>
              <p style={{ fontSize: '11px', color: '#57605D' }}>Physicians review pre-structured SOAP notes in 15 seconds.</p>
            </div>
          </div>
        </div>

        {/* Dynamic Capacity Calculator */}
        <div style={{ backgroundColor: 'var(--c-cream)', borderRadius: '28px', padding: '40px 48px', border: '1px solid var(--c-border)', boxShadow: '0 10px 30px rgba(0,0,0,0.04)' }}>
          <div style={{ maxWidth: '820px', marginBottom: '32px' }}>
            <span style={{ fontFamily: 'var(--font-lemon)', fontSize: '9px', color: 'var(--c-teal)', display: 'block', marginBottom: '4px' }}>
              ESTIMATE YOUR OPD REVENUE & TIME RECOVERY
            </span>
            <h3 style={{ fontFamily: 'var(--font-sagull)', fontSize: '32px', color: '#111413', fontWeight: 400 }}>
              Hospital Triage & Time Recovery Calculator
            </h3>
          </div>

          <div className="grid-12" style={{ alignItems: 'center' }}>
            
            {/* Sliders */}
            <div className="col-6" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-lemon)', fontSize: '11px', color: '#111413', marginBottom: '8px' }}>
                  <span>Daily OPD Footfall</span>
                  <span style={{ color: 'var(--c-teal)', fontWeight: 'bold' }}>{dailyPatients.toLocaleString()} Patients/Day</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="3000"
                  step="50"
                  value={dailyPatients}
                  onChange={(e) => setDailyPatients(Number(e.target.value))}
                  style={{ width: '100%', height: '8px', accentColor: 'var(--c-teal)', cursor: 'pointer' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#84908C', marginTop: '4px' }}>
                  <span>100 (Day Clinic)</span>
                  <span>3,000 (Tertiary Hospital)</span>
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-lemon)', fontSize: '11px', color: '#111413', marginBottom: '8px' }}>
                  <span>Active Doctor Chambers</span>
                  <span style={{ color: 'var(--c-teal)', fontWeight: 'bold' }}>{doctorChambers} Chambers</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="60"
                  step="1"
                  value={doctorChambers}
                  onChange={(e) => setDoctorChambers(Number(e.target.value))}
                  style={{ width: '100%', height: '8px', accentColor: 'var(--c-teal)', cursor: 'pointer' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#84908C', marginTop: '4px' }}>
                  <span>5 Chambers</span>
                  <span>60 Chambers</span>
                </div>
              </div>
            </div>

            {/* Results Card */}
            <div className="col-6" style={{ backgroundColor: 'var(--c-teal)', color: '#FFFFFF', borderRadius: '22px', padding: '32px', boxShadow: '0 16px 40px rgba(31, 61, 56, 0.3)' }}>
              <span style={{ fontFamily: 'var(--font-lemon)', fontSize: '10px', color: 'var(--c-cyan)', display: 'block', marginBottom: '16px' }}>
                Monthly Clinical Time Recovered
              </span>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                <div>
                  <span style={{ fontFamily: 'var(--font-sagull)', fontSize: '50px', fontWeight: 'bold', lineHeight: 1, display: 'block' }}>
                    {hoursSavedMonthly.toLocaleString()}
                  </span>
                  <span style={{ fontFamily: 'var(--font-lemon)', fontSize: '9px', color: 'rgba(255,255,255,0.7)', display: 'block', marginTop: '6px' }}>
                    Doctor Hours Saved / Mo
                  </span>
                </div>

                <div>
                  <span style={{ fontFamily: 'var(--font-sagull)', fontSize: '50px', fontWeight: 'bold', color: 'var(--c-cyan)', lineHeight: 1, display: 'block' }}>
                    +{capacityUplift}
                  </span>
                  <span style={{ fontFamily: 'var(--font-lemon)', fontSize: '9px', color: 'rgba(255,255,255,0.7)', display: 'block', marginTop: '6px' }}>
                    Extra Consults / Day
                  </span>
                </div>
              </div>

              <div style={{ borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: '14px', display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'rgba(255,255,255,0.8)' }}>
                <span>Wait Delay: <strong style={{ color: '#FFFFFF' }}>-{waitReductionPct}%</strong></span>
                <span>Burnout Metric: <strong style={{ color: '#FFFFFF' }}>-42%</strong></span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
