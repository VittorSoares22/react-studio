import { Navigate, Route, Routes } from 'react-router-dom';
import Sidebar from '../pages/Sidebar.jsx';
import LangPicker from '../pages/LangPicker.jsx';
import TopicPage from '../pages/TopicPage.jsx';
import { getDefaultRoute } from './paths.ts';

// Define todas as rotas: home, redirect de idioma e página do tópico com sidebar.
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LangPicker />} />
      <Route path="/js" element={<Navigate to={getDefaultRoute('js')} replace />} />
      <Route path="/ts" element={<Navigate to={getDefaultRoute('ts')} replace />} />
      <Route path="/:lang" element={<Sidebar />}>
        <Route path=":moduleId/:itemId" element={<TopicPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
