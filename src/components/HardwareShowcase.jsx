import React, { useState } from 'react';
import { Cpu, Mic, Thermometer, Heart, QrCode, Printer, ShieldCheck } from 'lucide-react';

const HARDWARE_MODULES = [
  {
    id: 'mic',
    name: 'Directional Acoustic Array',
    icon: Mic,
    spec: '8-element beamforming array',
    desc: 'Isolates patient speech within a 45-degree cone, cancelling ambient hospital corridor noise in busy outpatient waiting halls.'
  },
  {
    id: 'temp',
    name: 'Non-Contact Infrared Pyrometer',
    icon: Thermometer,
    spec: '± 0.1°C clinical accuracy',
    desc: 'Medical-grade thermal sensor records forehead temperature in 800ms without physical skin contact, preventing cross-contamination.'
  },
  {
    id: 'spo2',
    name: 'Optical Pulse Oximeter Well',
    icon: Heart,
    spec: 'Multi-wavelength photoplethysmography',
    desc: 'Tactile finger recess measures SpO2 oxygen saturation, resting pulse rate, and perfusion index within 6 seconds.'
  },
  {
    id: 'screen',
    name: 'Antimicrobial Touch Glass',
    icon: Cpu,
    spec: '10-point capacitive copper-ion glass',
    desc: 'Anti-glare, high-luminance display with continuous ionic copper antimicrobial finish that eliminates 99.9% of surface pathogens.'
  },
  {
    id: 'abha',
    name: 'ABHA & Aadhaar e-KYC Reader',
    icon: QrCode,
    spec: 'Optical QR + Biometric module',
    desc: 'Instantly reads Ayushman Bharat ABHA cards, digital smartphone QR codes, and Aadhaar-enabled biometric authentication.'
  },
  {
    id: 'printer',
    name: 'Thermal Token & Queue Dispenser',
    icon: Printer,
    spec: 'High-speed 203 DPI thermal print',
    desc: 'Dispenses patient routing tokens with triage priority code, assigned OPD room number, and estimated waiting time.'
  }
];

export default function HardwareShowcase() {
  const [activeModule, setActiveModule] = useState(HARDWARE_MODULES[0]);

  return (
    <section className="editorial-section" style={{ backgroundColor: 'var(--c-warm-white)', borderTop: '1px solid var(--c-border)' }}>
      <div className="editorial-container">
        
        {/* Header with Single-Line Desktop Title */}
        <div style={{ maxWidth: '960px', marginBottom: '48px' }}>
          <div className="section-kicker">
            <Cpu style={{ width: '14px', height: '14px' }} />
            <span>CLINICAL HARDWARE ENGINEERING</span>
          </div>
          <h2 className="section-title heading-single-line">
            Engineered For High-Volume Hospital Halls
          </h2>
          <p className="section-subtitle">
            Every millimeter of the MediKiosk terminal is engineered to withstand high patient throughput, acoustic noise, and rigorous infection control protocols.
          </p>
        </div>

        {/* Layout: Hardware Image + Interactive Subsystems */}
        <div className="grid-12" style={{ alignItems: 'center' }}>
          
          {/* Photo Column */}
          <div className="col-7" style={{ position: 'relative' }}>
            <div style={{ borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.1)', border: '4px solid #FFFFFF' }}>
              <img
                src="/assets/images/medikiosk_hardware_detail.jpg"
                alt="MediKiosk clinical hardware terminal details"
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </div>

            <div style={{
              position: 'absolute',
              bottom: '-16px',
              right: '-16px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '14px 20px',
              borderRadius: '16px',
              backgroundColor: 'var(--c-teal)',
              color: '#FFFFFF',
              boxShadow: '0 12px 32px rgba(31, 61, 56, 0.3)'
            }}>
              <ShieldCheck style={{ width: '24px', height: '24px', color: 'var(--c-cyan)' }} />
              <div>
                <span style={{ fontFamily: 'var(--font-lemon)', fontSize: '10px', display: 'block' }}>ISO 13485 & CDSCO</span>
                <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.7)' }}>Medical Device Certified</span>
              </div>
            </div>
          </div>

          {/* Modules List Column */}
          <div className="col-5" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <span style={{ fontFamily: 'var(--font-lemon)', fontSize: '10px', color: '#84908C', marginBottom: '4px', display: 'block' }}>
              Explore Subsystem Architecture:
            </span>

            {HARDWARE_MODULES.map((mod) => {
              const Icon = mod.icon;
              const isSelected = activeModule.id === mod.id;
              return (
                <div
                  key={mod.id}
                  onClick={() => setActiveModule(mod)}
                  style={{
                    padding: '16px 18px',
                    borderRadius: '16px',
                    border: isSelected ? '1.5px solid var(--c-teal)' : '1px solid var(--c-border)',
                    backgroundColor: isSelected ? '#FFFFFF' : 'rgba(244, 241, 234, 0.6)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: isSelected ? '0 6px 20px rgba(0,0,0,0.05)' : 'none'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: isSelected ? 'var(--c-teal)' : 'var(--c-beige)',
                      color: isSelected ? '#FFFFFF' : '#57605D'
                    }}>
                      <Icon style={{ width: '16px', height: '16px' }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontFamily: 'var(--font-lemon)', fontSize: '11px', color: '#111413' }}>{mod.name}</h4>
                      <span style={{ fontFamily: 'monospace', fontSize: '9px', color: 'var(--c-teal)' }}>{mod.spec}</span>
                    </div>
                  </div>

                  {isSelected && (
                    <p style={{ fontSize: '11px', color: '#57605D', marginTop: '8px', paddingLeft: '44px', lineHeight: 1.5 }}>
                      {mod.desc}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
