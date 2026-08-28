import { SpineCondition, RecoveryTimelineStep, Testimonial, FAQItem, InternationalDestination, BlogArticle, VideoItem } from "./types";

export const conditionsData: SpineCondition[] = [
  {
    id: "fess",
    name: "Full Monoportal Endoscopic Spine Surgery (FESS)",
    shortDescription: "Ultra-minimally invasive intervention using an under-8mm endoscope, requiring only a single stitch and allowing direct visual access.",
    fullDescription: "Full Monoportal Endoscopic Spine Surgery (FESS) represents the absolute pinnacle of contemporary spinal care. By utilizing a single micro-portal under 8mm and requiring only a single stitch, Dr. Dheeraj Vishwakarma inserts a microscopic lens directly next to the compressed nerve roots. Specialized optical lighting showcases real-time neural pulsations under 4K magnification, guaranteeing unparalleled safety. No major muscles are severed or detached, which eliminates the heavy post-operative discomfort of old-fashioned surgery.",
    symptoms: [
      "Radiating sciatic leg pain",
      "Lumbar or cervical herniation",
      "Persistent numbness in feet or fingers",
      "Neurological motor weakness"
    ],
    treatmentMetric: "99.1% Visual Precision",
    recoveryTime: "Full Walk within 4-6 Hours",
    detailedKey: "Full Monoportal Endoscopic Spine Surgery (FESS)",
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
    name: "Dinesh Bhaiya",
    location: "Verified Review",
    condition: "Severe Chronic Back Pain",
    quote: "I had been suffering from severe back pain for a long time, and many doctors told me I would need a major, risky surgery. Dr. Dheeraj Vishwakarma performed a minimally invasive surgery, and I was standing and walking the very next day.",
    recoverySummary: "Stood and walked the very next day after minimally invasive surgery",
    rating: 5
  },
  {
    id: "test-2",
    name: "Kalpana Yadav",
    location: "Verified Review",
    condition: "Severe Back Pain",
    quote: "I contacted Dr. Dheeraj for my back pain. After endoscopic surgery, I started walking within two days and got relief from pain within a week.",
    recoverySummary: "Walking within 2 days, pain-free within 1 week",
    rating: 5
  },
  {
    id: "test-3",
    name: "Seema Sharma",
    location: "Verified Review",
    condition: "Bulging Disc",
    quote: "Dr. Dheeraj operated on my daughter's bulging disc through an endoscopic procedure with only an 8 mm stitch, and she was able to walk again after four long painful months.",
    recoverySummary: "Able to walk again after 4 painful months following 8mm endoscopic procedure",
    rating: 5
  },
  {
    id: "test-4",
    name: "Indu Sharma",
    location: "Verified Review",
    condition: "Spine Condition & Standing Difficulty",
    quote: "Dr. Dheeraj gave me the best possible treatment, which helped me stand on my feet again.",
    recoverySummary: "Regained standing ability and return to daily activities",
    rating: 5
  },
  {
    id: "test-5",
    name: "Sanna Yadav",
    location: "Verified Review",
    condition: "Severe Spine Pain & Walking Difficulty",
    quote: "Before surgery, my mother had difficulty walking. After the operation, she is able to walk comfortably and no longer has the pain she experienced earlier.",
    recoverySummary: "Able to walk comfortably post-op, pain relieved",
    rating: 5
  },
  {
    id: "test-6",
    name: "Ramraj Ramraj Bairwa",
    location: "Verified Review",
    condition: "Spine Condition & Impaired Mobility",
    quote: "After my mother's operation, she got complete relief and now walks on her own.",
    recoverySummary: "Mother recovered completely, walking independently",
    rating: 5
  },
  {
    id: "test-7",
    name: "Sachin Tyagi",
    location: "Verified Review",
    condition: "Walking Difficulty & Leg Numbness",
    quote: "My brother had severe difficulty walking and both his legs had become numb. After surgery, he is now walking much better and has received significant relief.",
    recoverySummary: "Significant walking improvement & leg numbness relief",
    rating: 5
  },
  {
    id: "test-8",
    name: "GOPESH PANDEY",
    location: "Jaipur, Rajasthan (Verified Review)",
    condition: "Spine Condition",
    quote: "We had my mother's spine surgery done in Jaipur. The small-incision endoscopic surgery was very successful, and today she is doing well and able to walk.",
    recoverySummary: "Successful small-incision endoscopic surgery, mother walking well",
    rating: 5
  },
  {
    id: "test-9",
    name: "Vijay Shree",
    location: "Jaipur, Rajasthan (Verified Review)",
    condition: "Spine Condition",
    quote: "I consulted Dr. Dheeraj for my mother, and now she is doing very well. Thank you, Doctor.",
    recoverySummary: "Mother doing very well after treatment",
    rating: 5
  },
  {
    id: "test-10",
    name: "Surendar Singh",
    location: "Jaipur, Rajasthan (Verified Review)",
    condition: "Spine Condition Requiring Surgery",
    quote: "Dr. Dheeraj Vishwakarma is the best spine surgeon in Jaipur. I have had two patients undergo surgery, and both had very good outcomes.",
    recoverySummary: "Two spine surgeries with very positive outcomes",
    rating: 5
  },
  {
    id: "test-11",
    name: "Kuldeep Singh",
    location: "Bharatpur, Rajasthan (Verified Review)",
    condition: "Spine Condition Requiring Surgery",
    quote: "My father underwent spine surgery performed by Dr. Dheeraj Vishwakarma, and the outcome was very good. I am very thankful to him.",
    recoverySummary: "Father's spine surgery successful with very good outcome",
    rating: 5
  },
  {
    id: "test-12",
    name: "Santosh Sharma",
    location: "Jaipur, Rajasthan (Verified Review)",
    condition: "Endoscopic Spine Surgery",
    quote: "Dr. Dheeraj Vishwakarma successfully performed spine surgery on my sister-in-law. He is an excellent endoscopic surgeon.",
    recoverySummary: "Sister-in-law recovered well after endoscopic spine surgery",
    rating: 5
  },
  {
    id: "test-13",
    name: "Yogesh Parmar",
    location: "Verified Review",
    condition: "Complex Spine Condition (Surgery Refused Elsewhere)",
    quote: "Other doctors had refused surgery and said I would not recover, but after meeting Dr. Dheeraj and undergoing treatment, I am now completely fine. Thank you for giving me a new life.",
    recoverySummary: "Completely well after surgery refused elsewhere",
    rating: 5
  },
  {
    id: "test-14",
    name: "Bharti Sharma",
    location: "Verified Review",
    condition: "Spine Surgery",
    quote: "My mother is feeling much better and has experienced a lot of relief after the operation.",
    recoverySummary: "Mother experienced significant relief after surgery",
    rating: 5
  },
  {
    id: "test-15",
    name: "Rajendra Singh",
    location: "Jaipur, Rajasthan (Verified Review)",
    condition: "Spine Surgery",
    quote: "I am truly thankful to Dr. Dheeraj Vishwakarma for the successful spine surgery of my brother.",
    recoverySummary: "Successful brother's spine surgery & positive care",
    rating: 5
  },
  {
    id: "test-16",
    name: "Rafeek Khan",
    location: "Verified Review",
    condition: "Lumbar Spinal Condition",
    quote: "I recently underwent an endoscopic lumbar decompression surgery and am extremely grateful to Dr. Dheeraj Vishwakarma for his exceptional care and expertise.",
    recoverySummary: "Successfully underwent endoscopic lumbar decompression surgery",
    rating: 5
  },
  {
    id: "test-17",
    name: "Dr. Aditya Dorkar",
    location: "Medical Professional Review",
    condition: "Severe Back Pain",
    quote: "Dr. Dheeraj is an excellent spine surgeon. He explained my back pain condition clearly, answered all my questions, and provided outstanding care throughout treatment.",
    recoverySummary: "Positive treatment experience with clear diagnosis and care",
    rating: 5
  },
  {
    id: "test-18",
    name: "Mohammad Aarif",
    location: "Verified Review",
    condition: "Endoscopic Spine Surgery",
    quote: "My father's endoscopic spine surgery was done, and now he is doing well.",
    recoverySummary: "Father reported doing well after endoscopic spine surgery",
    rating: 5
  },
  {
    id: "test-19",
    name: "Mahendar Kumar Dhobi",
    location: "Verified Review",
    condition: "Serious Spine Condition",
    quote: "We had consulted elsewhere without getting effective treatment. After finding Dr. Dheeraj, we came to him for treatment and had a positive outcome.",
    recoverySummary: "Received successful treatment after unsuccessful consultations elsewhere",
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
    question: "What is the difference between Monoportal Endoscopic Spine Surgery and traditional spine surgery?",
    answer: "Traditional spine surgery requires a large incision of 3-5 inches, severe cutting and peeling of spine muscles, and a long hospital stay. Dr. Vishwakarma's Monoportal Endoscopic Spine Surgery uses a tiny incision (~8mm, less than a finger-width), passes between muscles without ripping them, preserves the spinal joints, and allows patients to walk comfortably within hours afterward.",
    category: "technology"
  },
  {
    id: "faq-2",
    question: "Do you use metal fusion screws and implants for all slip disc surgeries?",
    answer: "Absolutely not. One of the main goals of Full Monoportal Endoscopic Spine Surgery (FESS) is to protect your natural spine mobility. We work with micro-instruments to selectively extract the herniated disc tissue, leaving the healthy disc intact. Screws and fusions are reserved strictly for severe spinal column instability or spondylolisthesis.",
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
    question: "Is monoportal endoscopic spine surgery safe under local/epidural anesthesia?",
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

export const blogsData: BlogArticle[] = [
  {
    id: "fess-decompression-shift",
    title: "Monoportal Endoscopic Spine Surgery: A Paradigm Shift in Spinal Decompression",
    summary: "How FESS (Full Monoportal Endoscopic Spine Surgery) has revolutionized the treatment of herniations and stenosis by sparing paraspinous muscles and accelerating outpatient mobilization.",
    content: "Full Monoportal Endoscopic Spine Surgery (FESS) has transformed patient options. Historically, open spine procedures required extensive muscle separation, leading to long recoveries. Endoscopic access through a single <8mm keyhole preserves spinal column structures. Active visualization under 4K saline pressure irrigation minimizes risk, offering a same-day walking milestone.",
    category: "Clinical Guide",
    date: "May 2026",
    readTime: "6 min read",
    author: "Dr. Dheeraj Vishwakarma"
  },
  {
    id: "awake-spine-surgery-milestones",
    title: "Awake Spine Surgery: Conscious Sedation & Patient Safety Protocols",
    summary: "An in-depth review of patient responses and neurological safety margins when conducting keyhole lumbar decompressions under local conscious epidural anesthesia.",
    content: "Performing spine decompressions while the patient is conscious represents a massive leap in patient safety. By avoiding general anesthesia, cardiac risk variables are lowered. More importantly, the patient can interact with the surgical officer. Real-time feedback during nerve root release ensures zero nerve injury.",
    category: "Research",
    date: "March 2026",
    readTime: "8 min read",
    author: "Dr. Dheeraj Vishwakarma"
  },
  {
    id: "pediatric-cauda-equina-study",
    title: "Pediatric Disk Herniations: Keyhole Decompression for Cauda Equina Syndrome",
    summary: "A clinical case report analysis detailing the successful execution of an 8mm single-stitch discectomy on an 11-year-old pediatric patient, achieving Asia Book of Records recognition.",
    content: "Pediatric cauda equina syndrome is rare and requires emergency action. This study documents the clinical path of the youngest patient (11 years) treated via transforaminal monoportal endoscopic discectomy. Preserving the growing spine's structural joints is crucial, and keyhole entry bypasses future scoliosis risks.",
    category: "Case Study",
    date: "July 2025",
    readTime: "10 min read",
    author: "Dr. Dheeraj Vishwakarma"
  },
  {
    id: "lumbar-canal-stenosis-chapter",
    title: "Academic Book Chapter: Lumbar Canal Stenosis Principles & Practice",
    summary: "An overview of the instructional chapter contributed by Dr. Vishwakarma to the 'Practical Manual on Full Monoportal Endoscopic Spine Surgery' handbook.",
    content: "This textbook chapter details safe bone drilling zones, anatomical markers, and continuous irrigation pump pressure calibration. It serves as a guide for spine surgery fellows learning full endoscopic monoportal decompression, teaching standard tricks and how to avoid complications.",
    category: "Book Chapter",
    date: "January 2025",
    readTime: "15 min read",
    author: "Dr. Dheeraj Vishwakarma"
  }
];

export const socialLinks = {
  whatsapp: "https://wa.me/918999898129",
  instagram: "https://www.instagram.com/drdheerajneurospine/",
  facebook: "https://www.facebook.com/dheeraj.vishwakarma.39/",
  linkedin: "https://www.linkedin.com/in/drdheerajneurospine/"
};

export const videoData: VideoItem[] = [
  {
    id: "endoscopic-spine-introduction",
    title: "Full Monoportal Endoscopic Spine Surgery (FESS) Overview",
    description: "Pioneering Endoscopic Spine Surgeon specializing in Monoportal & Minimally Invasive Spine Procedures.",
    poster: "/endoscopic_spine_poster.jpg",
    videoUrl: "https://iplsqsfgnmomqqhnvydz.supabase.co/storage/v1/object/public/Video/3cd88781-6f0f-4598-ae80-222fb55c84ed.mp4",
    category: "Monoportal Spine Surgery"
  },
  {
    id: "awake-discharge-milestones",
    title: "Same-Day Walking Milestone After Keyhole Discectomy",
    description: "Expert in Single-Stitch Spine Surgery for faster recovery and minimal tissue trauma with same-day walking.",
    poster: "/awards-records.jpg",
    videoUrl: "https://iplsqsfgnmomqqhnvydz.supabase.co/storage/v1/object/public/Video/6dec41ca-3266-4f13-9b26-d0709bbfd938.mp4",
    category: "Single-Stitch Recovery"
  },
  {
    id: "fess-instrumentation",
    title: "Under-8mm Keyhole Surgical Instrumentation & Nerve Protection",
    description: "High-definition 4K endoscopic decompression of compressed lumbar nerve roots with under 8mm keyhole entry.",
    poster: "/endoscopic_spine_poster.jpg",
    videoUrl: "https://iplsqsfgnmomqqhnvydz.supabase.co/storage/v1/object/public/Video/d380a0a2-98d7-48c6-a93a-3424208cb39d.mp4",
    category: "Minimally Invasive Tech"
  }
];
