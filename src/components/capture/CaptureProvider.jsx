import { createContext, useCallback, useContext, useMemo, useState } from 'react';

const CaptureRegistryContext = createContext(null);

export function CaptureProvider({ children }) {
  const [sources, setSources] = useState({ good: '', bad: '' });

  const registerSource = useCallback((variant, source) => {
    if (variant !== 'good' && variant !== 'bad') return;
    const next = source ?? '';
    setSources((prev) => (prev[variant] === next ? prev : { ...prev, [variant]: next }));
  }, []);

  const value = useMemo(() => ({ sources, registerSource }), [sources, registerSource]);

  return <CaptureRegistryContext value={value}>{children}</CaptureRegistryContext>;
}

export function useCaptureSources() {
  const ctx = useContext(CaptureRegistryContext);
  if (!ctx) throw new Error('useCaptureSources must be used within CaptureProvider');
  return ctx.sources;
}

export function useCaptureRegistry() {
  const ctx = useContext(CaptureRegistryContext);
  if (!ctx) throw new Error('useCaptureRegistry must be used within CaptureProvider');
  return ctx;
}
