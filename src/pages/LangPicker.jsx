import UiButton from '../components/ui/UiButton.jsx';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext.jsx';
import { getDefaultRoute } from '../routes/paths.ts';

const linkClass =
  'rounded-lg px-6 py-3 font-semibold text-white no-underline';

export default function LangPicker() {
  const { theme, toggleTheme } = useTheme();

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center gap-4 bg-bg p-8 text-center text-text">
      <div className="absolute right-4 top-4">
        <UiButton
          variant="secondary"
          onClick={toggleTheme}
          aria-label={theme === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro'}
        >
          {theme === 'dark' ? '☀️ Claro' : '🌙 Escuro'}
        </UiButton>
      </div>
      <h1>React Reference — Estudo</h1>
      <p>Escolha a linguagem para explorar os templates.</p>
      <div className="flex flex-wrap justify-center gap-4">
        <Link className={`${linkClass} bg-accent`} to={getDefaultRoute('js')}>
          JavaScript (.jsx)
        </Link>
        <Link className={`${linkClass} bg-accent-ts`} to={getDefaultRoute('ts')}>
          TypeScript (.tsx)
        </Link>
      </div>
      <p className="text-sm text-muted">
        Baseado em <strong>react.dev/reference</strong> — etapa 1: Hooks
      </p>
    </main>
  );
}
