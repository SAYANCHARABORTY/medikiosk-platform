import React, { useState } from 'react';
import { Leaf, Sun, Moon, Check, Sparkles } from 'lucide-react';
import { AYUSH_DASHAVIDHA_PARIKSHA, AHARA_VIHARA_DATA } from '../data/mockData';

export default function AyushSection({ onStartAyushKiosk }) {
  const [selectedPariksha, setSelectedPariksha] = useState(AYUSH_DASHAVIDHA_PARIKSHA[0]);
  const [activeTab, setActiveTab] = useState('dashavidha');

  return (
    <section id="ayush" className="editorial-section" style={{ backgroundColor: 'var(--c-beige)' }}>
      
      {/* Background Watermark */}
      <div style={{
        position: 'absolute',
        bottom: '20px',
        right: '30px',
        fontSize: '200px',
        fontFamily: 'var(--font-sagull)',
        fontWeight: 300,
        color: 'rgba(31, 61, 56, 0.035)',
        lineHeight: 1,
        userSelect: 'none',
        pointerEvents: 'none'
      }}>
        आयुष
      </div>

      <div className="editorial-container">
        
        {/* Header with Single-Line Desktop Heading */}
        <div style={{ maxWidth: '960px', marginBottom: '48px' }}>
          <div className="section-kicker">
            <Leaf style={{ width: '14px', height: '14px', color: 'var(--c-coral)' }} />
            <span>10 — AYUSH CLINICAL INTAKE</span>
          </div>
          <h2 className="section-title heading-single-line">
            Ayurvedic Dashavidha Pariksha & Ahara-Vihara
          </h2>
          <p className="section-subtitle">
            Standardizing the classical clinical examination of Charaka Samhita into digital pre-consultation intelligence for Ayurvedic hospital OPDs.
          </p>
        </div>

        {/* Mode Switcher Tabs */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '36px', borderBottom: '1px solid var(--c-border)', paddingBottom: '14px' }}>
          <button
            onClick={() => setActiveTab('dashavidha')}
            style={{
              padding: '10px 22px',
              borderRadius: '9999px',
              fontFamily: 'var(--font-lemon)',
              fontSize: '11px',
              border: 'none',
              cursor: 'pointer',
              backgroundColor: activeTab === 'dashavidha' ? 'var(--c-teal)' : 'rgba(255,255,255,0.7)',
              color: activeTab === 'dashavidha' ? '#FFFFFF' : '#57605D',
              boxShadow: activeTab === 'dashavidha' ? '0 4px 16px rgba(31, 61, 56, 0.25)' : 'none'
            }}
          >
            Dashavidha Pariksha (दशविध परीक्षा)
          </button>
          <button
            onClick={() => setActiveTab('ahara_vihara')}
            style={{
              padding: '10px 22px',
              borderRadius: '9999px',
              fontFamily: 'var(--font-lemon)',
              fontSize: '11px',
              border: 'none',
              cursor: 'pointer',
              backgroundColor: activeTab === 'ahara_vihara' ? 'var(--c-teal)' : 'rgba(255,255,255,0.7)',
              color: activeTab === 'ahara_vihara' ? '#FFFFFF' : '#57605D',
              boxShadow: activeTab === 'ahara_vihara' ? '0 4px 16px rgba(31, 61, 56, 0.25)' : 'none'
            }}
          >
            Ahara & Vihara Lifestyle Audit (आहार-विहार)
          </button>
        </div>

        {/* Tab 1: Dashavidha Pariksha */}
        {activeTab === 'dashavidha' && (
          <div className="grid-12" style={{ alignItems: 'start' }}>
            
            {/* 10-Item List */}
            <div className="col-5" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {AYUSH_DASHAVIDHA_PARIKSHA.map((item) => {
                const isSelected = selectedPariksha.id === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedPariksha(item)}
                    style={{
                      padding: '14px 18px',
                      borderRadius: '14px',
                      border: isSelected ? '1.5px solid var(--c-teal)' : '1px solid var(--c-border)',
                      backgroundColor: isSelected ? 'var(--c-teal)' : '#FFFFFF',
                      color: isSelected ? '#FFFFFF' : '#111413',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      boxShadow: isSelected ? '0 6px 20px rgba(31, 61, 56, 0.2)' : 'none'
                    }}
                  >
                    <div>
                      <h4 style={{ fontFamily: 'var(--font-lemon)', fontSize: '11px' }}>{item.title}</h4>
                      <span style={{ fontSize: '10px', opacity: isSelected ? 0.8 : 0.6 }}>
                        {item.subtitle}
                      </span>
                    </div>
                    {isSelected && <Check style={{ width: '15px', height: '15px', color: 'var(--c-cyan)' }} />}
                  </div>
                );
              })}
            </div>

            {/* Selected Assessment Card */}
            <div className="col-7 editorial-card" style={{ padding: '40px' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '12px', paddingBottom: '14px', borderBottom: '1px solid var(--c-border)', marginBottom: '20px' }}>
                <div>
                  <span style={{ fontFamily: 'var(--font-lemon)', fontSize: '10px', color: 'var(--c-coral)', display: 'block' }}>
                    Classical Ayurvedic Parameter
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-sagull)', fontSize: '30px', color: '#111413', fontWeight: 400 }}>
                    {selectedPariksha.title}
                  </h3>
                </div>
                <span style={{ padding: '4px 12px', borderRadius: '9999px', backgroundColor: 'rgba(217, 107, 80, 0.15)', color: '#D96B50', fontFamily: 'var(--font-lemon)', fontSize: '10px' }}>
                  {selectedPariksha.subtitle}
                </span>
              </div>

              <p style={{ fontSize: '12px', color: '#57605D', lineHeight: 1.6, marginBottom: '20px' }}>
                {selectedPariksha.description}
              </p>

              <div style={{ padding: '20px', borderRadius: '16px', backgroundColor: 'var(--c-cream)', border: '1px solid var(--c-border)', marginBottom: '20px' }}>
                <span style={{ fontFamily: 'var(--font-lemon)', fontSize: '9px', color: 'var(--c-teal)', display: 'block', marginBottom: '4px' }}>
                  Intake Assessment for Patient #4829:
                </span>
                <span style={{ fontFamily: 'var(--font-sagull)', fontSize: '22px', fontWeight: 'bold', color: '#111413', display: 'block' }}>
                  {selectedPariksha.currentAssessment}
                </span>
              </div>

              <div>
                <span style={{ fontFamily: 'var(--font-lemon)', fontSize: '10px', color: '#84908C', display: 'block', marginBottom: '10px' }}>
                  Digitized Clinical Markers:
                </span>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '8px' }}>
                  {selectedPariksha.markers.map((marker, mIdx) => (
                    <div key={mIdx} style={{ padding: '9px 12px', borderRadius: '10px', backgroundColor: 'var(--c-warm-white)', border: '1px solid var(--c-border)', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: 'var(--c-coral)' }} />
                      <span>{marker}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ paddingTop: '20px', marginTop: '28px', borderTop: '1px solid var(--c-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '11px', color: '#84908C' }}>
                  Ayush Grid & National Health Authority Architecture
                </span>
                <button
                  onClick={onStartAyushKiosk}
                  className="btn-teal"
                  style={{ padding: '9px 18px', fontSize: '10px' }}
                >
                  Simulate AYUSH Intake
                </button>
              </div>
            </div>

          </div>
        )}

        {/* Tab 2: Ahara-Vihara */}
        {activeTab === 'ahara_vihara' && (
          <div className="grid-12">
            <div className="col-6 editorial-card" style={{ padding: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '12px', backgroundColor: 'rgba(217, 107, 80, 0.15)', color: 'var(--c-coral)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Sun style={{ width: '18px', height: '18px' }} />
                </div>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-sagull)', fontSize: '22px', fontWeight: 'bold' }}>Ahara (आहार परीक्षा)</h3>
                  <p style={{ fontSize: '11px', color: '#57605D' }}>Dietary regimen, Rasa balance & Viruddha Ahara</p>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {AHARA_VIHARA_DATA.ahara.map((item, idx) => (
                  <div key={idx} style={{ padding: '12px 16px', borderRadius: '12px', backgroundColor: 'var(--c-warm-white)', border: '1px solid var(--c-border)' }}>
                    <span style={{ fontFamily: 'var(--font-lemon)', fontSize: '9px', color: '#84908C', display: 'block', marginBottom: '2px' }}>{item.label}</span>
                    <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#111413' }}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-6 editorial-card" style={{ padding: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '12px', backgroundColor: 'var(--c-teal-tint)', color: 'var(--c-teal)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Moon style={{ width: '18px', height: '18px' }} />
                </div>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-sagull)', fontSize: '22px', fontWeight: 'bold' }}>Vihara (विहार परीक्षा)</h3>
                  <p style={{ fontSize: '11px', color: '#57605D' }}>Sleep cycle, Ratrijagarana & sedentary lifestyle</p>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {AHARA_VIHARA_DATA.vihara.map((item, idx) => (
                  <div key={idx} style={{ padding: '12px 16px', borderRadius: '12px', backgroundColor: 'var(--c-warm-white)', border: '1px solid var(--c-border)' }}>
                    <span style={{ fontFamily: 'var(--font-lemon)', fontSize: '9px', color: '#84908C', display: 'block', marginBottom: '2px' }}>{item.label}</span>
                    <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#111413' }}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
