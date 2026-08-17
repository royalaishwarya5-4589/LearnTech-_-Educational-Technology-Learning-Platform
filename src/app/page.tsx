import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Badge } from '@/components/Badge';
import { getAllCategories, getPathBySlug } from '@/content';

export default function LandingPage() {
  const categories = getAllCategories();
  const pythonPath = getPathBySlug('python');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '5rem', paddingBottom: '4rem' }}>
      {/* Hero Section */}
      <section
        style={{
          backgroundColor: 'var(--bg-surface)',
          borderBottom: '1px solid var(--border-color)',
          padding: '5rem 0 4rem 0'
        }}
      >
        <div className="site-container">
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <Badge variant="active" size="md">
              Structured Technology Learning Ecosystem
            </Badge>
            <h1
              style={{
                fontSize: '2.75rem',
                fontWeight: 800,
                lineHeight: 1.2,
                marginTop: '1.25rem',
                marginBottom: '1.25rem',
                color: 'var(--text-main)'
              }}
            >
              Master Software Engineering from <span style={{ color: 'var(--accent-primary)' }}>Absolute Beginner</span> to <span style={{ color: 'var(--accent-purple)' }}>Industry Mastery</span>
            </h1>
            <p
              style={{
                fontSize: '1.2rem',
                color: 'var(--text-muted)',
                lineHeight: 1.6,
                marginBottom: '2rem'
              }}
            >
              Follow structured, level-based roadmaps across Programming, Computer Science, Web Development, AI, and Security with active hands-on coding practice.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button href="/paths/python" size="lg" variant="primary">
                🐍 Start Python Path
              </Button>
              <Button href="/paths" size="lg" variant="outline">
                Explore Path Catalog
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Beginner to Advanced Level Progression */}
      <section className="site-container">
        <div className="section-header center">
          <span className="section-tag">Methodology</span>
          <h2 className="section-title">Level-Structured Learning Path Framework</h2>
          <p className="section-subtitle">
            Every course is engineered with a strict 5-stage progression model so you never feel lost or stuck in tutorial hell.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.25rem'
          }}
        >
          {[
            { level: 'Level 1', title: 'Beginner', desc: 'Core syntax, variables, basic input/output, control flow.', icon: '🌱' },
            { level: 'Level 2', title: 'Intermediate', desc: 'Data structures, functions, OOP, error handling.', icon: '🌿' },
            { level: 'Level 3', title: 'Advanced', desc: 'Decorators, generators, memory, performance, async.', icon: '🌳' },
            { level: 'Level 4', title: 'Projects', desc: 'Build full real-world applications with portfolio value.', icon: '🛠️' },
            { level: 'Level 5', title: 'Mastery', desc: 'Top algorithmic patterns & technical interview prep.', icon: '🏆' }
          ].map((item, idx) => (
            <Card key={idx} hoverable={false} style={{ textAlign: 'center', position: 'relative' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{item.icon}</div>
              <Badge variant="level" size="sm">
                {item.level}
              </Badge>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '0.5rem 0' }}>{item.title}</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{item.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Featured Python Path */}
      {pythonPath && (
        <section className="site-container">
          <div className="section-header">
            <span className="section-tag">Featured Course Path</span>
            <h2 className="section-title">Active Path: Python Developer Mastery</h2>
            <p className="section-subtitle">
              Start with Python 3—the most versatile language for software engineering, web development, data science, and AI.
            </p>
          </div>

          <Card style={{ padding: '2rem', borderLeft: '4px solid var(--accent-primary)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '2rem' }}>🐍</span>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 800 }}>{pythonPath.title}</h3>
                  <Badge variant="active">Active Stage 1</Badge>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '700px', marginBottom: '1rem' }}>
                  {pythonPath.description}
                </p>
              </div>

              <Button href="/paths/python" variant="primary" size="md">
                View Python Syllabus →
              </Button>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '1rem',
                marginTop: '1.5rem',
                paddingTop: '1.5rem',
                borderTop: '1px solid var(--border-color)'
              }}
            >
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block' }}>Estimated Hours</span>
                <strong style={{ fontSize: '1.1rem' }}>45 Hours</strong>
              </div>
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block' }}>Total Lessons</span>
                <strong style={{ fontSize: '1.1rem' }}>32 Structured Lessons</strong>
              </div>
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block' }}>Hands-On Projects</span>
                <strong style={{ fontSize: '1.1rem' }}>4 Portfolio Projects</strong>
              </div>
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block' }}>Execution Runtime</span>
                <strong style={{ fontSize: '1.1rem' }}>WebAssembly (Pyodide)</strong>
              </div>
            </div>
          </Card>
        </section>
      )}

      {/* Path Categories Overview */}
      <section className="site-container">
        <div className="section-header">
          <span className="section-tag">Curriculum Scope</span>
          <h2 className="section-title">6 Core Technology Learning Domains</h2>
          <p className="section-subtitle">
            Our multi-path architecture covers the complete lifecycle of computer science and modern software engineering.
          </p>
        </div>

        <div className="card-grid">
          {categories.map((cat) => (
            <Card key={cat.id}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '1.75rem' }}>{cat.icon}</span>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>{cat.title}</h3>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.25rem', height: '3.6rem', overflow: 'hidden' }}>
                {cat.description}
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  {cat.paths.length} {cat.paths.length === 1 ? 'Path' : 'Paths'}
                </span>
                <Link href="/paths" style={{ fontSize: '0.9rem', fontWeight: 600 }}>
                  View Paths →
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* How Learning Works */}
      <section
        style={{
          backgroundColor: 'var(--bg-surface)',
          borderTop: '1px solid var(--border-color)',
          borderBottom: '1px solid var(--border-color)',
          padding: '4rem 0'
        }}
      >
        <div className="site-container">
          <div className="section-header center">
            <span className="section-tag">Learning Experience</span>
            <h2 className="section-title">How You Learn on LearnTech</h2>
            <p className="section-subtitle">
              Combining clear theory with active coding execution and automated validation.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '2rem'
            }}
          >
            <div style={{ textAlign: 'center', padding: '1rem' }}>
              <div
                style={{
                  width: '3rem',
                  height: '3rem',
                  borderRadius: '50%',
                  backgroundColor: 'var(--accent-primary)',
                  color: '#FFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.25rem',
                  fontWeight: 800,
                  margin: '0 auto 1rem auto'
                }}
              >
                1
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>Visual Roadmaps</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                Track your exact position, completed lessons, prerequisites, and milestone gates visually.
              </p>
            </div>

            <div style={{ textAlign: 'center', padding: '1rem' }}>
              <div
                style={{
                  width: '3rem',
                  height: '3rem',
                  borderRadius: '50%',
                  backgroundColor: 'var(--accent-secondary)',
                  color: '#FFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.25rem',
                  fontWeight: 800,
                  margin: '0 auto 1rem auto'
                }}
              >
                2
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>Interactive Workbench</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                Read bite-sized concepts and immediately solve exercises in the embedded Monaco editor.
              </p>
            </div>

            <div style={{ textAlign: 'center', padding: '1rem' }}>
              <div
                style={{
                  width: '3rem',
                  height: '3rem',
                  borderRadius: '50%',
                  backgroundColor: 'var(--accent-purple)',
                  color: '#FFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.25rem',
                  fontWeight: 800,
                  margin: '0 auto 1rem auto'
                }}
              >
                3
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>Automated Validation</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                Run test suites directly in your browser with instant stdout feedback and assertion checks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Practice / Workbench Preview */}
      <section className="site-container">
        <div className="section-header">
          <span className="section-tag">Interactive Environment Preview</span>
          <h2 className="section-title">Distraction-Free Coding Workbench</h2>
          <p className="section-subtitle">
            A clean split view separating lesson concepts, exercise guidance, live editor, and execution output console.
          </p>
        </div>

        <Card style={{ padding: 0, overflow: 'hidden', backgroundColor: 'var(--bg-code)' }}>
          <div
            style={{
              backgroundColor: '#1E293B',
              padding: '0.75rem 1.25rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              color: '#94A3B8',
              fontSize: '0.85rem'
            }}
          >
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#EF4444', display: 'inline-block' }}></span>
              <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#F59E0B', display: 'inline-block' }}></span>
              <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#10B981', display: 'inline-block' }}></span>
            </div>
            <span>Interactive Python Lesson 1: Variables & Data Types</span>
            <span>Pyodide WASM Engine</span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              color: '#F8FAFC'
            }}
          >
            <div style={{ padding: '1.5rem', borderRight: '1px solid #334155' }}>
              <h4 style={{ color: '#60A5FA', marginBottom: '0.5rem' }}>Lesson Concepts & Guidance</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '1rem' }}>
                Variables store data values. In Python, assignment is created using the `=` operator.
              </p>
              <div style={{ background: '#1E293B', padding: '0.75rem', borderRadius: '6px', fontSize: '0.85rem' }}>
                <code>price = 19.99<br />quantity = 3<br />total = price * quantity</code>
              </div>
            </div>

            <div style={{ padding: '1.5rem' }}>
              <h4 style={{ color: '#34D399', marginBottom: '0.5rem' }}>Console Output Window</h4>
              <pre
                style={{
                  backgroundColor: '#020617',
                  padding: '1rem',
                  borderRadius: '6px',
                  color: '#38BDF8',
                  fontSize: '0.85rem',
                  lineHeight: 1.4
                }}
              >
                {`[Execution Engine]: Initializing Pyodide WASM...
> Running solution script...
Total Cost: 59.97
[Test Suite]: Passed 1/1 assertions (100%) ✓`}
              </pre>
            </div>
          </div>
        </Card>
      </section>

      {/* Curated Resources Section */}
      <section className="site-container">
        <div className="section-header">
          <span className="section-tag">Copyright-Safe Curation</span>
          <h2 className="section-title">Direct Links to Official Technical Standards</h2>
          <p className="section-subtitle">
            Rather than copying third-party content, LearnTech references official documentation, PEPs, MDN standards, and RFC specifications.
          </p>
        </div>

        <div className="card-grid">
          {[
            { title: 'Official Python 3 Documentation', source: 'docs.python.org', desc: 'Authoritative standard library reference and standard type specifications.' },
            { title: 'PEP 8 -- Style Guide for Python Code', source: 'peps.python.org', desc: 'Official Python code formatting guidelines and naming conventions.' },
            { title: 'MDN Web Docs', source: 'developer.mozilla.org', desc: 'Industry standard documentation for HTML, CSS, JavaScript, and Web APIs.' },
            { title: 'Python PEP Index', source: 'peps.python.org', desc: 'Python Enhancement Proposals documenting language design proposals.' }
          ].map((res, idx) => (
            <Card key={idx}>
              <Badge variant="roadmap" size="sm">
                {res.source}
              </Badge>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: '0.5rem 0' }}>{res.title}</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{res.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="site-container">
        <Card
          style={{
            backgroundColor: 'var(--bg-surface)',
            border: '2px solid var(--accent-primary)',
            padding: '3.5rem 2rem',
            textAlign: 'center'
          }}
        >
          <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1rem' }}>
            Ready to Begin Your Python Journey?
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto 2rem auto' }}>
            Start with Level 1 Beginner fundamentals and progress step-by-step to advanced Pythonic software engineering.
          </p>
          <Button href="/paths/python" size="lg" variant="primary">
            Start Learning Python Now →
          </Button>
        </Card>
      </section>
    </div>
  );
}
