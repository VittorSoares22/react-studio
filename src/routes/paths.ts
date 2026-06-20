export type Lang = 'js' | 'ts';

export function getDefaultRoute(lang: Lang): string {
  return `/${lang}/hooks/useState`;
}
