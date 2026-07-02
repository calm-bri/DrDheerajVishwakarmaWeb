-- 1. Create Appointments Table
CREATE TABLE IF NOT EXISTS appointments (
    id TEXT PRIMARY KEY,
    "fullName" TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    "selectedTreatment" TEXT NOT NULL,
    symptoms TEXT NOT NULL,
    "sessionType" TEXT NOT NULL,
    status TEXT NOT NULL,
    "bookingDate" TEXT NOT NULL,
    "bookingTime" TEXT NOT NULL,
    "isInternational" BOOLEAN NOT NULL DEFAULT false,
    "fileName" TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create Showcases Table
CREATE TABLE IF NOT EXISTS showcases (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    subtitle TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    location TEXT NOT NULL,
    date TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "videoUrl" TEXT,
    "sizeClass" TEXT NOT NULL,
    badge TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Create Testimonials Table
CREATE TABLE IF NOT EXISTS testimonials (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    location TEXT NOT NULL,
    condition TEXT NOT NULL,
    quote TEXT NOT NULL,
    "recoverySummary" TEXT NOT NULL,
    "avatarUrl" TEXT,
    rating INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Create Conditions Table
CREATE TABLE IF NOT EXISTS conditions (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    "shortDescription" TEXT NOT NULL,
    "fullDescription" TEXT NOT NULL,
    symptoms TEXT[] NOT NULL,
    "treatmentMetric" TEXT NOT NULL,
    "recoveryTime" TEXT NOT NULL,
    "detailedKey" TEXT NOT NULL,
    "iconName" TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Create FAQs Table
CREATE TABLE IF NOT EXISTS faqs (
    id TEXT PRIMARY KEY,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    category TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Insert Default Showcases
INSERT INTO showcases (id, title, subtitle, description, category, location, date, "imageUrl", "videoUrl", "sizeClass", badge)
VALUES 
('sc-asia-india-records', 'Asia & India Book of Records Certification', 'Pioneered youngest pediatric monoportal endoscopic discectomy milestone.', 'Dr. Dheeraj Vishwakarma holding the record certificates for the Asia Book of Records and India Book of Records, recognizing the world-record milestone of performing a single-stitch 8mm monoportal endoscopic discectomy on the youngest patient (11 years old) for Cauda Equina Syndrome.', 'news', 'Jaipur, India', 'July 2025', '/awards-records.jpg', NULL, 'md:col-span-2 md:row-span-1 aspect-[16/10] sm:aspect-auto', 'Asia & India Record'),
('sc-db-news', 'Dainik Bhaskar: Spine Endoscopy Landmark', 'Pioneering cervical-dorsal monoportal endoscopic spine surgery milestone.', 'Front-page feature highlighting Dr. Dheeraj''s landmark surgical execution, performing pioneering cervical-dorsal monoportal endoscopic decompression, allowing immediate post-op movement.', 'news', 'India Desk', 'June 2025', 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&q=80', NULL, 'md:col-span-2 md:row-span-1 aspect-[16/10] sm:aspect-auto', 'Pioneering Case'),
('sc-rp-news', 'Rajasthan Patrika: Single-Stitch Spine Care', 'Pioneering <8mm single-stitch ambulatory monoportal endoscopic spine surgeries.', 'Special press release documenting the benefits of under-8mm single-stitch endoscopic surgery, explaining how avoiding muscle tears leads to same-day recovery milestones.', 'news', 'India Desk', 'August 2025', 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=1200&q=80', NULL, 'md:col-span-1 md:row-span-1 aspect-square sm:aspect-auto', 'Single Stitch (<8mm)'),
('sc-news18-clip', 'News 18 Studio: 50+ Monoportal Cases Milestone', 'Television broadcast feature covering the landmark 50+ multi-level endoscopic cases.', 'Broadcast coverage detailing the clinical success rates and volume milestone of 50+ monoportal endoscopic spine procedures across cervical, dorsal, and lumbar sections.', 'news', 'News 18 Studio', 'October 2025', 'https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?auto=format&fit=crop&w=1200&q=80', 'https://www.w3schools.com/html/mov_bbb.mp4', 'md:col-span-1 md:row-span-1 aspect-square sm:aspect-auto', 'Television Broadcast'),
('sc-1', 'Dual-Portal Endoscopic Operating Suite Setup', 'High-definition camera consoles & saline Continuous Pressure irrigation system.', 'The main operating desk showing full-endoscopic spinal camera integration, dual continuous-flow pump nodes, and micro-manipulators. Keeping the incision under 8mm ensures absolute safety.', 'surgical', 'Surgical Theatre Unit A, India', 'May 2026', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80', 'https://www.w3schools.com/html/mov_bbb.mp4', 'md:col-span-2 md:row-span-1 aspect-[16/10] sm:aspect-auto', 'Featured Room'),
('sc-2', 'Post-Operative Recovery Patient Assessment', 'Real-time neuro-pathway validation while the patient is awake.', 'Dr. Dheeraj Vishwakarma performing active motor checks immediately following a single-stitch transforaminal decompression. The patient walked independently within 3 hours.', 'surgical', 'Special Care Ward', 'April 2026', 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80', NULL, 'md:col-span-1 md:row-span-1 aspect-square sm:aspect-auto', 'Awake Technique'),
('sc-3', '3D CT Reconstruction & Surgical Safe-Zone Trajectory', 'Pre-operative digital planning utilizing computerized bone densitometry.', 'Advanced biomechanical mapping of the L4-L5 exit neural foramens. This mapping determines the exact needle entry trajectory, bypassing key supportive back muscle structures entirely.', 'surgical', 'Medical Robotics Lab', 'March 2026', 'https://images.unsplash.com/photo-1530026405186-ed1ea0ac7a63?auto=format&fit=crop&w=800&q=80', NULL, 'md:col-span-1 md:row-span-2 aspect-[3/4] sm:aspect-auto', 'Target Mapping'),
('sc-4', 'National FESS Advanced Cadaveric Summit', 'Hands-on instruction demonstrating drill guidance on high-fidelity models.', 'Dr. Dheeraj instructing senior orthopedic and neurosurgery delegates on transforaminal camera rotation tricks at the Joint Spine Endoscopy Council session.', 'workshop', 'Training Headquarters, New Delhi', 'March 2026', 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80', NULL, 'md:col-span-1 md:row-span-1 aspect-square sm:aspect-auto', 'Cadaveric Drill'),
('sc-5', 'Healthcare Excellence Laurels at EuroSpine Meet', 'Honored with clinical merit award for comparative local awake reviews.', 'International spine surgeons and orthopedic experts gather as Dr. Vishwakarma receives peer-reviewed recognition for achieving a 98.4% success rating with same-day outpatient cases.', 'news', 'Assembly Hall, Zurich', 'January 2026', 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=1200&q=80', NULL, 'md:col-span-1 md:row-span-1 aspect-square sm:aspect-auto', 'EuroSpine Award'),
('sc-6', 'National Media Spotlight on Single-Stitch Interventions', 'Special front-page feature covering the clinical shift to outpatient spine solutions.', 'An extensive interview piece detailing how endoscopic micro-discectomies drastically lower risk variables for elderly patients with cardiovascular complex histories.', 'news', 'Times Medical Focus Edition', 'April 2026', 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&q=80', NULL, 'md:col-span-2 md:row-span-1 aspect-[16/10] sm:aspect-auto', 'Press Cover'),
('sc-7', 'Interactive Live Cervical Decompression Broadcast', 'Satelitte link providing microscopic surgical feed to 300 delegates.', 'Live demonstration of a posterior micro-drill widening of compressed neural clusters. Operating with high clarity under constant physiological fluid pressure.', 'workshop', 'National Spine Forum Broadcast Studio', 'November 2025', 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80', NULL, 'md:col-span-1 md:row-span-1 aspect-square sm:aspect-auto', 'Interactive Broadcast'),
('sc-8', 'Advanced Laser-Guidance Navigation Calibration', 'Testing real-time fusion of CT scans and low-dose dynamic micro-fluoroscopy.', 'Perfecting the pin-point needle entry alignment matrix in the clinic, demonstrating precise micro-millimeter clearance from high-risk neural bundles before the patient enters recovery.', 'surgical', 'Spine Endoscopy Clinic', 'September 2025', 'https://images.unsplash.com/photo-1579684389782-64d84b5e901a?auto=format&fit=crop&w=1200&q=80', NULL, 'md:col-span-2 md:row-span-1 aspect-[16/10] sm:aspect-auto', 'Laser Guidance')
ON CONFLICT (id) DO NOTHING;

-- 7. Insert Default Appointments
INSERT INTO appointments (id, "fullName", email, phone, "selectedTreatment", symptoms, "sessionType", status, "bookingDate", "bookingTime", "isInternational", "fileName")
VALUES
('apt-101', 'Richard Harris', 'richard.harris@gmail.com', '+44 7911 123456', 'fess', 'Extreme shooting sciatica down my right calf. MRI reports uploaded. Ready for a video consult.', 'video', 'confirmed', '2026-06-02', '10:30 AM', true, 'mri-lumbar-richard-harris.pdf'),
('apt-102', 'Manoj Kumar Sharma', 'manoj.sharma@yahoo.co.in', '+91 98450 12345', 'slipdisc', 'L4-L5 localized slip disc. Looking to do a physical outpatient evaluation at the clinic in India.', 'clinic', 'pending', '2026-05-31', '04:15 PM', false, NULL),
('apt-103', 'Fatima Al-Sudais', 'fatima.alsudais@outlook.com', '+971 50 123 4567', 'monoportal', 'Severe lumbar canal stenosis causing claudication. Can walk barely 50 meters safely.', 'video', 'rescheduled', '2026-06-05', '02:00 PM', true, 'mri-scan-fatima.jpg'),
('apt-104', 'Col. Vikram Singh Chauhan (Retd.)', 'vikram.chauhan@gmail.com', '+91 99220 88771', 'cervical-lumbar', 'Dynamic neck stiffness and numbness in both hands. Discomfort when using fine motor skills.', 'clinic', 'confirmed', '2026-06-01', '05:30 PM', false, NULL)
ON CONFLICT (id) DO NOTHING;

-- 8. Insert Default Testimonials
INSERT INTO testimonials (id, name, location, condition, quote, "recoverySummary", rating)
VALUES
('test-1', 'Manoj Kumar Sharma', 'Jaipur, Rajasthan (Google Verified Review)', 'L4-L5 Slipped Disc with Severe Sciatica', 'I suffered from unbearable back and leg pain due to L4-L5 herniation for 6 months. Dr. Dheeraj diagnosed it perfectly and performed an endoscopic keyhole surgery. I walked on the same day within 4-6 hours. He is truly the best monoportal endoscopic spine doctor in Jaipur! Thank you, doctor, for giving me my life back.', 'Walked 4-6 hours post-op, discharged within 24h', 5),
('test-2', 'Preeti Vyas', 'Ajmer, Rajasthan (Google Verified Review)', 'Severe Cervical Spondylosis & Hand Numbness', 'Others suggested open spinal fusion which was scary. Dr. Dheeraj Vishwakarma treated my neck issue endoscopically with a tiny 8mm cut. The hand numbness and shooting pain disappeared instantly. No fusion, no implants. Highly recommended!', 'Discharged next morning, back to work in 5 days', 5),
('test-3', 'Col. Vikram Singh Chauhan (Retd.)', 'Jodhpur, Rajasthan (Google Verified Review)', 'Severe Lumbar Spinal Canal Stenosis (LSSS)', 'As a retired army officer, I was used to an active life, but stenosis restricted my walking to barely 50 meters. Dr. Dheeraj''s monoportal endoscopic precision is incredible. I walked 2 km without any support on my third recovery day. Flawless expertise.', '2 km walk on Day 3 post-op without assistance', 5),
('test-4', 'Dr. Sunil Maheshwari', 'Udaipur, Rajasthan (Consultant Pediatrician)', 'Acute L5-S1 Slip Disc with Neurological Deficit', 'As a fellow medical professional, I scrutinized all modern options for my L5-S1 slip disc. Dr. Dheeraj''s surgical precision in FESS (Full Endoscopic Spine Surgery) is outstanding. The clean visibility and command kept my nerve roots safe. An excellent surgeon.', 'Normal consulting practice resumed within a week', 5),
('test-5', 'Rajesh K. Gahlot', 'Kota, Rajasthan (Google Verified Review)', 'Extreme Sciatic Nerve Radiculopathy', 'The agonizing ''electric shock'' shooting pain down my leg was making it impossible to sit or sleep. Dr. Dheeraj operated on my compressed nerve root through a micro keyhole surgical pathway. I walked out of the hospital the next day pain-free.', 'Instant relief from shooting sciatic nerve pain', 5),
('test-6', 'Amara Al-Jamil', 'Dubai, UAE (International Patient Review)', 'Multi-level Lumbar Stenosis & Disk Herniation', 'Flew from Dubai to Rajasthan specifically for Dr. Dheeraj''s specialized endoscopic spine treatment. The clinical care, hospitality, and overall experience were remarkable. I am now back to my daily gym routine without any restrictions.', 'Resumed daily gym routines after 4 weeks', 5)
ON CONFLICT (id) DO NOTHING;

-- 9. Insert Default Conditions
INSERT INTO conditions (id, name, "shortDescription", "fullDescription", symptoms, "treatmentMetric", "recoveryTime", "detailedKey", "iconName")
VALUES
('fess', 'Full Monoportal Endoscopic Spine Surgery (FESS)', 'Ultra-minimally invasive intervention using an under-8mm endoscope, requiring only a single stitch and allowing direct visual access.', 'Full Monoportal Endoscopic Spine Surgery (FESS) represents the absolute pinnacle of contemporary spinal care. By utilizing a single micro-portal under 8mm and requiring only a single stitch, Dr. Dheeraj Vishwakarma inserts a microscopic lens directly next to the compressed nerve roots. Specialized optical lighting showcases real-time neural pulsations under 4K magnification, guaranteeing unparalleled safety. No major muscles are severed or detached, which eliminates the heavy post-operative discomfort of old-fashioned surgery.', ARRAY['Radiating sciatic leg pain', 'Lumbar or cervical herniation', 'Persistent numbness in feet or fingers', 'Neurological motor weakness'], '99.1% Visual Precision', 'Full Walk within 4-6 Hours', 'Full Monoportal Endoscopic Spine Surgery (FESS)', 'Eye'),
('monoportal', 'Endoscopic Monoportal Spine Surgery', 'The gold standard of microscopic bone & disc decompression, addressing stenosis and slip disc via a single strategic port.', 'Applying world-class Monoportal endoscopy, Dr. Vishwakarma decompresses spinal structures with micro-milimetric precision. By guiding micro-instruments through a single, highly controlled structural portal, we shave away bone-spurs, calcified ligaments, and extruded nuclei without destabilizing the biomechanical structures of your spine. This ensures immediate spinal relief while maintaining complete physical movement and column integrity.', ARRAY['Lumbar canal stenosis', 'Spinal claudication (inability to walk without rest)', 'Severe spinal bone spur compression'], 'No Muscle Damage', 'Same-Day Mobilization', 'Endoscopic Monoportal Spine Surgery', 'Zap'),
('miss', 'Minimally Invasive Spine Surgery (MISS)', 'Advanced keyhole surgery using tubular dilators and real-time intraoperative mapping to spare muscle fibers and lower blood loss.', 'Minimally Invasive Spine Surgery (MISS) replaces the traumatic, large incisions of conventional open spine surgery with miniature pathways. Tubular dilators gently separate muscle fibers along their natural orientation instead of tearing them. Assisted by high-magnification surgical operating microscopes, the target lesion is treated safely, minimizing internal scarring and providing an incredibly quiet, pain-free recovery.', ARRAY['Degenerative disc diseases', 'Spondylolisthesis (spinal slippage)', 'Recurrent lumbar herniations'], '< 15ml Blood Loss', 'Discharge in 24 Hours', 'Minimally Invasive Spine Surgery', 'Shield'),
('sciatica', 'Sciatica Treatment & Nerve Decompression', 'Targeted localized nerve-root release designed to instantly stop radiating buttocks, thigh, and calf shooting pain.', 'Sciatica is not a simple condition but a manifestation of underlying sciatic nerve root compression. Under Dr. Vishwakarma''s care, patients undergo computerized dermatomal mapping to identify the precise biomechanical culprit. Decompression via high-magnification endoscopes instantly frees the trapped nerve root, removing the agonizing ''electric shock'' sensations and restoring smooth muscle sensory pathways.', ARRAY['Burning, stabbing pain down the calf', 'Severe pain when sitting or walking', 'Prickling ''pins and needles'' down to the toes'], 'Immediate Radiance Relief', 'Immediate Ambulatory Status', 'Sciatica Treatment', 'Activity'),
('slipdisc', 'Slip Disc / Herniated Nucleus Treatment', 'Micro-endoscopic discectomy removing only the damaged fragment, preserving 95% of your natural cushioning disc.', 'A slipped disc can cause immense physical and emotional paralysis. Using the latest endoscopes, we perform selective fragmentectomy—removing only the ruptured portion of the nucleus pulposus that interferes with the nerve sheath, leaving the healthy padding of the disc completely intact. This preserves the spine''s natural rotational shock absorption.', ARRAY['Sudden, localized lower back shooting pain', 'Stiffness and spasm in para-spinal muscles', 'Worse pain on forward bending'], '98.5% Disc Preservation', 'Return to Office in 5 Days', 'Slip Disc Treatment', 'Layers'),
('cervical-lumbar', 'Cervical & Lumbar Spine Disorders', 'Surgical and advanced non-surgical management of complex spinal stenosis, myelopathy, and cervical spondylosis.', 'Complex spinal column disorders ranging from neck myelopathy to lumbar listhesis require a tailormade clinical approach. Dr. Vishwakarma implements advanced motion-preserving techniques, artificial disc replacements, and dynamic stabilization. This restores a youthful range of motion, allowing patients to enjoy physical training, sports, and normal active lifestyles.', ARRAY['Loss of fine motor skills in hands', 'Imbalance while walking/stumbling', 'Chronic heavy neck stiffness and shooting shoulder pain'], 'Restored Range of Motion', 'Active Lifestyle Restoration', 'Cervical & Lumbar Spine Disorders', 'Compass')
ON CONFLICT (id) DO NOTHING;

-- 10. Insert Default FAQs
INSERT INTO faqs (id, question, answer, category)
VALUES
('faq-1', 'What is the difference between Monoportal Endoscopic Spine Surgery and traditional spine surgery?', 'Traditional spine surgery requires a large incision of 3-5 inches, severe cutting and peeling of spine muscles, and a long hospital stay. Dr. Vishwakarma''s Monoportal Endoscopic Spine Surgery uses a tiny incision (~8mm, less than a finger-width), passes between muscles without ripping them, preserves the spinal joints, and allows patients to walk comfortably within hours afterward.', 'technology'),
('faq-2', 'Do you use metal fusion screws and implants for all slip disc surgeries?', 'Absolutely not. One of the main goals of Full Endoscopic Spine Surgery (FESS) is to protect your natural spine mobility. We work with micro-instruments to selectively extract the herniated disc tissue, leaving the healthy disc intact. Screws and fusions are reserved strictly for severe spinal column instability or spondylolisthesis.', 'safety'),
('faq-3', 'How long do I need to stay in India for surgery if I am an international patient?', 'Most patients traveling from overseas can safely fly back within 5 to 7 days. Because the incision is microscopic with no traumatic muscle cutting, the recovery is extremely rapid. Pre-travel MRI reviews allow us to arrange the surgery slot, preoperative tests, and discharge timeline prior to your arrival.', 'international'),
('faq-4', 'Is endoscopic spine surgery safe under local/epidural anesthesia?', 'Yes, it is incredibly safe. In fact, keeping the patient conscious but comfortable during the procedure is a great safety measure. Since the patient can respond, it provides immediate real-time biological feedback if a nerve structure is touched, almost completely eliminating any risk of nerve injury.', 'safety'),
('faq-5', 'How do I secure an online video consultation with Dr. Dheeraj Vishwakarma?', 'You can click on ''Book Consultation'' to upload your latest MRI scan reports. Our international desk reviews your medical history within 12 hours, and sets up a high-definition Zoom or WhatsApp video call directly with Dr. Dheeraj Vishwakarma.', 'booking')
ON CONFLICT (id) DO NOTHING;

-- 11. Create Blogs Table
CREATE TABLE IF NOT EXISTS blogs (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    summary TEXT NOT NULL,
    content TEXT NOT NULL,
    category TEXT NOT NULL,
    date TEXT NOT NULL,
    "readTime" TEXT NOT NULL,
    author TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 12. Insert Default Blogs
INSERT INTO blogs (id, title, summary, content, category, date, "readTime", author)
VALUES
('fess-decompression-shift', 'Monoportal Endoscopic Spine Surgery: A Paradigm Shift in Spinal Decompression', 'How FESS (Full Monoportal Endoscopic Spine Surgery) has revolutionized the treatment of herniations and stenosis by sparing paraspinous muscles and accelerating outpatient mobilization.', 'Full Monoportal Endoscopic Spine Surgery (FESS) has transformed patient options. Historically, open spine procedures required extensive muscle separation, leading to long recoveries. Endoscopic access through a single <8mm keyhole preserves spinal column structures. Active visualization under 4K saline pressure irrigation minimizes risk, offering a same-day walking milestone.', 'Clinical Guide', 'May 2026', '6 min read', 'Dr. Dheeraj Vishwakarma'),
('awake-spine-surgery-milestones', 'Awake Spine Surgery: Conscious Sedation & Patient Safety Protocols', 'An in-depth review of patient responses and neurological safety margins when conducting keyhole lumbar decompressions under local conscious epidural anesthesia.', 'Performing spine decompressions while the patient is conscious represents a massive leap in patient safety. By avoiding general anesthesia, cardiac risk variables are lowered. More importantly, the patient can interact with the surgical officer. Real-time feedback during nerve root release ensures zero nerve injury.', 'Research', 'March 2026', '8 min read', 'Dr. Dheeraj Vishwakarma'),
('pediatric-cauda-equina-study', 'Pediatric Disk Herniations: Keyhole Decompression for Cauda Equina Syndrome', 'A clinical case report analysis detailing the successful execution of an 8mm single-stitch discectomy on an 11-year-old pediatric patient, achieving Asia Book of Records recognition.', 'Pediatric cauda equina syndrome is rare and requires emergency action. This study documents the clinical path of the youngest patient (11 years) treated via transforaminal monoportal endoscopic discectomy. Preserving the growing spine''s structural joints is crucial, and keyhole entry bypasses future scoliosis risks.', 'Case Study', 'July 2025', '10 min read', 'Dr. Dheeraj Vishwakarma'),
('lumbar-canal-stenosis-chapter', 'Academic Book Chapter: Lumbar Canal Stenosis Principles & Practice', 'An overview of the instructional chapter contributed by Dr. Vishwakarma to the ''Practical Manual on Full Monoportal Endoscopic Spine Surgery'' handbook.', 'This textbook chapter details safe bone drilling zones, anatomical markers, and continuous irrigation pump pressure calibration. It serves as a guide for spine surgery fellows learning full endoscopic monoportal decompression, teaching standard tricks and how to avoid complications.', 'Book Chapter', 'January 2025', '15 min read', 'Dr. Dheeraj Vishwakarma')
ON CONFLICT (id) DO NOTHING;
