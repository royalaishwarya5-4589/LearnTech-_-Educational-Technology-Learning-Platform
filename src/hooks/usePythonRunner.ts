'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { LogEntry, LogType, ExecutionResult, ValidationResult } from '@/types/runner';
import { CodingExercise } from '@/types/content';

const EXECUTION_TIMEOUT_MS = 5000;

export function usePythonRunner() {
  const [isReady, setIsReady] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState<LogEntry[]>([]);

  const workerRef = useRef<Worker | null>(null);
  const workerInstanceIdRef = useRef<number>(0);

  const activePromiseRef = useRef<{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolve: (val: any) => void;
    reject: (err: Error) => void;
    timer: NodeJS.Timeout;
    instanceId: number;
  } | null>(null);

  const addLog = useCallback((type: LogType, text: string) => {
    setLogs((prev) => [
      ...prev,
      {
        id: Math.random().toString(36).substring(2, 9),
        type,
        text,
        timestamp: Date.now(),
      },
    ]);
  }, []);

  const clearLogs = useCallback(() => {
    setLogs([]);
  }, []);

  const terminateWorker = useCallback(() => {
    if (activePromiseRef.current) {
      clearTimeout(activePromiseRef.current.timer);
      activePromiseRef.current = null;
    }
    if (workerRef.current) {
      workerRef.current.terminate();
      workerRef.current = null;
    }
  }, []);

  const startWorker = useCallback(() => {
    if (typeof window === 'undefined') return;

    terminateWorker();
    const currentInstanceId = ++workerInstanceIdRef.current;

    setIsReady(false);
    setIsRunning(false);

    try {
      addLog('system', 'Initializing Python 3.11 engine (Pyodide)...');
      const worker = new Worker('/pyodide.worker.js');

      worker.onmessage = (event: MessageEvent) => {
        if (workerInstanceIdRef.current !== currentInstanceId) return;

        const { type, text, success, output, error, executionTimeMs, results, totalPassed, totalCases } = event.data;

        if (type === 'ready') {
          setIsReady(true);
          addLog('system', 'Python 3.11 engine (Pyodide) is ready.');
          return;
        }

        if (type === 'stdout') {
          addLog('stdout', text);
          return;
        }

        if (type === 'stderr') {
          addLog('stderr', text);
          return;
        }

        if (type === 'result') {
          if (activePromiseRef.current && activePromiseRef.current.instanceId === currentInstanceId) {
            clearTimeout(activePromiseRef.current.timer);
            const { resolve } = activePromiseRef.current;
            activePromiseRef.current = null;
            setIsRunning(false);

            if (success) {
              addLog('system', `Execution completed in ${executionTimeMs}ms.`);
            } else {
              addLog('error', error || 'Execution error');
            }
            resolve({ success, output: output || '', error, executionTimeMs });
          }
          return;
        }

        if (type === 'validation_result') {
          if (activePromiseRef.current && activePromiseRef.current.instanceId === currentInstanceId) {
            clearTimeout(activePromiseRef.current.timer);
            const { resolve } = activePromiseRef.current;
            activePromiseRef.current = null;
            setIsRunning(false);

            if (success) {
              addLog('success', `All ${totalCases} test cases passed! (${executionTimeMs}ms)`);
            } else {
              addLog('error', `Validation failed: ${totalPassed}/${totalCases} test cases passed.`);
            }
            resolve({
              success,
              totalPassed,
              totalCases,
              results: results || [],
              executionTimeMs,
              error,
            });
          }
          return;
        }
      };

      worker.onerror = (err) => {
        if (workerInstanceIdRef.current !== currentInstanceId) return;
        addLog('error', `Worker Error: ${err.message}`);
        if (activePromiseRef.current) {
          clearTimeout(activePromiseRef.current.timer);
          const { reject } = activePromiseRef.current;
          activePromiseRef.current = null;
          setIsRunning(false);
          reject(new Error(err.message));
        }
      };

      workerRef.current = worker;
      worker.postMessage({ type: 'init' });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      addLog('error', `Failed to start Python worker: ${msg}`);
    }
  }, [addLog, terminateWorker]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    startWorker();
    return () => {
      terminateWorker();
    };
  }, [startWorker, terminateWorker]);

  const handleTimeout = useCallback(() => {
    const currentInstance = activePromiseRef.current;
    if (currentInstance) {
      clearTimeout(currentInstance.timer);
      const { resolve } = currentInstance;
      activePromiseRef.current = null;

      addLog('error', 'Execution timed out (5s limit exceeded). Possible infinite loop detected.');

      resolve({
        success: false,
        output: '',
        error: 'Execution timed out (5s limit exceeded). Possible infinite loop detected.',
        executionTimeMs: EXECUTION_TIMEOUT_MS,
      });
    }

    setIsRunning(false);
    setIsReady(false);
    startWorker();
  }, [addLog, startWorker]);

  const runCode = useCallback(
    (code: string): Promise<ExecutionResult> => {
      return new Promise((resolve, reject) => {
        if (!workerRef.current || !isReady) {
          addLog('error', 'Python worker is not ready.');
          return resolve({
            success: false,
            output: '',
            error: 'Python engine is loading or unavailable.',
            executionTimeMs: 0,
          });
        }

        setIsRunning(true);
        addLog('system', 'Executing code...');

        const instanceId = workerInstanceIdRef.current;
        const timer = setTimeout(() => {
          handleTimeout();
        }, EXECUTION_TIMEOUT_MS);

        activePromiseRef.current = {
          resolve,
          reject,
          timer,
          instanceId,
        };

        const id = Math.random().toString(36).substring(2, 9);
        workerRef.current.postMessage({ type: 'run', id, code });
      });
    },
    [isReady, addLog, handleTimeout]
  );

  const validateExercise = useCallback(
    (code: string, exercise: CodingExercise): Promise<ValidationResult> => {
      return new Promise((resolve, reject) => {
        if (!workerRef.current || !isReady) {
          addLog('error', 'Python worker is not ready.');
          return resolve({
            success: false,
            totalPassed: 0,
            totalCases: exercise.testCases.length,
            results: [],
            executionTimeMs: 0,
            error: 'Python engine is loading or unavailable.',
          });
        }

        setIsRunning(true);
        addLog('system', `Validating solution against ${exercise.testCases.length} test cases...`);

        const instanceId = workerInstanceIdRef.current;
        const timer = setTimeout(() => {
          handleTimeout();
        }, EXECUTION_TIMEOUT_MS);

        activePromiseRef.current = {
          resolve,
          reject,
          timer,
          instanceId,
        };

        const id = Math.random().toString(36).substring(2, 9);
        workerRef.current.postMessage({
          type: 'validate',
          id,
          code,
          validationType: exercise.validationType || 'stdout',
          testCases: exercise.testCases,
          functionName: exercise.functionName,
        });
      });
    },
    [isReady, addLog, handleTimeout]
  );

  return {
    isReady,
    isRunning,
    logs,
    addLog,
    clearLogs,
    runCode,
    validateExercise,
    resetWorker: startWorker,
  };
}
