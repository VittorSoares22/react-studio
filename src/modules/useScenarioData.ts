import { useEffect, useState } from 'react';
import type { Lang } from '../routes/paths.ts';
import { loadExample, type LoadedExample } from './loadExample.ts';

type CodeVariant = 'good' | 'bad';

export function useScenarioData(
  lang: Lang,
  moduleId: string,
  itemId: string,
  scenarioId: string | null,
  variant: CodeVariant,
) {
  const [data, setData] = useState<LoadedExample | null>(null);

  useEffect(() => {
    let cancelled = false;
    setData(null);

    loadExample(moduleId, lang, itemId, variant, scenarioId).then((result) => {
      if (!cancelled) setData(result);
    });

    return () => {
      cancelled = true;
    };
  }, [lang, moduleId, itemId, scenarioId, variant]);

  return data;
}
