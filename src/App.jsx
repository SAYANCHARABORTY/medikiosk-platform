import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PatientStorySection from './components/PatientStorySection';
import PatientJourneyKiosk from './components/PatientJourneyKiosk';
import HardwareShowcase from './components/HardwareShowcase';
import AyushSection from './components/AyushSection';
import AbdmPrivacySection from './components/AbdmPrivacySection';
import HospitalImpact from './components/HospitalImpact';
import Footer from './components/Footer';

export default function App() {
  const [isAyushMode, setIsAyushMode] = useState(false);

  // Smooth scroll helper
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleStartKiosk = () => {
    scrollToSection('patient-journey');
  };

  const handleExplorePhysician = () => {
    scrollToSection('patient-journey');
  };

  const handleToggleAyush = () => {
    setIsAyushMode(!isAyushMode);
    if (!isAyushMode) {
      scrollToSection('ayush');
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--c-warm-white)', color: 'var(--c-charcoal)' }}>
      
      {/* Floating Glass Navigation Bar */}
      <Navbar
        onStartKiosk={handleStartKiosk}
        onOpenDoctor={handleExplorePhysician}
        isAyushMode={isAyushMode}
        onToggleAyush={handleToggleAyush}
      />

      {/* Cinematic Looping Video Hero (100vh Background) */}
      <Hero
        onStartJourney={handleStartKiosk}
        onExplorePhysician={handleExplorePhysician}
      />

      {/* 01 — Every Patient Has a Story & 02 — What If The Story Arrived Before The Patient? */}
      <PatientStorySection onStartJourney={handleStartKiosk} />

      {/* 03-09 Interactive Patient Journey (Identify -> Converse -> Scan -> Summarize -> Consult) */}
      <div id="physician-suite">
        <PatientJourneyKiosk isAyushMode={isAyushMode} />
      </div>

      {/* Hardware Engineering Showcase */}
      <HardwareShowcase />

      {/* 10 — AYUSH Mode: Dashavidha Pariksha & Ahara-Vihara */}
      <AyushSection onStartAyushKiosk={handleStartKiosk} />

      {/* 11 — ABDM + Privacy Architecture */}
      <AbdmPrivacySection />

      {/* Hospital Economic Impact & Capacity Calculator */}
      <HospitalImpact />

      {/* 12 — Final CTA & Editorial Footer */}
      <Footer onStartJourney={handleStartKiosk} />

    </div>
  );
}
