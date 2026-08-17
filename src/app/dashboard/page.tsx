import React from 'react';
import { getUserDashboardData } from '@/app/actions/progress';
import { redirect } from 'next/navigation';
import { DashboardOverview } from '@/components/Dashboard/DashboardOverview';
import { MasteryOverview } from '@/components/Dashboard/MasteryOverview';
import { PathProgressCard } from '@/components/Dashboard/PathProgressCard';
import { ProjectsProgressOverview } from '@/components/Dashboard/ProjectsProgressOverview';
import { RecentActivityList } from '@/components/Dashboard/RecentActivityList';
import { AchievementsList } from '@/components/Dashboard/AchievementsList';
import { SubmissionsList } from '@/components/Dashboard/SubmissionsList';
import { AssessmentOverview } from '@/components/Dashboard/AssessmentOverview';
import { CertificateWall } from '@/components/Certificate/CertificateWall';

export const metadata = {
  title: 'Learner Dashboard | LearnTech',
  description: 'Track your overall technology learning progress, mastery, projects, streak, and achievements.',
};

export default async function DashboardPage() {
  const stats = await getUserDashboardData();

  if (!stats) {
    redirect('/login');
  }

  return (
    <div className="site-container" style={{ padding: '2rem 1rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
          Learner Dashboard
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          Track your overall mastery, active learning paths, portfolio projects, and achievements.
        </p>
      </div>

      <DashboardOverview stats={stats} />

      <CertificateWall certificates={stats.userCertificates || []} />

      <MasteryOverview stats={stats} />

      <AssessmentOverview
        attempts={stats.recentAssessmentAttempts || []}
        eligibilityMap={stats.certificationEligibilityMap || {}}
      />

      {stats.pathProgress.map((prog) => (
        <PathProgressCard key={prog.pathSlug} pathProgress={prog} />
      ))}

      <ProjectsProgressOverview projectProgressMap={stats.projectProgressMap || {}} />

      <AchievementsList achievements={stats.achievements || []} />

      <RecentActivityList activity={stats.recentActivity || []} />

      <SubmissionsList submissions={stats.recentSubmissions} />
    </div>
  );
}
