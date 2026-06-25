import { useEffect } from 'react';
import { useCodeOutput } from '../../contexts/CodeOutputContext.jsx';

/** @param {string} fullSource @returns {string} */
function toCaptureSource(fullSource) {
  if (!fullSource) return '';

  const withoutImports = fullSource
    .split('\n')
    .filter((line) => !/^\s*import\s/.test(line))
    .join('\n')
    .trim();

  return withoutImports
    .replace(/^export\s+default\s+function\s+\w+\s*\(\)\s*\{?\s*\n?/, '')
    .replace(/\n?\}\s*;?\s*$/, '')
    .trim();
}

/** * Envolve o demo no HTML e regista só o corpo do exemplo (sem imports/export)
 * para o painel de código.
 */
export default function CodeCapture({ variant, source, children }) {
  const { registerSource } = useCodeOutput();
  const raw = source ?? (typeof children === 'string' ? children : '');
  const code = toCaptureSource(raw);

  useEffect(() => {
    if (code) registerSource(variant, code);
  }, [variant, code, registerSource]);

  if (typeof children === 'string') return null;

  return <div className="h-full">{children}</div>;
}
