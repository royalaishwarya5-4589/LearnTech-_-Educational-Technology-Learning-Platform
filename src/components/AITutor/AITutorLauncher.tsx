'use client';

import React, { useState } from 'react';
import { RobotMascot } from './RobotMascot';
import { useAITutor } from './AITutorContext';

export function AITutorLauncher() {
  const { isOpen, robotState, toggleOpen } = useAITutor();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="ai-tutor-launcher-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'fixed',
        right: '24px',
        bottom: '16px',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        pointerEvents: 'none',
      }}
    >
      {/* Tooltip */}
      {isHovered && !isOpen && (
        <div
          className="ai-tutor-tooltip"
          role="tooltip"
          style={{
            pointerEvents: 'auto',
            marginBottom: '8px',
            marginRight: '6px',
            backgroundColor: 'var(--bg-surface, #0f172a)',
            color: 'var(--text-main, #f8fafc)',
            border: '1px solid var(--border-color, #334155)',
            boxShadow: 'var(--shadow-md, 0 4px 6px -1px rgba(0, 0, 0, 0.3))',
            borderRadius: 'var(--radius-md, 6px)',
            padding: '0.45rem 0.85rem',
            fontSize: '0.825rem',
            fontWeight: 600,
            whiteSpace: 'nowrap',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            animation: 'fadeInUp 180ms ease-out forwards',
          }}
        >
          <span>🤖 Ask LearnTech AI Tutor & Debugger</span>
        </div>
      )}

      {/* Robot Button */}
      <button
        type="button"
        className="ai-tutor-robot-btn btn-interactive"
        onClick={toggleOpen}
        aria-label={isOpen ? 'Close AI Tutor Panel' : 'Open LearnTech AI Tutor & Debugger'}
        style={{
          pointerEvents: 'auto',
          background: 'none',
          border: 'none',
          padding: 0,
          margin: 0,
          cursor: 'pointer',
          outline: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          filter: 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.4))',
          transition: 'transform 200ms ease',
          transform: isHovered ? 'scale(1.08)' : 'scale(1)',
        }}
      >
        <RobotMascot state={robotState} size={64} />
      </button>
    </div>
  );
}
