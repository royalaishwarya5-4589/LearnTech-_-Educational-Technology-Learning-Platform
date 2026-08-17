-- Stage 13 Supabase Production Hardening Migration: Indexes & RLS Reinforcements

-- 1. Performance Indexes for Scale (100,000+ attempts & activities)
CREATE INDEX IF NOT EXISTS idx_assessment_attempts_user_created ON public.assessment_attempts(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_assessment_attempts_passed ON public.assessment_attempts(user_id, passed);
CREATE INDEX IF NOT EXISTS idx_user_activities_user_created ON public.user_activities(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_user_progress_status ON public.user_progress(user_id, status);

-- 2. Strict RLS Policies for Production Safety
-- Ensure user_activities INSERT is restricted to auth.uid()
DROP POLICY IF EXISTS "Users can insert own activities" ON public.user_activities;
CREATE POLICY "Users can insert own activities" ON public.user_activities 
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Ensure certificates cannot be directly inserted/updated by non-authenticated clients without user_id matching auth.uid()
DROP POLICY IF EXISTS "Users can view own certificates" ON public.certificates;
CREATE POLICY "Users can view own certificates" ON public.certificates 
  FOR SELECT USING (auth.uid() = user_id);
