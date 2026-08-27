-- 1. Create Blogs Table
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

-- 2. Insert Default Blogs
INSERT INTO blogs (id, title, summary, content, category, date, "readTime", author)
VALUES
('fess-decompression-shift', 'Monoportal Endoscopic Spine Surgery: A Paradigm Shift in Spinal Decompression', 'How FESS (Full Monoportal Endoscopic Spine Surgery) has revolutionized the treatment of herniations and stenosis by sparing paraspinous muscles and accelerating outpatient mobilization.', 'Full Monoportal Endoscopic Spine Surgery (FESS) has transformed patient options. Historically, open spine procedures required extensive muscle separation, leading to long recoveries. Endoscopic access through a single <8mm keyhole preserves spinal column structures. Active visualization under 4K saline pressure irrigation minimizes risk, offering a same-day walking milestone.', 'Clinical Guide', 'May 2026', '6 min read', 'Dr. Dheeraj Vishwakarma'),
('awake-spine-surgery-milestones', 'Awake Spine Surgery: Conscious Sedation & Patient Safety Protocols', 'An in-depth review of patient responses and neurological safety margins when conducting keyhole lumbar decompressions under local conscious epidural anesthesia.', 'Performing spine decompressions while the patient is conscious represents a massive leap in patient safety. By avoiding general anesthesia, cardiac risk variables are lowered. More importantly, the patient can interact with the surgical officer. Real-time feedback during nerve root release ensures zero nerve injury.', 'Research', 'March 2026', '8 min read', 'Dr. Dheeraj Vishwakarma'),
('pediatric-cauda-equina-study', 'Pediatric Disk Herniations: Keyhole Decompression for Cauda Equina Syndrome', 'A clinical case report analysis detailing the successful execution of an 8mm single-stitch discectomy on an 11-year-old pediatric patient, achieving Asia Book of Records recognition.', 'Pediatric cauda equina syndrome is rare and requires emergency action. This study documents the clinical path of the youngest patient (11 years) treated via transforaminal monoportal endoscopic discectomy. Preserving the growing spine''s structural joints is crucial, and keyhole entry bypasses future scoliosis risks.', 'Case Study', 'July 2025', '10 min read', 'Dr. Dheeraj Vishwakarma'),
('lumbar-canal-stenosis-chapter', 'Academic Book Chapter: Lumbar Canal Stenosis Principles & Practice', 'An overview of the instructional chapter contributed by Dr. Vishwakarma to the ''Practical Manual on Full Monoportal Endoscopic Spine Surgery'' handbook.', 'This textbook chapter details safe bone drilling zones, anatomical markers, and continuous irrigation pump pressure calibration. It serves as a guide for spine surgery fellows learning full endoscopic monoportal decompression, teaching standard tricks and how to avoid complications.', 'Book Chapter', 'January 2025', '15 min read', 'Dr. Dheeraj Vishwakarma')
ON CONFLICT (id) DO NOTHING;
