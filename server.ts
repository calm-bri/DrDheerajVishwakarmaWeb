import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environmental variables
dotenv.config();
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const app = express();
const PORT = process.env.PORT || 3001;

// Supabase Client initialization
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const supabase = (supabaseUrl && supabaseKey) ? createClient(supabaseUrl, supabaseKey) : null;

if (supabase) {
  console.log("Supabase client initialized successfully.");
} else {
  console.warn("Supabase configuration missing!");
}

// Custom CORS middleware to avoid external dependencies
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-file-name, x-admin-pin');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Admin Authentication Setup
const ADMIN_PIN = process.env.ADMIN_PIN || 'admin123';

const verifyAdmin = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const pin = req.headers['x-admin-pin'] || req.query.adminPin;
  if (pin === ADMIN_PIN) {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized: Invalid Admin PIN' });
  }
};

app.use(express.json({ limit: '50mb' }));

// Default clinical data for initialization
const INITIAL_SHOWCASES = [
  {
    id: "sc-asia-india-records",
    title: "Asia & India Book of Records Certification",
    subtitle: "Pioneered youngest pediatric monoportal endoscopic discectomy milestone.",
    description: "Dr. Dheeraj Vishwakarma holding the record certificates for the Asia Book of Records and India Book of Records, recognizing the world-record milestone of performing a single-stitch 8mm monoportal endoscopic discectomy on the youngest patient (11 years old) for Cauda Equina Syndrome.",
    category: "news",
    location: "Jaipur, India",
    date: "July 2025",
    imageUrl: "/awards-records.jpg",
    sizeClass: "md:col-span-2 md:row-span-1 aspect-[16/10] sm:aspect-auto",
    badge: "Asia & India Record"
  },
  {
    id: "sc-db-news",
    title: "Dainik Bhaskar: Spine Endoscopy Landmark",
    subtitle: "Pioneering cervical-dorsal monoportal endoscopic spine surgery milestone.",
    description: "Front-page feature highlighting Dr. Dheeraj's landmark surgical execution, performing pioneering cervical-dorsal monoportal endoscopic decompression, allowing immediate post-op movement.",
    category: "news",
    location: "India Desk",
    date: "June 2025",
    imageUrl: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&q=80",
    sizeClass: "md:col-span-2 md:row-span-1 aspect-[16/10] sm:aspect-auto",
    badge: "Pioneering Case"
  },
  {
    id: "sc-rp-news",
    title: "Rajasthan Patrika: Single-Stitch Spine Care",
    subtitle: "Pioneering <8mm single-stitch ambulatory monoportal endoscopic spine surgeries.",
    description: "Special press release documenting the benefits of under-8mm single-stitch endoscopic surgery, explaining how avoiding muscle tears leads to same-day recovery milestones.",
    category: "news",
    location: "India Desk",
    date: "August 2025",
    imageUrl: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=1200&q=80",
    sizeClass: "md:col-span-1 md:row-span-1 aspect-square sm:aspect-auto",
    badge: "Single Stitch (<8mm)"
  },
  {
    id: "sc-news18-clip",
    title: "News 18 Studio: 50+ Monoportal Cases Milestone",
    subtitle: "Television broadcast feature covering the landmark 50+ multi-level endoscopic cases.",
    description: "Broadcast coverage detailing the clinical success rates and volume milestone of 50+ monoportal endoscopic spine procedures across cervical, dorsal, and lumbar sections.",
    category: "news",
    location: "News 18 Studio",
    date: "October 2025",
    imageUrl: "https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?auto=format&fit=crop&w=1200&q=80",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    sizeClass: "md:col-span-1 md:row-span-1 aspect-square sm:aspect-auto",
    badge: "Television Broadcast"
  },
  {
    id: "sc-1",
    title: "Dual-Portal Endoscopic Operating Suite Setup",
    subtitle: "High-definition camera consoles & saline Continuous Pressure irrigation system.",
    description: "The main operating desk showing full-endoscopic spinal camera integration, dual continuous-flow pump nodes, and micro-manipulators. Keeping the incision under 8mm ensures absolute safety.",
    category: "surgical",
    location: "Surgical Theatre Unit A, India",
    date: "May 2026",
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    sizeClass: "md:col-span-2 md:row-span-1 aspect-[16/10] sm:aspect-auto",
    badge: "Featured Room"
  },
  {
    id: "sc-2",
    title: "Post-Operative Recovery Patient Assessment",
    subtitle: "Real-time neuro-pathway validation while the patient is awake.",
    description: "Dr. Dheeraj Vishwakarma performing active motor checks immediately following a single-stitch transforaminal decompression. The patient walked independently within 3 hours.",
    category: "surgical",
    location: "Special Care Ward",
    date: "April 2026",
    imageUrl: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80",
    sizeClass: "md:col-span-1 md:row-span-1 aspect-square sm:aspect-auto",
    badge: "Awake Technique"
  },
  {
    id: "sc-3",
    title: "3D CT Reconstruction & Surgical Safe-Zone Trajectory",
    subtitle: "Pre-operative digital planning utilizing computerized bone densitometry.",
    description: "Advanced biomechanical mapping of the L4-L5 exit neural foramens. This mapping determines the exact needle entry trajectory, bypassing key supportive back muscle structures entirely.",
    category: "surgical",
    location: "Medical Robotics Lab",
    date: "March 2026",
    imageUrl: "https://images.unsplash.com/photo-1530026405186-ed1ea0ac7a63?auto=format&fit=crop&w=800&q=80",
    sizeClass: "md:col-span-1 md:row-span-2 aspect-[3/4] sm:aspect-auto",
    badge: "Target Mapping"
  },
  {
    id: "sc-4",
    title: "National FESS Advanced Cadaveric Summit",
    subtitle: "Hands-on instruction demonstrating drill guidance on high-fidelity models.",
    description: "Dr. Dheeraj instructing senior orthopedic and neurosurgery delegates on transforaminal camera rotation tricks at the Joint Spine Endoscopy Council session.",
    category: "workshop",
    location: "Training Headquarters, New Delhi",
    date: "March 2026",
    imageUrl: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80",
    sizeClass: "md:col-span-1 md:row-span-1 aspect-square sm:aspect-auto",
    badge: "Cadaveric Drill"
  },
  {
    id: "sc-5",
    title: "Healthcare Excellence Laurels at EuroSpine Meet",
    subtitle: "Honored with clinical merit award for comparative local awake reviews.",
    description: "International spine surgeons and orthopedic experts gather as Dr. Vishwakarma receives peer-reviewed recognition for achieving a 98.4% success rating with same-day outpatient cases.",
    category: "news",
    location: "Assembly Hall, Zurich",
    date: "January 2026",
    imageUrl: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=1200&q=80",
    sizeClass: "md:col-span-1 md:row-span-1 aspect-square sm:aspect-auto",
    badge: "EuroSpine Award"
  },
  {
    id: "sc-6",
    title: "National Media Spotlight on Single-Stitch Interventions",
    subtitle: "Special front-page feature covering the clinical shift to outpatient spine solutions.",
    description: "An extensive interview piece detailing how endoscopic micro-discectomies drastically lower risk variables for elderly patients with cardiovascular complex histories.",
    category: "news",
    location: "Times Medical Focus Edition",
    date: "April 2026",
    imageUrl: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&q=80",
    sizeClass: "md:col-span-2 md:row-span-1 aspect-[16/10] sm:aspect-auto",
    badge: "Press Cover"
  },
  {
    id: "sc-7",
    title: "Interactive Live Cervical Decompression Broadcast",
    subtitle: "Satelitte link providing microscopic surgical feed to 300 delegates.",
    description: "Live demonstration of a posterior micro-drill widening of compressed neural clusters. Operating with high clarity under constant physiological fluid pressure.",
    category: "workshop",
    location: "National Spine Forum Broadcast Studio",
    date: "November 2025",
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
    sizeClass: "md:col-span-1 md:row-span-1 aspect-square sm:aspect-auto",
    badge: "Interactive Broadcast"
  },
  {
    id: "sc-8",
    title: "Advanced Laser-Guidance Navigation Calibration",
    subtitle: "Testing real-time fusion of CT scans and low-dose dynamic micro-fluoroscopy.",
    description: "Perfecting the pin-point needle entry alignment matrix in the clinic, demonstrating precise micro-millimeter clearance from high-risk neural bundles before the patient enters recovery.",
    category: "surgical",
    location: "Spine Endoscopy Clinic",
    date: "September 2025",
    imageUrl: "https://images.unsplash.com/photo-1579684389782-64d84b5e901a?auto=format&fit=crop&w=1200&q=80",
    sizeClass: "md:col-span-2 md:row-span-1 aspect-[16/10] sm:aspect-auto",
    badge: "Laser Guidance"
  }
];

const INITIAL_APPOINTMENTS = [
  {
    id: "apt-101",
    fullName: "Richard Harris",
    email: "richard.harris@gmail.com",
    phone: "+44 7911 123456",
    selectedTreatment: "fess",
    symptoms: "Extreme shooting sciatica down my right calf. MRI reports uploaded. Ready for a video consult.",
    sessionType: "video",
    status: "confirmed",
    bookingDate: "2026-06-02",
    bookingTime: "10:30 AM",
    isInternational: true,
    fileName: "mri-lumbar-richard-harris.pdf"
  },
  {
    id: "apt-102",
    fullName: "Manoj Kumar Sharma",
    email: "manoj.sharma@yahoo.co.in",
    phone: "+91 98450 12345",
    selectedTreatment: "slipdisc",
    symptoms: "L4-L5 localized slip disc. Looking to do a physical outpatient evaluation at the clinic in India.",
    sessionType: "clinic",
    status: "pending",
    bookingDate: "2026-05-31",
    bookingTime: "04:15 PM",
    isInternational: false
  },
  {
    id: "apt-103",
    fullName: "Fatima Al-Sudais",
    email: "fatima.alsudais@outlook.com",
    phone: "+971 50 123 4567",
    selectedTreatment: "monoportal",
    symptoms: "Severe lumbar canal stenosis causing claudication. Can walk barely 50 meters safely.",
    sessionType: "video",
    status: "rescheduled",
    bookingDate: "2026-06-05",
    bookingTime: "02:00 PM",
    isInternational: true,
    fileName: "mri-scan-fatima.jpg"
  },
  {
    id: "apt-104",
    fullName: "Col. Vikram Singh Chauhan (Retd.)",
    email: "vikram.chauhan@gmail.com",
    phone: "+91 99220 88771",
    selectedTreatment: "cervical-lumbar",
    symptoms: "Dynamic neck stiffness and numbness in both hands. Discomfort when using fine motor skills.",
    sessionType: "clinic",
    status: "confirmed",
    bookingDate: "2026-06-01",
    bookingTime: "05:30 PM",
    isInternational: false
  }
];

const INITIAL_TESTIMONIALS = [
  {
    id: "test-1",
    name: "Manoj Kumar Sharma",
    location: "Jaipur, Rajasthan (Google Verified Review)",
    condition: "L4-L5 Slipped Disc with Severe Sciatica",
    quote: "I suffered from unbearable back and leg pain due to L4-L5 herniation for 6 months. Dr. Dheeraj diagnosed it perfectly and performed an endoscopic keyhole surgery. I walked on the same day within 4-6 hours. He is truly the best monoportal endoscopic spine doctor in Jaipur! Thank you, doctor, for giving me my life back.",
    recoverySummary: "Walked 4-6 hours post-op, discharged within 24h",
    rating: 5
  },
  {
    id: "test-2",
    name: "Preeti Vyas",
    location: "Ajmer, Rajasthan (Google Verified Review)",
    condition: "Severe Cervical Spondylosis & Hand Numbness",
    quote: "Others suggested open spinal fusion which was scary. Dr. Dheeraj Vishwakarma treated my neck issue endoscopically with a tiny 8mm cut. The hand numbness and shooting pain disappeared instantly. No fusion, no implants. Highly recommended!",
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
    quote: "As a fellow medical professional, I scrutinized all modern options for my L5-S1 slip disc. Dr. Dheeraj's surgical precision in FESS (Full Monoportal Endoscopic Spine Surgery) is outstanding. The clean visibility and command kept my nerve roots safe. An excellent surgeon.",
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
    quote: "Flew from Dubai to Rajasthan specifically for Dr. Dheeraj's specialized monoportal endoscopic spine treatment. The clinical care, hospitality, and overall experience were remarkable. I am now back to my daily gym routine without any restrictions.",
    recoverySummary: "Resumed daily gym routines after 4 weeks",
    rating: 5
  }
];

const INITIAL_CONDITIONS = [
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

const INITIAL_FAQS = [
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

const INITIAL_BLOGS = [
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

// Helper to get local fallback data
const getLocalData = (resourceName: string, defaults: any[]): any[] => {
  const dataDir = path.join(__dirname, 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  const filePath = path.join(dataDir, `${resourceName}.json`);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(defaults, null, 2));
    return defaults;
  }
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(content);
  } catch (err) {
    console.error(`Error reading local data for ${resourceName}:`, err);
    return defaults;
  }
};

// Helper to save local fallback data
const saveLocalData = (resourceName: string, data: any[]) => {
  const dataDir = path.join(__dirname, 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  const filePath = path.join(dataDir, `${resourceName}.json`);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// Generic CRUD endpoints generator with Supabase DB queries and filesystem fallbacks
const registerCrudRoutes = (resourceName: string, defaults: any[]) => {
  app.get(`/api/${resourceName}`, (req, res, next) => {
    if (resourceName === 'appointments') {
      return verifyAdmin(req, res, next);
    }
    next();
  }, async (req, res) => {
    try {
      if (!supabase) {
        return res.json(getLocalData(resourceName, defaults));
      }
      const { data, error } = await supabase.from(resourceName).select('*');
      if (error) {
        console.warn(`Supabase select failed for ${resourceName}, using local fallback:`, error.message);
        const local = getLocalData(resourceName, defaults);
        return res.json(local);
      }
      if (data) {
        if (resourceName === 'showcases' || resourceName === 'appointments' || resourceName === 'testimonials') {
          data.sort((a: any, b: any) => {
            const timeA = a.created_at ? new Date(a.created_at).getTime() : 0;
            const timeB = b.created_at ? new Date(b.created_at).getTime() : 0;
            return timeB - timeA;
          });
        }
        return res.json(data);
      }
      res.json([]);
    } catch (err: any) {
      console.warn(`Exception in select for ${resourceName}, using local fallback:`, err.message);
      res.json(getLocalData(resourceName, defaults));
    }
  });

  app.post(`/api/${resourceName}`, (req, res, next) => {
    if (resourceName !== 'appointments') {
      return verifyAdmin(req, res, next);
    }
    next();
  }, async (req, res) => {
    const newItem = { ...req.body };
    if (!newItem.id) {
      newItem.id = `${resourceName.substring(0, 4)}-${Date.now()}`;
    }

    try {
      if (!supabase) {
        const local = getLocalData(resourceName, defaults);
        local.push(newItem);
        saveLocalData(resourceName, local);
        return res.status(201).json(newItem);
      }
      const { error } = await supabase.from(resourceName).insert(newItem);
      if (error) {
        console.warn(`Supabase insert failed for ${resourceName}, using local fallback:`, error.message);
        const local = getLocalData(resourceName, defaults);
        local.push(newItem);
        saveLocalData(resourceName, local);
        return res.status(201).json(newItem);
      }
      res.status(201).json(newItem);
    } catch (err: any) {
      console.warn(`Exception in insert for ${resourceName}, using local fallback:`, err.message);
      const local = getLocalData(resourceName, defaults);
      local.push(newItem);
      saveLocalData(resourceName, local);
      res.status(201).json(newItem);
    }
  });

  app.put(`/api/${resourceName}/:id`, verifyAdmin, async (req, res) => {
    const updatedFields = req.body;
    try {
      if (!supabase) {
        const local = getLocalData(resourceName, defaults);
        const idx = local.findIndex((item: any) => item.id === req.params.id);
        if (idx !== -1) {
          local[idx] = { ...local[idx], ...updatedFields };
          saveLocalData(resourceName, local);
        }
        return res.json({ id: req.params.id, ...updatedFields });
      }
      const { error } = await supabase.from(resourceName).update(updatedFields).eq('id', req.params.id);
      if (error) {
        console.warn(`Supabase update failed for ${resourceName}, using local fallback:`, error.message);
        const local = getLocalData(resourceName, defaults);
        const idx = local.findIndex((item: any) => item.id === req.params.id);
        if (idx !== -1) {
          local[idx] = { ...local[idx], ...updatedFields };
          saveLocalData(resourceName, local);
        }
        return res.json({ id: req.params.id, ...updatedFields });
      }
      res.json({ id: req.params.id, ...updatedFields });
    } catch (err: any) {
      console.warn(`Exception in update for ${resourceName}, using local fallback:`, err.message);
      const local = getLocalData(resourceName, defaults);
      const idx = local.findIndex((item: any) => item.id === req.params.id);
      if (idx !== -1) {
        local[idx] = { ...local[idx], ...updatedFields };
        saveLocalData(resourceName, local);
      }
      res.json({ id: req.params.id, ...updatedFields });
    }
  });

  app.delete(`/api/${resourceName}/:id`, verifyAdmin, async (req, res) => {
    try {
      if (!supabase) {
        const local = getLocalData(resourceName, defaults);
        const filtered = local.filter((item: any) => item.id !== req.params.id);
        saveLocalData(resourceName, filtered);
        return res.json({ success: true, id: req.params.id });
      }
      const { error } = await supabase.from(resourceName).delete().eq('id', req.params.id);
      if (error) {
        console.warn(`Supabase delete failed for ${resourceName}, using local fallback:`, error.message);
        const local = getLocalData(resourceName, defaults);
        const filtered = local.filter((item: any) => item.id !== req.params.id);
        saveLocalData(resourceName, filtered);
        return res.json({ success: true, id: req.params.id });
      }
      res.json({ success: true, id: req.params.id });
    } catch (err: any) {
      console.warn(`Exception in delete for ${resourceName}, using local fallback:`, err.message);
      const local = getLocalData(resourceName, defaults);
      const filtered = local.filter((item: any) => item.id !== req.params.id);
      saveLocalData(resourceName, filtered);
      res.json({ success: true, id: req.params.id });
    }
  });

  app.post(`/api/${resourceName}/reset`, verifyAdmin, async (req, res) => {
    try {
      if (!supabase) {
        saveLocalData(resourceName, defaults);
        return res.json(defaults);
      }
      const { error: deleteError } = await supabase.from(resourceName).delete().neq('id', 'placeholder_safety_bypass');
      if (deleteError) {
        console.warn(`Supabase clear failed during reset for ${resourceName}, using local fallback:`, deleteError.message);
        saveLocalData(resourceName, defaults);
        return res.json(defaults);
      }
      const { error: insertError } = await supabase.from(resourceName).insert(defaults);
      if (insertError) {
        console.warn(`Supabase seed insertion failed for ${resourceName}, using local fallback:`, insertError.message);
        saveLocalData(resourceName, defaults);
        return res.json(defaults);
      }
      res.json(defaults);
    } catch (err: any) {
      console.warn(`Exception in reset for ${resourceName}, using local fallback:`, err.message);
      saveLocalData(resourceName, defaults);
      res.json(defaults);
    }
  });
};

// Admin Verification Endpoint
app.post('/api/admin/verify', (req, res) => {
  const { pin } = req.body;
  if (pin === ADMIN_PIN) {
    res.json({ success: true });
  } else {
    res.status(401).json({ error: 'Invalid PIN' });
  }
});

// Register routes
registerCrudRoutes('appointments', INITIAL_APPOINTMENTS);
registerCrudRoutes('showcases', INITIAL_SHOWCASES);
registerCrudRoutes('testimonials', INITIAL_TESTIMONIALS);
registerCrudRoutes('conditions', INITIAL_CONDITIONS);
registerCrudRoutes('faqs', INITIAL_FAQS);
registerCrudRoutes('blogs', INITIAL_BLOGS);

// Generate signed upload URL endpoint
app.post('/api/upload/sign', async (req, res) => {
  const { fileName, contentType, bucket } = req.body;

  if (!bucket || !fileName || !contentType) {
    return res.status(400).json({ error: 'Missing required parameters: bucket, fileName, contentType' });
  }

  // Validate bucket is one of the allowed types
  const allowedBuckets = ['doctor-images', 'gallery', 'blog', 'profile', 'documents', 'scans'];
  if (!allowedBuckets.includes(bucket)) {
    return res.status(400).json({ error: `Invalid bucket. Allowed buckets: ${allowedBuckets.join(', ')}` });
  }

  // Check admin PIN if the bucket is NOT public scans
  if (bucket !== 'scans') {
    const pin = req.headers['x-admin-pin'] || req.query.adminPin;
    if (pin !== ADMIN_PIN) {
      return res.status(401).json({ error: 'Unauthorized: Invalid Admin PIN' });
    }
  }

  if (!supabase) {
    return res.status(500).json({ error: 'Supabase client is not initialized. Check server configurations.' });
  }

  try {
    const ext = path.extname(fileName).toLowerCase();
    const base = path.basename(fileName, ext).replace(/[^a-zA-Z0-9]/g, '_');
    const uniqueFileName = `${base}-${Date.now()}${ext}`;

    let uploadResult = await supabase.storage
      .from(bucket)
      .createSignedUploadUrl(uniqueFileName);

    if (uploadResult.error && (uploadResult.error.message.includes('does not exist') || uploadResult.error.message.includes('not found'))) {
      console.log(`Bucket '${bucket}' does not exist on Supabase URL [${supabaseUrl}]. Attempting to create it automatically...`);
      try {
        const isDocOrScan = bucket === 'documents' || bucket === 'scans';
        const { error: createBucketError } = await supabase.storage.createBucket(bucket, {
          public: true,
          allowedMimeTypes: isDocOrScan
            ? ['image/*', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
            : ['image/*'],
          fileSizeLimit: 10485760 // 10MB
        });
        
        if (createBucketError) {
          console.error(`Failed to create bucket '${bucket}':`, createBucketError);
        } else {
          console.log(`Successfully created bucket '${bucket}'. Retrying signed upload URL generation...`);
          uploadResult = await supabase.storage
            .from(bucket)
            .createSignedUploadUrl(uniqueFileName);
        }
      } catch (createErr) {
        console.error(`Failed to automatically create bucket '${bucket}':`, createErr);
      }
    }

    if (uploadResult.error || !uploadResult.data) {
      console.error(`Supabase error creating signed upload URL on URL [${supabaseUrl}]:`, uploadResult.error);
      return res.status(500).json({ error: uploadResult.error?.message || 'Failed to generate signed upload URL' });
    }

    const { data } = uploadResult;

    // Get public URL
    const { data: publicUrlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(uniqueFileName);

    res.json({
      signedUrl: data.signedUrl,
      publicUrl: publicUrlData.publicUrl,
      fileName: uniqueFileName
    });
  } catch (err: any) {
    console.error('Exception generating signed URL:', err);
    res.status(500).json({ error: err.message || 'Exception during signed URL generation' });
  }
});

// API endpoint to retrieve all public image files inside the Supabase 'gallery' storage bucket
app.get('/api/gallery-images', async (req, res) => {
  try {
    if (!supabase) {
      return res.json([]);
    }
    const { data, error } = await supabase.storage.from('gallery').list('', {
      limit: 100,
      offset: 0,
      sortBy: { column: 'name', order: 'asc' }
    });

    if (error) {
      console.warn("Failed to fetch gallery bucket list from Supabase:", error.message);
      return res.json([]);
    }

    if (data) {
      const images = data
        .filter(file => {
          const name = file.name.toLowerCase();
          return name.endsWith('.jpg') || name.endsWith('.jpeg') || name.endsWith('.png') || name.endsWith('.webp') || name.endsWith('.gif');
        })
        .map(file => ({
          id: `supabase-${file.name}`,
          imageUrl: `${supabaseUrl}/storage/v1/object/public/gallery/${encodeURIComponent(file.name)}`,
          title: "Surgical Case Milestone",
          subtitle: "Monoportal Endoscopic Spine Care Gallery",
          description: "Clinical highlight captured during monoportal FESS decompression, medical training workshop lectures, or book presentation milestones."
        }));
      return res.json(images);
    }
    res.json([]);
  } catch (err: any) {
    console.error("Exception loading gallery images:", err);
    res.json([]);
  }
});

// API endpoint to retrieve all public video files inside the Supabase 'Video' storage bucket
app.get('/api/videos', async (req, res) => {
  try {
    if (!supabase) {
      return res.json([]);
    }
    // Fetch list of files from 'Video' bucket
    let { data, error } = await supabase.storage.from('Video').list('', {
      limit: 100,
      offset: 0,
      sortBy: { column: 'created_at', order: 'desc' }
    });

    if (error || !data || data.length === 0) {
      const fallback = await supabase.storage.from('videos').list('', {
        limit: 100,
        offset: 0,
        sortBy: { column: 'created_at', order: 'desc' }
      });
      data = fallback.data;
      error = fallback.error;
    }

    if (error) {
      console.warn("Failed to fetch Video bucket list from Supabase:", error.message);
      return res.json([]);
    }

    if (data) {
      const SEO_MAP: Record<string, { title: string; category: string; description: string }> = {
        '3cd88781-6f0f-4598-ae80-222fb55c84ed.mp4': {
          title: "Full Monoportal Endoscopic Spine Surgery (FESS) Overview",
          category: "Monoportal Spine Surgery",
          description: "Pioneering Endoscopic Spine Surgeon specializing in Monoportal & Minimally Invasive Spine Procedures."
        },
        '6dec41ca-3266-4f13-9b26-d0709bbfd938.mp4': {
          title: "Same-Day Walking Milestone After Keyhole Discectomy",
          category: "Single-Stitch Recovery",
          description: "Expert in Single-Stitch Spine Surgery for faster recovery and minimal tissue trauma with same-day walking."
        },
        'd380a0a2-98d7-48c6-a93a-3424208cb39d.mp4': {
          title: "Under-8mm Keyhole Surgical Instrumentation & Nerve Protection",
          category: "Minimally Invasive Tech",
          description: "High-definition 4K endoscopic decompression of compressed lumbar nerve roots with under 8mm keyhole entry."
        },
        '5796c6df-db9c-4b15-b385-1cd2a5d293eb.mp4': {
          title: "First Cervical Monoportal Endoscopic Discectomy Milestone",
          category: "Cervical Monoportal",
          description: "Performed the first Cervical Monoportal Endoscopic Discectomy in Jaipur & Rajasthan."
        },
        '728f0363-2599-4c35-af8f-bdd86bce5774.mp4': {
          title: "First Dorsal Monoportal Endoscopic Discectomy Case Log",
          category: "Dorsal Monoportal",
          description: "Performed the first Dorsal Monoportal Endoscopic Discectomy in Jaipur & Rajasthan."
        },
        '79ebc994-ac45-457e-a090-8828fb109c05.mp4': {
          title: "Sciatica & Slipped Disc Pain Relief Endoscopic Release",
          category: "Sciatica Treatment",
          description: "Rapid nerve root decompression removing herniated disc fragments with single-stitch keyhole access."
        },
        '8fc843b6-3211-42b6-84fb-b94a1de217f5.mp4': {
          title: "Youngest Cauda Equina Endoscopic Surgery — Asia Book of Records",
          category: "Asia & India Book Records",
          description: "Operated on the youngest Cauda Equina patient, recognized by the India Book of Records & Asia Book of Records."
        },
        'c2aa31cc-fa96-4072-8390-402c92025c67.mp4': {
          title: "Lumbar Spinal Canal Stenosis Keyhole Decompression",
          category: "Lumbar Stenosis",
          description: "Achieved the first Monoportal Endoscopic Spine Surgery in the State of Rajasthan for spinal canal stenosis."
        },
        'dbb7730f-2163-491e-93e1-2217592cc97c.mp4': {
          title: "Awake Spine Surgery Under Local Conscious Epidural Anesthesia",
          category: "Awake Spine Surgery",
          description: "Safe monoportal endoscopic spine surgery performed under conscious epidural anesthesia for real-time safety."
        },
        'eb53d874-f09e-4297-828b-474675034725.mp4': {
          title: "First Monoportal Endoscopic Spine Surgery in Rajasthan Landmark",
          category: "State Landmark Milestone",
          description: "Achieved the first Monoportal Endoscopic Spine Surgery in the State of Rajasthan."
        }
      };

      const videos = data
        .filter(file => {
          const name = file.name.toLowerCase();
          // Exclude background hero video Animate_image_with_motion
          if (name.includes("animate_image") || name.includes("animate") || name.includes("motion_2026")) {
            return false;
          }
          return name.endsWith('.mp4') || name.endsWith('.mov') || name.endsWith('.webm') || name.endsWith('.m4v') || name.endsWith('.mkv');
        })
        .map(file => {
          const mapped = SEO_MAP[file.name];
          const cleanName = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ").replace(/\b\w/g, c => c.toUpperCase());
          return {
            id: `supabase-vid-${file.name}`,
            title: mapped ? mapped.title : `${cleanName} — Monoportal Endoscopic Spine Care`,
            description: mapped ? mapped.description : "High-Definition 4K Monoportal Endoscopic Spine Procedure & Patient Milestone Log by Dr. Dheeraj Vishwakarma.",
            poster: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800",
            videoUrl: `${supabaseUrl}/storage/v1/object/public/Video/${encodeURIComponent(file.name)}`,
            category: mapped ? mapped.category : "Endoscopic Spine Surgery"
          };
        });
      return res.json(videos);
    }
    res.json([]);
  } catch (err: any) {
    console.error("Exception loading videos from Supabase:", err);
    res.json([]);
  }
});

// Legacy uploads redirect router
app.get('/uploads/:fileName', (req, res) => {
  const { fileName } = req.params;
  const isDoc = fileName.endsWith('.pdf') || fileName.endsWith('.doc') || fileName.endsWith('.docx');
  const bucket = isDoc ? 'scans' : 'gallery';
  if (supabaseUrl) {
    return res.redirect(`${supabaseUrl}/storage/v1/object/public/${bucket}/${fileName}`);
  }
  res.status(404).send('File not found');
});

// Production client serving (fallback for local previews/tests)
const DIST_DIR = path.join(__dirname, 'dist');
if (fs.existsSync(DIST_DIR)) {
  app.use(express.static(DIST_DIR));
  app.get('*', (req, res) => {
    res.sendFile(path.join(DIST_DIR, 'index.html'));
  });
}

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Backend server running at http://localhost:${PORT}`);
  });
}

export default app;

