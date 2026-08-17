-- Stage 5 Supabase Schema & Row Level Security (RLS) Extensions

-- 1. Project Progress Table
CREATE TABLE IF NOT EXISTS public.project_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  path_slug TEXT NOT NULL,
  project_slug TEXT NOT NULL,
  status TEXT CHECK (status IN ('not_started', 'in_progress', 'completed')) DEFAULT 'not_started',
  completed_milestones TEXT[] DEFAULT '{}',
  progress_percent INT DEFAULT 0,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, path_slug, project_slug)
);

-- 2. User Achievements Table
CREATE TABLE IF NOT EXISTS public.user_achievements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  achievement_id TEXT NOT NULL,
  unlocked_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, achievement_id)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_project_progress_lookup ON public.project_progress(user_id, path_slug, project_slug);
CREATE INDEX IF NOT EXISTS idx_user_achievements_lookup ON public.user_achievements(user_id, achievement_id);

-- Enable Row Level Security (RLS)
ALTER TABLE public.project_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;

-- RLS Policies for Project Progress
DROP POLICY IF EXISTS "Users can view own project progress" ON public.project_progress;
CREATE POLICY "Users can view own project progress" ON public.project_progress FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can manage own project progress" ON public.project_progress;
CREATE POLICY "Users can manage own project progress" ON public.project_progress FOR ALL USING (auth.uid() = user_id);

-- RLS Policies for User Achievements
DROP POLICY IF EXISTS "Users can view own achievements" ON public.user_achievements;
CREATE POLICY "Users can view own achievements" ON public.user_achievements FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can manage own achievements" ON public.user_achievements;
CREATE POLICY "Users can manage own achievements" ON public.user_achievements FOR ALL USING (auth.uid() = user_id);
