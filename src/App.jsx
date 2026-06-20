import { BrowserRouter } from 'react-router-dom';
import LangPicker from './core/LangPicker.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <LangPicker />
    </BrowserRouter>
  );
}
