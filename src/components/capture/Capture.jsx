import { useLayoutEffect } from 'react';
import { CaptureProvider, useCaptureRegistry, useCaptureSources } from './CaptureProvider.jsx';
import { extractCapturedSource } from './parseCaptureSource.ts';

export { CaptureProvider, useCaptureSources };

/** Marcador no source raw — a linha seguinte é a que o painel mostra. */
export function capture() {}

export function Capture({ children }) {
  return children;
}

export default function CodeCapture({ variant, source, children }) {
  const { registerSource } = useCaptureRegistry();

  useLayoutEffect(() => {
    registerSource(variant, extractCapturedSource(source ?? ''));
    return () => registerSource(variant, '');
  }, [variant, source, registerSource]);

  if (typeof children === 'string') return null;

  return <div className="h-full">{children}</div>;
}
