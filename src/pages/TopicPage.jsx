import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CodeCapture, { CaptureProvider, useCaptureSources } from '../components/capture/Capture.jsx';
import CodePanel from '../components/debug/CodePanel.jsx';
import RiskScenarioNav from '../components/playground/RiskScenarioNav.jsx';
import { useScenarioData } from '../modules/useScenarioData.ts';
import hooks from '../reference/hooks/js/useState/scenarios/index.ts';

function findItem(moduleId, itemId) {
  if (moduleId !== hooks.id) return null;

  for (const category of hooks.categories) {
    const item = category.items.find((entry) => entry.id === itemId);
    if (item) return { module: hooks, category, item };
  }

  return null;
}

export default function TopicPage() {
  const { lang, moduleId, itemId } = useParams();
  const match = findItem(moduleId, itemId);
  const scenarios = match?.item?.playground?.scenarios ?? [];
  const topicKey = `${lang}/${moduleId}/${itemId}`;

  const [scenarioId, setScenarioId] = useState(scenarios[0]?.id ?? null);
  const [codeVariant, setCodeVariant] = useState('good');
  const example = useScenarioData(lang, moduleId, itemId, scenarioId, codeVariant);

  useEffect(() => {
    setScenarioId(scenarios[0]?.id ?? null);
  }, [topicKey, scenarios[0]?.id]);

  if (!match) {
    return (
      <article className="mx-auto flex max-w-4xl flex-col gap-3">
        <h1 className="text-2xl font-bold">Tópico não encontrado</h1>
        <p className="text-muted">Verifique a URL ou escolha um item na sidebar.</p>
      </article>
    );
  }

  const { module, category, item } = match;
  const activeScenario = scenarios.find((s) => s.id === scenarioId) ?? scenarios[0];

  return (
    <CaptureProvider key={`${topicKey}-${scenarioId ?? ''}-${codeVariant}`}>
      <article className="mx-auto flex w-full max-w-5xl flex-col gap-10">
        <header className="flex flex-col gap-3 border-b border-border pb-6">
          <p className="m-0 text-sm text-muted">
            {module.label} / {category.label}
          </p>
          <h1 className="m-0 flex flex-wrap items-center gap-2 text-3xl font-bold tracking-tight">
            {item.label}
            {item.deprecated && (
              <span className="rounded-full bg-amber-500/15 px-2 py-0.5 text-xs font-medium text-amber-600 dark:text-amber-400">
                deprecated
              </span>
            )}
          </h1>
          <ul className="m-0 list-disc space-y-1 pl-5 text-sm leading-relaxed text-muted">
            {item.description.split('\n').map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </header>

        <section className="flex flex-col gap-4">
          <h2 className="m-0 text-xl font-semibold tracking-tight">Playground</h2>
          <RiskScenarioNav
            scenarios={scenarios}
            activeId={activeScenario.id}
            onSelect={setScenarioId}
          />
          {activeScenario.description ? (
            <p className="m-0 text-sm leading-relaxed text-muted">{activeScenario.description}</p>
          ) : null}
          <div className="grid gap-4 lg:grid-cols-2">
            <PlaygroundPanel
              variant="good"
              meta={activeScenario.good}
              scenarioLabel={activeScenario.label}
              example={codeVariant === 'good' ? example : null}
              active={codeVariant === 'good'}
              onSelect={() => setCodeVariant('good')}
            />
            <PlaygroundPanel
              variant="bad"
              meta={activeScenario.bad}
              scenarioLabel={activeScenario.label}
              example={codeVariant === 'bad' ? example : null}
              active={codeVariant === 'bad'}
              onSelect={() => setCodeVariant('bad')}
            />
          </div>
        </section>
        <CapturePanel codeVariant={codeVariant} />
      </article>
    </CaptureProvider>
  );
}

function CapturePanel({ codeVariant }) {
  const sources = useCaptureSources();
  return <CodePanel key={codeVariant} source={sources[codeVariant] ?? ''} />;
}

function PlaygroundPanel({ variant, meta, scenarioLabel, example, active, onSelect }) {
  const isGood = variant === 'good';
  const Example = example?.Example;

  return (
    <div
      className={
        'flex cursor-pointer flex-col overflow-hidden rounded-xl border bg-surface transition-shadow ' +
        (isGood
          ? active
            ? 'border-emerald-500/60 ring-2 ring-emerald-500/25'
            : 'border-border hover:border-emerald-500/30'
          : active
            ? 'border-[#c45]/60 ring-2 ring-[#c45]/25'
            : 'border-border hover:border-[#c45]/30')
      }
      onClick={onSelect}
      onKeyDown={(e) => e.key === 'Enter' && onSelect()}
      role="button"
      tabIndex={0}
    >
      <header className="flex flex-col gap-2 border-b border-border px-4 py-3">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={
              'rounded-full px-2.5 py-0.5 text-xs font-semibold ' +
              (isGood
                ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400'
                : 'bg-[#c45]/15 text-[#c45]')
            }
          >
            {isGood ? 'Correto' : 'Anti-padrão'}
          </span>
          <span className="rounded-full border border-border bg-bg px-2.5 py-0.5 text-xs text-muted">
            {scenarioLabel}
          </span>
        </div>
        <h3 className="m-0 text-base font-semibold leading-snug">{meta.title}</h3>
        <p className="m-0 text-sm leading-snug text-muted">{meta.subtitle}</p>
      </header>
      <div className="min-h-36 flex-1 bg-bg/50 p-4">
        {active ? (
          <CodeCapture variant={variant} source={example?.source ?? ''}>
            {Example ? <Example /> : <p className="m-0 text-sm text-muted">Carregando…</p>}
          </CodeCapture>
        ) : (
          <p className="m-0 flex h-full min-h-24 items-center justify-center text-center text-sm text-muted">
            Clique para visualizar
          </p>
        )}
      </div>
    </div>
  );
}
