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
    title: "Rajasthan Patrika: Stitch-less Spine Care",
    subtitle: "Pioneering <8mm single-stitch ambulatory endoscopic spine surgeries.",
    description: "Special press release documenting the benefits of under-8mm stitch-less endoscopic surgery, explaining how avoiding muscle tears leads to same-day recovery milestones.",
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
    description: "The main operating desk showing full-endoscopic spinal camera integration, dual continuous-flow pump nodes, and micro-manipulators. Keeping the incision under 7mm ensures absolute safety.",
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
    description: "Dr. Dheeraj Vishwakarma performing active motor checks immediately following a stitch-less transforaminal decompression. The patient walked independently within 3 hours.",
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
    title: "National Media Spotlight on Stitch-Less Interventions",
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

const INITIAL_CONDITIONS = [
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

const INITIAL_FAQS = [
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

// Generic CRUD endpoints generator with Supabase DB queries
const registerCrudRoutes = (resourceName: string, defaults: any[]) => {
  app.get(`/api/${resourceName}`, (req, res, next) => {
    if (resourceName === 'appointments') {
      return verifyAdmin(req, res, next);
    }
    next();
  }, async (req, res) => {
    if (!supabase) {
      return res.status(500).json({ error: 'Supabase client is not initialized' });
    }
    try {
      const { data, error } = await supabase.from(resourceName).select('*');
      if (error) {
        console.error(`Supabase query failed for ${resourceName}:`, error.message);
        return res.status(500).json({ error: error.message });
      }
      if (data) {
        // Sort items if necessary (newest first for showcases, appointments, testimonials)
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
      console.error(`Exception during Supabase query for ${resourceName}:`, err);
      res.status(500).json({ error: err.message || 'Database exception occurred' });
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

    if (!supabase) {
      return res.status(500).json({ error: 'Supabase client is not initialized' });
    }

    try {
      const { error } = await supabase.from(resourceName).insert(newItem);
      if (error) {
        console.error(`Supabase insert failed for ${resourceName}:`, error.message);
        return res.status(500).json({ error: error.message });
      }
      res.status(201).json(newItem);
    } catch (err: any) {
      console.error(`Exception during Supabase insert for ${resourceName}:`, err);
      res.status(500).json({ error: err.message || 'Database exception occurred' });
    }
  });

  app.put(`/api/${resourceName}/:id`, verifyAdmin, async (req, res) => {
    const updatedFields = req.body;
    if (!supabase) {
      return res.status(500).json({ error: 'Supabase client is not initialized' });
    }

    try {
      const { error } = await supabase.from(resourceName).update(updatedFields).eq('id', req.params.id);
      if (error) {
        console.error(`Supabase update failed for ${resourceName}:`, error.message);
        return res.status(500).json({ error: error.message });
      }
      res.json({ id: req.params.id, ...updatedFields });
    } catch (err: any) {
      console.error(`Exception during Supabase update for ${resourceName}:`, err);
      res.status(500).json({ error: err.message || 'Database exception occurred' });
    }
  });

  app.delete(`/api/${resourceName}/:id`, verifyAdmin, async (req, res) => {
    if (!supabase) {
      return res.status(500).json({ error: 'Supabase client is not initialized' });
    }

    try {
      const { error } = await supabase.from(resourceName).delete().eq('id', req.params.id);
      if (error) {
        console.error(`Supabase delete failed for ${resourceName}:`, error.message);
        return res.status(500).json({ error: error.message });
      }
      res.json({ success: true, id: req.params.id });
    } catch (err: any) {
      console.error(`Exception during Supabase delete for ${resourceName}:`, err);
      res.status(500).json({ error: err.message || 'Database exception occurred' });
    }
  });

  app.post(`/api/${resourceName}/reset`, verifyAdmin, async (req, res) => {
    if (!supabase) {
      return res.status(500).json({ error: 'Supabase client is not initialized' });
    }

    try {
      // Safe delete: delete records that have valid ids (which is all)
      const { error: deleteError } = await supabase.from(resourceName).delete().neq('id', 'placeholder_safety_bypass');
      if (deleteError) {
        console.error(`Supabase clear failed during reset for ${resourceName}:`, deleteError.message);
        return res.status(500).json({ error: deleteError.message });
      }
      const { error: insertError } = await supabase.from(resourceName).insert(defaults);
      if (insertError) {
        console.error(`Supabase seed insertion failed for ${resourceName}:`, insertError.message);
        return res.status(500).json({ error: insertError.message });
      }
      res.json(defaults);
    } catch (err: any) {
      console.error(`Exception during Supabase reset for ${resourceName}:`, err);
      res.status(500).json({ error: err.message || 'Database exception occurred' });
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

