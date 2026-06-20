import { Link } from 'react-router-dom';
import { getDefaultRoute } from '../routes/paths.ts';

export default function LangPicker() {
  return (
    <main className="lang-picker">
      <h1>React Reference — Estudo</h1>
      <p>Escolha a linguagem para explorar os templates.</p>
      <div className="lang-picker__actions">
        <Link className="lang-picker__btn" to={getDefaultRoute('js')}>
          JavaScript (.jsx)
        </Link>
        <Link className="lang-picker__btn lang-picker__btn--ts" to={getDefaultRoute('ts')}>
          TypeScript (.tsx)
        </Link>
      </div>
      <p className="lang-picker__hint">
        Baseado em <strong>react.dev/reference</strong> — etapa 1: Hooks
      </p>
    </main>
  );
}
