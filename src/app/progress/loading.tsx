import React from 'react';

export default function ProgressLoading() {
  return (
    <div className="site-container" style={{ padding: '3rem 1rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ height: '1.25rem', width: '120px', backgroundColor: 'var(--bg-muted)', borderRadius: '4px', marginBottom: '0.5rem' }} />
        <div style={{ height: '2rem', width: '350px', backgroundColor: 'var(--bg-muted)', borderRadius: '6px', marginBottom: '0.5rem' }} />
        <div style={{ height: '1rem', width: '60%', backgroundColor: 'var(--bg-muted)', borderRadius: '4px' }} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} style={{ height: '120px', backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }} />
        ))}
      </div>
    </div>
  );
}
