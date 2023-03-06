
import ProviderApp from './provider';
import RouterApp from './router';
import { BrowserRouter as Router } from 'react-router-dom'
import '../assets/styles/index.scss'

export default function App() {
  return (
    <ProviderApp>
      <Router>
        <RouterApp />
      </Router>
    </ProviderApp>
  );
}
