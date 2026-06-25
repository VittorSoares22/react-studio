import UiButton from '@/components/ui/UiButton.jsx';

// Botões para trocar entre cenários de risco (cada um com seu par good/bad).
export default function RiskScenarioNav({ scenarios, activeId, onSelect }) {
  if (!scenarios?.length) return null;

  return (
    <nav className="mb-3" aria-label="Risk scenarios">
      <div className="flex flex-wrap gap-2">
        {scenarios.map((scenario) => {
          const isActive = scenario.id === activeId;

          return (
            <UiButton
              key={scenario.id}
              variant="nav"
              type="button"
              className={
                'rounded-full border px-3 py-1.5 text-xs font-medium ' +
                (isActive
                  ? 'border-accent bg-surface-hover text-accent'
                  : 'border-border')
              }
              aria-selected={isActive}
              onClick={() => onSelect(scenario.id)}
            >
              {scenario.label}
            </UiButton>
          );
        })}
      </div>
    </nav>
  );
}