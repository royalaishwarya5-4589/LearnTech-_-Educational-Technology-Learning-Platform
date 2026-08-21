import React from 'react';

export type RobotState = 'IDLE' | 'THINKING' | 'HAPPY' | 'WAVING' | 'SPEAKING';

interface RobotMascotProps {
  state?: RobotState;
  size?: number;
  className?: string;
}

export function RobotMascot({ state = 'IDLE', size = 64, className = '' }: RobotMascotProps) {
  const isThinking = state === 'THINKING';
  const isHappy = state === 'HAPPY';
  const isSpeaking = state === 'SPEAKING';

  return (
    <div
      className={`robot-mascot-wrapper ${state.toLowerCase()} ${className}`}
      style={{ width: size, height: size, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: 'visible' }}
      >
        {/* Antenna Beam */}
        <line x1="50" y1="20" x2="50" y2="8" stroke="var(--color-primary, #6366f1)" strokeWidth="3" strokeLinecap="round" />
        <circle
          cx="50"
          cy="6"
          r="4"
          fill={isThinking ? 'var(--color-warning, #f59e0b)' : 'var(--color-primary, #6366f1)'}
          className={isThinking ? 'robot-antenna-pulse' : ''}
        />

        {/* Head Outer */}
        <rect
          x="20"
          y="20"
          width="60"
          height="45"
          rx="12"
          fill="var(--bg-surface-elevated, #1e293b)"
          stroke="var(--border-color, #334155)"
          strokeWidth="2.5"
        />

        {/* Screen/Face */}
        <rect
          x="26"
          y="26"
          width="48"
          height="33"
          rx="8"
          fill="var(--bg-card, #0f172a)"
        />

        {/* Eyes */}
        {isHappy ? (
          <>
            <path d="M35 42 Q40 36 45 42" stroke="var(--color-success, #10b981)" strokeWidth="3" strokeLinecap="round" fill="none" />
            <path d="M55 42 Q60 36 65 42" stroke="var(--color-success, #10b981)" strokeWidth="3" strokeLinecap="round" fill="none" />
          </>
        ) : isThinking ? (
          <>
            <circle cx="40" cy="42" r="4" fill="var(--color-warning, #f59e0b)" className="robot-eye-pulse" />
            <circle cx="60" cy="42" r="4" fill="var(--color-warning, #f59e0b)" className="robot-eye-pulse" />
          </>
        ) : (
          <>
            <circle cx="40" cy="42" r="4" fill="var(--color-primary, #38bdf8)" />
            <circle cx="60" cy="42" r="4" fill="var(--color-primary, #38bdf8)" />
          </>
        )}

        {/* Mouth */}
        {isSpeaking ? (
          <ellipse cx="50" cy="52" rx="6" ry="3" fill="var(--color-primary, #38bdf8)" />
        ) : (
          <line x1="44" y1="52" x2="56" y2="52" stroke="var(--text-muted, #94a3b8)" strokeWidth="2" strokeLinecap="round" />
        )}

        {/* Body Base */}
        <path
          d="M30 68 C30 65, 70 65, 70 68 L76 92 C76 95, 24 95, 24 92 Z"
          fill="var(--bg-surface-elevated, #1e293b)"
          stroke="var(--border-color, #334155)"
          strokeWidth="2.5"
        />

        {/* Core Chest Indicator */}
        <circle
          cx="50"
          cy="80"
          r="5"
          fill={isThinking ? 'var(--color-warning, #f59e0b)' : 'var(--color-primary, #6366f1)'}
          className="robot-chest-core"
        />
      </svg>
    </div>
  );
}
