-- Stage 12 Supabase Migration: Learner Activity Log & Analytics Tables

-- 1. Create user_activities table to store persistent user activity timeline events
CREATE TABLE IF NOT EXISTS public.user_activities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  path_slug TEXT NOT NULL,
  activity_type TEXT NOT NULL CHECK (
    activity_type IN (
      'lesson_completed',
      'exercise_completed',
      'exercise_passed',
      'exercise_attempted',
      'quiz_completed',
      'project_completed',
      'project_milestone',
      'assessment_passed',
      'assessment_failed',
      'certificate_earned',
      'achievement_unlocked'
    )
  ),
  title TEXT NOT NULL,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Performance & Lookup Indexes
CREATE INDEX IF NOT EXISTS idx_user_activities_lookup ON public.user_activities(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_user_activities_path ON public.user_activities(user_id, path_slug);

-- Enable Row Level Security (RLS)
ALTER TABLE public.user_activities ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_activities
DROP POLICY IF EXISTS "Users can view own activities" ON public.user_activities;
CREATE POLICY "Users can view own activities" ON public.user_activities FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own activities" ON public.user_activities;
CREATE POLICY "Users can insert own activities" ON public.user_activities FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can manage own activities" ON public.user_activities;
CREATE POLICY "Users can manage own activities" ON public.user_activities FOR ALL USING (auth.uid() = user_id);
