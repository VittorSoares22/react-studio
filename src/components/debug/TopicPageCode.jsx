import { useCodeOutput } from '../../contexts/CodeOutputContext.jsx';
import CodePanel from './CodePanel.jsx';

export default function TopicPageCode({ codeVariant, activeScenario }) {
  const { sources } = useCodeOutput();
  const displaySource = sources[codeVariant] ?? '';

  return (
    <section className="flex flex-col gap-4">
      <h2 className="m-0 text-xl font-semibold tracking-tight">
        Código — {codeVariant === 'good' ? 'correto' : 'anti-padrão'} · {activeScenario.label}
      </h2>
      <CodePanel source={displaySource} />
    </section>
  );
}
