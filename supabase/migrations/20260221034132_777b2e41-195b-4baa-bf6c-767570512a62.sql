
-- Add field for storing career questionnaire answers
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS education_level text,
ADD COLUMN IF NOT EXISTS stream text,
ADD COLUMN IF NOT EXISTS percentage numeric,
ADD COLUMN IF NOT EXISTS interests text[],
ADD COLUMN IF NOT EXISTS strengths text[],
ADD COLUMN IF NOT EXISTS preferred_city text,
ADD COLUMN IF NOT EXISTS career_recommendations jsonb,
ADD COLUMN IF NOT EXISTS onboarding_completed boolean NOT NULL DEFAULT false;
