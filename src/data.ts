import { SpineCondition, RecoveryTimelineStep, Testimonial, FAQItem, InternationalDestination } from "./types";

export const conditionsData: SpineCondition[] = [
  {
    id: "fess",
    name: "Full Endoscopic Spine Surgery (FESS)",
    shortDescription: "Ultra-minimally invasive intervention using an under-8mm endoscope, requiring only a single stitch and allowing direct visual access.",
    fullDescription: "Full Endoscopic Spine Surgery (FESS) represents the absolute pinnacle of contemporary spinal care. By utilizing a single micro-portal under 8mm and requiring only a single stitch, Dr. Dheeraj Vishwakarma inserts a microscopic lens directly next to the compressed nerve roots. Specialized optical lighting showcases real-time neural pulsations under 4K magnification, guaranteeing unparalleled safety. No major muscles are severed or detached, which eliminates the heavy post-operative discomfort of old-fashioned surgery.",
    symptoms: [
      "Radiating sciatic leg pain",
      "Lumbar or cervical herniation",
      "Persistent numbness in feet or fingers",
      "Neurological motor weakness"
    ],
    treatmentMetric: "99.1% Visual Precision",
    recoveryTime: "Full Walk within 2 Hours",
    detailedKey: "Full Endoscopic Spine Surgery (FESS)",
    iconName: "Eye"
  },
  {
    id: "monoportal",
    name: "Endoscopic Monoportal Spine Surgery",
    shortDescription: "The gold standard of microscopic bone & disc decompression, addressing stenosis and slip disc via a single strategic port.",
    fullDescription: "Applying world-class Monoportal endoscopy, Dr. Vishwakarma decompresses spinal structures with micro-milimetric precision. By guiding micro-instruments through a single, highly controlled structural portal, we shave away bone-spurs, calcified ligaments, and extruded nuclei without destabilizing the biomechanical structures of your spine. This ensures immediate spinal relief while maintaining complete physical movement and column integrity.",
    symptoms: [
      "Lumbar canal stenosis",
      "Spinal claudication (inability to walk without rest)",
      "Severe spinal bone spur compression"
    ],
    treatmentMetric: "No Muscle Damage",
    recoveryTime: "Same-Day Mobilization",
    detailedKey: "Endoscopic Monoportal Spine Surgery",
    iconName: "Zap"
  },
  {
    id: "miss",
    name: "Minimally Invasive Spine Surgery (MISS)",
    shortDescription: "Advanced keyhole surgery using tubular dilators and real-time intraoperative mapping to spare muscle fibers and lower blood loss.",
    fullDescription: "Minimally Invasive Spine Surgery (MISS) replaces the traumatic, large incisions of conventional open spine surgery with miniature pathways. Tubular dilators gently separate muscle fibers along their natural orientation instead of tearing them. Assisted by high-magnification surgical operating microscopes, the target lesion is treated safely, minimizing internal scarring and providing an incredibly quiet, pain-free recovery.",
    symptoms: [
      "Degenerative disc diseases",
      "Spondylolisthesis (spinal slippage)",
      "Recurrent lumbar herniations"
    ],
    treatmentMetric: "< 15ml Blood Loss",
    recoveryTime: "Discharge in 24 Hours",
    detailedKey: "Minimally Invasive Spine Surgery",
    iconName: "Shield"
  },
  {
    id: "sciatica",
    name: "Sciatica Treatment & Nerve Decompression",
    shortDescription: "Targeted localized nerve-root release designed to instantly stop radiating buttocks, thigh, and calf shooting pain.",
    fullDescription: "Sciatica is not a simple condition but a manifestation of underlying sciatic nerve root compression. Under Dr. Vishwakarma's care, patients undergo computerized dermatomal mapping to identify the precise biomechanical culprit. Decompression via high-magnification endoscopes instantly frees the trapped nerve root, removing the agonizing 'electric shock' sensations and restoring smooth muscle sensory pathways.",
    symptoms: [
      "Burning, stabbing pain down the calf",
      "Severe pain when sitting or walking",
      "Prickling 'pins and needles' down to the toes"
    ],
    treatmentMetric: "Immediate Radiance Relief",
    recoveryTime: "Immediate Ambulatory Status",
    detailedKey: "Sciatica Treatment",
    iconName: "Activity"
  },
  {
    id: "slipdisc",
    name: "Slip Disc / Herniated Nucleus Treatment",
    shortDescription: "Micro-endoscopic discectomy removing only the damaged fragment, preserving 95% of your natural cushioning disc.",
    fullDescription: "A slipped disc can cause immense physical and emotional paralysis. Using the latest endoscopes, we perform selective fragmentectomy—removing only the ruptured portion of the nucleus pulposus that interferes with the nerve sheath, leaving the healthy padding of the disc completely intact. This preserves the spine's natural rotational shock absorption.",
    symptoms: [
      "Sudden, localized lower back shooting pain",
      "Stiffness and spasm in para-spinal muscles",
      "Worse pain on forward bending"
    ],
    treatmentMetric: "98.5% Disc Preservation",
    recoveryTime: "Return to Office in 5 Days",
    detailedKey: "Slip Disc Treatment",
    iconName: "Layers"
  },
  {
    id: "cervical-lumbar",
    name: "Cervical & Lumbar Spine Disorders",
    shortDescription: "Surgical and advanced non-surgical management of complex spinal stenosis, myelopathy, and cervical spondylosis.",
    fullDescription: "Complex spinal column disorders ranging from neck myelopathy to lumbar listhesis require a tailormade clinical approach. Dr. Vishwakarma implements advanced motion-preserving techniques, artificial disc replacements, and dynamic stabilization. This restores a youthful range of motion, allowing patients to enjoy physical training, sports, and normal active lifestyles.",
    symptoms: [
      "Loss of fine motor skills in hands",
      "Imbalance while walking/stumbling",
      "Chronic heavy neck stiffness and shooting shoulder pain"
    ],
    treatmentMetric: "Restored Range of Motion",
    recoveryTime: "Active Lifestyle Restoration",
    detailedKey: "Cervical & Lumbar Spine Disorders",
    iconName: "Compass"
  }
];

export const recoverySteps: RecoveryTimelineStep[] = [
  {
    day: "Hour 0-2",
    title: "Keyhole Precision Decompression",
    description: "Dr. Vishwakarma completes the endoscopic micro-portal decompression under local or regional anesthesia. Post-surgical monitoring begins directly.",
    milestone: "95% Immediate Pain Alleviation",
    iconName: "Activity"
  },
  {
    day: "Hour 4",
    title: "First Independent Steps",
    description: "Thanks to spared structural musculature, patients stand up, walk on their own with confidence, and move comfortably to standard dining settings.",
    milestone: "Autonomous Ward Ambulation",
    iconName: "Footprints"
  },
  {
    day: "Day 1",
    title: "Premium Discharge Home",
    description: "Discharge steps are finalized with simple home mobility guidelines. The tiny 7mm portal requires only a soft waterproof dressing.",
    milestone: "Departure to Family Setting",
    iconName: "Home"
  },
  {
    day: "Day 5-7",
    title: "Desk Work & Screen Resumption",
    description: "Soreness completely resolves. Administrative and desk activities are safe, offering smooth postural transitions.",
    milestone: "Active Cognitive Work Return",
    iconName: "Laptop"
  },
  {
    day: "Week 4",
    title: "Dynamic Muscle Reconditioning",
    description: "Under guided physiological movement patterns, lumbar flexibility and cervical strength reach premium values.",
    milestone: "Unrestricted Daily Freedom",
    iconName: "Zap"
  }
];

export const testimonialsData: Testimonial[] = [
  {
    id: "test-1",
    name: "Manoj Kumar Sharma",
    location: "Jaipur, Rajasthan (Google Verified Review)",
    condition: "L4-L5 Slipped Disc with Severe Sciatica",
    quote: "I suffered from unbearable back and leg pain due to L4-L5 herniation for 6 months. Dr. Dheeraj diagnosed it perfectly and performed an endoscopic keyhole surgery. I walked on the same day within 2 hours. He is truly the best endoscopic spine doctor in Jaipur! Thank you, doctor, for giving me my life back.",
    recoverySummary: "Walked 2 hours post-op, discharged within 24h",
    rating: 5
  },
  {
    id: "test-2",
    name: "Preeti Vyas",
    location: "Ajmer, Rajasthan (Google Verified Review)",
    condition: "Severe Cervical Spondylosis & Hand Numbness",
    quote: "Others suggested open spinal fusion which was scary. Dr. Dheeraj Vishwakarma treated my neck issue endoscopically with a tiny 7mm cut. The hand numbness and shooting pain disappeared instantly. No fusion, no implants. Highly recommended!",
    recoverySummary: "Discharged next morning, back to work in 5 days",
    rating: 5
  },
  {
    id: "test-3",
    name: "Col. Vikram Singh Chauhan (Retd.)",
    location: "Jodhpur, Rajasthan (Google Verified Review)",
    condition: "Severe Lumbar Spinal Canal Stenosis (LSSS)",
    quote: "As a retired army officer, I was used to an active life, but stenosis restricted my walking to barely 50 meters. Dr. Dheeraj's monoportal endoscopic precision is incredible. I walked 2 km without any support on my third recovery day. Flawless expertise.",
    recoverySummary: "2 km walk on Day 3 post-op without assistance",
    rating: 5
  },
  {
    id: "test-4",
    name: "Dr. Sunil Maheshwari",
    location: "Udaipur, Rajasthan (Consultant Pediatrician)",
    condition: "Acute L5-S1 Slip Disc with Neurological Deficit",
    quote: "As a fellow medical professional, I scrutinized all modern options for my L5-S1 slip disc. Dr. Dheeraj's surgical precision in FESS (Full Endoscopic Spine Surgery) is outstanding. The clean visibility and command kept my nerve roots safe. An excellent surgeon.",
    recoverySummary: "Normal consulting practice resumed within a week",
    rating: 5
  },
  {
    id: "test-5",
    name: "Rajesh K. Gahlot",
    location: "Kota, Rajasthan (Google Verified Review)",
    condition: "Extreme Sciatic Nerve Radiculopathy",
    quote: "The agonizing 'electric shock' shooting pain down my leg was making it impossible to sit or sleep. Dr. Dheeraj operated on my compressed nerve root through a micro keyhole surgical pathway. I walked out of the hospital the next day pain-free.",
    recoverySummary: "Instant relief from shooting sciatic nerve pain",
    rating: 5
  },
  {
    id: "test-6",
    name: "Amara Al-Jamil",
    location: "Dubai, UAE (International Patient Review)",
    condition: "Multi-level Lumbar Stenosis & Disk Herniation",
    quote: "Flew from Dubai to Rajasthan specifically for Dr. Dheeraj's specialized endoscopic spine treatment. The clinical care, hospitality, and overall experience were remarkable. I am now back to my daily gym routine without any restrictions.",
    recoverySummary: "Resumed daily gym routines after 4 weeks",
    rating: 5
  }
];

export const internationalDestinations: InternationalDestination[] = [
  {
    country: "United Kingdom & Europe",
    code: "UK/EU",
    flagSymbol: "🇬🇧",
    consultationFee: "$60 USD",
    averageTravelDays: "5 to 7 Days",
    supportServices: [
      "Priority clinical MRI review, triage, & video call with Dr. Dheeraj",
      "Guaranteed priority operating theater slot allocation",
      "Dedicated English language desk & local orientation",
      "Professional post-op rehabilitation coordination support"
    ]
  },
  {
    country: "United States & Canada",
    code: "US/CA",
    flagSymbol: "🇺🇸",
    consultationFee: "$60 USD",
    averageTravelDays: "6 to 8 Days",
    supportServices: [
      "Priority surgical theater queue reservation",
      "Fast-track documentation assist desk for medical insurance claims",
      "Dedicated language coordination and specialized post-op guide",
      "Post-discharge care path handover to local therapists"
    ]
  },
  {
    country: "Middle East (UAE, Oman, Qatar)",
    code: "GCC",
    flagSymbol: "🇦🇪",
    consultationFee: "$60 USD",
    averageTravelDays: "4 to 5 Days",
    supportServices: [
      "Fluent Arabic language translation desk & patient companion service",
      "Priority scheduling for clinical slots & diagnostic investigations",
      "Fast-track visa procurement assistance & hospital admission workflows",
      "Structured telemedicine follow-up slot bookings"
    ]
  },
  {
    country: "South & Central Africa",
    code: "AFR",
    flagSymbol: "🇿🇦",
    consultationFee: "$45 USD",
    averageTravelDays: "7 to 10 Days",
    supportServices: [
      "Priority outpatient slots and swift diagnostic reporting",
      "Dedicated regional language support officer assignment",
      "Traveler clearance, yellow fever guidelines, and clinical path prep",
      "Long-term post-operative tele-consultation queue priority"
    ]
  },
  {
    country: "Bangladesh, Nepal & Maldives",
    code: "SAARC",
    flagSymbol: "🇧🇩",
    consultationFee: "$25 USD",
    averageTravelDays: "3 to 5 Days",
    supportServices: [
      "Dedicated Bengali and regional language interpreter services",
      "Immediate priority diagnostics & outpatient slots within 2 hours of arrival",
      "Direct medical record handover with regional referral partners",
      "Priority slot scheduling for the main endoscopic operating theater"
    ]
  }
];

export const faqData: FAQItem[] = [
  {
    id: "faq-1",
    question: "What is the difference between Endoscopic Spine Surgery and traditional spine surgery?",
    answer: "Traditional spine surgery requires a large incision of 3-5 inches, severe cutting and peeling of spine muscles, and a long hospital stay. Dr. Vishwakarma's Endoscopic Spine Surgery uses a tiny incision (~7mm, less than a finger-width), passes between muscles without ripping them, preserves the spinal joints, and allows patients to walk comfortably within hours afterward.",
    category: "technology"
  },
  {
    id: "faq-2",
    question: "Do you use metal fusion screws and implants for all slip disc surgeries?",
    answer: "Absolutely not. One of the main goals of Full Endoscopic Spine Surgery (FESS) is to protect your natural spine mobility. We work with micro-instruments to selectively extract the herniated disc tissue, leaving the healthy disc intact. Screws and fusions are reserved strictly for severe spinal column instability or spondylolisthesis.",
    category: "safety"
  },
  {
    id: "faq-3",
    question: "How long do I need to stay in India for surgery if I am an international patient?",
    answer: "Most patients traveling from overseas can safely fly back within 5 to 7 days. Because the incision is microscopic with no traumatic muscle cutting, the recovery is extremely rapid. Pre-travel MRI reviews allow us to arrange the surgery slot, preoperative tests, and discharge timeline prior to your arrival.",
    category: "international"
  },
  {
    id: "faq-4",
    question: "Is endoscopic spine surgery safe under local/epidural anesthesia?",
    answer: "Yes, it is incredibly safe. In fact, keeping the patient conscious but comfortable during the procedure is a great safety measure. Since the patient can respond, it provides immediate real-time biological feedback if a nerve structure is touched, almost completely eliminating any risk of nerve injury.",
    category: "safety"
  },
  {
    id: "faq-5",
    question: "How do I secure an online video consultation with Dr. Dheeraj Vishwakarma?",
    answer: "You can click on 'Book Consultation' to upload your latest MRI scan reports. Our international desk reviews your medical history within 12 hours, and sets up a high-definition Zoom or WhatsApp video call directly with Dr. Dheeraj Vishwakarma.",
    category: "booking"
  }
];
