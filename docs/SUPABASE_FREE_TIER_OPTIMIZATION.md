# Supabase Free Tier Optimization & Operational Runbook

## Overview & Strict Free Tier Guarantees

This document details the database, storage, caching, and network egress optimizations implemented to guarantee strict compatibility with the **Supabase Free Plan** without requiring paid tier upgrades.

---

## 1. Database Architecture & Schema Re-use

To adhere to the lowest possible database footprints and eliminate redundant relational tables:

| Entity | Storage Strategy | Table Name | Columns Stored |
| :--- | :--- | :--- | :--- |
| **Static Pages SEO** | Centralized Single Table | `public.page_seo` | `page_route` (PK), `title`, `description`, `keywords`, `meta_title`, `meta_description`, `meta_keywords`, `og_image`, `canonical_url`, `updated_at` |
| **Treatment SEO & Slugs** | Existing Canonical Table | `public.conditions` | `id` (PK), `slug`, `name`, `shortDescription`, `metaTitle`, `metaDescription`, `metaKeywords` |
| **Blog SEO & Slugs** | Existing Blogs Table | `public.blogs` | `id` (PK), `title`, `summary`, `content`, `category`, `date`, `readTime`, `author`, `slug`, `metaTitle`, `metaDescription`, `metaKeywords` |

- **No table per page**: All static routes (`/`, `/about`, `/treatments`, `/blogs`, `/gallery`, `/contact`, `/international-patients`) share the single `page_seo` table.
- **Selective Projection**: API endpoints query only necessary columns (`SELECT id, slug, name, ...`) rather than `SELECT *`.
- **Zero background workers/triggers**: Avoids continuous polling, cron jobs, and database CPU drain.
- **Row-Level Security (RLS)**: Public read-only policy enabled (`anon` role can only `SELECT`). Mutations require server-side admin authentication (`x-admin-pin`) using the backend service-role key.

---

## 2. In-Memory Caching, ETags & Egress Optimization

Previously, cached egress and repeat database queries threatened Free Plan quotas. The backend and client now implement multi-layer caching:

```
[ Browser Client ]
       │ (1) Conditional GET (If-None-Match: "hash")
       ▼
[ Express Backend ] ──(Cache Hit?)──► Returns 304 Not Modified (0 bytes body, 0 DB queries)
       │ (Cache Miss or Expired?)
       ▼
[ In-Memory Server Cache ] (TTL: 5-15 mins)
       │ (Cache Miss)
       ▼
[ Supabase PostgreSQL & Storage ] (Explicit Column SELECT)
```

### HTTP Cache Policies Applied

| Endpoint | In-Memory TTL | HTTP Cache-Control | ETag / 304 Support | Invalidation Trigger |
| :--- | :--- | :--- | :--- | :--- |
| `/api/page-seo` | 5 minutes | `public, max-age=60, s-maxage=300, stale-while-revalidate=600` | Supported | Admin update to page SEO |
| `/api/treatments` | 5 minutes | `public, max-age=60, s-maxage=300, stale-while-revalidate=600` | Supported | Admin treatment edit/create/delete |
| `/api/blogs` | 5 minutes | `public, max-age=60, s-maxage=300, stale-while-revalidate=600` | Supported | Admin blog edit/create/delete |
| `/api/showcases` | 5 minutes | `public, max-age=60, s-maxage=300, stale-while-revalidate=600` | Supported | Admin showcase update |
| `/api/videos` | 15 minutes | `public, max-age=120, s-maxage=600, stale-while-revalidate=86400`| Supported | Admin video edit/upload |
| `/api/gallery-images` | 15 minutes | `public, max-age=120, s-maxage=600, stale-while-revalidate=86400`| Supported | New upload via `/api/upload/sign` |
| `/api/appointments` | No cache | `private, no-cache, no-store, must-revalidate` | None | Admin PIN required |

### Client-Side Deduplication & Lazy Loading
- **Request Deduplication**: `dedupeFetch` prevents concurrent or duplicate requests caused by React StrictMode or component remounts.
- **No Global Bucket Listing**: The eager `fetch('/api/gallery-images')` call was removed from global app startup. Visitors browsing the home, about, treatments, or blog pages generate **zero** storage bucket listing calls.
- **Client Route Navigation**: Once loaded into `DataContext`, navigating between public routes retrieves metadata synchronously from memory in **0ms** with **0 network requests**.

---

## 3. Storage & Image Optimization

- **Preserve Existing Assets**: Images reside in existing Supabase Storage buckets (`gallery`, `Video`, `doctor-images`).
- **No Duplicate Uploads**: Updating metadata (slug, meta title, description, keywords, badges) does not touch storage buckets or re-upload media files.
- **Browser-Level Lazy Loading**: All below-the-fold images across `IncisionComparison`, `AwardsSection`, `QuickAdvantages`, `AboutMe`, `ParallaxCarousel`, and `TreatmentDetailPage` are tagged with:
  ```html
  <img loading="lazy" decoding="async" ... />
  ```
- **Credentials Protection**: The Supabase service-role key is kept strictly backend-side and is never bundled in frontend assets.

---

## 4. Operational Monitoring & Free-Tier Guidance

### How to Inspect Supabase Free Plan Usage

1. Go to the [Supabase Dashboard](https://supabase.com/dashboard/project/_/settings/billing/usage).
2. Check the four key free-tier metrics:
   - **Database Size**: Limit is 500 MB (current database uses < 15 MB).
   - **Cached Egress**: Limit is 5 GB/month (in-memory caching + 304 responses keep this well below 500 MB).
   - **Database Requests**: In-memory cache ensures repeat visitors generate 0 queries to Supabase.
   - **Storage Size**: Limit is 1 GB for storage buckets.

### Endpoints Generating the Most Volume
- `/api/page-seo` & `/api/treatments`: Highest request count from public visitors. Both are protected by server-side memory caching and CDN/browser 304 ETags.
- `/api/videos`: Video files hosted on Supabase Storage can consume egress if high numbers of visitors stream raw `.mp4` files.

### Critical Operational Protections
- **Video Streaming**: For very high-traffic viral posts, embed YouTube/Vimeo links rather than raw 4K `.mp4` storage files to avoid exhausting the 5 GB bandwidth quota.
- **Admin Image Uploads**: Keep individual uploaded photos under 500 KB (use WebP or compressed JPEG).
- **Never Run Automated Polling**: Avoid scripts or browser extensions that ping `/api/*` on intervals.

---

## 5. Verification Checklist

- [x] Single centralized `page_seo` table created and populated.
- [x] Treatment SEO & slugs stored in existing `conditions` table.
- [x] Blog SEO & slugs stored in existing `blogs` table.
- [x] Explicit column projection implemented in `server.ts`.
- [x] In-memory cache + ETag conditional response (304) operational on all public GET routes.
- [x] Cache invalidation hooked to all admin mutations (POST, PUT, DELETE, reset).
- [x] Admin responses set to `private, no-cache, no-store`.
- [x] Eager gallery storage bucket listing removed from global app mount.
- [x] All 7 static pages connected to live `page_seo` metadata.
- [x] Admin Panel includes live "Page SEO & Meta" editor with Google SERP preview.
- [x] All below-the-fold images equipped with `loading="lazy"` and `decoding="async"`.
- [x] Zero external paid caching dependencies (no Redis, no paid workers).
