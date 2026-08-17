-- Stage 10 Supabase Database Migration: Assessment Engine & Attempt History

CREATE TABLE IF NOT EXISTS public.assessment_attempts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  path_slug TEXT NOT NULL,
  assessment_id TEXT NOT NULL,
  assessment_slug TEXT NOT NULL,
  attempt_number INT DEFAULT 1,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  duration_seconds INT DEFAULT 0,
  score INT DEFAULT 0,
  max_score INT DEFAULT 100,
  percentage INT DEFAULT 0,
  passed BOOLEAN DEFAULT FALSE,
  answers JSONB DEFAULT '{}'::jsonb,
  question_results JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for performance lookup
CREATE INDEX IF NOT EXISTS idx_assessment_attempts_lookup ON public.assessment_attempts(user_id, path_slug, assessment_id);

-- Enable Row Level Security (RLS)
ALTER TABLE public.assessment_attempts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own assessment attempts" ON public.assessment_attempts;
CREATE POLICY "Users can view own assessment attempts" ON public.assessment_attempts FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can manage own assessment attempts" ON public.assessment_attempts;
CREATE POLICY "Users can manage own assessment attempts" ON public.assessment_attempts FOR ALL USING (auth.uid() = user_id);
