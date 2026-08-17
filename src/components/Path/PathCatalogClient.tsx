'use client';

import React, { useState } from 'react';
import { Card } from '@/components/Card';
import { Badge } from '@/components/Badge';
import { Button } from '@/components/Button';
import { CategorySummary, PathSummary } from '@/content/paths';

interface PathCatalogClientProps {
  categories: CategorySummary[];
  allPaths: PathSummary[];
}

export function PathCatalogClient({ categories, allPaths }: PathCatalogClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const filteredPaths = allPaths.filter((path) => {
    const matchesSearch =
      path.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      path.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      path.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'all' || path.category === selectedCategory;
    const matchesStatus =
      selectedStatus === 'all' ||
      (selectedStatus === 'active' && path.isActive) ||
      (selectedStatus === 'coming_soon' && !path.isActive);

    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="site-container" style={{ padding: '3rem 1.5rem 5rem 1.5rem' }}>
      {/* Header Banner */}
      <div className="section-header" style={{ marginBottom: '2.5rem' }}>
        <span className="section-tag">Interactive Tech Curricula</span>
        <h1 className="section-title">Industry-Grade Learning Paths</h1>
        <p className="section-subtitle">
          Master real-world software engineering, systems design, web development, AI, and cybersecurity through structured Level 1–3 curricula, hands-on coding exercises, and portfolio projects.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div
        style={{
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.5rem',
          marginBottom: '3rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ flex: 1, minWidth: '280px', position: 'relative' }}>
            <input
              type="text"
              placeholder="🔍 Search 15+ engineering courses by title, technology, or topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.8rem 1rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-app)',
                color: 'var(--text-main)',
                fontSize: '0.95rem',
              }}
            />
          </div>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            style={{
              padding: '0.8rem 1rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              backgroundColor: 'var(--bg-app)',
              color: 'var(--text-main)',
              fontSize: '0.95rem',
              cursor: 'pointer',
              fontWeight: 600,
            }}
          >
            <option value="all">All Courses ({allPaths.length})</option>
            <option value="active">Active Courses ({allPaths.filter((p) => p.isActive).length})</option>
            <option value="coming_soon">Upcoming Roadmap ({allPaths.filter((p) => !p.isActive).length})</option>
          </select>
        </div>

        {/* Category Pills */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', marginRight: '0.5rem' }}>
            Categories:
          </span>
          <button
            onClick={() => setSelectedCategory('all')}
            style={{
              padding: '0.45rem 0.95rem',
              borderRadius: '20px',
              border: selectedCategory === 'all' ? '1px solid var(--accent-primary)' : '1px solid var(--border-color)',
              backgroundColor: selectedCategory === 'all' ? 'var(--accent-primary)' : 'var(--bg-app)',
              color: selectedCategory === 'all' ? '#ffffff' : 'var(--text-main)',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            🌟 All Categories
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              style={{
                padding: '0.45rem 0.95rem',
                borderRadius: '20px',
                border: selectedCategory === cat.id ? '1px solid var(--accent-primary)' : '1px solid var(--border-color)',
                backgroundColor: selectedCategory === cat.id ? 'var(--accent-primary)' : 'var(--bg-app)',
                color: selectedCategory === cat.id ? '#ffffff' : 'var(--text-main)',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {cat.icon} {cat.title}
            </button>
          ))}
        </div>
      </div>

      {/* Course Cards Grid */}
      {filteredPaths.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            padding: '5rem 1rem',
            backgroundColor: 'var(--bg-surface)',
            borderRadius: 'var(--radius-lg)',
            border: '1px dashed var(--border-color)',
          }}
        >
          <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '1rem' }}>🔎</span>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>No matching courses found</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Try adjusting your search query or switching category filters.
          </p>
        </div>
      ) : (
        <div className="card-grid">
          {filteredPaths.map((path) => (
            <Card
              key={path.id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                backgroundColor: 'var(--bg-surface)',
                border: path.isActive ? '1px solid var(--border-color)' : '1px solid var(--border-color)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.75rem',
                position: 'relative',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              }}
            >
              <div>
                {/* Badge Row */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <span style={{ fontSize: '2.2rem' }}>{path.icon}</span>
                  <div style={{ display: 'flex', gap: '0.4rem' }}>
                    <Badge variant={path.isActive ? 'active' : 'roadmap'}>
                      {path.badgeText}
                    </Badge>
                  </div>
                </div>

                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--text-main)', lineHeight: 1.3 }}>
                  {path.title}
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.25rem', lineHeight: 1.5 }}>
                  {path.subtitle}
                </p>
              </div>

              <div>
                {/* Course Quick Stats Grid */}
                <div
                  style={{
                    backgroundColor: 'var(--bg-app)',
                    borderRadius: 'var(--radius-md)',
                    padding: '0.85rem 1rem',
                    marginBottom: '1.25rem',
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '0.5rem',
                    fontSize: '0.8rem',
                    color: 'var(--text-muted)',
                    border: '1px solid var(--border-color)',
                  }}
                >
                  <div>⏱️ <strong>{path.estimatedHours} Hours</strong></div>
                  <div>📚 <strong>{path.totalLessons} Lessons</strong></div>
                  <div>🛠️ <strong>3 Levels (1–3)</strong></div>
                  <div>📜 <strong>Certificate</strong></div>
                </div>

                {path.isActive ? (
                  <Button href={`/paths/${path.slug}`} variant="primary" size="sm" style={{ width: '100%', fontWeight: 700 }}>
                    Start Learning Journey →
                  </Button>
                ) : (
                  <Button variant="outline" size="sm" disabled style={{ width: '100%', opacity: 0.6, cursor: 'not-allowed' }}>
                    Roadmap Item (Coming Soon)
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

