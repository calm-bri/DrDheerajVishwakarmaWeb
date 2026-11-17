begin;

alter table public.conditions
  add column if not exists "metaTitle" text,
  add column if not exists "metaDescription" text,
  add column if not exists "metaKeywords" text;

commit;
