'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { RobotState } from './RobotMascot';
import { TutorMode, ChatHistoryItem } from '@/lib/ai/prompts';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  mode?: TutorMode;
  isError?: boolean;
  contextSummary?: string;
}

export interface ActiveLessonContext {
  pathSlug?: string;
  lessonSlug?: string;
  code?: string;
  logs?: string;
  title?: string;
}

interface AITutorContextType {
  isOpen: boolean;
  robotState: RobotState;
  messages: ChatMessage[];
  activeContext: ActiveLessonContext;
  isLoading: boolean;
  apiKey: string;
  provider: string;
  model: string;
  setIsOpen: (open: boolean) => void;
  toggleOpen: () => void;
  setApiKey: (key: string) => void;
  setProvider: (provider: string) => void;
  setModel: (model: string) => void;
  updateActiveContext: (ctx: Partial<ActiveLessonContext>) => void;
  sendMessage: (text: string, mode?: TutorMode, isVoiceInput?: boolean) => Promise<void>;
  clearMessages: () => void;
}

const AITutorContext = createContext<AITutorContextType>({
  isOpen: false,
  robotState: 'IDLE',
  messages: [],
  activeContext: {},
  isLoading: false,
  apiKey: '',
  provider: 'auto',
  model: 'gemini-1.5-flash',
  setIsOpen: () => {},
  toggleOpen: () => {},
  setApiKey: () => {},
  setProvider: () => {},
  setModel: () => {},
  updateActiveContext: () => {},
  sendMessage: async () => {},
  clearMessages: () => {},
});

const STORAGE_KEY_API_KEY = 'learntech_ai_api_key';
const STORAGE_KEY_PROVIDER = 'learntech_ai_provider';

export function AITutorProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [robotState, setRobotState] = useState<RobotState>('IDLE');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [activeContext, setActiveContext] = useState<ActiveLessonContext>({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKeyInternal] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(STORAGE_KEY_API_KEY) || '';
    }
    return '';
  });
  const [provider, setProviderInternal] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(STORAGE_KEY_PROVIDER) || 'auto';
    }
    return 'auto';
  });
  const [model, setModel] = useState('gemini-1.5-flash');

  const setApiKey = useCallback((key: string) => {
    setApiKeyInternal(key);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY_API_KEY, key);
    }
  }, []);

  const setProvider = useCallback((prov: string) => {
    setProviderInternal(prov);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY_PROVIDER, prov);
    }
  }, []);

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => {
      const next = !prev;
      if (next) setRobotState('HAPPY');
      else setRobotState('IDLE');
      return next;
    });
  }, []);

  const updateActiveContext = useCallback((ctx: Partial<ActiveLessonContext>) => {
    setActiveContext((prev) => ({ ...prev, ...ctx }));
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
    setRobotState('IDLE');
  }, []);

  const sendMessage = useCallback(
    async (text: string, mode: TutorMode = 'TUTOR', isVoiceInput: boolean = false) => {
      const trimmed = text.trim();
      if (!trimmed || isLoading) return;

      const userMsg: ChatMessage = {
        id: `msg_user_${Date.now()}`,
        role: 'user',
        content: trimmed,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        mode,
      };

      setMessages((prev) => [...prev, userMsg]);
      setIsLoading(true);
      setRobotState('THINKING');

      try {
        const historyPayload: ChatHistoryItem[] = messages.slice(-8).map((m) => ({
          role: m.role,
          content: m.content,
        }));

        const response = await fetch('/api/ai-tutor', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: trimmed,
            mode,
            pathSlug: activeContext.pathSlug,
            lessonSlug: activeContext.lessonSlug,
            code: activeContext.code,
            consoleOutput: activeContext.logs,
            history: historyPayload,
            apiKey,
            provider,
            model,
            isVoiceMode: isVoiceInput,
          }),
        });

        const data = await response.json();

        if (!data.success || !data.message) {
          const errorMsg: ChatMessage = {
            id: `msg_err_${Date.now()}`,
            role: 'assistant',
            content: data.error || 'The AI Tutor encountered a connection error. Please try again.',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isError: true,
          };
          setMessages((prev) => [...prev, errorMsg]);
          setRobotState('IDLE');
          return;
        }

        const assistantMsg: ChatMessage = {
          id: `msg_ast_${Date.now()}`,
          role: 'assistant',
          content: data.message,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          contextSummary: data.contextSummary,
        };

        setMessages((prev) => [...prev, assistantMsg]);
        setRobotState('HAPPY');
      } catch (err) {
        console.error('[AI Tutor Context] Send error:', err);
        const errorMsg: ChatMessage = {
          id: `msg_err_${Date.now()}`,
          role: 'assistant',
          content: 'Network connection issue. Please verify your internet connection and try again.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isError: true,
        };
        setMessages((prev) => [...prev, errorMsg]);
        setRobotState('IDLE');
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, messages, activeContext, apiKey, provider, model]
  );

  return (
    <AITutorContext.Provider
      value={{
        isOpen,
        robotState,
        messages,
        activeContext,
        isLoading,
        apiKey,
        provider,
        model,
        setIsOpen,
        toggleOpen,
        setApiKey,
        setProvider,
        setModel,
        updateActiveContext,
        sendMessage,
        clearMessages,
      }}
    >
      {children}
    </AITutorContext.Provider>
  );
}

export function useAITutor() {
  return useContext(AITutorContext);
}
