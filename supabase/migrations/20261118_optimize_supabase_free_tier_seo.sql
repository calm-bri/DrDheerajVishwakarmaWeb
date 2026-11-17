-- Migration: Strict Supabase Free-Tier Optimization for SEO & Static Pages
-- Preserves all existing data, adds minimal columns and one centralized page_seo table.

begin;

-- 1. Ensure blog SEO fields exist in the existing blogs table (reuse existing table)
alter table public.blogs
  add column if not exists slug text,
  add column if not exists "metaTitle" text,
  add column if not exists "metaDescription" text,
  add column if not exists "metaKeywords" text;

-- Create unique index on normalized blog slug if not exists
create unique index if not exists blogs_slug_normalized_unique
  on public.blogs (lower(btrim(slug)))
  where slug is not null and btrim(slug) <> '';

-- 2. Create one centralized page_seo table for static page metadata
create table if not exists public.page_seo (
  page_route text primary key,
  title text not null,
  description text not null,
  keywords text,
  meta_title text,
  meta_description text,
  meta_keywords text,
  og_image text,
  canonical_url text,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Enable Row-Level Security (RLS) on page_seo
alter table public.page_seo enable row level security;

-- 4. Set public read-only policy: unauthenticated visitors can only SELECT
drop policy if exists "Allow public read-only access on page_seo" on public.page_seo;
create policy "Allow public read-only access on page_seo"
  on public.page_seo for select
  to anon, authenticated
  using (true);

-- 5. Seed default static page SEO records if not already populated
insert into public.page_seo (page_route, title, description, keywords, og_image)
values
  (
    '/',
    'Dr. Dheeraj Vishwakarma | Best Endoscopic Spine Surgeon Jaipur & India',
    'Dr. Dheeraj Vishwakarma is India''s leading neurosurgeon specializing in single-stitch (<8mm) FESS monoportal endoscopic spine surgery with same-day walking recovery.',
    'Endoscopic Spine Surgeon, Best Spine Surgeon Jaipur, Monoportal Endoscopic Spine Surgery, Slip Disc Treatment Jaipur, Sciatica Surgery, Minimally Invasive Spine Surgery, Dr Dheeraj Vishwakarma',
    '/logo.png'
  ),
  (
    '/about',
    'About Dr. Dheeraj Vishwakarma | Leading Endoscopic Spine Surgeon Jaipur',
    'Learn about Dr. Dheeraj Vishwakarma, internationally trained endoscopic spine surgeon, pioneer of single-stitch spine surgery, and world-record holder in pediatric endoscopy.',
    'Dr Dheeraj Vishwakarma, spine surgeon profile, endoscopic spine specialist biography, medical qualifications, spine doctor Jaipur awards',
    '/logo.png'
  ),
  (
    '/treatments',
    'Advanced Endoscopic Spine Surgery Treatments | Dr. Dheeraj Vishwakarma',
    'Explore cutting-edge endoscopic and minimally invasive spine procedures for slipped discs, sciatica, spinal stenosis, and complex spinal disorders in Jaipur.',
    'Endoscopic Spine Treatments, Slip Disc Surgery, Sciatica Treatment, Spinal Stenosis Surgery, Minimally Invasive Spine Surgery, FESS Jaipur',
    '/logo.png'
  ),
  (
    '/blogs',
    'Spine Health Articles & Clinical Guides | Dr. Dheeraj Vishwakarma',
    'Read peer-reviewed clinical publications, case reports, and educational articles on endoscopic spine surgery and modern spinal care.',
    'Spine Surgery Articles, Endoscopic Spine Blog, Slip Disc Research, Awake Spine Surgery Insights, Spine Health Guides',
    '/logo.png'
  ),
  (
    '/gallery',
    'Endoscopic Spine Surgery Case Gallery & Surgical Videos | Dr. Dheeraj Vishwakarma',
    'Browse high-definition endoscopic spine surgical cases, patient recovery milestones, and before-after MRI scans from Dr. Dheeraj Vishwakarma''s practice.',
    'Spine Surgery Gallery, Endoscopic Spine Videos, Slip Disc Surgery Photos, Spine Surgery Case Studies, Monoportal Spine Videos',
    '/logo.png'
  ),
  (
    '/contact',
    'Contact Dr. Dheeraj Vishwakarma | Spine Clinic Jaipur & Consultations',
    'Book an in-person or online video consultation with Dr. Dheeraj Vishwakarma, pioneering endoscopic spine surgeon in Jaipur, Rajasthan.',
    'Contact Spine Surgeon, Book Spine Consultation, Spine Clinic Jaipur, Dr Dheeraj Vishwakarma Appointment, Second Opinion Spine',
    '/logo.png'
  ),
  (
    '/international-patients',
    'International Patients Desk | Endoscopic Spine Surgery in India',
    'World-class endoscopic spine surgery in India with dedicated medical travel support, rapid MRI review, and expedited same-day walking recovery.',
    'Medical Tourism India Spine, International Spine Surgery India, Endoscopic Spine Surgery Overseas, Slipped Disc Treatment India Cost',
    '/logo.png'
  )
on conflict (page_route) do nothing;

commit;
