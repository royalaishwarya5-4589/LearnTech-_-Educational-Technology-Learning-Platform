-- Stage 11 Supabase Database Migration: Professional Certification System

CREATE TABLE IF NOT EXISTS public.certificates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  certificate_id TEXT UNIQUE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  path_slug TEXT NOT NULL,
  course_title TEXT NOT NULL,
  learner_name TEXT NOT NULL,
  issued_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  final_score NUMERIC DEFAULT 0 NOT NULL,
  mastery_percentage NUMERIC DEFAULT 0 NOT NULL,
  certificate_status TEXT DEFAULT 'issued' CHECK (certificate_status IN ('issued', 'revoked')) NOT NULL,
  verification_hash TEXT UNIQUE NOT NULL,
  revocation_reason TEXT DEFAULT NULL,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS public.certificate_audit_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  certificate_id TEXT NOT NULL,
  action TEXT NOT NULL CHECK (action IN ('issued', 'revoked', 'reissued')),
  actor_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  reason TEXT DEFAULT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Performance & Lookup Indexes
CREATE INDEX IF NOT EXISTS idx_certificates_certificate_id ON public.certificates(certificate_id);
CREATE INDEX IF NOT EXISTS idx_certificates_verification_hash ON public.certificates(verification_hash);
CREATE INDEX IF NOT EXISTS idx_certificates_user_path ON public.certificates(user_id, path_slug);
CREATE INDEX IF NOT EXISTS idx_certificate_audit_logs_lookup ON public.certificate_audit_logs(certificate_id);

-- Enable Row Level Security (RLS)
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificate_audit_logs ENABLE ROW LEVEL SECURITY;

-- Public verification access policy (allows public certificate verification via /verify/[certificateId])
DROP POLICY IF EXISTS "Anyone can verify valid certificates" ON public.certificates;
CREATE POLICY "Anyone can verify valid certificates" ON public.certificates FOR SELECT USING (true);

-- User profile access policy
DROP POLICY IF EXISTS "Users can view own certificates" ON public.certificates;
CREATE POLICY "Users can view own certificates" ON public.certificates FOR SELECT USING (auth.uid() = user_id);

-- Audit log access policy
DROP POLICY IF EXISTS "Users can view audit logs for own certificates" ON public.certificate_audit_logs;
CREATE POLICY "Users can view audit logs for own certificates" ON public.certificate_audit_logs FOR SELECT USING (true);
