import { Route, Routes } from 'react-router-dom';
import LangPicker from '../pages/LangPicker.jsx';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LangPicker />} />
    </Routes>
  );
}
