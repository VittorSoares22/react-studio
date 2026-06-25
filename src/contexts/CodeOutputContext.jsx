import { createContext, useCallback, useContext, useMemo, useState } from 'react';

const CodeOutputContext = createContext(null);

/** Guarda o código recolhido por cada painel (good / bad) para o output. */
export function CodeOutputProvider({ children }) {
  const [sources, setSources] = useState({ good: '', bad: '' });

  const registerSource = useCallback((variant, source) => {
    if (!source || (variant !== 'good' && variant !== 'bad')) return;
    setSources((prev) => (prev[variant] === source ? prev : { ...prev, [variant]: source }));
  }, []);

  const value = useMemo(() => ({ sources, registerSource }), [sources, registerSource]);

  return <CodeOutputContext value={value}>{children}</CodeOutputContext>;
}

export function useCodeOutput() {
  const ctx = useContext(CodeOutputContext);
  if (!ctx) throw new Error('useCodeOutput must be used within CodeOutputProvider');
  return ctx;
}
