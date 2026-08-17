import React from 'react';
import { getAllCategories, getAllPaths } from '@/content';
import { PathCatalogClient } from '@/components/Path/PathCatalogClient';

export const metadata = {
  title: 'Multi-Course Catalog | LearnTech Educational Platform',
  description: 'Explore structured technology learning paths across Programming, Computer Science, Web Development, AI, Security, and Career Skills.',
};

export default function PathCatalogPage() {
  const categories = getAllCategories();
  const allPaths = getAllPaths();

  return <PathCatalogClient categories={categories} allPaths={allPaths} />;
}
