// Clinical & Kiosk Data Model for MediKiosk
// Sanitized with generic clinical standards: Patient, Physician, OPD, Reference Laboratory

export const LANGUAGES = [
  { id: 'en', name: 'English', native: 'English', icon: '🌐' },
  { id: 'hi', name: 'Hindi', native: 'हिन्दी', icon: '🇮🇳' },
  { id: 'ta', name: 'Tamil', native: 'தமிழ்', icon: '🇮🇳' },
  { id: 'bn', name: 'Bengali', native: 'বাংলা', icon: '🇮🇳' },
  { id: 'te', name: 'Telugu', native: 'తెలుగు', icon: '🇮🇳' },
  { id: 'mr', name: 'Marathi', native: 'मराठी', icon: '🇮🇳' }
];

export const SAMPLE_PATIENTS = [
  {
    id: 'P-4829',
    name: 'Patient #4829',
    age: 58,
    gender: 'Male',
    abhaId: '91-4829-1029-4819',
    phone: '+91 98XXX X4819',
    language: 'Hindi',
    bloodGroup: 'B+',
    emergencyContact: 'Primary Contact (Spouse) - Registered in EMR',
    chiefComplaint: 'Substernal chest heaviness and exertional breathlessness for 3 days',
    riskCategory: 'HIGH_PRIORITY'
  },
  {
    id: 'P-1104',
    name: 'Patient #1104',
    age: 34,
    gender: 'Female',
    abhaId: '91-6201-9923-1104',
    phone: '+91 98XXX X7210',
    language: 'English',
    bloodGroup: 'O+',
    emergencyContact: 'Primary Contact (Family) - Registered in EMR',
    chiefComplaint: 'Recurrent cephalalgia with visual aura and nausea',
    riskCategory: 'ROUTINE'
  },
  {
    id: 'P-5509',
    name: 'Patient #5509',
    age: 64,
    gender: 'Male',
    abhaId: '91-8840-3312-5509',
    phone: '+91 94XXX X9283',
    language: 'Tamil',
    bloodGroup: 'A+',
    emergencyContact: 'Primary Contact (Family) - Registered in EMR',
    chiefComplaint: 'Bilateral knee arthralgia and morning stiffness for 6 months',
    riskCategory: 'CHRONIC_OPD'
  }
];

export const CLINICAL_SYMPTOMS_TREE = [
  {
    id: 'chest_pain',
    title: 'Chest Pain / Discomfort',
    titleHi: 'सीने में दर्द या भारीपन',
    category: 'Cardiovascular',
    severity: 'High',
    questions: [
      {
        id: 'onset',
        text: 'When did this discomfort begin?',
        textHi: 'यह भारीपन या दर्द कब से शुरू हुआ?',
        options: ['Within the last 2 hours', '1–3 days ago', '1–2 weeks ago', 'Chronic / intermittent for months']
      },
      {
        id: 'character',
        text: 'How would you describe the feeling?',
        textHi: 'दर्द का स्वभाव कैसा महसूस होता है?',
        options: ['Heavy pressure / tight squeezing', 'Sharp stabbing pain', 'Burning / acidity-like', 'Dull continuous ache']
      },
      {
        id: 'radiation',
        text: 'Does the pain spread anywhere else?',
        textHi: 'क्या दर्द शरीर के किसी और हिस्से में फैलता है?',
        options: ['Radiating to left arm & shoulder', 'Spreading to jaw or neck', 'Spreading to upper back', 'Does not spread anywhere']
      },
      {
        id: 'aggravating',
        text: 'What makes the pain worse or better?',
        textHi: 'दर्द किस बात से बढ़ता या कम होता है?',
        options: ['Worse with physical walking / stairs', 'Worse with deep breathing', 'Relieved by rest', 'No change with exertion']
      },
      {
        id: 'associated',
        text: 'Are you experiencing any other symptoms right now?',
        textHi: 'क्या आपको इनमें से कोई और लक्षण भी हैं?',
        options: ['Cold sweating (diaphoresis)', 'Shortness of breath', 'Nausea / vomiting', 'Dizziness or lightheadedness']
      }
    ]
  },
  {
    id: 'respiratory',
    title: 'Persistent Cough & Breathlessness',
    titleHi: 'लगातार खांसी और सांस फूलना',
    category: 'Pulmonology',
    severity: 'Moderate',
    questions: [
      {
        id: 'cough_type',
        text: 'Is the cough dry or producing phlegm?',
        textHi: 'खांसी सूखी है या बलगम वाली?',
        options: ['Dry irritating cough', 'Yellow/green sputum', 'Blood-tinged phlegm', 'Post-nasal drip']
      },
      {
        id: 'breathless_onset',
        text: 'When does shortness of breath occur?',
        textHi: 'सांस फूलने की समस्या कब अधिक होती है?',
        options: ['At rest', 'Only during exertion', 'Waking up at night (Orthopnea)', 'Sudden acute episodes']
      }
    ]
  },
  {
    id: 'fever',
    title: 'Fever with Chills',
    titleHi: 'बुखार और ठंड लगना',
    category: 'Infectious Disease',
    severity: 'Moderate',
    questions: [
      {
        id: 'fever_duration',
        text: 'Duration of fever spikes?',
        textHi: 'बुखार कितने दिनों से आ रहा है?',
        options: ['1–2 days', '3–7 days', 'More than a week', 'Intermittent evening rise']
      }
    ]
  },
  {
    id: 'joint_pain',
    title: 'Joint Pain & Stiffness',
    titleHi: 'जोड़ों का दर्द और अकड़न',
    category: 'Rheumatology / Ortho',
    severity: 'Low',
    questions: [
      {
        id: 'joint_location',
        text: 'Which joints are primarily involved?',
        textHi: 'कौन से जोड़ों में मुख्य रूप से दर्द है?',
        options: ['Both knees', 'Small finger joints', 'Lower back & hips', 'Single ankle or foot']
      }
    ]
  }
];

export const SAMPLE_DOCUMENTS = [
  {
    id: 'doc_discharge',
    name: 'Discharge_Summary_Previous_Hospital.pdf',
    type: 'Hospital Discharge Summary',
    facility: 'Regional Tertiary Hospital',
    date: '14 Oct 2023',
    pages: 3,
    status: 'Verified OCR',
    extracted: {
      diagnosis: 'Essential Hypertension (Stage II), Dyslipidemia, Mild CAD (Non-critical plaques)',
      procedures: 'Coronary Angiogram via Right Radial approach (Normal LV function, EF 58%)',
      medications: [
        { name: 'Telmisartan', dose: '40 mg', freq: 'Once daily (Morning)', type: 'Antihypertensive' },
        { name: 'Atorvastatin', dose: '20 mg', freq: 'Once daily (Night)', type: 'Statin' },
        { name: 'Aspirin', dose: '75 mg', freq: 'Once daily (After lunch)', type: 'Antiplatelet' }
      ],
      allergies: 'Sulfa Drugs (developed erythematous maculopapular rash in 2019)'
    }
  },
  {
    id: 'doc_lab_report',
    name: 'Comprehensive_Metabolic_Panel.pdf',
    type: 'Diagnostic Laboratory Report',
    facility: 'Central Pathology Laboratory',
    date: '18 Aug 2025',
    pages: 2,
    status: 'Verified OCR',
    extracted: {
      investigations: [
        { test: 'Fasting Blood Glucose', value: '154 mg/dL', ref: '70–99 mg/dL', status: 'HIGH' },
        { test: 'HbA1c Glycated Hgb', value: '7.9 %', ref: '< 5.7 %', status: 'HIGH' },
        { test: 'Serum Creatinine', value: '1.12 mg/dL', ref: '0.7–1.3 mg/dL', status: 'NORMAL' },
        { test: 'eGFR', value: '76 mL/min/1.73m²', ref: '> 60', status: 'NORMAL' },
        { test: 'Total Cholesterol', value: '238 mg/dL', ref: '< 200 mg/dL', status: 'HIGH' },
        { test: 'LDL Cholesterol', value: '152 mg/dL', ref: '< 100 mg/dL', status: 'HIGH' },
        { test: 'Triglycerides', value: '198 mg/dL', ref: '< 150 mg/dL', status: 'HIGH' },
        { test: 'HDL Cholesterol', value: '42 mg/dL', ref: '> 40 mg/dL', status: 'NORMAL' }
      ]
    }
  },
  {
    id: 'doc_prescription',
    name: 'Outpatient_Prescription_Historical.jpg',
    type: 'Outpatient Prescription',
    facility: 'Primary Care Clinic',
    date: '02 Nov 2025',
    pages: 1,
    status: 'Verified OCR',
    extracted: {
      physician: 'Attending General Physician',
      notes: 'Added Tab Metformin 500mg BD after meals for elevated fasting glucose. Advised lifestyle modifications & repeat HbA1c in 3 months.'
    }
  }
];

export const MEDICAL_TIMELINE_EVENTS = [
  {
    year: '2019',
    date: '12 Sep 2019',
    event: 'Sulfa Drug Allergy Documented',
    facility: 'Outpatient Clinic',
    detail: 'Erythematous rash and urticaria following Co-trimoxazole administration. Entered into electronic allergy registry.',
    badge: 'ALLERGY FLAG',
    color: '#D96B50'
  },
  {
    year: '2021',
    date: '04 Mar 2021',
    event: 'Diagnosis of Type 2 Diabetes Mellitus',
    facility: 'District Hospital OPD',
    detail: 'Fasting glucose 162 mg/dL. Initiated on dietary modification and Metformin 500mg OD.',
    badge: 'CHRONIC ONSET',
    color: '#D9822B'
  },
  {
    year: '2023',
    date: '14 Oct 2023',
    event: 'Coronary Angiogram & Hypertension Stage II',
    facility: 'Regional Tertiary Hospital',
    detail: 'Elective coronary angiography. Non-critical diffuse plaquing. Initiated on Telmisartan 40mg and Atorvastatin 20mg.',
    badge: 'PROCEDURE',
    color: '#1F3D38'
  },
  {
    year: '2025',
    date: '18 Aug 2025',
    event: 'Metabolic Panel Deterioration',
    facility: 'Central Pathology Laboratory',
    detail: 'HbA1c elevated to 7.9%, LDL 152 mg/dL. Fasting glucose poorly controlled at 154 mg/dL.',
    badge: 'LAB ALERT',
    color: '#79BFBC'
  },
  {
    year: 'Today',
    date: 'Present Consultation',
    event: 'MediKiosk Clinical Intake Completed',
    facility: 'Outpatient Department (OPD) Reception',
    detail: 'Patient presents with 3-day history of exertion-triggered chest heaviness radiating to left shoulder and diaphoresis. Prior vitals recorded: BP 146/92, SpO2 97%, HR 84 bpm.',
    badge: 'ACUTE INTAKE',
    color: '#D96B50'
  }
];

export const AYUSH_DASHAVIDHA_PARIKSHA = [
  {
    id: 'prakriti',
    title: '1. Prakriti (प्रकृति)',
    subtitle: 'Constitutional Dosha Type',
    description: 'Inherent genetic and physiological constitution determined at conception.',
    currentAssessment: 'Pitta-Vata Predominant (पित्त-वातज)',
    markers: ['Light muscular build', 'Warm skin temperature', 'Moderate appetite with sharp hunger pangs', 'Sharp analytical cognition']
  },
  {
    id: 'vikriti',
    title: '2. Vikriti (विकृति)',
    subtitle: 'Current Pathological Imbalance',
    description: 'Existing imbalance of Dosha-Dhatu-Mala causing symptoms.',
    currentAssessment: 'Vata-Pitta Dushti with Rasavaha Srotorodha',
    markers: ['Chest constriction (Vata)', 'Mild sour eructation (Pitta)', 'Dryness of mucous membranes', 'Restlessness']
  },
  {
    id: 'sara',
    title: '3. Sara (सार)',
    subtitle: 'Tissue Excellence & Essence',
    description: 'Quality and structural vitality of the 7 Dhatus.',
    currentAssessment: 'Madhyama Rakta-Mamsa Sara (Moderate tissue vigor)',
    markers: ['Good hemoglobin stability', 'Firm muscle tone', 'Adequate bone density']
  },
  {
    id: 'samhanana',
    title: '4. Samhanana (संहनन)',
    subtitle: 'Body Compactness & Symmetry',
    description: 'Compactness, skeletal proportion, and musculoskeletal symmetry.',
    currentAssessment: 'Madhyama Samhanana (Average musculoskeletal frame)',
    markers: ['Well-knit joints', 'Proportionate chest-to-waist ratio', 'No skeletal deformities']
  },
  {
    id: 'pramana',
    title: '5. Pramana (प्रमाण)',
    subtitle: 'Anthropometrics & Measurements',
    description: 'Body height, weight, BMI, and Anguli Pramana.',
    currentAssessment: 'Height: 172 cm | Weight: 74 kg | BMI: 25.0 kg/m²',
    markers: ['Borderline elevated BMI for South Asian criteria', 'Abdominal circumference: 88 cm']
  },
  {
    id: 'satmya',
    title: '6. Satmya (सात्म्य)',
    subtitle: 'Adaptability & Dietetic Habituation',
    description: 'Substances and habits conducive to the individual constitution.',
    currentAssessment: 'Madhyama Satmya (Habituated to mixed regional diet)',
    markers: ['Well-adapted to warm, spiced foods', 'Intolerant to excessive cold or heavy nocturnal dairy']
  },
  {
    id: 'sattva',
    title: '7. Sattva (सत्त्व)',
    subtitle: 'Mental Strength & Psychological Resilience',
    description: 'Mental stamina, emotional composure, and tolerance to stress/pain.',
    currentAssessment: 'Madhyama Sattva (Moderate psychological stability)',
    markers: ['Concerned regarding symptom recurrence', 'Cooperative and coherent in structured responses']
  },
  {
    id: 'ahara_shakti',
    title: '8. Ahara Shakti (आहार शक्ति)',
    subtitle: 'Digestive Power & Agni Status',
    description: 'Capacity to ingest (Abhyavaharana) and digest (Jarana) nutrients.',
    currentAssessment: 'Vishamagni (Irregular digestive fire)',
    markers: ['Occasional post-prandial heaviness', 'Appetite fluctuates with psychological workload']
  },
  {
    id: 'vyayama_shakti',
    title: '9. Vyayama Shakti (व्यायाम शक्ति)',
    subtitle: 'Physical Endurance & Exercise Tolerance',
    description: 'Capacity to perform physical exertion and cardiovascular workload.',
    currentAssessment: 'Avara Vyayama Shakti (Reduced exercise tolerance)',
    markers: ['Dyspnea upon ascending stairs', 'Sedentary desk work with minimal weekly aerobic exertion']
  },
  {
    id: 'vaya',
    title: '10. Vaya (वय)',
    subtitle: 'Chronological Age & Life Stage',
    description: 'Age-appropriate metabolic and tissue status.',
    currentAssessment: 'Praudha Avastha (58 Years - Middle Age)',
    markers: ['Vata-dominant life phase', 'Early degenerative articular changes']
  }
];

export const AHARA_VIHARA_DATA = {
  ahara: [
    { label: 'Dietary Regimen', value: 'Vegetarian with irregular meal intervals' },
    { label: 'Meal Frequency', value: '3 Major meals with late nocturnal snacks' },
    { label: 'Rasa Predominance', value: 'Lavana (Salty) and Katu (Pungent) excess' },
    { label: 'Viruddha Ahara', value: 'Occasional tea paired with incompatible food items' }
  ],
  vihara: [
    { label: 'Sleep Hygiene', value: '5.5 hours nocturnal, fragmented schedule' },
    { label: 'Ratrijagarana', value: 'Late night screen exposure documented' },
    { label: 'Physical Activity', value: '< 2,500 daily steps (sedentary profile)' },
    { label: 'Occupational Stress', value: 'High cognitive stress environment' }
  ]
};
