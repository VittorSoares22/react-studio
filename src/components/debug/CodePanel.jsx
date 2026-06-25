export default function CodePanel({ source }) {
  if (!source) {
    return (
      <p className="m-0 rounded-xl border border-dashed border-border px-4 py-8 text-center text-sm text-muted">
        Aguardando código do playground…
      </p>
    );
  }

  const lines = source.split('\n');

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface">
      <pre className="m-0 max-h-[28rem] overflow-auto bg-bg p-0 text-[0.8125rem] leading-relaxed">
        {lines.map((line, index) => {
          const lineNumber = index + 1;
          return (
            <div key={lineNumber} className="flex hover:bg-surface-hover/50">
              <span className="w-10 shrink-0 select-none border-r border-border py-0.5 pr-3 text-right font-mono text-xs text-muted">
                {lineNumber}
              </span>
              <code className="block flex-1 overflow-x-auto px-4 py-0.5 font-mono text-text">
                {line || ' '}
              </code>
            </div>
          );
        })}
      </pre>
    </div>
  );
}
