-- Stage 7 Supabase Database Migration: Multi-Course Architecture
-- Ensures database schema seamlessly supports dynamic course paths and lesson progress across all technical domains.

-- 1. Verify/Ensure indexes on path_slug across user_progress, exercise_submissions, and project_progress
CREATE INDEX IF NOT EXISTS idx_user_progress_path_slug ON public.user_progress(path_slug);
CREATE INDEX IF NOT EXISTS idx_exercise_submissions_path_slug ON public.exercise_submissions(path_slug);
CREATE INDEX IF NOT EXISTS idx_project_progress_path_slug ON public.project_progress(path_slug);

-- 2. User Course Enrollments Table to track enrolled/bookmarked courses
CREATE TABLE IF NOT EXISTS public.user_course_enrollments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  path_slug TEXT NOT NULL,
  enrolled_at TIMESTAMPTZ DEFAULT NOW(),
  last_accessed_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, path_slug)
);

CREATE INDEX IF NOT EXISTS idx_user_course_enrollments_lookup ON public.user_course_enrollments(user_id, path_slug);

-- Enable RLS for User Course Enrollments
ALTER TABLE public.user_course_enrollments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own course enrollments" ON public.user_course_enrollments;
CREATE POLICY "Users can view own course enrollments" ON public.user_course_enrollments FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can manage own course enrollments" ON public.user_course_enrollments;
CREATE POLICY "Users can manage own course enrollments" ON public.user_course_enrollments FOR ALL USING (auth.uid() = user_id);
