'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';

export interface WebSpeechRecognitionEvent {
  results: Array<Array<{ transcript: string }>>;
}

export interface WebSpeechRecognitionErrorEvent {
  error: string;
}

export interface WebSpeechRecognition {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onstart: (() => void) | null;
  onend: (() => void) | null;
  onerror: ((event: WebSpeechRecognitionErrorEvent) => void) | null;
  onresult: ((event: WebSpeechRecognitionEvent) => void) | null;
}

declare global {
  interface Window {
    SpeechRecognition?: new () => WebSpeechRecognition;
    webkitSpeechRecognition?: new () => WebSpeechRecognition;
  }
}

interface VoiceAgentProps {
  onSpeechInput: (text: string) => void;
}

export function VoiceAgent({ onSpeechInput }: VoiceAgentProps) {
  const [isListening, setIsListening] = useState(false);
  const [isSupported] = useState(() => {
    if (typeof window !== 'undefined') {
      return Boolean(window.SpeechRecognition || window.webkitSpeechRecognition);
    }
    return false;
  });
  const recognitionRef = useRef<WebSpeechRecognition | null>(null);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // Ignore stop errors
      }
      recognitionRef.current = null;
    }
    setIsListening(false);
  }, []);

  const startListening = useCallback(() => {
    if (typeof window === 'undefined') return;
    const SpeechRecognitionClass = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognitionClass) return;

    try {
      const recognition = new SpeechRecognitionClass();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (e: WebSpeechRecognitionEvent) => {
        const transcript = e.results[0]?.[0]?.transcript;
        if (transcript && transcript.trim()) {
          onSpeechInput(transcript.trim());
        }
        stopListening();
      };

      recognition.onerror = () => {
        stopListening();
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch {
      setIsListening(false);
    }
  }, [onSpeechInput, stopListening]);

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  if (!isSupported) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={toggleListening}
      className={`btn-interactive ${isListening ? 'voice-active' : ''}`}
      style={{
        padding: '0.45rem 0.75rem',
        borderRadius: 'var(--radius-md, 6px)',
        border: '1px solid var(--border-color, #334155)',
        backgroundColor: isListening ? 'var(--color-danger, #ef4444)' : 'var(--bg-surface-elevated, #1e293b)',
        color: isListening ? '#ffffff' : 'var(--text-main, #f8fafc)',
        fontSize: '0.8rem',
        fontWeight: 600,
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.4rem',
        cursor: 'pointer',
        transition: 'all 150ms ease',
      }}
      title={isListening ? 'Stop Listening' : 'Click to Speak'}
    >
      <span>{isListening ? '🔴 Stop' : '🎙️ Voice'}</span>
    </button>
  );
}
