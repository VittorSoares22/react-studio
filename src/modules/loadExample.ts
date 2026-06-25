import type { ComponentType } from 'react';
import type { Lang } from '../routes/paths.ts';

export type LoadedExample = {
  source: string;
  Example: ComponentType;
};

const rawByPath = import.meta.glob('../reference/**/*.{jsx,tsx}', {
  query: '?raw',
  import: 'default',
});

const modByPath = import.meta.glob('../reference/**/*.{jsx,tsx}');

function examplePath(
  moduleId: string,
  lang: Lang,
  itemId: string,
  variant: string,
  scenarioId: string | null,
) {
  const ext = lang === 'ts' ? 'tsx' : 'jsx';
  if (scenarioId) {
    return `../reference/${moduleId}/${lang}/${itemId}/scenarios/${scenarioId}/${variant}.${ext}`;
  }
  return `../reference/${moduleId}/${lang}/${itemId}/${variant}.${ext}`;
}

async function loadExample(
  moduleId: string,
  lang: Lang,
  itemId: string,
  variant: string,
  scenarioId: string | null,
): Promise<LoadedExample | null> {
  const path = examplePath(moduleId, lang, itemId, variant, scenarioId);
  const rawLoader = rawByPath[path];
  const modLoader = modByPath[path];
  if (!rawLoader || !modLoader) return null;

  try {
    const [source, mod] = await Promise.all([rawLoader(), modLoader()]);
    const Example = (mod as { default: ComponentType }).default;
    if (!source || !Example) return null;
    return { source: source as string, Example };
  } catch {
    return null;
  }
}

export async function loadModulePlayground(
  lang: Lang,
  moduleId: string,
  itemId: string,
  scenarioId: string | null = null,
) {
  const [good, bad] = await Promise.all([
    loadExample(moduleId, lang, itemId, 'good', scenarioId),
    loadExample(moduleId, lang, itemId, 'bad', scenarioId),
  ]);

  if (!good || !bad) return null;
  return { good, bad };
}
