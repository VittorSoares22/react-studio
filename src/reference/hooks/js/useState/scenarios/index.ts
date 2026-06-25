/** Módulo Hooks — um bloco por hook (useState, useEffect, …). */
export default {
  id: 'hooks',
  label: 'Hooks',
  area: 'react',
  status: 'active' as const,
  categories: [
    {
      id: 'state-hooks',
      label: 'State Hooks',
      anchor: '#state-hooks',
      items: [
        {
          id: 'useState',
          label: 'useState',
          description:
            'Declara variável de estado reativa.\nAtualiza a UI ao chamar o setter.\nBase para inputs, contadores e toggles.',
          playground: {
            good: { title: 'Setter imutável', subtitle: 'setState com valor novo ou função updater' },
            bad: { title: 'Mutação direta', subtitle: 'Alterar objeto/array in-place não re-renderiza' },
            scenarios: [
              {
                id: 'broken-reconciliation',
                label: 'Broken reconciliation',
                tier: 'priority',
                description:
                  'Index key reuses DOM nodes — text jumps when removing or reordering items.',
                good: { title: 'Stable key', subtitle: 'unique id per list item' },
                bad: { title: 'Index key', subtitle: 'input inherits neighbor state' },
              },
              {
                id: 'ghost-state',
                label: 'Ghost state',
                tier: 'priority',
                description:
                  'State local sobrevive à troca de entidade — nome do usuário anterior reaparece.',
                good: { title: 'key no form', subtitle: 'desmonta ao trocar usuário' },
                bad: { title: 'Mesma instância', subtitle: 'nome fantasma persiste' },
              },
              {
                id: 'lost-updates',
                label: 'Lost updates',
                tier: 'priority',
                description:
                  'Vários setState com o mesmo valor capturado — só o último update conta.',
                good: { title: 'Updater funcional', subtitle: 'três +1 enfileirados no mesmo clique' },
                bad: { title: 'setN(n+1) ×3', subtitle: 'só incrementa +1' },
              },
              {
                id: 'batching-ignored',
                label: 'Batching ignored',
                tier: 'priority',
                description:
                  'Ler state logo após setState no mesmo handler — snapshot fica desatualizado.',
                good: { title: 'Updater no snapshot', subtitle: 'snapshot acompanha o batch' },
                bad: { title: 'setSnapshot(n)', subtitle: 'lê n antes do re-render' },
              },
              {
                id: 'stale-closure',
                label: 'Stale closure',
                tier: 'priority',
                description:
                  'Callback assíncrono captura valor antigo do state — leitura atrasada errada.',
                good: { title: 'next no updater', subtitle: 'timeout lê valor atual' },
                bad: { title: 'Snapshot velho', subtitle: 'closure congela n antigo' },
              },
              {
                id: 'direct-mutation',
                label: 'Direct mutation',
                tier: 'secondary',
                description: 'Alterar objeto in-place sem nova referência — React não re-renderiza.',
                good: { title: 'Spread imutável', subtitle: 'setUser com objeto novo' },
                bad: { title: 'user.visits += 1', subtitle: 'setUser(user) mesma ref' },
              },
              {
                id: 'ui-not-updating',
                label: 'UI not updating',
                tier: 'secondary',
                description:
                  'Valor muda na memória mas setter nunca é chamado — número na tela congela.',
                good: { title: 'setVisits', subtitle: 'setter dispara re-render' },
                bad: { title: 'box.visits += 1', subtitle: 'mutação sem setState' },
              },
            ],
          },
        },
      ],
    },
  ],
};
