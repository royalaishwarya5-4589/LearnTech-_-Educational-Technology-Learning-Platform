'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/components/Auth/AuthProvider';
import { ProjectProgress } from '@/types/user';
import { Project } from '@/types/content';
import { fetchProjectProgress, saveProjectProgress, migrateGuestProjects } from '@/app/actions/progress';
import { recordGuestActivity } from '@/lib/streak';

const LOCAL_PROJECTS_KEY = 'learntech_guest_projects';

export function useProjectProgress(pathSlug: string, project: Project) {
  const { user } = useAuth();
  const [projectProgress, setProjectProgress] = useState<ProjectProgress>({
    path_slug: pathSlug,
    project_slug: project.slug,
    status: 'not_started',
    completed_milestones: [],
    progress_percent: 0,
  });
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncSource, setSyncSource] = useState<'cloud' | 'local' | 'failed'>('local');

  // Load project progress on mount or auth change
  useEffect(() => {
    let isMounted = true;

    async function loadProgress() {
      setIsSyncing(true);

      if (user) {
        setSyncSource('cloud');
        // Check for guest project progress to migrate first
        try {
          const guestStr = localStorage.getItem(LOCAL_PROJECTS_KEY);
          if (guestStr) {
            const guestMap = JSON.parse(guestStr) as Record<string, ProjectProgress>;
            const guestList = Object.values(guestMap);
            if (guestList.length > 0) {
              const res = await migrateGuestProjects(guestList);
              if (res?.success) {
                localStorage.removeItem(LOCAL_PROJECTS_KEY);
              }
            }
          }
        } catch {
          // Ignore storage errors
        }

        try {
          const cloudRec = await fetchProjectProgress(pathSlug, project.slug);
          if (isMounted && cloudRec) {
            setProjectProgress(cloudRec);
          }
        } catch {
          if (isMounted) setSyncSource('failed');
        }
      } else {
        setSyncSource('local');
        try {
          const guestStr = localStorage.getItem(LOCAL_PROJECTS_KEY);
          if (guestStr) {
            const guestMap = JSON.parse(guestStr) as Record<string, ProjectProgress>;
            const key = `${pathSlug}:${project.slug}`;
            if (guestMap[key] && isMounted) {
              setProjectProgress(guestMap[key]);
            }
          }
        } catch {
          // Ignore storage errors
        }
      }

      if (isMounted) setIsSyncing(false);
    }

    loadProgress();

    return () => {
      isMounted = false;
    };
  }, [user, pathSlug, project.slug]);

  // Toggle milestone completion
  const toggleMilestone = useCallback(async (milestoneId: string) => {
    const totalMilestones = project.milestones.length;
    let updatedMilestones: string[];

    if (projectProgress.completed_milestones.includes(milestoneId)) {
      updatedMilestones = projectProgress.completed_milestones.filter((id) => id !== milestoneId);
    } else {
      updatedMilestones = [...projectProgress.completed_milestones, milestoneId];
    }

    const isComplete = totalMilestones > 0 && updatedMilestones.length >= totalMilestones;
    const progressPercent = totalMilestones > 0 ? Math.round((updatedMilestones.length / totalMilestones) * 100) : 0;
    const status: 'not_started' | 'in_progress' | 'completed' = isComplete
      ? 'completed'
      : (updatedMilestones.length > 0 ? 'in_progress' : 'not_started');

    const updatedState: ProjectProgress = {
      ...projectProgress,
      completed_milestones: updatedMilestones,
      progress_percent: progressPercent,
      status,
      completed_at: isComplete ? new Date().toISOString() : null,
      updated_at: new Date().toISOString(),
    };

    setProjectProgress(updatedState);

    if (user) {
      setSyncSource('cloud');
      setIsSyncing(true);
      try {
        await saveProjectProgress(pathSlug, project.slug, updatedMilestones, totalMilestones);
      } catch {
        setSyncSource('failed');
      } finally {
        setIsSyncing(false);
      }
    } else {
      setSyncSource('local');
      try {
        recordGuestActivity();
        const guestStr = localStorage.getItem(LOCAL_PROJECTS_KEY);
        const guestMap: Record<string, ProjectProgress> = guestStr ? JSON.parse(guestStr) : {};
        const key = `${pathSlug}:${project.slug}`;
        guestMap[key] = updatedState;
        localStorage.setItem(LOCAL_PROJECTS_KEY, JSON.stringify(guestMap));
      } catch {
        // Ignore storage error
      }
    }
  }, [user, pathSlug, project.slug, project.milestones.length, projectProgress]);

  // Complete all milestones
  const completeAllMilestones = useCallback(async () => {
    const allMilestoneIds = project.milestones.map((m) => m.id);
    const updatedState: ProjectProgress = {
      ...projectProgress,
      completed_milestones: allMilestoneIds,
      progress_percent: 100,
      status: 'completed',
      completed_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    setProjectProgress(updatedState);

    if (user) {
      setSyncSource('cloud');
      setIsSyncing(true);
      try {
        await saveProjectProgress(pathSlug, project.slug, allMilestoneIds, project.milestones.length);
      } catch {
        setSyncSource('failed');
      } finally {
        setIsSyncing(false);
      }
    } else {
      setSyncSource('local');
      try {
        recordGuestActivity();
        const guestStr = localStorage.getItem(LOCAL_PROJECTS_KEY);
        const guestMap: Record<string, ProjectProgress> = guestStr ? JSON.parse(guestStr) : {};
        const key = `${pathSlug}:${project.slug}`;
        guestMap[key] = updatedState;
        localStorage.setItem(LOCAL_PROJECTS_KEY, JSON.stringify(guestMap));
      } catch {
        // Ignore storage error
      }
    }
  }, [user, pathSlug, project, projectProgress]);

  return {
    projectProgress,
    isSyncing,
    syncSource,
    toggleMilestone,
    completeAllMilestones,
  };
}
