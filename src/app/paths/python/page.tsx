import React from 'react';
import { getPathBySlug } from '@/content';
import { Path } from '@/types/content';
import { PythonPathClient } from '@/components/Path/PythonPathClient';

export const metadata = {
  title: 'Python Developer Mastery Path | LearnTech',
  description: 'Structured Python roadmap from beginner fundamentals to advanced object-oriented design, portfolio projects, and technical interview mastery.',
};

export default function PythonPathPage() {
  const path = getPathBySlug('python') as Path;

  if (!path) {
    return <div className="site-container">Path not found.</div>;
  }

  return <PythonPathClient path={path} />;
}

