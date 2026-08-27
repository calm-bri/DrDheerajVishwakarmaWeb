-- Alter the showcases table to add the missing featuredInHero column if it doesn't exist
ALTER TABLE showcases ADD COLUMN IF NOT EXISTS "featuredInHero" BOOLEAN NOT NULL DEFAULT false;
