begin;

alter table public.conditions
  add column if not exists slug text;

create unique index if not exists conditions_slug_normalized_unique
  on public.conditions (lower(btrim(slug)))
  where slug is not null and btrim(slug) <> '';

commit;
