import { Navigate, NavLink, Outlet, useParams } from 'react-router-dom';
import UiButton from '../components/ui/UiButton.jsx';
import { useTheme } from '../contexts/ThemeContext.jsx';
import hooks from '../reference/hooks/js/useState/scenarios/index.ts';


const modules = [hooks];

// Conta quantos tópicos existem num módulo do catálogo.
function moduleItemCount(mod) {
  return mod.categories.reduce((sum, category) => sum + category.items.length, 0);
}

// Conta quantos tópicos já têm playground publicado.
function moduleImplementedCount(mod) {
  return mod.categories.reduce(
    (sum, category) =>
      sum + category.items.filter((item) => item.playground).length,
    0,
  );
}

// Menu lateral com o catálogo; o conteúdo da rota aparece no Outlet à direita.
export default function Sidebar() {
  const { lang } = useParams();
  const { theme, toggleTheme } = useTheme();

  if (lang !== 'js' && lang !== 'ts') {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex min-h-screen">
    <section className="sticky top-0 h-screen w-[280px] min-w-[280px] overflow-y-auto border-r border-border bg-surface">
      <header className="flex flex-col gap-2 border-b border-border p-4">
        <div className="flex items-center justify-between gap-2">
          <NavLink to="/" className="text-sm text-accent no-underline">
            ← Trocar linguagem
          </NavLink>
          <UiButton
            variant="secondary"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro'}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </UiButton>
        </div>
        <span className="text-xs uppercase tracking-wide text-muted">
          {lang === 'js' ? 'JavaScript' : 'TypeScript'}
        </span>
      </header>
      <nav className="py-2">
        <details className="group" open>
          <summary className="cursor-pointer list-none px-4 py-2 font-semibold text-text">
            React
          </summary>

          {modules.map((mod) => {
              const total = moduleItemCount(mod);
              const done = moduleImplementedCount(mod);
              const isPartial = mod.status === 'planned' && done > 0 && done < total;
              const isComplete = mod.status === 'active' || done === total;

              return (
                <details key={mod.id} className="pl-2" open={isComplete || isPartial}>
                  <summary
                    className={`flex cursor-pointer list-none items-center gap-2 px-4 py-2 text-[0.95rem] font-medium ${
                      isComplete ? 'text-text' : 'text-muted'
                    }`}
                  >
                    {mod.label}
                    {mod.status === 'planned' && done === 0 && (
                      <span className="ml-1.5 rounded bg-surface-hover px-1.5 py-0.5 text-[0.65rem] font-normal text-muted">
                        em breve
                      </span>
                    )}
                    {isPartial && (
                      <span className="ml-1.5 rounded bg-surface-hover px-1.5 py-0.5 text-[0.65rem] font-normal text-accent">
                        {done}/{total}
                      </span>
                    )}
                  </summary>

                  {mod.categories.map((category) => (
                    <div key={category.id} className="pl-2">
                      <p className="m-0 px-4 py-1 text-xs uppercase tracking-wide text-muted">
                        {category.label}
                      </p>
                      <ul className="m-0 list-none p-0 pb-2">
                        {category.items.map((item) => {
                          const isReady = Boolean(item.playground);

                          if (!isReady) {
                            return (
                              <li key={item.id}>
                                <span className="block cursor-not-allowed px-4 py-1.5 pl-6 text-sm text-muted/50">
                                  {item.label}
                                </span>
                              </li>
                            );
                          }

                          return (
                            <li key={item.id}>
                              <NavLink
                                to={`/${lang}/${mod.id}/${item.id}`}
                                className={({ isActive }) =>
                                  `block border-l-2 px-4 py-1.5 pl-6 text-sm no-underline ${
                                    isActive
                                      ? 'border-accent bg-surface-hover font-medium text-accent'
                                      : 'border-transparent text-text hover:bg-surface-hover'
                                  }`
                                }
                              >
                                {item.label}
                              </NavLink>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ))}
                </details>
              );
            })}
        </details>
      </nav>
    </section>
    <div className="flex-1 overflow-auto bg-bg p-8">
      <Outlet />
    </div>
    </div>
  );
}